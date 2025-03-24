<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Api\BaseController;
use App\Models\Attandance;
use App\Http\Requests\StoreAttandanceRequest;
use App\Http\Requests\UpdateAttandanceRequest;
use App\Repository\AttendanceRepository;
use App\Services\AttendanceService;

class AttandanceController extends BaseController
{
    /**
     * Display a listing of the resource.
     */
    protected $service;
    protected $repository;

    public function __construct(AttendanceService $service,AttendanceRepository $repository)
    {
        $this->repository = $repository;
        $this->service = $service;
    }

    public function index()
    {
        $result = $this->repository->getAll();
        return $this->sendSuccess($result, 'Successfully Fetched Rocords.');

    }

    public function getByStudentId($studentId)
    {
   
        $result = $this->repository->getPercentage($studentId);
        return $this->sendSuccess($result, 'Successfully Fetched Rocords.');

    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreAttandanceRequest $request)
    {
        $result=$this->repository->store($request);
        return  $this->sendSuccess($result,'Bock Created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Attandance $attandance)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Attandance $attandance)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateAttandanceRequest $request, Attandance $attandance)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Attandance $attandance)
    {
        //
    }
}
