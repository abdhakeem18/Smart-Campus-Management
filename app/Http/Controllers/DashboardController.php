<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Api\BaseController;
use App\Models\Course;
use App\Models\Schedule;
use App\Models\Subject;
use App\Models\User;
use Carbon\Carbon;
use Faker\Provider\Base;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class DashboardController extends BaseController
{
   public function index()
   {

      $startOfMonth = Carbon::now()->startOfMonth();
      $endOfMonth = Carbon::now()->endOfMonth();
      $subjectCourseIds = Subject::where('lecturer_id', auth()->id()) // Filter subjects by auth user
      ->distinct()
      ->pluck('course_id'); // Get unique course IDs
      $coursecount = Course::whereIn('id', $subjectCourseIds)->count(); // Count matching courses
      $staffCount = User::where('role_id', 2)->count(); 
      $studentcount = User::where('role_id', 3)->count();
      $subjectcount = Subject::count(); 
      $schedulecount = auth()->user()->role_id == 1 ? Schedule::count() : Schedule::where('user_id', auth()->id())->count(); 
      $startOfMonth = Carbon::now()->startOfMonth()->startOfDay(); // "2024-05-01 00:00:00"
      $endOfMonth = Carbon::now()->endOfMonth()->endOfDay();       // "2024-05-31 23:59:59"
      
      // Fetch schedule counts grouped by day
      $scheduleschart = Schedule::select(
              DB::raw("DATE_FORMAT(date, '%m-%d') as label"), 
              DB::raw('COUNT(*) as count')
          )
          ->whereDate('date', '>=', $startOfMonth->toDateString()) // Compare the date part
          ->whereDate('date', '<=', $endOfMonth->toDateString()) // Ensures full date range
         
          ->groupBy('label')
          ->orderBy('label')
          ->get();
      



     return $this->sendSuccess([
         'coursecount' => $coursecount,
         'staffCount' => $staffCount,
         'studentcount' => $studentcount,
         'subjectcount' => $subjectcount,
         'schedulecount' => $schedulecount,
         'chart' => $scheduleschart
     ],200);
   }
}
