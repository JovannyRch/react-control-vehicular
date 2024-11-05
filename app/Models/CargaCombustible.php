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
        'folio',
        'factura_id'
    ];

    public function factura()
    {
        return $this->hasOne(Factura::class);
    }

    //combustile recorrido
    public function kilometrosRecorridos()
    {

        if (is_numeric($this->odometro_inicial) && is_numeric($this->odometro_final)) {
            return ($this->odometro_final - $this->odometro_inicial);
        }


        return '';
    }

    public function getRendimiento()
    {
        if (is_numeric($this->litros) && is_numeric($this->kilometrosRecorridos()) && $this->litros > 0) {
            return number_format(($this->kilometrosRecorridos() / $this->litros), 2) . ' km/l';
        }

        return '';
    }

    public function formattedDate()
    {
        $months = [
            '01' => 'Enero',
            '02' => 'Febrero',
            '03' => 'Marzo',
            '04' => 'Abril',
            '05' => 'Mayo',
            '06' => 'Junio',
            '07' => 'Julio',
            '08' => 'Agosto',
            '09' => 'Septiembre',
            '10' => 'Octubre',
            '11' => 'Noviembre',
            '12' => 'Diciembre',
        ];
        $date = $this->fecha;
        return date('d', strtotime($date)) . ' de ' . $months[date('m', strtotime($date))] . ' de ' . date('Y', strtotime($date));
    }
}
