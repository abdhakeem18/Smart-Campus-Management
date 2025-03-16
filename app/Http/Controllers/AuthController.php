<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Api\BaseController;
use App\Http\Requests\RegisterRequest;
use App\Models\User;
use App\Services\AuthService;
use Carbon\Carbon;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Crypt;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;
class AuthController extends BaseController
{
    protected $authService;

    public function __construct(AuthService $authService)
    {
        return $this->authService = $authService;
    }

    public function register(RegisterRequest $request)
    {
        $result = $this->authService->register($request);
        if (isset($result['success']) && $result['success'] === false) {
            return $this->sendError($result['message'], 500, $result['data']);
        }
        return $this->sendSuccess($result, 'Register successfully.');
    }

    public function login(Request $request)
    {
        return $this->authService->login($request);
    }

    public function logout(Request $request)
    {
        return $this->authService->logout($request);
    }

    public function user(Request $request)
    {
        return $this->authService->user($request);
    }

    public function verify(Request $request)
    {
        return $this->authService->verify($request);
    }

    public function resendVerificationCode()
    {
        return $this->authService->resendVerificationCode(auth()->user()->email);
    }

    public function resetPassword(Request $request,$token)
    {
        $decryptedData = Crypt::decryptString($token);
        list($email, $userId,$time) = explode(',', $decryptedData);
        if($time < now()){
            return $this->sendError('Your Token Expired ..', 500, ["error" => null]);
        }
        $result = $this->authService->resetPassword($request, $userId);
        if(!$result){
            return $this->sendError('User Not Found ..', 500, ["error" => null]);
        }
        return $this->sendSuccess($result, 'Password Reset Successfully..');

    }
}
