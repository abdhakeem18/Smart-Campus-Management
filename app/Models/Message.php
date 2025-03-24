<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Message extends Model
{
    use HasFactory;
    protected $fillable = [
        'schedule_id',
        'message'
    ];

    public function message_status(){
        return $this->hasOne(MessageStatus::class, 'message_id','id')->where('user_id', auth()->id());
    }
    public function schedule(){
        return $this->hasOne(Schedule::class, 'id','schedule_id');
    }
}
