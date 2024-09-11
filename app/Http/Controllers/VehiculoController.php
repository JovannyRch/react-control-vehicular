<?php

namespace App\Http\Controllers;

use App\Models\Vehiculo;
use Illuminate\Http\Request;
use Inertia\Inertia;

class VehiculoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $plantilla = $request->input('plantilla');

        $vehiculos = [];

        if ($plantilla === 'propia') {
            $estado = $request->input('estado');

            $vehiculos = Vehiculo::where('plantilla', 'propia')
                ->when($estado, function ($query, $estado) {
                    return $query->where('estado', $estado);
                })
                ->get();
        } else if ($plantilla) {
            $vehiculos = Vehiculo::where('plantilla', $plantilla)->get();
        } else {
            $vehiculos = Vehiculo::all();
        }


        return Inertia::render('Vehiculos/Index', [
            'vehiculos' => $vehiculos,
            'plantilla' => $plantilla,
            'estado' => $estado ?? null
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request)
    {
        $plantilla = $request->input('plantilla');
        return Inertia::render('Vehiculos/Create', [
            'plantilla' => $plantilla,
            'mode' => 'create'
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'numero_economico' => 'required',
            'marca' => 'required',
            'tipo' => 'required',
            'modelo' => 'required',
            'placa' => 'required',
            'no_serie' => 'required',
            'no_motor' => 'required',
            'area_asignacion' => 'required',
            'resguardante' => 'required',
            'plantilla' => 'required',
            'estado' => 'required',
            'detalle' => 'required'
        ]);

        Vehiculo::create($request->all());

        return redirect()->route('vehiculos.index', ['plantilla' => $request->input('plantilla'), 'estado' => $request->input('estado')]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Vehiculo $vehiculo)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Vehiculo $vehiculo)
    {
        return Inertia::render('Vehiculos/Create', [
            'vehiculo' => $vehiculo,
            'plantilla' => $vehiculo->plantilla,
            'mode' => 'edit'
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Vehiculo $vehiculo)
    {
        $request->validate([
            'numero_economico' => 'required',
            'marca' => 'required',
            'tipo' => 'required',
            'modelo' => 'required',
            'placa' => 'required',
            'no_serie' => 'required',
            'no_motor' => 'required',
            'area_asignacion' => 'required',
            'resguardante' => 'required',
            'plantilla' => 'required',
            'estado' => 'required',
            'detalle' => 'required'
        ]);

        $vehiculo->update($request->all());

        return redirect()->route('vehiculos.index', ['plantilla' => $request->input('plantilla'), 'estado' => $request->input('estado')]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Vehiculo $vehiculo)
    {
        //
    }
}
