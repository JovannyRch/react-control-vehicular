<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Pega ticket - Vehículo
        #{{ $data[0][array_keys($data[0])[0]] }}
    </title>

    <style>
        html {
            font-family: Arial, Helvetica, sans-serif;
            font-size: 13px;
        }

        th {
            background-color: #818180;
            color: white;
            padding: 5px 8px;
            border: 1px solid #ddd;
        }

        table {
            width: 100%;
        }

        td {
            text-align: center;
            border: 1px solid rgb(80, 80, 80);
            padding: 5px 8px;
        }

        .grid {
            display: inline;
            margin-top: 8px;
        }

        .box {
            display: inline-block;
            width: calc(100%/3);
            height: 50%;
            border: 1px solid #aaa;
        }

        .spacer {
            height: 10px;
        }

        .boxes table {
            width: 100%;
        }

        .boxes th {
            background-color: transparent;
            height: calc(100% - 280px);
            border: 1px solid #aaa;

        }

        .boxes td {
            height: 110px;
            border: 1px solid #aaa;
            text-align: left;
            min-width: calc(100%/3);
            line-height: 1.8;
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
            width: 21.8cm;
            height: 29.7cm;
            z-index: -1000;
        }

        .index {
            height: 10px;
            text-align: right;
            font-weight: bold;
        }
    </style>

</head>


<body>
    <div id="watermark">
        <img src="img/marca_vertical.png" height="100%" width="100%" />
    </div>
    <main>

        @for ($i = 0; $i < $total_pages; $i++)
            <img src="img/logo.png" style="width: 200px;">

            <table>
                <thead>
                    <th>FACTURA</th>
                    <th>CIV</th>
                    <th>PLACA</th>
                    <th>SERIE</th>
                    <th>MARCA</th>

                    <th>MODELO</th>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            {{ $factura['FOLIO'] }}
                        </td>
                        <td>
                            {{ $vehiculo['CIV'] }}
                        </td>
                        <td>
                            {{ $vehiculo['PLACA'] }}
                        </td>
                        <td>
                            {{ $vehiculo['NUM SERIE'] }}
                        </td>
                        <td>
                            {{ $vehiculo['MARCA'] }}
                        </td>

                        <td>
                            {{ $vehiculo['MOD'] }}
                        </td>
                    </tr>

                </tbody>
            </table>
            <div class="spacer"></div>
            <table class="boxes">
                <thead>
                    @foreach ($cargas_per_page[$i] as $carga)
                        <th>

                        </th>
                    @endforeach
                </thead>
                <tbody>
                    <tr>
                        @foreach ($cargas_per_page[$i] as $carga)
                            <td>
                                <div><strong>DÍA:</strong> {{ $carga['FECHA'] }}</div>
                                <div><strong>FOLIO:</strong> {{ $carga['NUM FOLIO'] }}</div>
                                <div><strong>ODÓMETRO:</strong>
                                    {{ $carga['ODOMETRO'] }}
                                </div>
                                <div><strong>CONSUMO: </strong> {{ $carga['  IMPORTE  '] }}</div>
                            </td>
                        @endforeach


                    </tr>
                </tbody>
            </table>
            @if (isset($index))
                <div class="index">
                    {{ $index }}
                </div>
            @endif
        @endfor
    </main>
</body>

</html>
