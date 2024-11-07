<?php

namespace App\Http\Controllers;

use App\Models\Accesorio;
use Illuminate\Http\Request;

class AccesoriosController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'fecha' => 'date',
        ]);

        $accesorio = Accesorio::create($request->all());


        return redirect()->back()
            ->with('success', 'Accesorio registrado correctamente.');
    }

    public function destroy(Accesorio $accesorio)
    {
        $accesorio->delete();

        return redirect()->back()
            ->with('success', 'Accesorio eliminado correctamente.');
    }

    public function update(Request $request, Accesorio $accesorio)
    {
        $request->validate([
            'fecha' => 'date',
        ]);

        $accesorio->update($request->all());

        return redirect()->back()
            ->with('success', 'Accesorio actualizado correctamente.');
    }
}
