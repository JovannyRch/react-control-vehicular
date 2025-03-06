<?php

namespace App\Http\Controllers;

use App\Models\Mantenimiento;
use App\Models\SolicitudMantenimiento;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SolicitudMantenimientoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $pagination = Mantenimiento::where('solicitud_mantenimiento_id', '!=', null)->paginate(10);

        return Inertia::render('SolicitudesMantenimiento/Index', [
            'pagination' => $pagination
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
        $data = $request->validate([
            'vehiculo_id' => 'required',
            'fecha' => 'required',
            'kilometraje' => 'required|numeric',
            'ubicacion' => 'required',
            'requerimientos' => 'required',
            'imagenes.*' => 'mimes:jpeg,png,jpg,gif,svg|max:2048'
        ]);


        $images = $data['imagenes'] ?? [];
        $path_images = [];

        foreach ($images as $image) {
            $path = $image->store('public/solicitudes_mantenimiento');
            $path_images[] = str_replace('public', '/storage', $path);
        }

        $data['imagenes'] = $path_images;

        $newItem = SolicitudMantenimiento::create($data);

        $mantenimientoData = [
            'vehiculo_id' => $data['vehiculo_id'],
            'fecha_elaboracion' => $data['fecha'],
            'servicio_solicitado' => $data['requerimientos'],
            'solicitud_mantenimiento_id' => $newItem->id,
            'estado' => 'no_atendido'
        ];

        $newMantenimiento = Mantenimiento::create($mantenimientoData);

        $newItem->mantenimiento_id = $newMantenimiento->id;
        $newItem->save();



        return redirect()->route('solicitudes-mantenimiento.show', $newItem->id);
    }

    /**
     * Display the specified resource.
     */
    public function show(SolicitudMantenimiento $solicitudMantenimiento)
    {
        $vehiculo = $solicitudMantenimiento->vehiculo;
        $mantenimiento = $solicitudMantenimiento->mantenimiento;
        return Inertia::render('SolicitudesMantenimiento/Show', [
            'solicitud' => $solicitudMantenimiento,
            'vehiculo' => $vehiculo,
            'mantenimiento' => $mantenimiento
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(SolicitudMantenimiento $solicitudMantenimiento)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, SolicitudMantenimiento $solicitudMantenimiento)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(SolicitudMantenimiento $solicitudMantenimiento)
    {
        //
    }
}
