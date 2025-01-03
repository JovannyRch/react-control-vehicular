<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Vehículos</title>
    <style>
        #vehicles {
            font-family: Arial, Helvetica, sans-serif;
            border-collapse: collapse;
            width: 100%;
        }

        #vehicles td,
        #vehicles th {
            border: 1px solid #ddd;
            padding: 8px;
            font-size: 12px;
        }

        #vehicles tr:nth-child(even) {
            background-color: #f2f2f2;
        }

        #vehicles tr:hover {
            background-color: #ddd;
        }

        #vehicles th {
            padding-top: 12px;
            padding-bottom: 12px;
            text-align: left;
            background-color: #BBBBBB;
            color: black;
            font-size: 12px;
        }

        #title {
            font-family: Arial, Helvetica, sans-serif;
            text-align: center;
            font-size: 14px;
        }

        .detail {
            font-family: Arial, Helvetica, sans-serif;
            border-collapse: collapse;
            width: 100%;
            font-size: 12px;
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

        @page {
            margin: 0;
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
    </style>
</head>

<body>
    <div class="footer">
    </div>

    <div id="watermark">
        <img src="img/marca_horizontal.png" height="100%" width="100%" />
    </div>
    <main>
        <img src="img/logo.png" style="width: 200px;">
        <h2 id="title">Reporte vehículos</h2>
        @if ($plantilla)
            <div class="detail">
                <strong>Plantilla: </strong> {{ $plantilla }} <br>
            </div>
        @endif
        @if ($estado && $plantilla === 'propia')
            <div class="detail">
                <strong>Estado: </strong> {{ $estado }} <br>
            </div>
        @endif
        <div class="detail">
            <strong>Fecha:</strong> {{ now()->format('d-m-Y') }}
        </div>
        <br>
        <br>
        <table id="vehicles">
            <thead>
                <tr>
                    <th>CIV</th>
                    <th># Económico</th>
                    <th>Marca</th>
                    <th>Tipo</th>
                    <th>Placa</th>
                    <th>Modelo</th>
                    <th># Motor</th>
                    <th># Serie</th>
                    <th>Área asignación</th>
                </tr>
            </thead>
            <tbody>
                @foreach ($vehiculos as $vehiculo)
                    <tr>
                        <td>{{ $vehiculo->civ }}</td>
                        <td>{{ $vehiculo->numero_economico }}</td>
                        <td>{{ $vehiculo->marca }}</td>
                        <td>{{ $vehiculo->tipo }}</td>
                        <td>{{ $vehiculo->placa }}</td>
                        <td>{{ $vehiculo->modelo }}</td>
                        <td>{{ $vehiculo->no_motor }}</td>
                        <td>{{ $vehiculo->no_serie }}</td>
                        <td>{{ $vehiculo->area_asignacion }}</td>
                    </tr>
                @endforeach
            </tbody>
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
