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
       $lecturer3 = DB::table('users')->where('role_id', 2)->skip(2)->first(); // Get third lecturer
       $lecturer4 = DB::table('users')->where('role_id', 2)->skip(3)->first(); // Get fourth lecturer
       
       $course1 = DB::table('courses')->where('course_code', 'CS101')->first();
       $course2 = DB::table('courses')->where('course_code', 'CS201')->first();
       $course3 = DB::table('courses')->where('course_code', 'CS301')->first();
       $course4 = DB::table('courses')->where('course_code', 'CS401')->first();
       $course5 = DB::table('courses')->where('course_code', 'MATH101')->first();
       
       DB::table('subjects')->insert([
           [
               'subject_name' => 'Introduction to Programming',
               'subject_code' => 'CS101-PROG',
               'lecturer_id' => $lecturer1->id ?? 1,
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
               'course_id' => $course3->id ?? 1,
               'created_at' => Carbon::now(),
               'updated_at' => Carbon::now(),
           ],
           [
               'subject_name' => 'Computer Networks',
               'subject_code' => 'CS401-NET',
               'lecturer_id' => $lecturer3->id ?? 1,
               'course_id' => $course4->id ?? 1,
               'created_at' => Carbon::now(),
               'updated_at' => Carbon::now(),
           ],
           [
               'subject_name' => 'Discrete Mathematics',
               'subject_code' => 'MATH101-DM',
               'lecturer_id' => $lecturer4->id ?? 1,
               'course_id' => $course5->id ?? 1,
               'created_at' => Carbon::now(),
               'updated_at' => Carbon::now(),
           ],
           [
               'subject_name' => 'Object-Oriented Programming',
               'subject_code' => 'CS102-OOP',
               'lecturer_id' => $lecturer2->id ?? 1,
               'course_id' => $course1->id ?? 1,
               'created_at' => Carbon::now(),
               'updated_at' => Carbon::now(),
           ],
           [
               'subject_name' => 'Data Structures',
               'subject_code' => 'CS202-DS',
               'lecturer_id' => $lecturer1->id ?? 1,
               'course_id' => $course2->id ?? 1,
               'created_at' => Carbon::now(),
               'updated_at' => Carbon::now(),
           ],
           [
               'subject_name' => 'Operating Systems',
               'subject_code' => 'CS302-OS',
               'lecturer_id' => $lecturer3->id ?? 1,
               'course_id' => $course3->id ?? 1,
               'created_at' => Carbon::now(),
               'updated_at' => Carbon::now(),
           ],
           [
               'subject_name' => 'Artificial Intelligence',
               'subject_code' => 'CS402-AI',
               'lecturer_id' => $lecturer4->id ?? 1,
               'course_id' => $course4->id ?? 1,
               'created_at' => Carbon::now(),
               'updated_at' => Carbon::now(),
           ],
           [
               'subject_name' => 'Calculus I',
               'subject_code' => 'MATH102-CAL1',
               'lecturer_id' => $lecturer2->id ?? 1,
               'course_id' => $course5->id ?? 1,
               'created_at' => Carbon::now(),
               'updated_at' => Carbon::now(),
           ],
           [
               'subject_name' => 'Web Development',
               'subject_code' => 'CS103-WEB',
               'lecturer_id' => $lecturer1->id ?? 1,
               'course_id' => $course1->id ?? 1,
               'created_at' => Carbon::now(),
               'updated_at' => Carbon::now(),
           ],
           [
               'subject_name' => 'Computer Architecture',
               'subject_code' => 'CS203-ARCH',
               'lecturer_id' => $lecturer3->id ?? 1,
               'course_id' => $course2->id ?? 1,
               'created_at' => Carbon::now(),
               'updated_at' => Carbon::now(),
           ],
           [
               'subject_name' => 'Software Engineering',
               'subject_code' => 'CS303-SE',
               'lecturer_id' => $lecturer2->id ?? 1,
               'course_id' => $course3->id ?? 1,
               'created_at' => Carbon::now(),
               'updated_at' => Carbon::now(),
           ],
           [
               'subject_name' => 'Machine Learning',
               'subject_code' => 'CS403-ML',
               'lecturer_id' => $lecturer1->id ?? 1,
               'course_id' => $course4->id ?? 1,
               'created_at' => Carbon::now(),
               'updated_at' => Carbon::now(),
           ],
           [
               'subject_name' => 'Linear Algebra',
               'subject_code' => 'MATH103-LA',
               'lecturer_id' => $lecturer4->id ?? 1,
               'course_id' => $course5->id ?? 1,
               'created_at' => Carbon::now(),
               'updated_at' => Carbon::now(),
           ],
           [
               'subject_name' => 'Mobile App Development',
               'subject_code' => 'CS104-MOB',
               'lecturer_id' => $lecturer3->id ?? 1,
               'course_id' => $course1->id ?? 1,
               'created_at' => Carbon::now(),
               'updated_at' => Carbon::now(),
           ],
           [
               'subject_name' => 'Computer Graphics',
               'subject_code' => 'CS204-CG',
               'lecturer_id' => $lecturer2->id ?? 1,
               'course_id' => $course2->id ?? 1,
               'created_at' => Carbon::now(),
               'updated_at' => Carbon::now(),
           ],
           [
               'subject_name' => 'Cybersecurity Fundamentals',
               'subject_code' => 'CS304-CYB',
               'lecturer_id' => $lecturer1->id ?? 1,
               'course_id' => $course3->id ?? 1,
               'created_at' => Carbon::now(),
               'updated_at' => Carbon::now(),
           ],
           [
               'subject_name' => 'Cloud Computing',
               'subject_code' => 'CS404-CLOUD',
               'lecturer_id' => $lecturer4->id ?? 1,
               'course_id' => $course4->id ?? 1,
               'created_at' => Carbon::now(),
               'updated_at' => Carbon::now(),
           ],
           [
               'subject_name' => 'Probability and Statistics',
               'subject_code' => 'MATH104-PS',
               'lecturer_id' => $lecturer3->id ?? 1,
               'course_id' => $course5->id ?? 1,
               'created_at' => Carbon::now(),
               'updated_at' => Carbon::now(),
           ]
       ]);
    }
}
