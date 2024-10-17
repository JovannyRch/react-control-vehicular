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
        Schema::create('mantenimientos', function (Blueprint $table) {
            $table->id();
            $table->foreignId('vehiculo_id')->constrained()->onDelete('cascade');
            $table->date('fecha_elaboracion')->nullable();
            $table->string('folio')->nullable();
            $table->date('fecha_ingreso')->nullable();
            $table->date('fecha_salida')->nullable();
            $table->string('taller_asignacion')->nullable();
            $table->string('servicio_solicitado')->nullable();
            $table->string('servicio_realizado')->nullable();
            $table->decimal('importe', 8, 2)->nullable();
            $table->string('folio_fiscal')->nullable();
            $table->string('folio_afectacion')->nullable();
            $table->enum('estado', ['proceso', 'afectado', 'cancelado', 'finalizado'])->default('proceso');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('mantenimientos');
    }
};
