<?php

namespace App\Models;
use Laravel\Sanctum\HasApiTokens;
// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable;
    use HasApiTokens, Notifiable;
    protected $table = 'users'; // Specify table name

    protected $primaryKey = 'userid'; // Set custom primary key

    protected $fillable = [
        'fname',
        'lname',
        'bdate',
        'email',
        'password',
        'reg_code',
        'email_verified_at',
        'avatar',
        'banner_color',
    ];

    protected $hidden = [
        'password',
    ];

    public function recipes()
    {
        return $this->hasMany(Recipe::class);
    }
}
