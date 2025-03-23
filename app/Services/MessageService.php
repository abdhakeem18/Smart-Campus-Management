<?php

namespace App\Services;

use Illuminate\Support\Facades\Mail;

class MessageService {

    public function sendEmail($message,$email,$subject){
        Mail::raw($message, function ($message) use ($email,$subject) {
            $message->to($email)
                    ->subject($subject);
        });
    }

}