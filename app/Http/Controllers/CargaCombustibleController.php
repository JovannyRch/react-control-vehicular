<?php

namespace App\Http\Controllers;

use App\Models\CargaCombustible;
use App\Models\Factura;
use App\Models\Vehiculo;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

use function PHPUnit\Framework\isNull;

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

        $lastItem = CargaCombustible::where('vehiculo_id', $request->vehiculo_id)
            ->orderBy('id', 'desc')
            ->first();


        //Check if lastItem was not found
        if (isset($lastItem)) {
            $odometroInicial = $lastItem->odometro_final;
        } else {
            $odometroInicial = 0;
        }

        $request->validate([
            'fecha' => 'required | date',
            'importe' => 'required | numeric',
            'litros' => 'required | numeric',
            'odometro' => "required | numeric | gt:{$odometroInicial}",
            'vehiculo_id' => 'required',
            'folio' => 'required'
        ]);





        $request->merge(['odometro_final' => $request->odometro]);
        $request->merge(['odometro_inicial' => $odometroInicial]);
        $request->offsetUnset('odometro');

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


    public function getCargasDisponiblesParaFactura(Vehiculo $vehiculo, $year, $month)
    {

        if ($month && $year) {
            return $vehiculo->cargasCombustible()
                ->whereYear('fecha', $year)
                ->where('factura_id', null)
                ->whereMonth('fecha', $month)
                ->orderBy('fecha', 'desc')
                ->get();
        }

        return $vehiculo->cargasCombustible;
    }

    public function getFacturas(Vehiculo $vehiculo, $year, $month)
    {
        $vehiculo_id = $vehiculo->id;
        $cargas = CargaCombustible::where('vehiculo_id', $vehiculo_id)
            ->whereNotNull('factura_id')
            ->whereYear('fecha', $year)
            ->whereMonth('fecha', $month)
            ->get();

        $facturas = Factura::whereIn('id', $cargas->pluck('factura_id')->unique())->get();

        return $facturas;
    }
}
