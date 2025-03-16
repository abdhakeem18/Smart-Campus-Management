<?php 
namespace App\Repository;

use App\Models\Role;

class RoleRepository{

    public function getAll()
    {
        $data = Role::all();
        return $data;
    }

    public function store($request)
    {
        $data = new Role;
        $data->name = $request->name;
        $data->save();
        return $data;
    }
    
}