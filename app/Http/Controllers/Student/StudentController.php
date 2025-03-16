<?php

namespace App\Http\Controllers\Student;

use App\Http\Controllers\Api\BaseController;
use App\Models\Student;
use App\Http\Requests\StoreStudentRequest;
use App\Http\Requests\UpdateStudentRequest;
use App\Repository\StudentRepository;
use App\Services\StudentService;

class StudentController extends BaseController
{
    /**
     * Display a listing of the resource.
     */

    protected $service;
    protected $repository;

    public function __construct(StudentService $service,StudentRepository $repository)
    {
        $this->repository = $repository;
        $this->service = $service;
    }


    public function index()
    {
        //
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
    public function store(StoreStudentRequest $request)
    {
        $result = $this->repository->store($request);
        return  $this->sendSuccess($result,'Student Created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Student $student)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Student $student)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateStudentRequest $request, Student $student)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Student $student)
    {
        //
    }
}
