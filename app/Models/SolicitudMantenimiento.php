<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SolicitudMantenimiento extends Model
{
    use HasFactory;

    protected $table = 'solicitud_mantenimientos';

    protected $fillable = [
        'vehiculo_id',
        'fecha',
        'kilometraje',
        'ubicacion',
        'requerimientos',
        'imagenes'
    ];

    protected $casts = [
        'imagenes' => 'array'
    ];

    public function mantenimiento()
    {
        return $this->hasOne(Mantenimiento::class);
    }

    public function vehiculo()
    {
        return $this->belongsTo(Vehiculo::class);
    }
}
