<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Mantenimiento extends Model
{
    use HasFactory;

    protected $fillable = [
        "vehiculo_id",
        "fecha_elaboracion",
        "folio",
        "fecha_ingreso",
        "fecha_salida",
        "taller_asignacion",
        "servicio_solicitado",
        "servicio_realizado",
        "importe",
        "folio_fiscal",
        "folio_afectacion",
        "estado",
        "solicitud_mantenimiento_id",
        'odometro',
        'observaciones'
    ];

    public function vehiculo()
    {
        return $this->belongsTo(Vehiculo::class);
    }
}
