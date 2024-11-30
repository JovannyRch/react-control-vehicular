<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use PDF;


class FileController extends Controller
{

    private function readCSV($file)
    {
        $data = [];
        if (($handle = fopen($file->getRealPath(), 'r')) !== false) {
            // Obtener los encabezados

            $headers = fgetcsv($handle, 1000, ',');

            while (($row = fgetcsv($handle, 1000, ',')) !== false) {
                $rowData = array_combine($headers, $row);
                $groupKey = $rowData[$headers[0]]; // Usar el valor de la primera columna como clave
                $data[$groupKey][] = $rowData;
            }
            fclose($handle);
        }
        return $data;
    }

    private function chunkArray($array, $size)
    {
        $chunks = [];
        $i = 0;
        while ($i < count($array)) {
            $chunks[] = array_slice($array, $i, $size);
            $i += $size;
        }
        return $chunks;
    }


    public function uploadCSV(Request $request)
    {
        /* // Validar el archivo
        $request->validate([
            'csv_file' => 'required|file|mimes:csv,txt'
        ]);

        // Procesar el archivo CSV
        $file = $request->file('csv_file');
        $data = $this->readCSV($file);

        $firstGroupKey = array_key_first($data);
        $cargas = $data[$firstGroupKey];

        $total_pages = ceil(count($cargas) / 3);
        $cargas_per_page = $this->chunkArray($cargas, 3);

        $vehiculo = $cargas[0];
        $factura = $cargas[0];


        // Generar PDF con los datos
        $pdf = PDF::loadView('pdf_calculo', [
            'data' => $cargas,
            'factura' => $factura,
            'vehiculo' => $vehiculo,
            'total_pages' => $total_pages,
            'cargas_per_page' => $cargas_per_page
        ]);



        return $pdf->stream('calculo.pdf'); */

        $request->validate([
            'csv_file' => 'required|file|mimes:csv,txt'
        ]);

        // Procesar el archivo CSV y agrupar los datos
        $groupedData = $this->readCSV($request->file('csv_file'));

        $pdfFiles = [];


        $i = 0;
        // Generar un PDF por cada grupo
        foreach ($groupedData as $groupKey => $cargas) {
            $i++;
            $total_pages = ceil(count($cargas) / 3);
            $cargas_per_page = $this->chunkArray($cargas, 3);

            $vehiculo = $cargas[0];
            $factura = $cargas[0];


            // Generar PDF con los datos
            $pdf = PDF::loadView('pdf_calculo', [
                'data' => $cargas,
                'factura' => $factura,
                'vehiculo' => $vehiculo,
                'total_pages' => $total_pages,
                'cargas_per_page' => $cargas_per_page
            ]);


            // Obtener el contenido del PDF
            $pdfContent = $pdf->output();

            // Crear un nombre para el archivo PDF
            $pdfFileName = 'pega_ticket_' . $groupKey . '.pdf';



            // Almacenar el PDF en un array
            $pdfFiles[] = [
                'name' => $pdfFileName,
                'content' => $pdfContent
            ];

            if ($i == 24) {
                break;
            }
        }


        // Crear un archivo ZIP con los PDFs
        $zipFileName = 'reportes.zip';
        $zip = new \ZipArchive();

        // Crear un archivo temporal para el ZIP
        $tempZipPath = tempnam(sys_get_temp_dir(), $zipFileName);

        if ($zip->open($tempZipPath, \ZipArchive::CREATE) === TRUE) {
            // Agregar cada PDF al ZIP
            foreach ($pdfFiles as $pdfFile) {
                $zip->addFromString($pdfFile['name'], $pdfFile['content']);
            }
            $zip->close();
        } else {
            return response()->json(['error' => 'No se pudo crear el archivo ZIP'], 500);
        }

        // Enviar el archivo ZIP para descarga y eliminarlo después
        return response()->download($tempZipPath, $zipFileName)->deleteFileAfterSend(true);
    }

    public function index()
    {
        return Inertia::render('Files/Index', []);
    }
    public function single()
    {
        return Inertia::render('Files/Single', []);
    }

    public function uploadSingleCSV(Request $request)
    {
        // Validar el archivo
        $request->validate([
            'csv_file' => 'required|file|mimes:csv,txt'
        ]);

        // Procesar el archivo CSV y agrupar los datos
        $groupedData = $this->readCSV($request->file('csv_file'));

        // Guardar los datos en la sesión para usarlos después
        session(['grouped_data' => $groupedData]);

        // Obtener las claves de los grupos
        $groupKeys = array_keys($groupedData);

        // Retornar la lista de grupos al frontend
        return response()->json(['groups' => $groupKeys]);
    }


    public function downloadPDF(Request $request, $groupKey)
    {
        // Obtener los datos de la sesión
        $groupedData = session('grouped_data');

        if (!$groupedData || !isset($groupedData[$groupKey])) {
            return response()->json(['error' => 'Grupo no encontrado.'], 404);
        }

        $cargas = $groupedData[$groupKey];


        $total_pages = ceil(count($cargas) / 3);
        $cargas_per_page = $this->chunkArray($cargas, 3);

        $vehiculo = $cargas[0];
        $factura = $cargas[0];


        // Generar PDF con los datos
        $pdf = PDF::loadView('pdf_calculo', [
            'data' => $cargas,
            'factura' => $factura,
            'vehiculo' => $vehiculo,
            'total_pages' => $total_pages,
            'cargas_per_page' => $cargas_per_page
        ]);


        $pdfFileName = 'pega_ticket_' . $groupKey . '.pdf';

        return $pdf->stream($pdfFileName);
    }
}
