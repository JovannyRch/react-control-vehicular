<?php

namespace App\Http\Controllers;

use App\Models\Mantenimiento;
use Illuminate\Http\Request;
use Inertia\Inertia;

class MantenimientosController extends Controller
{

    public function show(Mantenimiento $mantenimiento)
    {
        $vehiculo = $mantenimiento->vehiculo;
        return Inertia::render('Vehiculos/MantenimientoShow', [
            'vehiculo' => $vehiculo,
            'mantenimiento' => $mantenimiento
        ]);
    }

    public function store(Request $request)
    {


        $request->validate([
            'vehiculo_id' => 'required',
        ]);

        Mantenimiento::create($request->all());


        return redirect()->back();
    }

    public function update(Request $request, Mantenimiento $mantenimiento)
    {
        $request->validate([
            'vehiculo_id' => 'required',
        ]);

        $mantenimiento->update($request->all());

        return redirect()->back();
    }

    public function destroy(Mantenimiento $mantenimiento)
    {
        $mantenimiento->delete();
        return redirect()->back();
    }
}
