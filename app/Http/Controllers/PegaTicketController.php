<?php

namespace App\Http\Controllers;

use App\Imports\PegaTicketImport;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Http\Request;
use Maatwebsite\Excel\Facades\Excel;

class PegaTicketController extends Controller
{



    public function generateFromExcel(Request $request)
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
}
