<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Services\AuthService;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;
class AuthController extends Controller
{
    protected $authService;

    public function __construct(AuthService $authService)
    {
        return $this->authService = $authService;
    }

    public function register(Request $request)
    {
        return $this->authService->register($request);
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

    public function resendVerificationCode(Request $request)
    {
        return $this->authService->resendVerificationCode($request);
    }
}
