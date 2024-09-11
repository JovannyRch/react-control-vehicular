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
            'numero_economico' => $this->faker->word,
            'marca' => $this->faker->randomElement(['Chevrolet', 'Ford', 'Nissan', 'Toyota']),
            'tipo' => $this->faker->randomElement(['Sedan', 'Pickup', 'Van', 'SUV']),
            'modelo' => $this->faker->randomElement(['2020', '2021', '2022', '2023']),
            'placa' => $this->faker->word,
            'no_serie' => $this->faker->word,
            'no_motor' => $this->faker->word,
            'area_asignacion' => $this->faker->randomElement(['Administracion', 'Ventas', 'Almacen', 'Produccion']),
            'resguardante' => $this->faker->word,
            'plantilla' => $this->faker->randomElement(['2019', '2023', '2024', 'propia']),
            'estado' => $this->faker->randomElement(['vigente', 'baja', 'tramite_de_baja', 'problemas_legales']),
            'detalle' => $this->faker->text()
        ];
    }
}
