<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up()
    {
        Schema::create('users', function (Blueprint $table) {
            $table->id('userid');
            $table->string('fname');
            $table->string('lname');
            $table->date('bdate');
            $table->string('email')->unique();
            $table->timestamp('email_verified_at')->nullable();
            $table->string('password');
            $table->string('reg_code', 6)->nullable();
            $table->string('avatar')->nullable();
            $table->string('banner_color')->default('#ffffff');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('users');
    }

};
