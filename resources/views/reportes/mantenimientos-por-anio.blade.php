<?php

function formatDate($date)
{
    $months = [
        '01' => 'Enero',
        '02' => 'Febrero',
        '03' => 'Marzo',
        '04' => 'Abril',
        '05' => 'Mayo',
        '06' => 'Junio',
        '07' => 'Julio',
        '08' => 'Agosto',
        '09' => 'Septiembre',
        '10' => 'Octubre',
        '11' => 'Noviembre',
        '12' => 'Diciembre',
    ];
    return date('d', strtotime($date)) . ' de ' . $months[date('m', strtotime($date))] . ' de ' . date('Y', strtotime($date));
}

function getMonth($number)
{
    $months = [
        '01' => 'Enero',
        '02' => 'Febrero',
        '03' => 'Marzo',
        '04' => 'Abril',
        '05' => 'Mayo',
        '06' => 'Junio',
        '07' => 'Julio',
        '08' => 'Agosto',
        '09' => 'Septiembre',
        '10' => 'Octubre',
        '11' => 'Noviembre',
        '12' => 'Diciembre',
    ];
    return $months[$number];
}

function formatCurrency($number)
{
    return number_format($number, 2);
}

?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Mantenimientos por año</title>


    <style>
        html {
            font-family: Arial, Helvetica, sans-serif;
            font-size: 10px;
        }



        @page {
            margin: 0cm 0cm;
        }

        body {
            margin-top: 1cm;
            margin-bottom: 1cm;
            margin-left: 1cm;
            margin-right: 1cm;
        }

        #watermark {
            position: fixed;
            top: 0px;
            right: 10px;
            opacity: 0.05;
            height: 21.8cm;
            width: 29.7cm;

            z-index: -1000;
        }

        .footer {
            position: fixed;
            bottom: 0;
            left: 0;
            right: 0;
            text-align: center;
            font-size: 10px;
            color: #000000;
        }

        h2 {
            text-align: center;
        }

        table {
            font-family: Arial, Helvetica, sans-serif;
            border-collapse: collapse;
            width: 100%;
        }

        table td,
        table th {
            border: 1px solid #ddd;
            padding: 8px;
            font-size: 12px;
        }

        table tr:nth-child(even) {
            background-color: #f2f2f2;
        }

        table tr:hover {
            background-color: #ddd;
        }

        table th {
            padding-top: 12px;
            padding-bottom: 12px;
            text-align: left;
            background-color: #BBBBBB;
            color: black;
            font-size: 12px;
        }
    </style>

</head>


<body>
    <div class="footer"></div>
    <div id="watermark">
        <img src="img/marca_horizontal.png" height="100%" width="100%" />
    </div>
    <main>
        <img src="img/logo.png" style="width: 200px;">
        <h2>
            Reporte de mantenimientos - {{ date('Y') }}
        </h2>

        <table>
            <tr>
                <th>Placa</th>
                <th>CIV</th>
                <th>Fecha elaboración</th>
                <th>Folio</th>
                <th>Fecha ingreso</th>
                <th>Fecha salida</th>
                <th>Taller asignación</th>
                <th>Servicio solicitado</th>
                <th>Servicio realizado</th>
                <th>Importe</th>
                <th>Folio fiscal</th>
                <th>Folio afectación</th>
                <th>Estado</th>

            </tr>
            @foreach ($mantenimientos as $mantenimiento)
                <tr>
                    <td>
                        {{ $mantenimiento->vehiculo->placa }}
                    </td>
                    <td>
                        {{ $mantenimiento->vehiculo->civ }}
                    </td>
                    <td>{{ $mantenimiento->folio }}</td>
                    <td>{{ formatDate($mantenimiento->fecha_elaboracion) }}</td>
                    <td>{{ formatDate($mantenimiento->fecha_ingreso) }}</td>
                    <td>{{ formatDate($mantenimiento->fecha_salida) }}</td>
                    <td>{{ $mantenimiento->taller_asignacion }}</td>
                    <td>{{ $mantenimiento->servicio_solicitado }}</td>
                    <td>{{ $mantenimiento->servicio_realizado }}</td>
                    <td>${{ formatCurrency($mantenimiento->importe) }}</td>
                    <td>
                        @if ($mantenimiento->folio_fiscal)
                            {{ $mantenimiento->folio_fiscal }}
                        @else
                            Sin folio fiscal
                        @endif
                    </td>
                    <td>
                        @if ($mantenimiento->folio_afectacion)
                            {{ $mantenimiento->folio_afectacion }}
                        @else
                            Sin folio afectación
                        @endif
                    </td>
                    <td>{{ $mantenimiento->estado }}</td>

                </tr>
            @endforeach
        </table>

    </main>
    <script type="text/php">
        if (isset($pdf)) {

            $font = $fontMetrics->get_font('Arial, sans-serif', 'normal');
            $size = 10;                       // Tamaño de la letra
            $color = array(0, 0, 0);          // Negro (RGB)


            $x = 350;
            $y = 575;


            $text = "SIC-".date('d/m/Y-H:i') . " - Página {PAGE_NUM} de {PAGE_COUNT}";

            $pdf->page_text($x, $y, $text, $font, $size, $color);
        }
    </script>
</body>

</html>
