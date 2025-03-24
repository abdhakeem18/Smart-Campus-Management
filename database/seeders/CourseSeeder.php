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
                'course_code' => 'CS102',
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
                'course_code' => 'CS303',
                'description' => 'Introduction to relational databases and SQL.',
                'credits' => 3,
                'start_date' => Carbon::parse('2025-04-01'),
                'end_date' => Carbon::parse('2025-07-01'),
                'status' => 1,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'course_name' => 'Operating Systems',
                'course_code' => 'MATH101',
                'description' => 'Fundamentals of operating systems, process management, and memory management.',
                'credits' => 4,
                'start_date' => Carbon::parse('2025-04-01'),
                'end_date' => Carbon::parse('2025-07-01'),
                'status' => 1,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'course_name' => 'Computer Networks',
                'course_code' => 'CS302',
                'description' => 'Introduction to networking principles and protocols.',
                'credits' => 3,
                'start_date' => Carbon::parse('2025-04-01'),
                'end_date' => Carbon::parse('2025-07-01'),
                'status' => 1,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'course_name' => 'Artificial Intelligence',
                'course_code' => 'MATH102',
                'description' => 'Foundations of artificial intelligence, including machine learning.',
                'credits' => 3,
                'start_date' => Carbon::parse('2025-04-01'),
                'end_date' => Carbon::parse('2025-07-01'),
                'status' => 1,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'course_name' => 'Cybersecurity',
                'course_code' => 'CS101',
                'description' => 'Principles of cybersecurity and ethical hacking.',
                'credits' => 3,
                'start_date' => Carbon::parse('2025-04-01'),
                'end_date' => Carbon::parse('2025-07-01'),
                'status' => 1,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'course_name' => 'Software Engineering',
                'course_code' => 'CS301',
                'description' => 'Introduction to software development methodologies and best practices.',
                'credits' => 4,
                'start_date' => Carbon::parse('2025-04-01'),
                'end_date' => Carbon::parse('2025-07-01'),
                'status' => 1,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'course_name' => 'Web Development',
                'course_code' => 'CS202',
                'description' => 'Front-end and back-end web development techniques.',
                'credits' => 3,
                'start_date' => Carbon::parse('2025-04-01'),
                'end_date' => Carbon::parse('2025-07-01'),
                'status' => 1,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'course_name' => 'Engilsh',
                'course_code' => 'ENG102',
                'description' => 'Engilsh techniques.',
                'credits' => 3,
                'start_date' => Carbon::parse('2025-04-01'),
                'end_date' => Carbon::parse('2025-07-01'),
                'status' => 1,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'course_name' => 'BIO',
                'course_code' => 'BIO103',
                'description' => 'BIO techniques.',
                'credits' => 3,
                'start_date' => Carbon::parse('2025-04-01'),
                'end_date' => Carbon::parse('2025-07-01'),
                'status' => 1,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            // Add 11 more courses following the same structure
        ]);
    }
}
