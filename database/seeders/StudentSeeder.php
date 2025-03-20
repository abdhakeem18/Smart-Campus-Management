<?php

namespace Database\Seeders;

use Carbon\Carbon;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class StudentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $student1 = DB::table('users')->where('role_id', 3)->first(); // Assuming role_id 3 = Student
        $student2 = DB::table('users')->where('role_id', 3)->skip(1)->first(); // Get second student
        $course1 = DB::table('courses')->where('course_code', 'CS101')->first();
        $course2 = DB::table('courses')->where('course_code', 'CS201')->first();

        DB::table('students')->insert([
            [
                'register_num' => 'REG2025001',
                'user_id' => $student1->id ?? 1, // Default to 1 if no student found
                'course_id' => $course1->id ?? 1,
                'nic_document' => 'nic_student1.pdf',
                'document' => 'student1_docs.pdf',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'register_num' => 'REG2025002',
                'user_id' => $student2->id ?? 1,
                'course_id' => $course2->id ?? 1,
                'nic_document' => 'nic_student2.pdf',
                'document' => 'student2_docs.pdf',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ]
        ]);
    }
}
