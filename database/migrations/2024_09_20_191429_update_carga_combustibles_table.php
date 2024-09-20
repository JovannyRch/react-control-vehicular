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
        Schema::table('carga_combustibles', function (Blueprint $table) {
            $table->decimal('odometro_inicial', 8, 2)->nullable();
            $table->decimal('odometro_final', 8, 2)->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('carga_combustibles', function (Blueprint $table) {
            $table->dropColumn('odometro_inicial');
            $table->dropColumn('odometro_final');
        });
    }
};
