<?php

namespace App\Services;

use App\Repository\CourseRepository;
use App\Repository\SubjectRepository;
use Illuminate\Support\Facades\Mail;

class SubjectService {

    protected $repository;

    public function __construct(SubjectRepository $repository)
    {
        $this->repository = $repository;
    }

    public function getFullDetails(){
        return $this->repository->getAll()->load('lecture');
    }

    public function sendEmail($message,$email,$subject){
        Mail::raw($message, function ($message) use ($email,$subject) {
            $message->to($email)
                    ->subject($subject);
        });
    }

}