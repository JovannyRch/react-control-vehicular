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

    public function historial()
    {
        return $this->hasMany(Historial::class);
    }


    public function cargasCombustible()
    {
        return $this->hasMany(CargaCombustible::class);
    }

    //Total litros
    public function totalLitros()
    {
        return $this->cargasCombustible->sum('litros');
    }

    //Total importe
    public function totalImporte()
    {
        return $this->cargasCombustible->sum('importe');
    }
}
