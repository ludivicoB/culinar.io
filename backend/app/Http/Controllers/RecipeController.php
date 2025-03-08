<?php

namespace App\Http\Controllers;

use App\Models\Recipe;
use App\Models\User;
use App\Models\Ingredient;
use App\Models\Step;
use Illuminate\Http\Request;
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
        // $request->validate([
        //     'recipe_id' => 'required|exists:recipes,id',
        //     'steps' => 'required|array',
        //     'steps.*.step_number' => 'required|integer|min:1',
        //     'steps.*.description' => 'required|string|max:1000',
        // ]);

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
}
