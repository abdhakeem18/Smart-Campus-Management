<?php

namespace App\Http\Controllers\Student;

use App\Http\Controllers\Api\BaseController;
use App\Models\Message;
use App\Http\Requests\StoreMessageRequest;
use App\Http\Requests\UpdateMessageRequest;
use App\Repository\MessageRepository;
use App\Services\MessageService;

class MessageController extends BaseController
{
    /**
     * Display a listing of the resource.
     */
    protected $service;
    protected $repository;

    public function __construct(MessageService $service,MessageRepository $repository)
    {
        $this->repository = $repository;
        $this->service = $service;
    }

    public function index()
    {
       
        $result = $this->repository->getAll()->load('schedule.course','schedule.user','schedule.subject','schedule.block','message_status');
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
    public function store(StoreMessageRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Message $message)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Message $message)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateMessageRequest $request, $id)
    {
        $result = $this->repository->update($id);
        return $this->sendSuccess($result, 'Successfully Updted Rocords.');

    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Message $message)
    {
        //
    }
}
