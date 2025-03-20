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

        if ($imageData) {
            $imageName = $this->storeImage($imageData);
        }

        if (auth()->user() && auth()->user()->role_id == 1) {
            $is_active = 1;
        } else {
            $is_active = 0;
        }

        $userData = [
            'name' => $request->name,
            'email' => $request->email,
            'nic' => $request->nic,
            'password' => bcrypt($request->password),
            'verification_code' => $code ? md5($code) : null,
            'expires_at' => now()->addMinutes(15),
            'mobile' => $request->mobile,
            'role_id' => $request->role_id,
            'is_active' => $is_active,
        ];
        
        if ($imageName) {
            $userData['image'] = $imageName;
        }
        
        $user = User::create($userData);
        return $user;
        
    }

    public function storeImage($imageData){
        if (preg_match('/^data:image\/(\w+);base64,/', $imageData, $type)) {
            $imageData = substr($imageData, strpos($imageData, ',') + 1);
            $type = strtolower($type[1]); // jpg, png, gif
    
            if (!in_array($type, ['jpg', 'jpeg', 'png', 'gif'])) {
                throw new \Exception('Invalid image type');
            }
    
            $image = base64_decode($imageData);
            if ($image === false) {
                throw new \Exception('Base64 decode failed');
            }
    
            $imageName = time() . '.' . $type;
            $path = 'public/images/profile/' . $imageName;
    
            if (!Storage::put($path, $image)) {
                throw new \Exception('Failed to save image');
            }
            return $imageName;
        } else {
            throw new \Exception('Invalid base64 image data');
        }
    }

    public function update($request,$id)
    {
        $imageData = $request->image;
        if ($imageData) {
            $imageName = $this->storeImage($imageData);
        }
        $user = User::find($id);
        
        if ($user) {
            $user->name = $request->name;
            $user->password = bcrypt($request->password);
            $user->mobile  = $request->mobile;
            $user->role_id  = $request->role_id;
        }
        if($imageName) {
            $user->image  = $imageName;
        }

        $user->save();

        return $user;
    }

    public function findByValue($email = null)
    {
        $query = User::query();
        if ($email) {
            $query->where('email', $email);
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


    public function userApproval($id)
    {
        $data = User::find($id);
        $data->is_active = 1;
        $data->save();
        return $data;
    }
}