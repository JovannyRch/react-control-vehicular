<?php

namespace App\Http\Controllers;

use App\Models\CargaCombustible;
use App\Models\Factura;
use Illuminate\Http\Request;

class FacturaController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'folio' => 'required',
        ]);


        $factura = Factura::create(
            [
                'folio' => $request->folio,
            ]
        );


        $factura->save();


        $cargasId = $request->cargas;

        foreach ($cargasId as $cargaId) {
            $carga = CargaCombustible::find($cargaId);
            $carga->factura_id = $factura->id;
            $carga->save();
        }


        return redirect()->back();
    }
}
