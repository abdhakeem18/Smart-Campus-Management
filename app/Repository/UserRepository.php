<?php 
namespace App\Repository;

use App\Models\User;
use App\Services\MailService;
use App\Services\VerificationCodeGenerateService;
use Carbon\Carbon;

class UserRepository{

    protected $mailService;
    protected $verificationCodeGenerateService;
    

    public  function __construct(VerificationCodeGenerateService $verificationCodeGenerateService)
    {
        $this->verificationCodeGenerateService = $verificationCodeGenerateService;

    }

    public function createUser($request,$code)
    {

        $user = User::create([
                'name' => $request->name,
                'email' => $request->email,
                'password' => bcrypt($request->password),
                'verification_code' => md5($code),
                'expires_at' => now()->addMinutes(15),
        ]);

        return $user;
        
    }

    public function findUserByEmail($request)
    {
        return User::where('email', $request->email)->first();;
    }

    public function findUserByCode($code)
    {
        return User::where('verification_code', md5($code))->first();
    }

    public function userVerifyCodeUpdate($user,$code,$verify=false)
    {
        $user->update([
            'email_verified_at' => $verify ? Carbon::now() : null,
            'verification_code' => $verify ? null : md5($code), 
            'expires_at' => $verify ? null : now()->addMinutes(15)
        ]);
    }
}