<?php

use App\Http\Controllers\Admin\CourseController;
use App\Http\Controllers\Admin\SubjectController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\EventController;
use App\Http\Controllers\ResourceController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Admin\UserController;
use App\Http\Controllers\AuthController;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/', function () {
    return view('index');
})->name('home');

Route::post('/login', [AuthController::class, 'login'])->name('login');

Route::middleware(['is_user'])->group(function () {
    Route::get('/schedule', [ResourceController::class, 'view'])->name('schedule.view');
});

Route::middleware(['is_staff'])->group(function () {

    Route::get('/dashboard', function () {
        return view('index');
    });
    Route::get('/schedule', [ResourceController::class, 'view'])->name('schedule.view');
});

Route::middleware(['is_admin'])->group(function () {

    Route::get('/dashboard', function () {
        return view('index');
    });
    Route::get('/schedule', [ResourceController::class, 'view'])->name('schedule.view');
    Route::get('/events', [EventController::class, 'view'])->name('event.view');
    Route::get('/users', [UserController::class, 'view'])->name('users.view');
    Route::get('/courses', [CourseController::class, 'view'])->name('course.view');
    Route::get('/subjects', [SubjectController::class, 'view'])->name('subject.view');
    Route::get('/reservations', [ResourceController::class, 'view'])->name('eeservation.view');
});


Route::get('/logout', function () {
    // Log the user out
    Auth::logout();

    // Optionally invalidate the session
    request()->session()->invalidate();
    request()->session()->regenerateToken();
})->name('logout');

require __DIR__ . '/auth.php';
