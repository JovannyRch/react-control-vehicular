<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('mantenimientos', function (Blueprint $table) {
            $table->decimal('odometro', 8, 2)->nullable();
            $table->string('observaciones')->nullable();
        });
        DB::statement("ALTER TABLE mantenimientos MODIFY COLUMN estado ENUM('proceso', 'afectado', 'cancelado', 'finalizado', 'atendido', 'no_atendido','en_taller') DEFAULT 'proceso'");
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('mantenimientos', function (Blueprint $table) {
            $table->dropColumn('odometro');
            $table->dropColumn('observaciones');
        });
    }
};
