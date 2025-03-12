<?php 
namespace App\Repository;

use App\Models\User;
use App\Services\MailService;
use App\Services\VerificationCodeGenerateService;
use Carbon\Carbon;

class UserRepository{

    protected $mailService;


    public function getAllUsers()
    {
        $users = User::all();
        return $users;
    }

    public function getUserById($id)
    {
        $user = User::find($id);
        return $user;
    }

    public function createUser($request,$code = null)
    {
        $user = User::create([
                'name' => $request->name,
                'email' => $request->email,
                'password' => bcrypt($request->password),
                'verification_code' => $code ? md5($code) : null,
                'expires_at' => now()->addMinutes(15),
        ]);
        return $user;
        
    }

    public function updateUser($request,$id)
    {
        $user = User::find($id);
        if ($user) {
            $user->name = $request->name;
            $user->password = bcrypt($request->password);
            $user->save();
        }
        return $user;
    }

    public function findUserByValue($email = null, $code = null)
    {
        $query = User::query();
        if ($email) {
            $query->where('email', $email);
        }
        if ($code) {
            $query->where('verification_code', md5($code));
        }
        return $query->first(); 
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

    public function deleteUser($id)
    {
        $user = User::find($id);
        $user->delete();
        return $user;
    }
}