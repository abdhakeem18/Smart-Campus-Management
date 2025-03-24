<?php 
namespace App\Repository;

use App\Models\Block;
use App\Models\Course;
use App\Models\Message;
use App\Models\Schedule;
use Carbon\Carbon;

class ScheduleRepository{

    protected $mailService;

    public function getAll()
    {
        if(auth()->user()->role_id == 1){
            $data = Schedule::all();
        }else{
            $data = Schedule::where('user_id', auth()->user()->id)->get();
        }
        return $data;
    }

    public function store($request)
    {
        $data = new Schedule();
        $data->title = $request->title;
        $data->description = $request->description;
        $data->date = Carbon::parse($request->date)->format('Y-m-d') ;
        $data->start_time = Carbon::parse($request->start_time)->format('H:i:s') ;
        $data->end_time = Carbon::parse($request->end_time)->format('H:i:s') ;
        $data->status = auth()->user()->role_id == 1 ? 1 : 0;
        $data->type = $request->type;
        $data->user_id = $request->user_id;
        $data->course_id = $request->course_id;
        $data->subject_id = $request->subject_id;
        $data->block_id = $request->block_id;
        $data->location = $request->location;
        $data->equipment_id = $request->equipment_id;
        $data->save();

        $message = new Message();
        $message->schedule_id = $data->id;   
        $message->message = $data->description;   
        $message->save();
        
        return $data;
    }

    public function checkExist($request, $schedule = null)
    {
        $data = Schedule::query(); // Missing semicolon fixed

        if ($schedule) {
            $data->where('id', '!=', $schedule->id);
        }

        $data->where('date', $request->date)
            ->where('block_id', $request->block_id)
            ->where(function ($query) use ($request) {
                $query->whereBetween('start_time', [
                    Carbon::parse($request->start_time)->format('H:i:s'),
                    Carbon::parse($request->end_time)->format('H:i:s')
                ])
                ->orWhereBetween('end_time', [
                    Carbon::parse($request->start_time)->format('H:i:s'),
                    Carbon::parse($request->end_time)->format('H:i:s')
                ])
                ->orWhere(function ($query) use ($request) {
                    $query->where('start_time', '<=', Carbon::parse($request->start_time)->format('H:i:s'))
                        ->where('end_time', '>=', Carbon::parse($request->end_time)->format('H:i:s'));
                });
            });

        return $data->count(); // Ensure count() result is returned
    }


    public function update($id)
    {
        $data = Schedule::find($id);
        $data->status = 1;
        $data->save();
        return $data;
    }


    public function updateSchedule($id,$request)
    {
        $data = Schedule::find($id);
        $data->title = $request->title;
        $data->description = $request->description;
        $data->date = Carbon::parse($request->date)->format('Y-m-d') ;
        $data->start_time = Carbon::parse($request->start_time)->format('H:i:s') ;
        $data->end_time = Carbon::parse($request->end_time)->format('H:i:s') ;
        $data->status = auth()->user()->role_id == 1 ? 1 : 0;
        $data->save();

        $message = new Message();
        $message->schedule_id = $data->id;   
        $message->message = $data->description;   
        $message->save();
        
        return $data;
    }

    
}