<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Course extends Model
{
    use HasFactory;
    protected $fillable = [
        'course_name',
        'course_code',
        'description',
        'credits',
        'start_date',
        'end_date',
        'status',
       
    ];

    public function subjects(){
        return $this->hasMany(Subject::class, 'course_id', 'id');
    }
}
