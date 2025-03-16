<?php

namespace App\Services\Api;


use Illuminate\Http\JsonResponse;


class BaseService 
{
    protected function sendSuccess($data, string $message = '', int $statusCode = 200): JsonResponse
    {
        return response()->json([
            'success' => true,
            'message' => $message,
            'data' => $data,
        ], $statusCode);
    }

    protected function sendError($message, int $statusCode = 400, $errors = []): JsonResponse
    {
        return response()->json([
            'success' => false,
            'message' => $message ?? "Something Went Wrong..",
            'data' => $errors,
        ], $statusCode);
    }
}
