<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\DB;

class UpdateVehiculoRequest extends FormRequest
{
    public function rules()
    {
        return [
            'no_serie' => [
                'required',
                function ($attribute, $value, $fail) {
                    // Si el valor NO es SN o S/N, entonces validamos unicidad
                    if (! in_array($value, ['SN', 'S/N'])) {
                        // Ignoramos la fila actual en la validación (where('id', '!=', $this->vehiculo->id))
                        $existe = DB::table('vehiculos')
                            ->where('no_serie', $value)
                            ->where('id', '!=', $this->vehiculo->id)
                            ->exists();

                        if ($existe) {
                            $fail('El número de serie ya está registrado.');
                        }
                    }
                },
            ],
            'placa' => [
                'required',
                function ($attribute, $value, $fail) {
                    // Si el valor NO es SN o S/N, validamos unicidad
                    if (! in_array($value, ['SN', 'S/N'])) {
                        $existe = DB::table('vehiculos')
                            ->where('placa', $value)
                            ->where('id', '!=', $this->vehiculo->id)
                            ->exists();

                        if ($existe) {
                            $fail('La placa ya está registrada.');
                        }
                    }
                },
            ],
            'numero_economico' => [
                'required',
                function ($attribute, $value, $fail) {
                    // Si el valor NO es SN o S/N, validamos unicidad
                    if (! in_array($value, ['SN', 'S/N'])) {
                        $existe = DB::table('vehiculos')
                            ->where('numero_economico', $value)
                            ->where('id', '!=', $this->vehiculo->id)
                            ->exists();

                        if ($existe) {
                            $fail('El número económico ya está registrado.');
                        }
                    }
                },
            ],
        ];
    }

    public function messages()
    {
        return [
            'no_serie.required' => 'El número de serie es obligatorio.',
            'placa.required' => 'La placa es obligatoria.',
            'numero_economico.required' => 'El número económico es obligatorio.',
        ];
    }
}
