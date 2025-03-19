<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Student extends Model
{
    use HasFactory;
    protected $fillable = [
        'user_id',
        'register_num',
        'course_id',
        'nic_document',
        'document',
    ];

    public function courses(){
        return $this->hasMany(Course::class, 'id', 'course_id');
    }

    public function users()
    {
        return $this->belongsTo(User::class);
    }

}
