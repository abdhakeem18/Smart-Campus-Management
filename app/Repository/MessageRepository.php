<?php 
namespace App\Repository;

use App\Models\Block;
use App\Models\Course;
use App\Models\Message;
use Carbon\Carbon;

class MessageRepository{

    protected $mailService;

    public function getAll()
    {
        $data = Message::orderBy('id', 'desc')->get();
        return $data;
    }

    // public function store($request)
    // {
    //     $data = new Block();
    //     $data->name = $request->name;
    //     $data->save();
    //     return $data;
    // }
    
}