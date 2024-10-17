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
        'detalle',
        'civ'
    ];

    public function historial()
    {
        return $this->hasMany(Historial::class);
    }

    public function mantenimientos()
    {
        $mantenimientos =  $this->hasMany(Mantenimiento::class);

        $mantenimientos->orderBy('fecha_elaboracion', 'asc');

        return $mantenimientos;
    }


    public function cargasCombustible()
    {
        $cargas = $this->hasMany(CargaCombustible::class);

        $cargas->orderBy('fecha', 'asc');

        return $cargas;
    }
}
