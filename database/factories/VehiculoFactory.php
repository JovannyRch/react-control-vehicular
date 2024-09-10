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
            'marca' => $this->faker->word,
            'tipo' => $this->faker->word,
            'modelo' => $this->faker->word,
            'placa' => $this->faker->word,
            'no_serie' => $this->faker->word,
            'no_motor' => $this->faker->word,
            'area_asignacion' => $this->faker->word,
            'resguardante' => $this->faker->word,
        ];
    }
}
