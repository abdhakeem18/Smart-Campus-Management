<?php 
namespace App\Repository;

use App\Models\Block;
use App\Models\Course;
use Carbon\Carbon;

class BlockRepository{

    protected $mailService;

    public function getAll()
    {
        $data = Block::all();
        return $data;
    }

    public function store($request)
    {
        $data = new Block();
        $data->name = $request->name;
        $data->save();
        return $data;
    }
    
}