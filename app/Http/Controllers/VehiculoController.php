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
        } else {
            $vehiculos = Vehiculo::where('plantilla', $plantilla)->get();
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
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
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
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Vehiculo $vehiculo)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Vehiculo $vehiculo)
    {
        //
    }
}
