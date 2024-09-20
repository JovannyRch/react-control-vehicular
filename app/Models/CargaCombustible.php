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
        'odometro_inicial',
        'odometro_final',
    ];

    //combustile recorrido
    public function kilometrosRecorridos()
    {
        if ($this->odometro_inicial && $this->odometro_final) {
            return ($this->odometro_final - $this->odometro_inicial);
        }
        return 'NF';
    }
}
