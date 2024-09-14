<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CargaCombustible extends Model
{
    use HasFactory;

    protected $table = 'carga_combustibles';

    protected $fillable = [
        'fecha',
        'importe',
        'litros',
        'vehiculo_id',
    ];
}
