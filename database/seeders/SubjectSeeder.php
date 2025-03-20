<?php

namespace Database\Seeders;

use Carbon\Carbon;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class SubjectSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
       // Fetch existing lecturers and courses
       $lecturer1 = DB::table('users')->where('role_id', 2)->first(); // Assuming role_id 2 = Lecturer
       $lecturer2 = DB::table('users')->where('role_id', 2)->skip(1)->first(); // Get second lecturer
       $course1 = DB::table('courses')->where('course_code', 'CS101')->first();
       $course2 = DB::table('courses')->where('course_code', 'CS201')->first();

       DB::table('subjects')->insert([
           [
               'subject_name' => 'Introduction to Programming',
               'subject_code' => 'CS101-PROG',
               'lecturer_id' => $lecturer1->id ?? 1, // Default to 1 if no lecturer found
               'course_id' => $course1->id ?? 1,
               'created_at' => Carbon::now(),
               'updated_at' => Carbon::now(),
           ],
           [
               'subject_name' => 'Advanced Algorithms',
               'subject_code' => 'CS201-ALG',
               'lecturer_id' => $lecturer2->id ?? 1,
               'course_id' => $course2->id ?? 1,
               'created_at' => Carbon::now(),
               'updated_at' => Carbon::now(),
           ],
           [
               'subject_name' => 'Database Fundamentals',
               'subject_code' => 'CS301-DB',
               'lecturer_id' => $lecturer1->id ?? 1,
               'course_id' => $course1->id ?? 1,
               'created_at' => Carbon::now(),
               'updated_at' => Carbon::now(),
           ]
       ]);
    }
}
