<?php

use App\Http\Controllers\Admin\BlockController;
use App\Http\Controllers\Admin\RoleController;
use App\Http\Controllers\Admin\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\Admin\CourseController;
use App\Http\Controllers\Admin\SubjectController;
use App\Http\Controllers\Admin\ScheduleController;
use App\Http\Controllers\Student\StudentController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});



Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::resource('/roles', RoleController::class);
Route::post('/reset-password/{token}', [AuthController::class,'resetPassword']);
Route::post('/verify', [AuthController::class, 'verify']);
Route::post('/forget-password', [AuthController::class, 'forgetPassword']);
Route::post('/resend/verify', [AuthController::class, 'resendVerificationCode']);
Route::get('/courses', [CourseController::class,'index']);
Route::get('/student/{id}/courses', [StudentController::class,'courses']);


Route::prefix('student')->middleware(['auth:sanctum','is_user'])->group(function () {
    Route::post('/verify', [AuthController::class, 'verify']);
    Route::post('/resend/verify', [AuthController::class, 'resendVerificationCode']);
    Route::post('/course-registration', [StudentController::class, 'store']);
});

Route::prefix('staff')->middleware(['auth:sanctum', 'is_staff'])->group(function () {
    Route::post('/verify', [AuthController::class, 'verify']);
    Route::post('/resend/verify', [AuthController::class, 'resendVerificationCode']);
});

Route::prefix('staff')->middleware(['auth:sanctum', 'verified', 'is_staff'])->group(function () {
    Route::resource('schedules', ScheduleController::class);

});

Route::prefix('admin')->middleware(['auth:sanctum', 'verified', 'is_admin'])->group(function () {
    Route::resource('users', UserController::class);
    Route::resource('courses', CourseController::class);
    Route::resource('subjects', SubjectController::class);
    Route::resource('blocks', BlockController::class);
    Route::resource('schedules', ScheduleController::class);
    Route::put('/user/approval/{id}', [UserController::class, 'approval']);
    Route::put('/schecdule/approval/{id}', [ScheduleController::class, 'approval']);
});