<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Subject extends Model
{
    use HasFactory;
    protected $fillable = [
        'subject_name',
        'subject_code',
        'lecturer_id',
        'course_id',
    ];

    public function lecture(){
        return $this->hasOne(User::class,'id','lecturer_id');
    }

    public function courses(){
        return $this->hasMany(Course::class, 'id', 'course_id');
    }
}
