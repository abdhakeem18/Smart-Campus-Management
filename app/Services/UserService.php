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

    public function __construct(UserRepository $userRepository)
    {
        $this->userRepository = $userRepository;
    }

    public function storeUser(Request $request,$code = null)
    {
        $user = $this->userRepository->createUser($request,$code);
        return $user;
    }


    public function sendEmailUserVerificationCode($email,$code)
    {
        $user = $this->userRepository->findUserByValue($email);

        if (!$user) return null;

        if ($user->email_verified_at) return $user;

        $this->userRepository->userVerifyCodeUpdate($user,$code);
        return $user;
    }

    public function userVerify(Request $request)
    {

        $user = $this->userRepository->findUserByValue($request->email,$request->code);
        if (!$user) {
            return response()->json(['error' => 'Invalid verification code.'], 400);
        }

        if ($user->expires_at < now()) {
            return response()->json(['error' => 'Expired verification code.'], 400);
        }

        $this->userRepository->userVerifyCodeUpdate($user,$request->code,true);

        return  response()->json(['message' => 'Email verified successfully.']);
    }

    public function createValidator($request){
        try {
            $request->validate([
                'name' => 'required|string|max:255',
                'email' => 'required|string|email|max:255|unique:users',
                'password' => 'required|string|min:6|confirmed',
            ]);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }



}