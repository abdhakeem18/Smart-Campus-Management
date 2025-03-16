<?php 
namespace App\Repository;

use App\Models\User;
use App\Services\MailService;
use App\Services\VerificationCodeGenerateService;
use Carbon\Carbon;
use Illuminate\Support\Facades\Storage;

class UserRepository{

    protected $mailService;


    public function getAll()
    {
        $users = User::all();
        return $users;
    }

    public function getById($id)
    {
        $user = User::find($id);
        return $user;
    }

    public function store($request,$code = null)
    {
        $imageData = $request->image;
        $imageName = null;
        if ($imageData) {
            $image = base64_decode($imageData);
            $imageName = time() . '.jpg'; // Or based on your requirements
            Storage::put('public/images/profile/' . $imageName, $image);
        }

        $user = User::create([
                'name' => $request->name,
                'email' => $request->email,
                'nic' => $request->nic,
                'password' => bcrypt($request->password),
                'verification_code' => $code ? md5($code) : null,
                'expires_at' => now()->addMinutes(15),
                'image' => $imageName,
                'mobile' => $request->mobile,
                'role_id' => $request->role_id,
                'is_active' => 1,
        ]);
        return $user;
        
    }

    public function update($request,$id)
    {
        $imageData = $request->image;
        $imageName = null;
        if ($imageData) {
            $image = base64_decode($imageData);
            $imageName = time() . '.jpg'; // Or based on your requirements
            Storage::put('public/images/profile/' . $imageName, $image);
        }
        $user = User::find($id);
        // dd($id);
        if ($user) {
            $user->name = $request->name;
            $user->password = bcrypt($request->password);
            $user->image  = $imageName;
            $user->mobile  = $request->mobile;
            $user->role_id  = $request->role_id;
            $user->save();
        }
        return $user;
    }

    public function findByValue($email = null, $code = null)
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
    
    public function findByCode($code)
    {
        return User::where('verification_code', md5($code))->first();
    }

    public function VerifyCodeUpdate($user,$code,$verify=false)
    {
        $user->update([
            'email_verified_at' => $verify ? Carbon::now() : null,
            'verification_code' => $verify ? null : md5($code), 
            'expires_at' => $verify ? null : now()->addMinutes(15)
        ]);
    }

    public function delete($id)
    {
        $user = User::find($id);
        if(!$user) return null;
        $user->delete();
        return $user;
    }
}