<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class IsAdmin
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {

        if (auth()->check() && auth()->user()->role_id == 1) {
            return $next($request);
        }
        return response()->json([
            'success' => false,
            'message' => 'You Dont have a Permission',
            'data' => null,
        ], 401); 
     
    }
}
