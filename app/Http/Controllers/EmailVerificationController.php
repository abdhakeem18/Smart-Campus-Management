<?php

namespace App\Http\Controllers;

use App\Models\EmailVerification;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Validator;

class EmailVerificationController extends Controller
{
    public function sendVerificationCode()
    {
        $user = Auth::user();
        $code = rand(100000, 999999); // Generate 6-digit code

        // Store the verification code (in session or database)
        session(['verification_code' => $code]);

        // Send the code via email
        Mail::raw('Your verification code is ' . $code, function ($message) use ($user) {
            $message->to($user->email)
                ->subject('Email Verification');
        });

        return response()->json(['message' => 'Verification code sent.']);
    }

    public function verifyCode(Request $request)
    {
        // Check if the entered code matches the stored code
        if ($request->code == session('verification_code')) {
            // Mark the user as verified
            $user = Auth::user();
            $user->email_verified_at = now();
            $user->save();

            return response()->json(['message' => 'Email verified successfully.']);
        }

        return response()->json(['message' => 'Invalid code.'], 400);
    }
}
