<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('recipes', function (Blueprint $table) {
            $table->increments('recipe_id');
            $table->string('recipe_name');
            $table->unsignedBigInteger('userid');
            $table->string('recipe_image');
            $table->string('recipe_description');
            $table->string('category');

            $table->timestamps();
            $table->foreign('userid')->references('userid')->on('users');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('recipes');
    }
};
