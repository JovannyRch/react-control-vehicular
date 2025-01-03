<?php

use App\Http\Controllers\AccesoriosController;
use App\Http\Controllers\CargaCombustibleController;
use App\Http\Controllers\FacturaController;
use App\Http\Controllers\FileController;
use App\Http\Controllers\HistorialController;
use App\Http\Controllers\MantenimientosController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ReportesController;
use App\Http\Controllers\VehiculoController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {

    return redirect()->route('login');
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');


Route::get('/vehiculos/pdf', [VehiculoController::class, 'pdf'])->middleware('auth', 'verified')->name('vehiculos.pdf');
Route::get('/vehiculo/pega_ticket/{factura}', [VehiculoController::class, 'pegaTicket'])->middleware('auth', 'verified')->name('vehiculo.pega_ticket');
Route::get('/mantenimiento/{mantenimiento}', [MantenimientosController::class, 'show'])->middleware('auth', 'verified')->name('mantenimiento.show');
Route::get('/vehiculo/pdf/{vehiculo}', [VehiculoController::class, 'detailPdf'])->middleware('auth', 'verified')->name('vehiculo.pdf');
Route::resource('vehiculos', VehiculoController::class)->middleware('auth', 'verified');

Route::get('/reportes', [ReportesController::class, 'index'])->middleware('auth', 'verified')->name('reportes.index');
Route::get('/reportes/vehiculos-por-marca', [ReportesController::class, 'vehiculosPorMarca'])->middleware('auth', 'verified')->name('reportes.vehiculosPorMarca');
Route::get('/reportes/gastos-combustibles', [ReportesController::class, 'gastosCombustible'])->middleware('auth', 'verified')->name('reportes.gastosCombustible');
Route::get('/reportes/mantenimientos-por-anio', [ReportesController::class, 'mantenimientos'])->middleware('auth', 'verified')->name('reportes.mantenimientosPorAnio');


//Delete single vehicle
Route::delete('/vehicles/destroy-all', [VehiculoController::class, 'destroyAll'])->middleware('auth', 'verified')->name('vehiculos.destroyAll');
Route::delete('/vehicles/{vehiculo}', [VehiculoController::class, 'destroy'])->middleware('auth', 'verified')->name('vehiculos.destroy');

Route::get('/admin/vehiculos', [VehiculoController::class, 'adminVehiculos'])->middleware('auth', 'verified')->name('admin.vehiculos');
Route::resource('historial', HistorialController::class)->middleware('auth', 'verified');
Route::resource('mantenimiento', MantenimientosController::class)->middleware('auth', 'verified');
Route::resource('accesorio', AccesoriosController::class)->middleware('auth', 'verified');
Route::resource('carga_combustible', CargaCombustibleController::class)->middleware('auth', 'verified');
Route::post('/factura/{vehiculo}', [FacturaController::class, 'store'])->middleware('auth', 'verified')->name('factura.store');
Route::get('/files/single', [FileController::class, 'single'])->middleware('auth', 'verified')->name('files.ui.single');
Route::get('/files/packages', [FileController::class, 'packages'])->middleware('auth', 'verified')->name('files.ui.packages');
Route::get('/files', [FileController::class, 'index'])->middleware('auth', 'verified')->name('files.ui');
Route::post('/files/upload/package', [FileController::class, 'uploadPackagedCSV'])->middleware('auth', 'verified')->name('files.upload.package');
Route::post('/files/upload', [FileController::class, 'uploadCSV'])->middleware('auth', 'verified')->name('files.upload');

Route::post('/upload-csv', [FileController::class, 'uploadSingleCSV'])->name('upload.csv');
Route::post('/upload-vehicles', [FileController::class, 'uploadVehicles'])->name('upload.vehicles');
Route::get('/download-pdf/{groupKey}', [FileController::class, 'downloadPDF'])->name('download.pdf');
Route::get('/download-package/{cacheKey}/{packageId}', [FileController::class, 'downloadPackage'])->name('download.package');


Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';
