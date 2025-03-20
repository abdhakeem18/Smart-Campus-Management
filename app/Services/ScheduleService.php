<?php

namespace App\Services;

use App\Repository\CourseRepository;
use App\Repository\ScheduleRepository;
use App\Services\Api\BaseService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class ScheduleService extends BaseService{

    protected $repository;

    public function __construct(ScheduleRepository $repository)
    {
        $this->repository = $repository;
    }

    public function getFullDetails(){
        return $this->repository->getAll()->load(['course','user','subject','block']);
    }

    public function saveSchedule(Request $request){
        $exit = $this->repository->checkExist($request);
        if($exit > 0){
           return false;
        }
        return $this->repository->store($request);
    }

  

}