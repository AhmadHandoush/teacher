<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class TeacherSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::create([
            'name'=>'reem',
            'email'=>'reem@gmail.com',
            'password' => Hash::make('reem12345'),
            'user_role'=>'teacher',
            'user_image' =>'reem.png',

           ]);
    }
}
