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
                return $this->sendError('Invalid credentials',401,["Login" => 'Invalid credentials']);
            }
            $user = Auth::user();
            $user->load(['students.courses']);

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
        $result = $this->userService->userVerify($request);
        if (!$result) {
            return $this->sendError('User Not Found..', 404, ["code" => $request->code]);
        }
        if ($result->expired) {
            return $this->sendError('Expired verification code.', 403, ["code" => $request->code]);
        }
        if ($result->verfied) {
            return $this->sendError('User Already Verified', 403, ["code" => $request->code]);
        }
        if ($result->codeverify) {
            return $this->sendError('Invalid Verification Code..', 403, ["code" => $request->code]);
        }
        
        $this->mailService->sendEmail("Thank You Email Verified Succuessfully", $result->email,'Email Verification Code');
        return $this->sendSuccess($result,'Email verified successfully.');
    }

    public function resendVerificationCode($email)
    {
        try{
            $result = $this->userService->sendEmailUserVerificationCode($email,$this->code);
           
            if (!$result) {
                return $this->sendError('User not found.', 500, $result);
            }
            if ($result->verfied) {
                return $this->sendError('User Already Verified', 403, ["code" => $this->code]);
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