<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\TeacherController;
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
Route::group(['middleware' => "isAdmin"], function () {

    Route::get('get_teachers_for_admin',[TeacherController::class,'get_teachers_for_admin']);
});
Route::group(['middleware' => "isUser"], function () {
    Route::get('teachers',[TeacherController::class,'get_teachers_for_user']);

});
Route::group(['middleware' => "isTeacher"], function () {

});
