<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Api\BaseController;
use App\Models\Schedule;
use App\Http\Requests\StoreScheduleRequest;
use App\Http\Requests\UpdateScheduleRequest;
use App\Repository\ScheduleRepository;
use App\Services\ScheduleService;

class ScheduleController extends BaseController
{
    /**
     * Display a listing of the resource.
     */
    protected $service;
    protected $repository;

    public function __construct(ScheduleService $service,ScheduleRepository $repository)
    {
        $this->repository = $repository;
        $this->service = $service;
    }

    public function index()
    {
        $result = $this->service->getFullDetails();
        return $this->sendSuccess($result, 'successfully Fetched Schedules.');
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
    public function store(StoreScheduleRequest $request)
    {
        $result=$this->service->saveSchedule($request);
        if(!$result){
            return $this->sendError('Schedule Time Slot Already Booked', 500, ["error" => $request->all()]);
        }
        return  $this->sendSuccess($result,'Schedule Created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Schedule $schedule)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Schedule $schedule)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateScheduleRequest $request, Schedule $schedule)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Schedule $schedule)
    {
        //
    }

    public function approval($id)
    {
        $result=$this->repository->update($id);
        return  $this->sendSuccess($result,'Schedule Approved successfully.');

    }
}
