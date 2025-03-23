<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Api\BaseController;
use App\Models\Course;
use App\Models\Schedule;
use App\Models\Subject;
use App\Models\User;
use Faker\Provider\Base;
use Illuminate\Http\Request;

class DashboardController extends BaseController
{
   public function index()
   {
       $coursecount = Course::count(); 
       $staffCount = User::where('role_id', 2)->count(); 
       $studentcount = User::where('role_id', 3)->count();
       $subjectcount = Subject::count(); 
       $schedulecount = Schedule::count(); 

     return $this->sendSuccess([
         'coursecount' => $coursecount,
         'staffCount' => $staffCount,
         'studentcount' => $studentcount,
         'subjectcount' => $subjectcount,
         'schedulecount' => $schedulecount,
     ],200);
   }
}
