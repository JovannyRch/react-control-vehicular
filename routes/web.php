<?php

use App\Http\Controllers\AccesoriosController;
use App\Http\Controllers\CargaCombustibleController;
use App\Http\Controllers\FacturaController;
use App\Http\Controllers\HistorialController;
use App\Http\Controllers\MantenimientosController;
use App\Http\Controllers\ProfileController;
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
Route::resource('historial', HistorialController::class)->middleware('auth', 'verified');
Route::resource('mantenimiento', MantenimientosController::class)->middleware('auth', 'verified');
Route::resource('accesorio', AccesoriosController::class)->middleware('auth', 'verified');
Route::resource('carga_combustible', CargaCombustibleController::class)->middleware('auth', 'verified');
Route::post('/factura/{vehiculo}', [FacturaController::class, 'store'])->middleware('auth', 'verified')->name('factura.store');



Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';
