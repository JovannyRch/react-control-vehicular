<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreProductoRequest;
use App\Http\Requests\StoreVehiculoRequest;
use App\Http\Requests\UpdateVehiculoRequest;
use App\Models\CargaCombustible;
use App\Models\Factura;
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
                ->orWhere('civ', 'like', '%' . $search . '%')
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
        $tools = $request->input('tools');
        $maintenance = $request->input('maintenance');

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
            'tools' => $tools ?? false,
            'plantilla' => $plantilla,
            'estado' => $estado ?? null,
            'search' => $search ?? '',
            'loadFuel' => $loadFuel ?? false,
            'maintenance' => $maintenance ?? false,
            'message' => session('message')
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
    public function store(StoreVehiculoRequest $request)
    {
        $request->validate([

            'marca' => 'required',
            'tipo' => 'required',
            'modelo' => 'required',
            'area_asignacion' => 'required',
            'resguardante' => 'required',
            'plantilla' => 'required',
            'estado' => 'required',

        ]);

        $newItem = Vehiculo::create($request->all());


        session()->flash('message', 'Vehiculo registrado exitosamente');

        return redirect()->route('vehiculos.show', $newItem);
    }

    /**
     * Display the specified resource.
     */
    public function show(Request $request, Vehiculo $vehiculo)
    {
        $loadFuel = $request->input('loadFuel');
        $month = $request->input('month');
        $year = $request->input('year');
        $maintenance = $request->input('maintenance');
        $tools = $request->input('tools');



        $historial = $vehiculo->historial;
        $mantenimientos = $vehiculo->mantenimientos;
        $accesorios = $vehiculo->accesorios;

        if ($month && $year) {
            $mantenimientos = $vehiculo->mantenimientos()->whereYear('fecha_elaboracion', $year)
                ->whereMonth('fecha_elaboracion', $month)
                ->orderBy('fecha_elaboracion', 'desc')
                ->get();
        }

        $cargasController = new CargaCombustibleController();
        $cargas = $cargasController->getHistorialCargasCombustible($vehiculo, $year, $month);
        $cargasDisponibles = $cargasController->getCargasDisponiblesParaFactura($vehiculo, $year, $month);

        $facturas = $cargasController->getFacturas($vehiculo, $year, $month);

        return Inertia::render('Vehiculos/Show', [
            'vehiculo' => $vehiculo,
            'historial' => $historial,
            'cargas' => $cargas,
            'loadFuel' => $loadFuel ?? false,
            'month' => $month ?? '',
            'year' => $year ?? '',
            'maintenance' => $maintenance ?? false,
            'tools' => $tools ?? false,
            'mantenimientos' => $mantenimientos,
            'cargasDisponibles' => $cargasDisponibles,
            'facturas' => $facturas,
            'accesorios' => $accesorios,
            'message' => session('message')
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
    public function update(UpdateVehiculoRequest $request, Vehiculo $vehiculo)
    {
        $request->validate([

            'marca' => 'required',
            'tipo' => 'required',
            'modelo' => 'required',
            'no_serie' => 'required',
            'no_motor' => 'required',
            'area_asignacion' => 'required',
            'resguardante' => 'required',
            'plantilla' => 'required',
            'estado' => 'required'

        ]);

        $vehiculo->update($request->all());



        session()->flash('message', 'Vehiculo actualizado exitosamente');

        return redirect()->route('vehiculos.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Vehiculo $vehiculo)
    {
        $vehiculo->delete();

        return response()->json(['message' => 'Vehiculo eliminado']);
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

    public function detailPdf(Request $request, Vehiculo $vehiculo)
    {
        $loadFuel = $request->input('loadFuel');
        $month = $request->input('month');
        $year = $request->input('year');
        $maintenance = $request->input('maintenance');
        $tools = $request->input('tools');


        $historial = $vehiculo->historial;
        $mantenimientos = $vehiculo->mantenimientos;
        $accesorios = $vehiculo->accesorios;



        if ($month && $year) {
            $mantenimientos = $vehiculo->mantenimientos()->whereYear('fecha_elaboracion', $year)
                ->whereMonth('fecha_elaboracion', $month)
                ->orderBy('fecha_elaboracion', 'desc')
                ->get();
        }


        $cargasController = new CargaCombustibleController();
        $cargas = $cargasController->getHistorialCargasCombustible($vehiculo, $year, $month);


        $total_importe = $cargas->sum('importe');
        $total_litros = $cargas->sum('litros');




        $pdf = PDF::loadView('pdf_vehiculo', [
            'vehiculo' => $vehiculo,
            'historial' => $historial,
            'cargas' => $cargas,
            'loadFuel' => $loadFuel ?? false,
            'maintenance' => $maintenance ?? false,
            'tools' => $tools ?? false,
            'month' => $month ?? '',
            'year' => $year ?? '',
            'total_importe' => $total_importe,
            'total_litros' => $total_litros,
            'mantenimientos' => $mantenimientos,
            'accesorios' => $accesorios
        ])->setPaper('a4', 'landscape');


        return $pdf->stream('pdf_vehiculo');
    }

    private function chunkCargas($cargas)
    {
        return $cargas->chunk(3);
    }

    public function pegaTicket(Factura $factura)
    {


        $cargas = CargaCombustible::where('factura_id', $factura->id)->get();
        $vehiculo = Vehiculo::find($cargas->first()->vehiculo_id);

        $total_pages = ceil($cargas->count() / 3);
        $cargas_per_page = $cargas->chunk(3);

        $pdf = PDF::loadView('pdf_pega_ticket', [
            'factura' => $factura,
            'vehiculo' => $vehiculo,
            'total_pages' => $total_pages,
            'cargas_per_page' => $cargas_per_page
        ]);




        return $pdf->stream('pega_ticket');
    }

    public function adminVehiculos(Request $request)
    {

        if ($request->has('search')) {
            $search = $request->input('search');
            $pagination = Vehiculo::where('numero_economico', 'like', '%' . $search . '%')
                ->orWhere('marca', 'like', '%' . $search . '%')
                ->orWhere('civ', 'like', '%' . $search . '%')
                ->orWhere('tipo', 'like', '%' . $search . '%')
                ->orWhere('modelo', 'like', '%' . $search . '%')
                ->orWhere('placa', 'like', '%' . $search . '%')
                ->orWhere('no_serie', 'like', '%' . $search . '%')
                ->orWhere('no_motor', 'like', '%' . $search . '%')
                ->orWhere('area_asignacion', 'like', '%' . $search . '%')
                ->orWhere('resguardante', 'like', '%' . $search . '%')
                ->orWhere('estado', 'like', '%' . $search . '%')
                ->orWhere('detalle', 'like', '%' . $search . '%')
                ->orWhere('detalle', 'like', '%' . $search . '%')
                ->orWhere('plantilla', 'like', '%' . $search . '%')
                ->orWhere('estado', 'like', '%' . $search . '%')
                ->paginate(25);

            //add search to pagination links
            $pagination->appends(['search' => $search]);


            return Inertia::render('Vehiculos/Admin', [
                'pagination' => $pagination
            ]);
        }

        $pagination = Vehiculo::paginate(50);

        return Inertia::render('Vehiculos/Admin', [
            'pagination' => $pagination
        ]);
    }

    public function destroyAll(Request $request)
    {
        try {
            $ids = Vehiculo::all()->pluck('id');
            Vehiculo::destroy($ids);
            return response()->json(['message' => 'Vehiculos eliminados']);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
}
