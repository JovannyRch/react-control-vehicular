<?php

namespace App\Http\Controllers;

use App\Models\CargaCombustible;
use App\Models\Vehiculo;
use Illuminate\Http\Request;

class CargaCombustibleController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
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
        $request->validate([
            'fecha' => 'required | date',
            'importe' => 'required | numeric',
            'litros' => 'required | numeric',
            'vehiculo_id' => 'required',
            'folio' => 'required'
        ]);


        CargaCombustible::create($request->all());


        return redirect()->back()
            ->with('success', 'Carga de combustible registrada correctamente.');
    }

    /**
     * Display the specified resource.
     */
    public function show(CargaCombustible $cargaCombustible)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(CargaCombustible $cargaCombustible)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, CargaCombustible $cargaCombustible)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(CargaCombustible $cargaCombustible)
    {
        //
    }


    public function getHistorialCargasCombustible(Vehiculo $vehiculo, $year, $month)
    {

        if ($month && $year) {
            return $vehiculo->cargasCombustible()
                ->whereYear('fecha', $year)
                ->whereMonth('fecha', $month)
                ->orderBy('fecha', 'desc')
                ->get();
        }

        return $vehiculo->cargasCombustible;
    }
}
