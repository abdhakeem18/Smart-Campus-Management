<?php 
namespace App\Repository;

use App\Models\Course;
use App\Models\Student;
use App\Models\Subject;
use Carbon\Carbon;

class CourseRepository{

    protected $mailService;

    public function getAll()
    {

        if(auth()->user()->role_id == 1 ){
            $data = Course::all();
        }elseif(auth()->user()->role_id == 2){
            $subject = Subject::where('lecturer_id', auth()->user()->id)->distinct()->first();
            $data = $subject->courses;
        }else{
            $student = Student::where('user_id', auth()->user()->id)->first();
            $data = $student->courses;
        }
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

    public function update($request,$course)
    {

        $data = Course::find($course->id);
        $data->course_name = $request->course_name ?  $request->course_name : $data->course_name;
        $data->course_code = $request->course_code ?  $request->course_code : $data->course_code;
        $data->description = $request->description ?  $request->description : $data->description;
        $data->credits = $request->credits ?  $request->credits : $data->credits;
        $data->start_date = $request->start_date ?  Carbon::parse($request->start_date)->format('Y-m-d') : $data->start_date;
        $data->end_date = $request->start_date ? Carbon::parse($request->end_date)->format('Y-m-d') : $data->end_date;
        $data->status = $request->status ?  $request->status : $data->status;
        $data->save();
        return $data;
    }
}