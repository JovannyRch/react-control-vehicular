<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Manetenimientos por año</title>


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
            Reporte de mantenimientos por año
        </h2>

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
