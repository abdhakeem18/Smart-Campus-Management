<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class IsUser
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        if (auth()->check() && auth()->user()->role_id == 3) {
            return $next($request);
        }
        if ($request->expectsJson()) {
            return response()->json([
                'success' => false,
                'message' => 'You Dont have a Permission admin',
                'data' => null,
            ], 401); 
        }
        if(auth()->check() ){
            return redirect()->route('/');
        }else{
            return redirect()->route('login');
        }

       
    }
}
