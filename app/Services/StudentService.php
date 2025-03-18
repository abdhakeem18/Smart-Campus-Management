<?php

namespace App\Services;

use App\Repository\StudentRepository;
use Illuminate\Support\Facades\Mail;

class StudentService {

    protected $repository;

    public function __construct(StudentRepository $repository)
    {
        $this->repository = $repository;
    }

    public function sendEmail($message,$email,$subject){
        Mail::raw($message, function ($message) use ($email,$subject) {
            $message->to($email)
                    ->subject($subject);
        });
    }

    public function getStudentCourseDetails($id){
        $details = $this->repository->findById($id)->load(['courses.subjects']);
        return $details;
    }

}