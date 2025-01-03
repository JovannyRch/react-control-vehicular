<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8">
    <title>PDF Test</title>

    <style>
        @page {
            margin: 60px;
        }

        body {
            font-family: sans-serif;
        }
    </style>
</head>

<body>
    <h1>Hola, PDF</h1>
    <p>Este es un PDF de prueba.</p>

    {{-- Script especial de Dompdf para footer --}}
    <script type="text/php">
        if (isset($pdf)) {
            // OJO: Requiere 'isPhpEnabled' => true en config/dompdf.php
            $font = $fontMetrics->get_font('Helvetica', 'normal');
            $size = 10;
            $color = [0, 0, 0]; // Negro
            $x = 50;
            $y = 770;          // Ajusta según tu margen
            $text = date('Y-m-d') . " | Página {PAGE_NUM} de {PAGE_COUNT}";

            $pdf->page_text($x, $y, $text, $font, $size, $color);
        }
    </script>
</body>

</html>