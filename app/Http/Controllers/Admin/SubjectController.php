<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Api\BaseController;
use App\Models\Subject;
use App\Http\Requests\StoreSubjectRequest;
use App\Http\Requests\UpdateSubjectRequest;
use App\Repository\SubjectRepository;
use App\Services\SubjectService;

class SubjectController extends BaseController
{
    /**
     * Display a listing of the resource.
     */

    protected $service;
    protected $repository;

    public function __construct(SubjectService $service,SubjectRepository $repository)
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
        $result = $this->service->getFullDetails();
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
    public function store(StoreSubjectRequest $request)
    {
        $result = $this->repository->store($request);
        return  $this->sendSuccess($result,'Subject Created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Subject $subject)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Subject $subject)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateSubjectRequest $request, Subject $subject)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Subject $subject)
    {
        //
    }
}
