<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Vehiculo>
 */
class VehiculoFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array

    {
        return [
            'numero_economico' => $this->faker->unique()->numberBetween(1000, 9999),
            'marca' => $this->faker->randomElement(['Chevrolet', 'Ford', 'Nissan', 'Toyota']),
            'tipo' => $this->faker->randomElement(['Sedán', 'Pickup', 'Van', 'SUV']),
            'modelo' => $this->faker->numberBetween(1990, date('Y')),  // Modelos desde 1990 hasta el año actual
            'placa' => strtoupper($this->faker->regexify('[A-Z]{3}-[0-9]{3}')),  // Formato genérico de placas mexicanas
            'no_serie' => $this->faker->regexify('[A-HJ-NPR-Z0-9]{17}'),  // Número de serie vehicular estándar de 17 caracteres
            'no_motor' => $this->faker->regexify('[A-HJ-NPR-Z0-9]{8}'),  // Número de motor ficticio
            'area_asignacion' => $this->faker->randomElement(['Administración', 'Ventas', 'Almacén', 'Producción']),
            'resguardante' => $this->faker->name,  // Nombre de una persona
            'plantilla' => $this->faker->randomElement(['2019', '2023', '2024', 'propia']),
            'estado' => $this->faker->randomElement(['vigente', 'baja', 'tramite_de_baja', 'problemas_legales']),
            'detalle' => $this->faker->text(200)  // Texto descriptivo con un límite de 200 caracteres
        ];
    }
}
