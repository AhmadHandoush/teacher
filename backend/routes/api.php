<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\TeacherController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

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

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });
Route::controller(AuthController::class)->group(function () {
    Route::post('login', 'login');
    Route::post('register', 'register');
    Route::post('logout', 'logout');
    Route::post('refresh', 'refresh');

});
Route::get('get_user/{id}',[UserController::class,'get_user']);
Route::post('update_info',[UserController::class,'update_user']);


//  admin routes
Route::group(['middleware' => "isAdmin"], function () {

    Route::get('get_teachers_for_admin',[TeacherController::class,'get_teachers_for_admin']);
    Route::get('get_users_teachers',[TeacherController::class,'get_users']);
});


// user routes
Route::group(['middleware' => "isUser"], function () {
    Route::get('teachers',[TeacherController::class,'get_teachers_for_user']);


});

// teacher routes
Route::group(['middleware' => "isTeacher"], function () {

});
