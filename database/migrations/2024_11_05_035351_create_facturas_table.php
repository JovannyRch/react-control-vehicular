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

        Schema::create('facturas', function (Blueprint $table) {
            $table->id();
            $table->string('folio');
            $table->timestamps();
        });
        Schema::table('carga_combustibles', function (Blueprint $table) {
            $table->foreignId('factura_id')->nullable()->constrained()->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('facturas');
        Schema::table('carga_combustibles', function (Blueprint $table) {
            $table->dropForeign(['factura_id']);
        });
    }
};
