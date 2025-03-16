<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('email')->unique();
            $table->string('nic')->unique();
            $table->timestamp('email_verified_at')->nullable();
            $table->string('password');
            $table->string('verification_code')->nullable();
            $table->dateTime('expires_at')->nullable();
            $table->unsignedBigInteger('role_id')->default(1);
            $table->string('mobile')->nullable();
            $table->string('image')->nullable();
            $table->integer('is_active')->default(0);
            $table->foreign('role_id')->references('id')->on('roles')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('users');
    }
};
