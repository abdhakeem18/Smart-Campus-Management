<?php

namespace Database\Seeders;

use App\Models\User;
use Carbon\Carbon;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::insert([
            [
                'name' => 'Admin',
                'email' => 'admin@gmail.com',
                'nic' => '123456789V',
                'password' => Hash::make('password'),
                'role_id' => 1, // Assuming 1 = Admin
                'mobile' => '0771234567',
                'image' => 'admin.jpg',
                'is_active' => 1,
                'email_verified_at' => Carbon::now(),
                'verification_code' => null,
                'expires_at' => null,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'name' => 'Staff',
                'email' => 'staff@gmail.com',
                'nic' => '987654321V',
                'password' => Hash::make('password'),
                'role_id' => 2, // Assuming 2 = Lecturer
                'mobile' => '0779876543',
                'image' => 'lecturer.jpg',
                'is_active' => 1,
                'email_verified_at' => Carbon::now(),
                'verification_code' => null,
                'expires_at' => null,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'name' => 'Student',
                'email' => 'student@gmail.com',
                'nic' => '112233445V',
                'password' => Hash::make('password'),
                'role_id' => 3, // Assuming 3 = Student
                'mobile' => '0775556667',
                'image' => 'student.jpg',
                'is_active' => 1,
                'email_verified_at' => Carbon::now(),
                'verification_code' => null,
                'expires_at' => null,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ]
        ]);
    }
}
