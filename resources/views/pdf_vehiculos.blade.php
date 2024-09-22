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
    </style>
</head>

<body>

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

</body>

</html>
