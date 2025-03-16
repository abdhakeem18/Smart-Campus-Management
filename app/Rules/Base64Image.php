<?php

namespace App\Rules;

use Closure;
use Illuminate\Contracts\Validation\Rule;

class Base64Image implements Rule
{
    /**
     * Run the validation rule.
     *
     * @param  \Closure(string): \Illuminate\Translation\PotentiallyTranslatedString  $fail
     */
    public function passes($attribute, $value)
    {
        if (!preg_match('/^data:image\/(jpeg|png);base64,/', $value)) {
            return false;
        }
    
        $data = preg_replace('/^data:image\/(jpeg|png);base64,/', '', $value);
        $data = str_replace(' ', '+', $data);
    
        $decoded = base64_decode($data);
        return $decoded !== false && @imagecreatefromstring($decoded) !== false;
    }

    public function message()
    {
        return 'The :attribute must be a valid Base64 encoded image (JPG or PNG).';
    }
}
