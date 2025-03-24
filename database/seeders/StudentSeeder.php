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
        $students = DB::table('users')->where('role_id', 3)->take(20)->get(); // Get 20 students
        $courses = DB::table('courses')->whereIn('course_code', ['CS101', 'CS201', 'CS301', 'CS401', 'MATH101', 'PHYS201', 'ENG101', 'BIO101'])->get();
        
        DB::table('students')->insert([
            [
                'register_num' => 'REG2025001',
                'user_id' => $students[0]->id ?? 1,
                'course_id' => $courses->where('course_code', 'CS101')->first()->id ?? 1,
                'nic_document' => 'nic_student1.pdf',
                'document' => 'student1_docs.pdf',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'register_num' => 'REG2025002',
                'user_id' => $students[1]->id ?? 1,
                'course_id' => $courses->where('course_code', 'CS201')->first()->id ?? 1,
                'nic_document' => 'nic_student2.pdf',
                'document' => 'student2_docs.pdf',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'register_num' => 'REG2025003',
                'user_id' => $students[2]->id ?? 1,
                'course_id' => $courses->where('course_code', 'CS301')->first()->id ?? 1,
                'nic_document' => 'nic_student3.pdf',
                'document' => 'student3_docs.pdf',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'register_num' => 'REG2025004',
                'user_id' => $students[3]->id ?? 1,
                'course_id' => $courses->where('course_code', 'CS401')->first()->id ?? 1,
                'nic_document' => 'nic_student4.pdf',
                'document' => 'student4_docs.pdf',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'register_num' => 'REG2025005',
                'user_id' => $students[4]->id ?? 1,
                'course_id' => $courses->where('course_code', 'MATH101')->first()->id ?? 1,
                'nic_document' => 'nic_student5.pdf',
                'document' => 'student5_docs.pdf',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'register_num' => 'REG2025006',
                'user_id' => $students[5]->id ?? 1,
                'course_id' => $courses->where('course_code', 'PHYS201')->first()->id ?? 1,
                'nic_document' => 'nic_student6.pdf',
                'document' => 'student6_docs.pdf',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'register_num' => 'REG2025007',
                'user_id' => $students[6]->id ?? 1,
                'course_id' => $courses->where('course_code', 'ENG101')->first()->id ?? 1,
                'nic_document' => 'nic_student7.pdf',
                'document' => 'student7_docs.pdf',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'register_num' => 'REG2025008',
                'user_id' => $students[7]->id ?? 1,
                'course_id' => $courses->where('course_code', 'BIO101')->first()->id ?? 1,
                'nic_document' => 'nic_student8.pdf',
                'document' => 'student8_docs.pdf',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'register_num' => 'REG2025009',
                'user_id' => $students[8]->id ?? 1,
                'course_id' => $courses->where('course_code', 'CS101')->first()->id ?? 1,
                'nic_document' => 'nic_student9.pdf',
                'document' => 'student9_docs.pdf',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'register_num' => 'REG2025010',
                'user_id' => $students[9]->id ?? 1,
                'course_id' => $courses->where('course_code', 'CS201')->first()->id ?? 1,
                'nic_document' => 'nic_student10.pdf',
                'document' => 'student10_docs.pdf',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'register_num' => 'REG2025011',
                'user_id' => $students[10]->id ?? 1,
                'course_id' => $courses->where('course_code', 'CS301')->first()->id ?? 1,
                'nic_document' => 'nic_student11.pdf',
                'document' => 'student11_docs.pdf',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'register_num' => 'REG2025012',
                'user_id' => $students[11]->id ?? 1,
                'course_id' => $courses->where('course_code', 'CS401')->first()->id ?? 1,
                'nic_document' => 'nic_student12.pdf',
                'document' => 'student12_docs.pdf',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'register_num' => 'REG2025013',
                'user_id' => $students[12]->id ?? 1,
                'course_id' => $courses->where('course_code', 'MATH101')->first()->id ?? 1,
                'nic_document' => 'nic_student13.pdf',
                'document' => 'student13_docs.pdf',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'register_num' => 'REG2025014',
                'user_id' => $students[13]->id ?? 1,
                'course_id' => $courses->where('course_code', 'PHYS201')->first()->id ?? 1,
                'nic_document' => 'nic_student14.pdf',
                'document' => 'student14_docs.pdf',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'register_num' => 'REG2025015',
                'user_id' => $students[14]->id ?? 1,
                'course_id' => $courses->where('course_code', 'ENG101')->first()->id ?? 1,
                'nic_document' => 'nic_student15.pdf',
                'document' => 'student15_docs.pdf',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'register_num' => 'REG2025016',
                'user_id' => $students[15]->id ?? 1,
                'course_id' => $courses->where('course_code', 'BIO101')->first()->id ?? 1,
                'nic_document' => 'nic_student16.pdf',
                'document' => 'student16_docs.pdf',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'register_num' => 'REG2025017',
                'user_id' => $students[16]->id ?? 1,
                'course_id' => $courses->where('course_code', 'CS101')->first()->id ?? 1,
                'nic_document' => 'nic_student17.pdf',
                'document' => 'student17_docs.pdf',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'register_num' => 'REG2025018',
                'user_id' => $students[17]->id ?? 1,
                'course_id' => $courses->where('course_code', 'CS201')->first()->id ?? 1,
                'nic_document' => 'nic_student18.pdf',
                'document' => 'student18_docs.pdf',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'register_num' => 'REG2025019',
                'user_id' => $students[18]->id ?? 1,
                'course_id' => $courses->where('course_code', 'CS301')->first()->id ?? 1,
                'nic_document' => 'nic_student19.pdf',
                'document' => 'student19_docs.pdf',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'register_num' => 'REG2025020',
                'user_id' => $students[19]->id ?? 1,
                'course_id' => $courses->where('course_code', 'CS401')->first()->id ?? 1,
                'nic_document' => 'nic_student20.pdf',
                'document' => 'student20_docs.pdf',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ]
        ]);
    }
}
