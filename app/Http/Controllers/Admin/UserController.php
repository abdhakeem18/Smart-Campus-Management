<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Api\BaseController;
use App\Http\Controllers\Controller;
use App\Http\Requests\RegisterRequest;
use App\Repository\UserRepository;
use App\Services\UserService;
use Illuminate\Http\Request;

class UserController extends BaseController
{
    /**
     * Display a listing of the resource.
     */
    protected $userService;
    protected $userRepository;

    public function __construct(UserService $userService,UserRepository $userRepository)
    {
        $this->userService = $userService; 
        $this->userRepository = $userRepository;

    }

    public function index()
    {
        $result = $this->userRepository->getAllUsers();
        return $this->sendSuccess($result, 'successfully Fetched Users.');
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
       
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(RegisterRequest $request)
    {
        $result = $this->userRepository->createUser($request);
        return $this->sendSuccess($result, 'User created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $result = $this->userRepository->getUserById($id);
        return $this->sendSuccess($result, 'successfully Fetched Users.');
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request,$id)
    {
        $result = $this->userRepository->updateUser($request, $id);
        return $this->sendSuccess($result, 'User Updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $result = $this->userRepository->deleteUser($id);
        return $this->sendSuccess($result, 'User Deleted successfully.');
    }
}
