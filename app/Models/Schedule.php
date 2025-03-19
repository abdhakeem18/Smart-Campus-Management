<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Schedule extends Model
{
    use HasFactory;
    protected $fillable = [
        'title',
        'description',
        'date',
        'time',
        'status',
        'type',
        'user_id',
        'course_id',
        'subject_id',
        'block_id',
    ];


    public function course(){
        return $this->hasOne(Course::class, 'id', 'course_id');
    }

    public function user(){
        return $this->hasOne(User::class, 'id', 'user_id');
    }

    public function subject(){
        return $this->hasOne(Subject::class, 'id', 'subject_id');
    }

    public function block(){
        return $this->hasOne(Block::class, 'id', 'block_id');
    }
}
