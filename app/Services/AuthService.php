<?php


namespace App\Services;

use App\Http\Requests\RegisterRequest;
use App\Mail\VerificationMail;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;
use Illuminate\Auth\Events\Registered;
use Illuminate\Support\Facades\Mail;

class AuthService{
    protected $userService;
    protected $mailService;
    protected $code;


    public function __construct(UserService $userService,MailService $mailService)
    {
        $this->userService = $userService;
        $this->mailService = $mailService;
        $this->code = VerificationCodeGenerateService::code();

    }

    public function register(Request $request)
    {
        $user = $this->userService->storeUser($request,$this->code);
        try {
            $this->mailService->sendEmail("Your email verification code is: $this->code", $user->email,'Email Verification Code');
        } catch (\Exception $e) {
            return [
                'success' => false,
                'message' => 'Failed to send email.',
                'data' => $e->getMessage(),
            ];
        }
        return $user;
       
    }

    public function login(Request $request)
    {
        try {
            if (!Auth::attempt($request->only('email', 'password'))) {
                throw ValidationException::withMessages([
                    'email' => ['Invalid credentials'],
                ]);
            }
            $user = Auth::user();
            $token = $user->createToken('auth-token')->plainTextToken;

            return response()->json([
                'user' => $user,
                'token' => $token,
            ]);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function logout(Request $request)
    {
        $request->user()->tokens()->delete();

        return response()->json(['message' => 'Logged out successfully']);
    }

    public function user(Request $request)
    {
        return response()->json($request->user());
    }

    public function verify(Request $request)
    {
        return $this->userService->userVerify($request);
    }

    public function resendVerificationCode($email)
    {
        try{
            $user = $this->userService->sendEmailUserVerificationCode($email,$this->code);

            if (!$user) {
                return response()->json(['error' => 'User not found.'], 404);
            }

            if ($user->email_verified_at) {
                return response()->json(['message' => 'Email already verified.'], 400);
            }

            $this->mailService->sendEmail("Your email verification code is: $this->code", $user->email,'Email Verification Code');

            return response()->json(['message' => 'Verification code resent successfully.']);

        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }




}