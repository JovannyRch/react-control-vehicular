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
        Schema::create('carga_combustibles', function (Blueprint $table) {
            $table->id();
            $table->date('fecha');
            $table->decimal('importe', 8, 2);
            $table->decimal('litros', 8, 2);
            $table->foreignId('vehiculo_id')->constrained()->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('carga_combustibles');
    }
};
