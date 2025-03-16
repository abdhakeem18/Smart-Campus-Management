<?php

namespace App\Rules;

use Closure;
use Illuminate\Contracts\Validation\Rule;

class Base64Pdf implements Rule
{
    /**
     * Run the validation rule.
     *
     * @param  \Closure(string): \Illuminate\Translation\PotentiallyTranslatedString  $fail
     */
    public function passes($attribute, $value)
    {
        if (!preg_match('/^data:application\/pdf;base64,/', $value)) {
            return false;
        }
        $data = preg_replace('/^data:application\/pdf;base64,/', '', $value);

        $data = str_replace(' ', '+', $data);

        $decoded = base64_decode($data);

        return $decoded !== false && strpos($decoded, '%PDF') === 0;
    }

    public function message()
    {
        return 'The :attribute must be a valid Base64-encoded PDF file.';
    }
}
