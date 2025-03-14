<?php

namespace App\Http\Controllers;

use App\Models\Recipe;
use App\Models\User;
use App\Models\Ingredient;
use App\Models\Step;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\DB;
class RecipeController extends Controller
{
    public function filterRecipesByIngredients(Request $request)
    {
        $selectedIngredientIds = $request->input('ingredients'); // Array of ingredient IDs

        $recipes = Recipe::whereHas('ingredients', function ($query) use ($selectedIngredientIds) {
            $query->whereIn('ingredients.id', $selectedIngredientIds);
        }, '=', count($selectedIngredientIds))->get();

        return response()->json($recipes);
    }
    public function createRecipe(Request $request)
    {
        $this->enableCors($request);
        $user = auth()->user();
        $recipe = new Recipe();
        $recipe->userid = $user->userid;
        $recipe->recipe_name = $request->input('name');
        $recipe->recipe_description = $request->input('description');
        $file = $request->file('image');
        $fileName = time() . '_' . $file->getClientOriginalName();
        $filePath = $file->storeAs('recipeimgs', $fileName, 'public');
        $recipe->recipe_image = $fileName;
        $recipe->category = $request->input('category');
        $recipe->estimated_time = $request->input('estimated_time');
        $recipe->save();

        return response()->json([
            'message' => 'Recipe created successfully!',
            'recipe' => $recipe,
            'status' => 'success'
        ]);
    }
    public function insertIngredients(Request $request)
    {
        $this->enableCors($request);

        $recipeId = $request->input('recipeid');
        $ingredients = $request->input('ingredients'); // Expecting an array of objects

        DB::beginTransaction();
        try {
            foreach ($ingredients as $ingredient) {
                $ingredientModel = Ingredient::firstOrCreate([
                    'name' => $ingredient['name']
                ], [
                    'unit' => $ingredient['unit']
                ]);

                DB::table('recipe_ingredients')->insert([
                    'recipe_id' => $recipeId,
                    'ingredient_id' => $ingredientModel->ingredient_id,
                    'quantity' => $ingredient['quantity'],
                    'created_at' => now(),
                    'updated_at' => now(),
                ]);
            }
            DB::commit();
            return response()->json(['message' => 'Ingredients added successfully!', 'status' => 'success']);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['message' => $e->getMessage(), 'status' => 'error'], 500);
        }

    }
    public function insertSteps(Request $request)
    {

        $recipeId = $request->input('recipe_id');
        $steps = $request->input('steps');

        // Insert steps using Eloquent
        foreach ($steps as $step) {
            Step::create([
                'recipe_id' => $recipeId,
                'step_number' => $step['stepNumber'],
                'description' => $step['description'],
            ]);
        }

        return response()->json([
            'message' => 'Steps added successfully!',
            'status' => 'success'
        ]);
    }
    public function getAllRecipeOfUser(Request $request)
    {
        $this->enableCors($request);
        $user = auth()->user();

        // Fetch recipes of the authenticated user with their ingredients and steps
        $recipes = Recipe::where('userid', $user->userid)
            ->with(['ingredients', 'steps']) // Assuming relationships exist
            ->get();
        foreach ($recipes as $recipe) {
            $recipe->recipe_image = asset("storage/recipeimgs/{$recipe->recipe_image}");
        }
        return response()->json([
            'recipes' => $recipes,
            'status' => 'success'
        ]);
    }
    public function getRecipeByID($recipeid)
    {
        $recipe = Recipe::with(['ingredients', 'steps'])->find($recipeid);
        $user = User::find($recipe->userid);
        $user = (object) $user->only(['avatar', 'fname', 'lname', 'banner_color']);
        $user->avatar = asset("storage/avatars/{$user->avatar}");
        $recipe->recipe_image = asset("storage/recipeimgs/{$recipe->recipe_image}");
        return response()->json([
            'recipe' => $recipe,
            'user' => $user,
            'status' => 'success'
        ]);
    }
    public function updateRecipe(Request $request, $recipeid)
    {
        $recipe = Recipe::find($recipeid);

        // Update text fields
        $recipe->recipe_name = $request->input('recipe_name');
        $recipe->recipe_description = $request->input('recipe_description');
        $recipe->category = $request->input('category');
        $recipe->estimated_time = $request->input('estimated_time');

        // Update image if a new one is uploaded
        if ($request->hasFile('recipe_image')) {
            // Delete old image
            $oldRecipeImg = 'recipeimgs/' . $recipe->recipe_image;
            if (Storage::disk('public')->exists($oldRecipeImg)) {
                Storage::disk('public')->delete($oldRecipeImg);
            }
            // Storage::delete("public/recipeimgs/{$recipe->recipe_image}");

            $file = $request->file('recipe_image');
            $fileName = time() . '_' . $file->getClientOriginalName();
            $filePath = $file->storeAs('recipeimgs', $fileName, 'public');
            $recipe->recipe_image = $fileName;
        }

        $recipe->save();
        $recipe->recipe_image = asset("storage/recipeimgs/{$recipe->recipe_image}");

        return response()->json([
            'recipe' => $recipe,
            // 'user' => $user,
            'message' => 'Recipe updated successfully!',
            'status' => 'success'
        ]);
    }
    public function updateSteps(Request $request)
    {
        $recipeId = $request->input('recipe_id');
        $steps = $request->input('steps');

        $recipe = Recipe::find($recipeId);
        if (!$recipe) {
            return response()->json([
                'message' => 'Recipe not found',
                'status' => 'error'
            ], 404);
        }

        Step::where('recipe_id', $recipeId)->delete();

        foreach ($steps as $step) {
            Step::create([
                'recipe_id' => $recipeId,
                'step_number' => $step['step_number'],
                'description' => $step['description'],
            ]);
        }

        return response()->json([
            'message' => 'Steps updated successfully!',
            'status' => 'success'
        ]);
    }
    public function deleteRecipeIngredient(Request $request)
    {
        $recipeId = $request->input('recipe_id');
        $ingredientId = $request->input('ingredient_id');

        DB::table('recipe_ingredients')->where('recipe_id', $recipeId)->where('ingredient_id', $ingredientId)->delete();
        $recipe = Recipe::with(['ingredients'])->find($recipeId);
        return response()->json([
            'message' => 'Ingredient deleted successfully!',
            'recipe' => $recipe,
            'status' => 'success'
        ]);
    }
    public function updateRecipeIngredients(Request $request)
    {
        $recipeId = $request->input('recipe_id');
        $ingredients = $request->input('ingredients');

        foreach ($ingredients as $ingredient) {
            $existingIngredient = Ingredient::where('name', $ingredient['name'])->first();

            if ($existingIngredient) {
                DB::table('recipe_ingredients')
                    ->where('recipe_id', $recipeId)
                    ->where('ingredient_id', $ingredient['ingredient_id'])
                    ->update([
                        'quantity' => $ingredient['pivot']['quantity']
                    ]);
            } else {
                $newIngredient = new Ingredient();
                $newIngredient->name = $ingredient['name'];
                $newIngredient->unit = $ingredient['unit'];
                $newIngredient->save();

                DB::table('recipe_ingredients')->insert([
                    'recipe_id' => $recipeId,
                    'ingredient_id' => $newIngredient->ingredient_id,
                    'quantity' => $ingredient['pivot']['quantity'],
                    'created_at' => now(),
                    'updated_at' => now(),
                ]);

                DB::table('recipe_ingredients')
                    ->where('recipe_id', $recipeId)
                    ->where('ingredient_id', $ingredient['ingredient_id'])
                    ->delete();
            }
        }
        $recipe = Recipe::with(['ingredients'])->find($recipeId);
        return response()->json([
            'message' => 'Ingredients updated successfully!',
            'recipe' => $recipe,
            'status' => 'success'
        ]);
    }
    public function addRecipeIngredient(Request $request)
    {
        $recipeId = $request->input('recipe_id');
        $ingredient = $request->input('ingredient');

        $ingredientModel = Ingredient::firstOrCreate([
            'name' => $ingredient['name']
        ], [
            'unit' => $ingredient['unit']
        ]);
        DB::table('recipe_ingredients')->insert([
            'recipe_id' => $recipeId,
            'ingredient_id' => $ingredientModel->ingredient_id,
            'quantity' => $ingredient['quantity'],
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        $recipe = Recipe::with(['ingredients'])->find($recipeId);
        return response()->json([
            'message' => 'Ingredient added successfully!',
            'recipe' => $recipe,
            'status' => 'success'
        ]);
    }

}
