<?php


namespace App\Services;
use App\Repository\UserRepository;
use App\Services\Api\BaseService;
use Illuminate\Http\Request;


class UserService extends BaseService{

    protected $userRepository;

    public function __construct(UserRepository $userRepository)
    {
        $this->userRepository = $userRepository;
    }

    public function storeUser(Request $request,$code = null)
    {
        $user = $this->userRepository->store($request,$code);
        return $user;
    }


    public function sendEmailUserVerificationCode($email,$code)
    {
        $user = $this->userRepository->findByValue($email);
        $this->userRepository->VerifyCodeUpdate($user,$code);
        return $user;
    }

    public function userVerify(Request $request)
    {

        $user = $this->userRepository->findByValue(auth()->user()->email,$request->code);
        if (!$user) {
            return null;
        }

        if ($user->expires_at != null && $user->expires_at < now()) {
            $user->expired = true;
            return $user;
        }
        if ($user->email_verified_at != null) {
            $user->verfied = true;
            return $user;
        }
        $resgister_number = 'E0000001';
        
        $this->userRepository->VerifyCodeUpdate($user,$request->code,true);
        
        return  $user;
    }

    public function createValidator($request){
        try {
            $request->validate([
                'name' => 'required|string|max:255',
                'email' => 'required|string|email|max:255|unique:users',
                'password' => 'required|string|min:6|confirmed',
            ]);
        } catch (\Exception $e) {
            return $this->sendError("Somethig Went Wrong ..", 500, $e->getMessage());
        }
    }

    public function userPasswordReset(Request $request, $userId)
    {

        $user = $this->userRepository->getById($userId);
        if (!$user) {
            return $user;
        }
        $user->password =  bcrypt($request->password);
        $user->save();
        return  $user;
    }

}