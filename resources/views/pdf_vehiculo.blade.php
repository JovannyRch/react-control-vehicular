<?php

//Create an array of months in spanish

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
    <title>Reporte - Vehículo
        #{{ $vehiculo->id }}
    </title>

    <style>
        /* detail field */
        html {
            font-family: Arial, Helvetica, sans-serif;
            font-size: 10px;
        }

        .details {
            border-collapse: collapse;
            width: 100%;
            font-size: 10px;
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
            font-size: 8px;
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
            background-color: #BBBBBB;
            color: black;
            font-size: 8px;
        }

        #title {
            font-family: Arial, Helvetica, sans-serif;
            text-align: center;
            font-size: 14px;
        }

        .mark {
            position: absolute;
            top: -20px;
            right: -40px;
            width: 100%;
            opacity: 0.1;
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
    </style>

</head>


<body>
    <div id="watermark">
        <img src="img/marca_horizontal.png" height="100%" width="100%" />
    </div>
    <main>
        <img src="img/logo.png" style="width: 200px;">
        <h2 style="text-align: center;">Detalles del vehículo</h2>
        <table class="details">
            <tr>
                <td class="value"><strong># Económico</strong></td>
                <td class="value">{{ $vehiculo->numero_economico }}</td>
                <td class="value"><strong>Marca</strong></td>
                <td class="value">{{ $vehiculo->marca }}</td>
            </tr>

            <tr>
                <td class="value"><strong>Modelo</strong></td>
                <td class="value">{{ $vehiculo->modelo }}</td>
                <td class="value"><strong>Placa</strong></td>
                <td class="value">{{ $vehiculo->placa }}</td>
            </tr>


            <tr>
                <td class="value"><strong>Tipo</strong></td>
                <td class="value">{{ $vehiculo->tipo }}</td>
                <td class="value"><strong># Serie</strong></td>
                <td class="value">{{ $vehiculo->no_serie }}</td>
            </tr>


            <tr>
                <td class="value"><strong># Motor</strong></td>
                <td class="value">{{ $vehiculo->no_motor }}</td>

                <td class="value"><strong>Área asignación</strong></td>
                <td class="value">{{ $vehiculo->area_asignacion }}</td>
            </tr>
            <tr>
                <td class="value"><strong>Resguardante</strong></td>
                <td class="value">{{ $vehiculo->resguardante }}</td>

                <td class="value"><strong>Plantilla</strong></td>
                <td class="value">{{ $vehiculo->plantilla }}</td>
            </tr>
            <tr>
                <td class="value"><strong>CIV</strong></td>
                <td class="value">{{ $vehiculo->civ }}</td>

                <td></td>
                <td></td>
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
            <div class="detail">
                <strong>Detalles</strong>
                <br>
                <p>
                    {{ $vehiculo->detalle }}
                </p>
            </div>
        @endif

        <br><br>
        @if ($loadFuel)
            @if (sizeof($cargas) > 0)
                <h2 id="title">Cargas de combustible
                    @if ($month)
                        de {{ getMonth($month) }}
                    @endif
                    @if ($year)
                        {{ $year }}
                    @endif

                </h2>
                <div>
                    <strong>Total de cargas: </strong> {{ sizeof($cargas) }} &nbsp;&nbsp;
                    <strong>Total de litros: </strong> {{ number_format($total_litros) }} &nbsp;&nbsp;
                    <strong>Total de importe: </strong> ${{ formatCurrency($total_importe) }}
                </div>
                <br>

                <table id="cargas">
                    <thead>
                        <tr>
                            <th>Fecha</th>
                            <th>Importe</th>
                            <th>Litros</th>
                            <th>Odom Ini</th>
                            <th>Odom Fin</th>
                            <th>Km recorridos</th>
                            <th>Rendimiento</th>
                        </tr>
                    </thead>
                    <tbody>
                        @foreach ($cargas as $carga)
                            <tr>
                                <td>{{ formatDate($carga->fecha) }}</td>
                                <td>${{ $carga->importe }}</td>
                                <td>{{ $carga->litros }}</td>
                                <td>{{ $carga->odometro_inicial }}</td>
                                <td>{{ $carga->odometro_final }}</td>
                                <td>{{ $carga->kilometrosRecorridos() }}</td>
                                <td>{{ $carga->getRendimiento() }}</td>
                            </tr>
                        @endforeach
                    </tbody>
                </table>
            @else
                <h3 style="text-align: center;">Cargas</h3>
                <br>
                <p style="text-align: center;">No hay cargas registradas</p>
            @endif
        @elseif ($maintenance)
            @if (sizeof($mantenimientos) > 0)
                <h2 id="title">Mantenimientos
                    @if ($month)
                        de {{ getMonth($month) }}
                    @endif
                    @if ($year)
                        {{ $year }}
                    @endif
                </h2>
                <div>
                    <strong>Total de mantenimientos: </strong> {{ sizeof($mantenimientos) }}
                </div>
                <br>
                <table id="cargas">
                    <thead>
                        <tr>
                            <th>Fecha elaboración/th>
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
                    </thead>
                    <tbody>
                        @foreach ($mantenimientos as $mantenimiento)
                            <tr>
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
                    </tbody>
                </table>
            @else
                <h3 style="text-align: center;">Mantenimientos</h3>
                <br>
                <p style="text-align: center;">No hay mantenimientos registrados</p>
            @endif
        @elseif ($tools)
            @if (sizeof($accesorios) > 0)
                <h2 id="title">Accesorios
                </h2>
                <div>
                    <strong>Total de accesorios: </strong> {{ sizeof($accesorios) }}
                </div>
                <br>
                <table id="cargas">
                    <thead>
                        <tr>
                            <th>Fecha/th>
                            <th>Folio</th>
                            <th>Detalle</th>
                            <th>Persona encargada</th>
                            <th>Persona entregada</th>

                        </tr>
                    </thead>
                    <tbody>
                        @foreach ($accesorios as $accesorio)
                            <tr>
                                <td>{{ formatDate($accesorio->fecha) }}</td>
                                <td>{{ $accesorio->folio }}</td>
                                <td>{{ $accesorio->detalle }}</td>
                                <td>{{ $accesorio->persona_encargada }}</td>
                                <td>{{ $accesorio->persona_entregada }}</td>
                            </tr>
                        @endforeach
                    </tbody>
                </table>
            @else
                <h3 style="text-align: center;">Accesorios</h3>
                <br>
                <p style="text-align: center;">No hay accesorios registrados</p>
            @endif
        @else
            <h2 id="title">Historial</h2>

            @if (count($historial) > 0)
                <table id="cargas">
                    <thead>
                        <tr>
                            <th>Suceso</th>
                            <th>Fecha</th>
                        </tr>
                    </thead>
                    <tbody>
                        @foreach ($historial as $suceso)
                            <tr>
                                <td>{{ $suceso->detalle }}</td>
                                <td>
                                    {{ $suceso->created_at->format('d-m-Y') }}
                                </td>
                            </tr>
                        @endforeach
                    </tbody>
                </table>
            @else
                <br>
                <p style="text-align: center;">No hay historial registrado</p>
            @endif
        @endif
    </main>
</body>

</html>
