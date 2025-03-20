<?php

namespace App\Services;

use App\Repository\CourseRepository;
use Illuminate\Support\Facades\Mail;

class BlockService {

    protected $repository;

    public function __construct(CourseRepository $repository)
    {
        $this->repository = $repository;
    }

    public function getFullDetails(){
        return $this->repository->getAll()->load(['subjects.lecture']);
    }

    public function sendEmail($message,$email,$subject){
        Mail::raw($message, function ($message) use ($email,$subject) {
            $message->to($email)
                    ->subject($subject);
        });
    }

}