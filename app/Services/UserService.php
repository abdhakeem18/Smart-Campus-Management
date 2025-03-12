<?php


namespace App\Services;

use App\Http\Requests\RegisterRequest;
use App\Mail\VerificationMail;
use App\Models\User;
use App\Repository\UserRepository;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;
use Illuminate\Auth\Events\Registered;
use Illuminate\Support\Facades\Mail;

class UserService{

    protected $userRepository;
    protected $code;
    protected $mailService;

    public function __construct(MailService $mailService,UserRepository $userRepository,)
    {
        $this->userRepository = $userRepository;
        $this->code = VerificationCodeGenerateService::code();
        $this->mailService = $mailService;

    }

    public function storeuser(Request $request)
    {
        try {
            $request->validate([
                'name' => 'required|string|max:255',
                'email' => 'required|string|email|max:255|unique:users',
                'password' => 'required|string|min:6|confirmed',
            ]);
            $user = $this->userRepository->createUser($request,$this->code);
            $this->mailService->sendEmail("Your email verification code is: $this->code", $user->email,'Email Verification Code');
            return response()->json(['message' => 'User registered successfully', 'user' => $user], 201);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

  
    public function sendEmailUserVerificationCode(Request $request)
    {
        $user = $this->userRepository->findUserByEmail($request);
        if (!$user) {
            return response()->json(['error' => 'User not found.'], 404);
        }

        if ($user->email_verified_at) {
            return response()->json(['message' => 'Email already verified.'], 400);
        }

        $this->userRepository->userVerifyCodeUpdate($user,$this->code);

        $this->mailService->sendEmail("Your email verification code is: $this->code", $user->email,'Email Verification Code');

        return response()->json(['message' => 'Verification code resent successfully.']);
    }

    public function userVerify(Request $request)
    {
        $user = $this->userRepository->findUserByCode($request->code);

        if (!$user) {
            return response()->json(['error' => 'Invalid verification code.'], 400);
        }

        if ($user->expires_at < now()) {
            return response()->json(['error' => 'Expired verification code.'], 400);
        }

        $this->userRepository->userVerifyCodeUpdate($user,$this->code,true);

        return  response()->json(['message' => 'Email verified successfully.']);
    }




}