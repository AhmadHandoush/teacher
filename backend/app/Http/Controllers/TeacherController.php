<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class TeacherController extends Controller
{
    public function get_teachers_for_user(){
        $teachers=User::where('user_role','teacher')->get();
        return response()->json(['teachers' => $teachers]);

    }
     public function get_teachers_for_admin(){
        $teachers=User::where('user_role','teacher')->get();
        return response()->json(['teachers' => $teachers]);

    }

    public function get_users(){
        $users = User::whereIn('user_role', ['user', 'teacher'])->get();
        return response()->json([
            'users'=>$users
        ]);
    }


}
