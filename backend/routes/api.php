<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\RecipeController;
Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::post('/user/register', [UserController::class, 'registerUser']);
Route::post('/user/verifycode', [UserController::class, 'verifyCode']);
Route::post('/user/login', [UserController::class, 'login']);

// Route::post('/user/logout', [UserController::class, 'logout']);
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user', function (Request $request) {
        return $request->user();
    });
    Route::post('/user/logout', [UserController::class, 'logout']);
    Route::post('/profile/avatar', [UserController::class, 'updateProfilePicture']);
    Route::get('/profile-picture', [UserController::class, 'getProfilePicture']);
    Route::put('/user/update-info', [UserController::class, 'updatePersonalInformation']);
    Route::put('/user/update-password', [UserController::class, 'updatePassword']);
    Route::put('/user/update-banner-color', [UserController::class, 'updateBannerColor']);

    Route::post('/recipe', [RecipeController::class, 'createRecipe']);
    Route::post('/recipe/ingredients', [RecipeController::class, 'insertIngredients']);
    Route::post('/recipe/insert-steps', [RecipeController::class, 'insertSteps']);
    Route::get('/user/recipe/all', [RecipeController::class, 'getAllRecipeOfUser']);
    Route::get('/user/get-recipe/{recipeid}', [RecipeController::class, 'getRecipeByID']);
});