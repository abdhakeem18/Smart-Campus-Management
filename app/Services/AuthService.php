<?php


namespace App\Services;
use App\Services\Api\BaseService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;


class AuthService extends BaseService{
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
            $user['token'] =$token; 
            return $this->sendSuccess($user,'Logged IN successfully.');

            return response()->json();

        } catch (\Exception $e) {
            return $this->sendError(null, 500, $e->getMessage());
        }
    }

    public function logout(Request $request)
    {
        $request->user()->tokens()->delete();

        return $this->sendSuccess($request,'Logged out successfully.');
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
            $result = $this->userService->sendEmailUserVerificationCode($email,$this->code);

            if (!$result) {
                return $this->sendError('User not found.', 500, $result);
            }

            if ($result->email_verified_at) {
                return  $this->sendSuccess($result,'Email already verified.');
            }

            $this->mailService->sendEmail("Your email verification code is: $this->code", $result->email,'Email Verification Code');

            return $this->sendSuccess($result,'Verification code resent successfully..');

        } catch (\Exception $e) {
            return $this->sendError(null, 500, $e->getMessage());

        }
    }

    public function resetPassword(Request $request, $userId)
    {
        return $this->userService->userPasswordReset($request, $userId);
    }


}