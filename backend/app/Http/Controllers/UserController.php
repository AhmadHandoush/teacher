<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{

    // get user by id
    public function get_user($userId){
        $user = User::find($userId);

        if ($user) {

            return response()->json([
                'success' => true,
                'data' => $user
            ]);
        } else {

            return response()->json([
                'success' => false,
                'message' => 'User not found.'
            ], 404);
        }



    }


    public function update_user(Request $request){
        $user = Auth::user();

        if ($request->hasFile('user_image')) {
            $image = $request->file('user_image');
            $imageName = time() . '.' . $image->getClientOriginalExtension();
            $image->move(public_path('images'), $imageName);
            $user->user_image = $imageName;
        }

        $user->update($request->except('user_image'));
        return response()->json(["message"=>"info updated successfully",'data'=> $user]);


    }

}
