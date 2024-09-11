<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Vehiculo extends Model
{
    use HasFactory;

    protected $fillable = [
        'numero_economico',
        'marca',
        'tipo',
        'modelo',
        'placa',
        'no_serie',
        'no_motor',
        'area_asignacion',
        'resguardante',
        'plantilla',
        'estado',
        'detalle'
    ];
}
