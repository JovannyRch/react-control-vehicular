<?php

namespace App\Http\Controllers;

use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;


class ReportesController extends Controller
{
    public function index()
    {
        return Inertia::render('Reportes/Index');
    }

    public function vehiculosPorMarca()
    {


        $marcasAgrupadas = DB::table('vehiculos')
            ->select('marca', DB::raw('count(*) as total'))
            ->groupBy('marca')
            ->get();

        // 2. Crea arrays para etiquetas y valores
        $labels = [];
        $data   = [];
        foreach ($marcasAgrupadas as $item) {
            $labels[] = $item->marca;
            $data[]   = $item->total;
        }

        // 3. Define la configuración tipo Chart.js
        $chartConfig = [
            'type' => 'horizontalBar',
            'data' => [
                'labels' => $labels,
                'datasets' => [[
                    'label' => 'Cantidad de vehículos',
                    'data' => $data,
                    'backgroundColor' => '#882041'
                ]]
            ]
        ];

        $quickChartUrl = 'https://quickchart.io/chart?c=' . urlencode(json_encode($chartConfig)) . '&width=600&height=400';

        $image = base64_encode(file_get_contents($quickChartUrl));


        $pdf = Pdf::loadView('reportes.vehiculos-por-marca', ['image' => $image,]);

        $current_date = date('d-m-Y_H-i-s');
        return $pdf->stream("vehiculos_por_marca_$current_date.pdf");
    }


    public function gastosCombustible()
    {
        // del mes actual, obtener los vehiculos que mas han gastado $

        $gastos = DB::table('carga_combustibles')
            ->select('vehiculo_id', DB::raw('sum(importe) as total'))
            ->whereMonth('fecha', date('m'))
            ->groupBy('vehiculo_id')
            ->orderBy('total', 'desc')
            ->get();

        $labels = [];
        $data   = [];
        foreach ($gastos as $item) {
            $vehiculo = DB::table('vehiculos')->find($item->vehiculo_id);
            $labels[] = $vehiculo->civ;
            $data[]   = $item->total;
        }

        $chartConfig = [
            'type' => 'horizontalBar',
            'data' => [
                'labels' => $labels,
                'datasets' => [[
                    'label' => 'Gastos en combustible',
                    'data' => $data,
                    'backgroundColor' => '#882041'
                ]]
            ]
        ];

        $quickChartUrl = 'https://quickchart.io/chart?c=' . urlencode(json_encode($chartConfig)) . '&width=600&height=400';
        $image = base64_encode(file_get_contents($quickChartUrl));

        $pdf = Pdf::loadView('reportes.gastos-combustible', ['image' => $image,]);

        $current_date = date('d-m-Y_H-i-s');
        return $pdf->stream("gastos_combustible_$current_date.pdf");
    }

    public function mantenimientos()
    {
        //
    }
}