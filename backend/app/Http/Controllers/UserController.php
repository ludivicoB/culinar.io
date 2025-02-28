<?php

namespace App\Http\Controllers;
use PHPMailer\PHPMailer\Exception;
use Illuminate\Http\Request;
use App\Models\User;
use PHPMailer\PHPMailer\PHPMailer;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    public function registerUser(Request $request)
    {
        $this->enableCors($request);
        $formData = $request->formData;
        $fname = $request->input('firstname');
        $lname = $request->input('lastname');
        $bdate = $request->input('bdate');
        $email = $request->input('email');
        $password = $request->input('password');

        $existing_user = User::where('email', $email)->first();

        if ($existing_user) {
            if ($existing_user->email_verified_at == null) {
                $existing_user->reg_code = $this->generateCode();
                $this->sendEmailCode($existing_user->fname, $existing_user->email, $existing_user->reg_code);
                $existing_user->password = bcrypt($password);
                $existing_user->save();
                return response()->json(['message' => 'Account Created. Please verify your email', 'status' => 'success']);
            }
            return response()->json(['message' => 'Email already exists', 'status' => 'error']);
        } else {
            $user = new User();
            $user->fname = $fname;
            $user->lname = $lname;
            $user->bdate = $bdate;
            $user->email = $email;
            $user->reg_code = $this->generateCode();
            $this->sendEmailCode($fname, $email, $user->reg_code);
            $user->password = bcrypt($password); // Hash the $password;
            $user->save();
            return response()->json(['message' => 'Account Created. Please verify your email', 'status' => 'success']);
        }
    }
    public function sendEmailCode($name, $email, $code)
    {
        $mail = new PHPMailer(true);

        try {
            $mail->isSMTP();
            $mail->SMTPAuth = true;
            $mail->Host = 'smtp.gmail.com';
            $mail->Username = 'misternonoy11@gmail.com';
            $mail->Password = 'zwnx vmxk vghl igzt'; // Consider using environment variables for security
            $mail->SMTPSecure = 'tls';
            $mail->Port = 587;

            $mail->setFrom('culinar.io@gmail.com', 'Culinar.io');
            $mail->addAddress($email);

            $mail->isHTML(true);
            $mail->Subject = 'Culinar.io Email Verification';

            // Email template with dynamic verification code
            $email_template = "
            <!DOCTYPE html>
            <html lang='en'>
            <head>
                <meta charset='UTF-8'>
                <meta name='viewport' content='width=device-width, initial-scale=1.0'>
                <title>Culinar.io Email Verification</title>
                <style>
                    body { font-family: 'Poppins', sans-serif; background-color: #f9f9f9; color: #333; margin: 0; padding: 0; }
                    .email-container { max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 20px; border-radius: 8px; box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1); }
                    h3 { color: #007BFF; margin-bottom: 15px; }
                    h4 { color: #333; margin-bottom: 10px; }
                    .verification-code { font-size: 18px; color: #ffffff; background-color: #28a745; padding: 10px 20px; border-radius: 5px; display: inline-block; margin-top: 10px; }
                    .email-footer { margin-top: 20px; font-size: 12px; color: #888; text-align: center; }
                </style>
            </head>
            <body>
                <div class='email-container'>
                    <h3>Hi $name,</h3>
                    <h4>Thank you for creating an account with Culinar.io</h4>
                    <p>Please use this code to verify your email address:</p>
                    <p>Your verification code is:</p>
                    <div class='verification-code'>$code</div>
                    <div class='email-footer'>
                        <p>&copy; " . date('Y') . " Culinar.io All rights reserved.</p>
                    </div>
                </div>
            </body>
            </html>";

            $mail->Body = $email_template;

            $mail->send();
            return response()->json(['message' => 'Email sent successfully'], 200);

        } catch (Exception $e) {
            return response()->json(['error' => 'Email could not be sent: ' . $mail->ErrorInfo], 500);
        }
    }
    public function generateCode($length = 6)
    {
        $characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        return substr(str_shuffle($characters), 0, $length);
    }

    public function verifyCode(Request $request)
    {
        $this->enableCors($request);
        $code = $request->code;
        $email = $request->email;
        $user = User::where('email', $email)->first();
        if ($user && $user->reg_code == $code) {
            $user->email_verified_at = now();
            $user->reg_code = null;
            $user->save();
            return response()->json(['message' => 'Email verified successfully, you can now login', 'status' => 'success']);
        } else {
            return response()->json(['message' => 'Invalid verification code', 'status' => 'error']);
        }
    }

    // public function login(Request $request)
    // {
    //     $this->enableCors($request);

    //     $email = $request->email;
    //     $password = $request->password;

    //     $user = User::where('email', $email)->first();

    //     if ($user && Hash::check($password, $user->password)) {
    //         return response()->json([
    //             'message' => 'Login successful',
    //             'status' => 'success',
    //             'user' => [
    //                 'userid' => $user->userid,
    //                 'fname' => $user->fname,
    //                 'lname' => $user->lname,
    //                 'bdate' => $user->bdate,
    //                 'email' => $user->email
    //             ]
    //         ]);
    //     } else {
    //         return response()->json([
    //             'message' => 'Invalid credentials',
    //             'status' => 'error'
    //         ]);
    //     }
    // }


    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required'
        ]);

        if (!Auth::attempt($request->only('email', 'password'))) {
            return response()->json(['message' => 'Wrong password or email', 'status' => 'error']);
        }

        $user = Auth::user();

        if ($user->tokens()->count() > 0) {
            return response()->json(['message' => 'User is already logged in', 'status' => 'error']);
        }

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'access_token' => $token,
            'token_type' => 'Bearer',
            'user' => $user->only(['fname', 'lname', 'bdate', 'email']),
            'status' => 'success'
        ]);
    }

    public function logout(Request $request)
    {
        $request->user()->tokens()->delete();
        return response()->json(['message' => 'Logged out successfully', 'status' => 'success']);
    }

    public function updateProfilePicture(Request $request)
    {

        $user = auth()->user(); // Get authenticated user

        // Check if user already has an avatar and delete it
        if ($user->avatar) {
            $oldAvatarPath = 'avatars/' . $user->avatar; // Path relative to 'public' disk
            if (Storage::disk('public')->exists($oldAvatarPath)) {
                Storage::disk('public')->delete($oldAvatarPath); // Delete old file
            }
        }

        // Store new avatar
        $file = $request->file('avatar');
        $fileName = time() . '_' . $file->getClientOriginalName(); // Unique file name
        $filePath = $file->storeAs('avatars', $fileName, 'public'); // Store in 'storage/app/public/avatars'

        // Update user profile with new avatar filename
        $user->update(['avatar' => $fileName]);

        return response()->json([
            'message' => 'Profile picture updated successfully!',
            'avatar' => $fileName
        ], );
    }

    public function getProfilePicture(Request $request)
    {
        $user = auth()->user(); // Get authenticated user

        if ($user->avatar) {
            $avatarUrl = asset('storage/avatars/' . $user->avatar); // Full image URL
        } else {
            $avatarUrl = asset('storage/avatars/default-avatar.png'); // Default profile picture
        }

        return response()->json([
            'avatar' => $avatarUrl,
            'status' => 'success',
            'user' => $user->only(['fname', 'lname', 'bdate', 'email', 'banner_color']),
        ]);
    }

    public function updatePersonalInformation(Request $request)
    {
        $user = auth()->user();
        $user->fname = $request->input('fname');
        $user->lname = $request->input('lname');
        $user->save();
        return response()->json([
            'message' => 'Personal information updated successfully!',
            'user' => $user,
            'status' => 'success'
        ]);
    }

    public function updatePassword(Request $request)
    {
        $request->validate([
            'old_password' => 'required',
            'new_password' => 'required|min:8',
            'confirm_password' => 'required|same:new_password',
        ]);

        $user = auth()->user();

        if (!Hash::check($request->old_password, $user->password)) {
            return response()->json(['message' => 'Old password is incorrect', 'status' => 'error']);
        }

        $user->password = bcrypt($request->new_password);
        $user->save();

        return response()->json(['message' => 'Password updated successfully', 'status' => 'success']);
    }

    public function updateBannerColor(Request $request)
    {
        $user = auth()->user();
        $user->banner_color = $request->input('bannercolor');
        $user->save();
        return response()->json([
            'message' => 'Banner color updated successfully!',
            'user' => $user,
            'status' => 'success'
        ]);
    }



}
