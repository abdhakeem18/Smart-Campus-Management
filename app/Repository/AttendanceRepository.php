<?php 
namespace App\Repository;

use App\Models\Attandance;
use App\Models\Block;
use App\Models\Course;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;

class AttendanceRepository{

    protected $mailService;

    public function getAll()
    {
        $data = Attandance::select(
            'user_id',
            'subject_id',
            DB::raw('COUNT(*) as total_classes'),
            DB::raw('SUM(status) as attended_classes'),
            DB::raw('(SUM(status) / COUNT(*)) * 100 as attendance_percentage')
        )
        ->groupBy('user_id', 'subject_id')
        ->get();

    return response()->json($data);
    }

    public function store($request)
    {
        $data = [];
        foreach ($request->attendances as $attendance) {
            $data[] = Attandance::create($attendance);
        }   
        return $data;
    }

    public function getPercentage($student_id)
    {
        $total_classes = Attandance::where('user_id', $student_id)->count();
        $attended_classes = Attandance::where('user_id', $student_id)->where('status', true)->count();
    
        $percentage = $total_classes > 0 ? ($attended_classes / $total_classes) * 100 : 0;

        return $percentage;
    }
   
    
}