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
        Schema::create('vehiculos', function (Blueprint $table) {
            $table->id();
            $table->string('numero_economico')->nullable();
            $table->string('marca')->nullable();
            $table->string('tipo')->nullable();
            $table->string('modelo')->nullable();
            $table->string('placa')->nullable();
            $table->string('no_serie')->nullable();
            $table->string('no_motor')->nullable();
            $table->string('area_asignacion')->nullable();
            $table->string('resguardante')->nullable();
            $table->enum('plantilla', ['2019', '2023', '2024', 'propia'])->default('2019');
            $table->enum('estado', ['vigente', 'baja', 'tramite_de_baja', 'problemas_legales', 'comodato'])->default('vigente');
            $table->string('detalle')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('vehiculos');
    }
};
