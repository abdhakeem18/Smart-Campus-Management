<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\EventController;
use App\Http\Controllers\ResourceController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Admin\UserController;

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
});

Route::get('/dashboard', function () {
    return view('index');
});

Route::get('/profile', [ProfileController::class, 'index'])->name('profile.view');

Route::get('/events', [EventController::class, 'index'])->name('event.view');

Route::get('/schedule', [ResourceController::class, 'index'])->name('schedule.view');

Route::get('/users', [UserController::class, 'view'])->name('users.view');

require __DIR__ . '/auth.php';
