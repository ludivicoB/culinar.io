<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Recipe extends Model
{
    protected $table = 'recipes';

    protected $primaryKey = 'recipe_id';

    protected $fillable = [
        'recipe_name',
        'user_id',
        'recipe_image',
        'recipe_description',
        'category',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function ingredients()
    {
        return $this->belongsToMany(Ingredient::class, 'recipe_ingredients', 'recipe_id', 'ingredient_id')
            ->withPivot('quantity')
            ->withTimestamps();
    }


    public function steps()
    {
        return $this->hasMany(Step::class, 'recipe_id');
    }

}
