<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

use Illuminate\Database\Eloquent\Factories\HasFactory;
class Ingredient extends Model
{
    use HasFactory;

    protected $table = 'ingredients';
    protected $fillable = ['name', 'unit'];
    protected $primaryKey = 'ingredient_id';
    public function recipes()
    {
        return $this->belongsToMany(Recipe::class, 'recipe_ingredients', 'ingredient_id', 'recipe_id')
            ->withPivot('quantity')
            ->withTimestamps();
    }

}
