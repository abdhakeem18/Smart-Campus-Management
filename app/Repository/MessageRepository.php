<?php 
namespace App\Repository;

use App\Models\Block;
use App\Models\Course;
use App\Models\Message;
use App\Models\MessageStatus;
use Carbon\Carbon;

class MessageRepository{

    protected $mailService;

    public function getAll()
    {
        $data = Message::orderBy('id', 'desc')->get();
        return $data;
    }

    public function update($id)
    {
        $data = MessageStatus::updateOrCreate(
            [
                'user_id' => auth()->id(),
                'message_id' => $id,
            ],
            [
                'status' => 1 // If found, update the status; otherwise, create a new record
            ]   
        );
        
        return $data;
    }
    
}