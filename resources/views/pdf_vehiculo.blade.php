<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Reporte - Vehículo
        #{{ $vehiculo->id }}
    </title>

    <style>
        /* detail field */
        .detail {
            font-family: Arial, Helvetica, sans-serif;
            border-collapse: collapse;
            width: 100%;
        }

        .value {
            border: 1px solid #ddd;
            padding: 8px;
        }

        #cargas {
            font-family: Arial, Helvetica, sans-serif;
            border-collapse: collapse;
            width: 100%;
        }

        #cargas td,
        #cargas th {
            border: 1px solid #ddd;
            padding: 8px;
        }

        #cargas tr:nth-child(even) {
            background-color: #f2f2f2;
        }

        #cargas tr:hover {
            background-color: #ddd;
        }

        #cargas th {
            padding-top: 12px;
            padding-bottom: 12px;
            text-align: left;
            background-color: #04AA6D;
            color: white;
        }

        #title {
            text-align: center;
        }
    </style>

</head>


<body>

    <h2 id="title">Detalles del vehículo</h2>
    <table class="detail">
        <tr>
            <td class="value"><strong># Económico</strong></td>
            <td class="value">{{ $vehiculo->numero_economico }}</td>
        </tr>
        <tr>
            <td class="value"><strong>Marca</strong></td>
            <td class="value">{{ $vehiculo->marca }}</td>
        </tr>
        <tr>
            <td class="value"><strong>Modelo</strong></td>
            <td class="value">{{ $vehiculo->modelo }}</td>
        </tr>
        <tr>
            <td class="value"><strong>Placa</strong></td>
            <td class="value">{{ $vehiculo->placa }}</td>
        </tr>

        <tr>
            <td class="value"><strong>Tipo</strong></td>
            <td class="value">{{ $vehiculo->tipo }}</td>
        </tr>
        <tr>
            <td class="value"><strong># Serie</strong></td>
            <td class="value">{{ $vehiculo->no_serie }}</td>
        </tr>

        <tr>
            <td class="value"><strong># Motor</strong></td>
            <td class="value">{{ $vehiculo->no_motor }}</td>
        </tr>
        <tr>
            <td class="value"><strong>Área asignación</strong></td>
            <td class="value">{{ $vehiculo->area_asignacion }}</td>
        </tr>
        <tr>
            <td class="value"><strong>Resguardante</strong></td>
            <td class="value">{{ $vehiculo->resguardante }}</td>
        </tr>

        <tr>
            <td class="value"><strong>Plantilla</strong></td>
            <td class="value">{{ $vehiculo->plantilla }}</td>
        </tr>

        @if ($vehiculo->plantilla === 'propia')
            <tr>
                <td class="value"><strong>Estado</strong></td>
                <td class="value">{{ $vehiculo->estado }}</td>
            </tr>
        @endif

    </table>

    <br>

    @if ($vehiculo->detalle)
        <strong>Detalles</strong>
        <br>
        <p>
            {{ $vehiculo->detalle }}
        </p>
    @endif

    <br><br>
    @if (sizeof($cargas) > 0)
        <h2 id="title">Cargas de combustible</h2>
        {{-- Total --}}
        <table class="detail">

            <tr>
                <td class="value"><strong>Total importe</strong></td>
                <td class="value">${{ $total_importe }}</td>
            </tr>
            <tr>
                <td class="value"><strong>Total litros</strong></td>
                <td class="value">{{ $total_litros }}</td>
            </tr>
        </table>
        <br>

        <table id="cargas">
            <thead>
                <tr>
                    <th>Fecha</th>
                    <th>Importe</th>
                    <th>Litros</th>
                </tr>
            </thead>
            <tbody>
                @foreach ($cargas as $carga)
                    <tr>
                        <td>{{ $carga->fecha }}</td>
                        <td>${{ $carga->importe }}</td>
                        <td>{{ $carga->litros }}</td>
                    </tr>
                @endforeach
            </tbody>
        </table>
    @else
        <h2 id="title">Cargas</h2>
        <p>No hay cargas registradas</p>
    @endif
</body>

</html>