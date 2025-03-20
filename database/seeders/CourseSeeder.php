<?php

namespace Database\Seeders;

use App\Models\Course;
use Carbon\Carbon;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CourseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Course::insert([
            [
                'course_name' => 'Computer Science Fundamentals',
                'course_code' => 'CS101',
                'description' => 'Introduction to computer science and programming concepts.',
                'credits' => 3,
                'start_date' => Carbon::parse('2025-04-01'),
                'end_date' => Carbon::parse('2025-07-01'),
                'status' => 1,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'course_name' => 'Data Structures and Algorithms',
                'course_code' => 'CS201',
                'description' => 'Covers fundamental data structures and algorithm design.',
                'credits' => 4,
                'start_date' => Carbon::parse('2025-04-01'),
                'end_date' => Carbon::parse('2025-07-01'),
                'status' => 1,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'course_name' => 'Database Management Systems',
                'course_code' => 'CS301',
                'description' => 'Introduction to relational databases and SQL.',
                'credits' => 3,
                'start_date' => Carbon::parse('2025-04-01'),
                'end_date' => Carbon::parse('2025-07-01'),
                'status' => 1,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ]
        ]);
    }
}
