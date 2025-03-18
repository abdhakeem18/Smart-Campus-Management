<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Api\BaseController;
use App\Http\Controllers\Controller;
use App\Http\Requests\RegisterRequest;
use App\Repository\UserRepository;
use App\Services\MailService;
use App\Services\UserService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Crypt;
use Illuminate\Support\Facades\URL;

class UserController extends BaseController
{
    /**
     * Display a listing of the resource.
     */
    protected $service;
    protected $repository;

    public function __construct(MailService $service, UserRepository $repository)
    {
        $this->repository = $repository;
        $this->service = $service;
    }

    public function view()
    {
        return view("index");
    }

    public function index()
    {
        $result = $this->repository->getAll();
        return $this->sendSuccess($result, 'successfully Fetched Users.');
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create() {}

    /**
     * Store a newly created resource in storage.
     */
    public function store(RegisterRequest $request)
    {
        $result = $this->repository->store($request);
        $time = now()->addDay(1);
        $dataToEncrypt = $result->email . ',' . $result->id . ',' . $time;
        $encryptedData = Crypt::encryptString($dataToEncrypt);
        $resetPasswordUrl = url('reset-password?token=' . $encryptedData);
        $this->service->sendEmail($resetPasswordUrl, $request->email, 'Reset Password');
        return $this->sendSuccess($result, 'User created successfully.');
    }


    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $result = $this->repository->getById($id);
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
    public function update(Request $request, $id)
    {
        $result = $this->repository->update($request, $id);
        return $this->sendSuccess($result, 'User Updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $result = $this->repository->delete($id);
        if (!$result) {
            return $this->sendError('User Not Found ..', 500, ["error" => null]);
        }
        return $this->sendSuccess($result, 'User Deleted successfully.');
    }
}
