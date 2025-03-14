<?php

namespace App\Http\Controllers;

use App\Imports\PegaTicketImport;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Http\Request;
use Maatwebsite\Excel\Facades\Excel;

class PegaTicketController extends Controller
{



    public function generatePdfFromExcel(Request $request)
    {

        set_time_limit(0);
        ini_set('memory_limit', '750M');

        $file = $request->file('excel_file');
        $file_name = $file->getClientOriginalName();
        $file_name = pathinfo($file_name, PATHINFO_FILENAME);

        $data = Excel::toCollection(new PegaTicketImport, $file)->first();

        $groupedData = $data->groupBy('n');

        $pdf = Pdf::loadView('pdf_calculo_excel', [
            'groupedData' => $groupedData,
        ]);

        return $pdf->download($file_name . '.pdf');
    }

    public function generateLinksFromExcel(Request $request)
    {

        $request->validate([
            'excel_file' => 'required|mimes:xlsx,xls',
        ]);

        set_time_limit(0);
        ini_set('memory_limit', '750M');



        $file = $request->file('excel_file');
        $file_name = $file->getClientOriginalName();
        $file_name = pathinfo($file_name, PATHINFO_FILENAME);

        $data = Excel::toCollection(new PegaTicketImport, $file)->first();

        $groupedData = $data->groupBy('n');

        session(['grouped_data' => $groupedData]);

        $groupKeys = $groupedData->keys();

        return response()->json(['groups' => $groupKeys]);
    }

    public function downloadPDF(Request $request, $groupKey)
    {
        // Obtener los datos de la sesión
        $groupedData = session('grouped_data');

        if (!$groupedData || !isset($groupedData[$groupKey])) {
            return response()->json(['error' => 'Grupo no encontrado.'], 404);
        }

        $group = $groupedData[$groupKey];

        // Generar PDF con los datos
        $pdf = PDF::loadView('pdf_calculo_excel_single', [
            'group' => $group,
            'groupKey' => $groupKey,
        ]);


        $pdfFileName = 'pega_ticket_' . $groupKey . '.pdf';

        return $pdf->stream($pdfFileName);
    }
}
