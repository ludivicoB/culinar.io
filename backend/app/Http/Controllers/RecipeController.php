<?php

namespace App\Http\Controllers;

use App\Models\Recipe;
use Illuminate\Http\Request;
class RecipeController extends Controller
{
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
}
