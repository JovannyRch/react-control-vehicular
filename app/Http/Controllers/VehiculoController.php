<?php

namespace App\Http\Controllers;

use App\Models\Vehiculo;
use Illuminate\Http\Request;
use Inertia\Inertia;

use PDF;

class VehiculoController extends Controller
{


    public function addSearchQuery($query, $search)
    {

        return $query->where(function ($query) use ($search) {
            $query->where('numero_economico', 'like', '%' . $search . '%')
                ->orWhere('marca', 'like', '%' . $search . '%')
                ->orWhere('tipo', 'like', '%' . $search . '%')
                ->orWhere('modelo', 'like', '%' . $search . '%')
                ->orWhere('placa', 'like', '%' . $search . '%')
                ->orWhere('no_serie', 'like', '%' . $search . '%')
                ->orWhere('no_motor', 'like', '%' . $search . '%')
                ->orWhere('area_asignacion', 'like', '%' . $search . '%')
                ->orWhere('resguardante', 'like', '%' . $search . '%')
                ->orWhere('estado', 'like', '%' . $search . '%')
                ->orWhere('detalle', 'like', '%' . $search . '%');
        });
    }

    public function index(Request $request)
    {
        $plantilla = $request->input('plantilla');
        $search = $request->input('search');
        $loadFuel = $request->input('loadFuel');

        $vehiculos = [];

        if ($plantilla === 'propia') {
            $estado = $request->input('estado');

            $vehiculos = Vehiculo::where('plantilla', 'propia')
                ->when($estado, function ($query, $estado) {
                    return $query->where('estado', $estado);
                })
                ->when($search, function ($query, $search) {
                    return $this->addSearchQuery($query, $search);
                })
                ->get();
        } else if ($plantilla) {
            $vehiculos = Vehiculo::where('plantilla', $plantilla)
                ->when($search, function ($query, $search) {
                    return $this->addSearchQuery($query, $search);
                })
                ->get();
        } else {
            $vehiculos = Vehiculo::when($search, function ($query, $search) {
                return $this->addSearchQuery($query, $search);
            })
                ->get();
        }


        return Inertia::render('Vehiculos/Index', [
            'vehiculos' => $vehiculos,
            'plantilla' => $plantilla,
            'estado' => $estado ?? null,
            'search' => $search ?? '',
            'loadFuel' => $loadFuel ?? false
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
        ]);

        Vehiculo::create($request->all());

        return redirect()->route('vehiculos.index', ['plantilla' => $request->input('plantilla'), 'estado' => $request->input('estado')]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Request $request, Vehiculo $vehiculo)
    {
        $loadFuel = $request->input('loadFuel');


        $historial = $vehiculo->historial;
        $cargas = $vehiculo->cargasCombustible;
        return Inertia::render('Vehiculos/Show', [
            'vehiculo' => $vehiculo,
            'historial' => $historial,
            'cargas' => $cargas,
            'loadFuel' => $loadFuel ?? false
        ]);
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


    public function pdf(Request $request)
    {
        $plantilla = $request->input('plantilla');
        $search = $request->input('search');

        $vehiculos = [];

        if ($plantilla === 'propia') {
            $estado = $request->input('estado');

            $vehiculos = Vehiculo::where('plantilla', 'propia')
                ->when($estado, function ($query, $estado) {
                    return $query->where('estado', $estado);
                })
                ->when($search, function ($query, $search) {
                    return $this->addSearchQuery($query, $search);
                })
                ->get();
        } else if ($plantilla) {
            $vehiculos = Vehiculo::where('plantilla', $plantilla)
                ->when($search, function ($query, $search) {
                    return $this->addSearchQuery($query, $search);
                })
                ->get();
        } else {
            $vehiculos = Vehiculo::when($search, function ($query, $search) {
                return $this->addSearchQuery($query, $search);
            })
                ->get();
        }

        $pdf = PDF::loadView('pdf_vehiculos', ['vehiculos' => $vehiculos, 'plantilla' => $plantilla, 'estado' => $estado ?? null])->setPaper('a4', 'landscape');


        return $pdf->stream('pdf_vehiculos');
    }

    public function detailPdf(Vehiculo $vehiculo)
    {
        $historial = $vehiculo->historial;
        $cargas = $vehiculo->cargasCombustible;
        $total_litros = $vehiculo->totalLitros();
        $total_importe = $vehiculo->totalImporte();

        $pdf = PDF::loadView('pdf_vehiculo', [
            'vehiculo' => $vehiculo,
            'historial' => $historial,
            'cargas' => $cargas,
            'total_litros' => $total_litros,
            'total_importe' => $total_importe
        ]);




        return $pdf->stream('pdf_vehiculo');
    }
}
