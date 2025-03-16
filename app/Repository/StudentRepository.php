<?php 
namespace App\Repository;

use App\Models\Course;
use App\Models\Student;
use App\Models\Subject;
use Carbon\Carbon;
use Illuminate\Support\Facades\Storage;

class StudentRepository {

    protected $mailService;

    public function getAll()
    {
        $data = Subject::all();
        return $data;
    }

    public function store($request)
    {
        $register_new_num = "000001";
        $register_num = $this->getCount() == 0 ? $register_new_num : $this->getNewNumber();
        if ($request->nic_document) {
            $nic_image = base64_decode($request->nic_document);
            $nicName = time() . '.jpg';
            Storage::put('public/images/student/nic/' . $nicName, $nic_image);
        }

        if ($request->document) {
            $document = base64_decode($request->document);
            $documentName = time() . '.pdf';
            Storage::put('public/images/student/documnet/' . $documentName, $document);
        }

        $data = new Student();
        $data->user_id = $request->user_id;
        $data->register_num = $register_num;
        $data->user_id = $request->user_id;
        $data->course_id = $request->course_id;
        $data->nic_document = $nicName;
        $data->document = $documentName;
        $data->save();
        $data->register_num = "SC".$register_num;
        return $data;
    }

    public function getCount()
    {
        $data = Student::count();
        return $data;
    }

    public function getNewNumber()
    {

        $lastRecord = Student::latest('id')->first();
        $lastNumber = $lastRecord ? intval($lastRecord->id) : 0;
        $newNumber = $lastNumber + 1;
        $length = max(strlen($newNumber), 6);
    
        return str_pad($newNumber, $length, '0', STR_PAD_LEFT);
    }

}