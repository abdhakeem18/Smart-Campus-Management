<?php

namespace App\Services;

class VerificationCodeGenerateService{

    public static function code(){
        return rand(100000, 999999);
    }
}