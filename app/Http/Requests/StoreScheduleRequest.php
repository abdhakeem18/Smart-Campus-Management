<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;

class StoreScheduleRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'title'=>'required|string',
            'description'=>'required|string',
            'date'=>'date',
            'start_time'=>'required',
            'end_time'=>'required',
            'type'=>'required|int',
            'user_id'=> 'nullable|exists:users,id',
            'course_id'=>'required|int|exists:users,id',
            'subject_id'=>'nullable|exists:subjects,id',
            'block_id'=>'nullable|exists:blocks,id',
        ];
    }

    protected function failedValidation(Validator $validator)
    {
        throw new HttpResponseException(response()->json([
            'success' => false,
            'message' => 'Validation error',
            'data' => $validator->errors(),
        ], 422));
    }
}
