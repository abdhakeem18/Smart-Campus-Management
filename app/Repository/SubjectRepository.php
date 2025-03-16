<?php 
namespace App\Repository;

use App\Models\Course;
use App\Models\Subject;
use Carbon\Carbon;

class SubjectRepository{

    protected $mailService;

    public function getAll()
    {
        $data = Subject::all();
        return $data;
    }

    public function store($request)
    {
        $data = new Subject;
        $data->subject_name = $request->subject_name;
        $data->subject_code = $request->subject_code;
        $data->lecturer_id = $request->lecturer_id;
        $data->course_id = $request->course_id;
        $data->save();
        return $data;
    }
    
}