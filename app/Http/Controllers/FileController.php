<?php

namespace App\Http\Controllers;

use App\Models\CargaCombustible;
use App\Models\Vehiculo;
use Illuminate\Http\Request;
use Inertia\Inertia;
use PDF;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Log;

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

        $request->validate([
            'csv_file' => 'required|file|mimes:csv,txt'
        ]);

        // Procesar el archivo CSV y agrupar los datos
        $groupedData = $this->readCSV($request->file('csv_file'));

        $pdfFiles = [];


        //Define a range of groups, for example, 1 to 10
        $initialRange = 191;
        $finalRange = 230;
        $range = range($initialRange, $finalRange);

        // Generar un PDF por cada grupo
        $index = 1;
        foreach ($groupedData as $groupKey => $cargas) {


            //if the group key is not in the range, skip it
            if (!in_array($groupKey, $range)) {
                continue;
            }

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
            $index++;
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

    public function getArrayDataFromFile($file)
    {

        if (($handle = fopen($file->getRealPath(), 'r')) !== false) {
            $headers = fgetcsv($handle, 1000, ',');
            $headers = array_map('trim', $headers);
            $headers = array_map(function ($header) {
                return preg_replace('/[^\p{L}\p{N}\s]+/u', '', $header);
            }, $headers);
            $data = [];
            while (($row = fgetcsv($handle, 1000, ',')) !== false) {
                $rowData = array_combine($headers, $row);
                $data[] = $rowData;
            }
            fclose($handle);
        }

        return $data;
    }

    public function uploadVehicles(Request $request)
    {
        // Validar el archivo
        $request->validate([
            'csv_file' => 'required|file|mimes:csv,txt',
            'plantilla' => 'required|string',
            'estado' => 'required|string',
        ]);
        try {
            $data = $this->getArrayDataFromFile($request->file('csv_file'));

            foreach ($data as $row) {
                $vehiculo = new Vehiculo();
                $vehiculo->numero_economico = $row['NÚMERO ECONÓMICO'] ?? '';
                $vehiculo->marca = $row['MARCA'] ?? '';
                $vehiculo->tipo = $row['TIPO'] ?? '';
                $vehiculo->modelo = $row['MODELO'] ?? '';
                $vehiculo->placa = $row['PLACA'] ?? '';
                $vehiculo->no_serie = $row['SERIE'] ?? '';
                $vehiculo->no_motor = $row['NÚMERO DE MOTOR'] ?? '';
                $vehiculo->area_asignacion = $row['AREA DE ASIGNACION'] ?? '';
                $vehiculo->resguardante = $row['RESGUARDANTE'] ?? '';
                $vehiculo->plantilla = $request->input('plantilla');
                $vehiculo->estado = $request->input('estado');
                $vehiculo->detalle = $row['DETALLE'] ?? '';
                $vehiculo->civ = $row['CIV'] ?? '';
                $vehiculo->save();
            }

            return response()->json(['data' => $data]);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    //String -> DD/MM/YYYY
    private function formatDateString($date)
    {
        if (empty($date)) {
            return null;
        }

        $date = str_replace('/', '-', $date);
        return date('Y-m-d', strtotime($date));
    }

    public function uploadCargas(Request $request)
    {
        // Validar el archivo
        $request->validate([
            'csv_file' => 'required|file|mimes:csv,txt',

        ]);
        $counter = 0;
        try {
            $data = $this->getArrayDataFromFile($request->file('csv_file'));

            foreach ($data as $row) {
                $civ = $row['CIV'] ?? '';



                $vehiculo = Vehiculo::where('civ', $civ)->first();

                if (!$vehiculo) {
                    continue;
                }
                Log::info('Vehiculo encontrado ' . $vehiculo->id);
                $carga = new CargaCombustible();

                $carga->fecha = $this->formatDateString($row['Fecha'] ?? '');
                $carga->importe = $row['CARGO'] ?? '';
                $carga->litros = $row['Litros'] ?? '';
                $carga->odometro_inicial = $row['Km INI'] ?? '';

                //Validate if the odometro final is empty or is less than the initial odometro
                if (empty($row['Km FIN']) || doubleval($row['Km FIN']) < doubleval($row['Km INI'])) {
                    $carga->odometro_final = $row['Km INI'];
                } else {
                    $carga->odometro_final = $row['Km FIN'];
                }

                $carga->folio = $row['FOLIO'] ?? '';
                $carga->conductor = $row['NOMBRE'] ?? '';
                $carga->vehiculo_id = $vehiculo->id;

                $carga->save();
                $counter++;
            }

            return response()->json(['data' => $data, 'message' => "Se agregaron " . $counter . " cargas de combustible"]);
        } catch (\Exception $e) {

            Log::error($e->getMessage());
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }


    public function index()
    {
        return Inertia::render('Files/Index', []);
    }
    public function single()
    {
        return Inertia::render('Files/Single', []);
    }

    public function packages()
    {
        return Inertia::render('Files/Packages', []);
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

    public function uploadPackagedCSV(Request $request)
    {
        // Validar el archivo y el tamaño del paquete
        $request->validate([
            'csv_file' => 'required|file|mimes:csv,txt',
            'package_size' => 'required|string|min:1',
        ]);

        $packageSize = intval($request->input('package_size'));

        // Procesar el archivo CSV y agrupar los datos
        $groupedData = $this->readCSV($request->file('csv_file'));

        // Obtener las claves de los grupos
        $groupKeys = array_keys($groupedData);

        // Dividir los grupos en paquetes según el tamaño especificado
        $packages = array_chunk($groupKeys, $packageSize);

        // Generar un identificador único para el proceso actual
        $cacheKey = Str::uuid()->toString();

        // Almacenar los paquetes y los datos asociados en caché
        $cachedPackages = [];
        foreach ($packages as $index => $packageGroupKeys) {
            $packageId = $cacheKey . '_package_' . $index;
            $packageData = [];

            foreach ($packageGroupKeys as $groupKey) {
                $packageData[$groupKey] = $groupedData[$groupKey];
            }

            // Guardar el paquete en caché (ejemplo: 30 minutos)
            Cache::put($packageId, $packageData, now()->addMinutes(30));

            // Almacenar el ID del paquete
            $cachedPackages[] = $packageId;
        }

        // Retornar la lista de paquetes y el cacheKey al frontend
        return response()->json([
            'packages' => $cachedPackages,
            'cacheKey' => $cacheKey,
        ]);
    }

    public function downloadPackage(Request $request, $cacheKey, $packageId)
    {
        set_time_limit(0);
        ini_set('memory_limit', '750M');
        // Construir la clave completa del paquete
        $fullPackageId = $packageId;

        // Obtener los datos del paquete desde el caché
        $packageData = Cache::get($fullPackageId);

        if (!$packageData) {
            return response()->json(['error' => 'Paquete no encontrado o expirado.'], 404);
        }

        $zip = new \ZipArchive();
        $zipFileName = 'paquete_' . $packageId . '.zip';
        $zipFilePath = storage_path('app/public/' . $zipFileName);

        if ($zip->open($zipFilePath, \ZipArchive::CREATE | \ZipArchive::OVERWRITE) === TRUE) {
            // Generar PDFs y agregarlos al ZIP
            foreach ($packageData as $groupKey => $cargas) {

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

                // Agregar el PDF al ZIP
                $zip->addFromString($pdfFileName, $pdfContent);
            }
            $zip->close();
        } else {
            return response()->json(['error' => 'No se pudo crear el archivo ZIP'], 500);
        }

        // Enviar el archivo ZIP para descarga y eliminarlo después
        return response()->download($zipFilePath)->deleteFileAfterSend(true);
    }


    public function downloadPDF(Request $request, $groupKey)
    {
        // Obtener los datos de la sesión
        $groupedData = session('grouped_data');

        if (!$groupedData || !isset($groupedData[$groupKey])) {
            return response()->json(['error' => 'Grupo no encontrado.'], 404);
        }

        $cargas = $groupedData[$groupKey];

        //log cargas
        Log::info('Cargas: ' . $groupKey);


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
            'cargas_per_page' => $cargas_per_page,
            'index' => $groupKey
        ]);


        $pdfFileName = 'pega_ticket_' . $groupKey . '.pdf';

        return $pdf->stream($pdfFileName);
    }
}
