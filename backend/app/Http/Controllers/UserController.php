<?php

namespace App\Http\Controllers;

use App\Models\Connection;
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
    public function requestConnection(Request $request)
    {
        $request->validate([
            'teacher_id' => 'required|exists:users,id',  // Validate teacher's existence
        ]);

        // Ensure teacher has the role 'teacher'
        $teacher = User::where('id', $request->teacher_id)->where('user_role', 'teacher')->first();
        if (!$teacher) {
            return response()->json(['message' => 'Teacher not found.'], 404);
        }

        // Check if a connection already exists
        $existingConnection = Connection::where('user_id', auth()->id())
            ->where('teacher_id', $request->teacher_id)
            ->first();

        if ($existingConnection) {
            return response()->json(['message' => 'Connection request already exists.'], 400);
        }

        // Create the connection request
        $connection = Connection::create([
            'user_id' => auth()->id(),
            'teacher_id' => $request->teacher_id,
        ]);

        return response()->json(['message' => 'Connection request sent successfully.', 'data' => $connection], 201);
    }

}
