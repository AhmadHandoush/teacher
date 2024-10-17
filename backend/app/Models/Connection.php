<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Connection extends Model
{
    protected $fillable = ['user_id', 'teacher_id', 'status'];
    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    /**
     * Get the teacher who received the connection request.
     */
    public function teacher()
    {
        return $this->belongsTo(User::class, 'teacher_id');
    }
}
