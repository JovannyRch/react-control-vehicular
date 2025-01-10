<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\DB;

class StoreVehiculoRequest extends FormRequest
{
    public function rules()
    {


        return [
            'no_serie' => [
                'required',
                function ($attribute, $value, $fail) {
                    if (! in_array($value, ['SN', 'S/N'])) {
                        $existe = DB::table('vehiculos')
                            ->where('no_serie', $value)
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
                    if (! in_array($value, ['SN', 'S/N', 'S/P', 'SP'])) {
                        $existe = DB::table('vehiculos')
                            ->where('placa', $value)
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
                    if (! in_array($value, ['SN', 'S/N'])) {
                        $existe = DB::table('vehiculos')
                            ->where('numero_economico', $value)
                            ->exists();

                        if ($existe) {
                            $fail('El número económico ya está registrado.');
                        }
                    }
                },
            ]
        ];
    }

    public function messages()
    {
        return [
            'no_serie.unique' => 'El número de serie ya está registrado.',
            'placa.unique' => 'La placa ya está registrada.',
            'numero_economico.unique' => 'El número económico ya está registrado.',
        ];
    }
}
