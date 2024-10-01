<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Pega ticket - Vehículo
        #{{ $vehiculo->id }}
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
            background-color: white;
            height: calc(100% - 250px);
            border: 1px solid #aaa;

        }

        .boxes td {
            height: 120px;
            border: 1px solid #aaa;
            text-align: left;
            /* space between lines of text */
            line-height: 1.8;
        }
    </style>

</head>


<body>

    <table>
        <thead>
            <th>CIV</th>
            <th>PLACA</th>
            <th>SERIE</th>
            <th>MARCA</th>
            <th>TIPO</th>
            <th>MODELO</th>
        </thead>
        <tbody>
            <tr>
                <td>
                    {{ $vehiculo->civ }}
                </td>
                <td>
                    {{ $vehiculo->placa }}
                </td>
                <td>
                    {{ $vehiculo->no_serie }}
                </td>
                <td>
                    {{ $vehiculo->marca }}
                </td>
                <td>
                    {{ $vehiculo->tipo }}
                </td>
                <td>
                    {{ $vehiculo->modelo }}
                </td>
            </tr>

        </tbody>
    </table>
    <div class="spacer"></div>
    <table class="boxes">
        <thead>
            <th></th>
            <th></th>
            <th></th>
        </thead>
        <tbody>
            <tr>
                <td>
                    <div><strong>DÍA:</strong></div>
                    <div><strong>FOLIO:</strong></div>
                    <div><strong>ODÓMETRO:</strong></div>
                    <div><strong>CONSUMO: $</strong></div>
                </td>
                <td>
                    <div><strong>DÍA:</strong></div>
                    <div><strong>FOLIO:</strong></div>
                    <div><strong>ODÓMETRO:</strong></div>
                    <div><strong>CONSUMO: $</strong></div>
                </td>
                <td>
                    <div><strong>DÍA:</strong></div>
                    <div><strong>FOLIO:</strong></div>
                    <div><strong>ODÓMETRO:</strong></div>
                    <div><strong>CONSUMO: $</strong></div>
                </td>
            </tr>
        </tbody>
    </table>
</body>

</html>
