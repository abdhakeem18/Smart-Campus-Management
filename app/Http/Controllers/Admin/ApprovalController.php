<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Api\BaseController;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class ApprovalController extends BaseController
{
    public function __construct()
    {
        $this->middleware('auth:sanctum');
    }

    public function scheduleApproved()
    {
        return $this->sendResponse('success', 'Approval Controller');
    }
}
