<?php 
namespace App\Repository;

use App\Models\Course;
use Carbon\Carbon;

class CourseRepository{

    protected $mailService;

    public function getAll()
    {
        $data = Course::all();
        return $data;
    }

    public function store($request)
    {
        $data = new Course;
        $data->course_name = $request->course_name;
        $data->course_code = $request->course_code;
        $data->description = $request->description;
        $data->credits = $request->credits;
        $data->start_date = Carbon::parse($request->start_date)->format('Y-m-d') ;
        $data->end_date = Carbon::parse($request->end_date)->format('Y-m-d') ;
        $data->status = $request->status;
        $data->save();
        return $data;
    }
    
}