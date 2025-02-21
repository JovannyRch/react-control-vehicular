<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Vehiculo;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {


        User::create([
            'name' => 'Admin1',
            'email' => 'Admin1@mail.com',
            'username' => 'Admin1',
            'role' => 'ADMIN',
            'password' => bcrypt('Admin@1234$'),
            'passsword_copy' => 'Admin@1234$',
        ]);


        User::create([
            'name' => 'Admin2',
            'email' => 'Admin2@mail.com',
            'username' => 'Admin2',
            'role' => 'ADMIN',
            'password' => bcrypt('Admin@5678$?'),
            'passsword_copy' => 'Admin@5678$?',
        ]);

        User::create([
            'name' => 'Admin3',
            'email' => 'Admin3@mail.com',
            'username' => 'Admin3',
            'role' => 'ADMIN',
            'password' => bcrypt('Admin@91011$/'),
            'passsword_copy' => 'Admin@91011$/',
        ]);

        User::create([
            'name' => 'fuel_user1',
            'email' => 'fuel_user1@mail.com',
            'username' => 'fuel_user1',
            'role' => 'FUEL',
            'password' => bcrypt('Fuel@123$'),
            'passsword_copy' => 'Fuel@123$',
        ]);

        User::create([
            'name' => 'fuel_user2',
            'email' => 'fuel_user2@mail.com',
            'username' => 'fuel_user2',
            'role' => 'FUEL',
            'password' => bcrypt('Fuel@456$?'),
            'passsword_copy' => 'Fuel@456$?',
        ]);

        User::create([
            'name' => 'fuel_user3',
            'email' => 'fuel_user3@mail.com',
            'username' => 'fuel_user3',
            'role' => 'FUEL',
            'password' => bcrypt('Fuel@789$/'),
            'passsword_copy' => 'Fuel@789$/',
        ]);

        User::create([
            'name' => 'fuel_user4',
            'email' => 'fuel_user4@mail.com',
            'username' => 'fuel_user4',
            'role' => 'FUEL',
            'password' => bcrypt('Fuel@101112$&'),
            'passsword_copy' => 'Fuel@101112$&',
        ]);

        User::create([
            'name' => 'maint_access1',
            'email' => 'maint_access1@mail.com',
            'username' => 'maint_access1',
            'role' => 'MAINT',
            'password' => bcrypt('Maint@123$'),
            'passsword_copy' => 'Maint@123$',
        ]);

        User::create([
            'name' => 'maint_access2',
            'email' => 'maint_access2@mail.com',
            'username' => 'maint_access2',
            'role' => 'MAINT',
            'password' => bcrypt('Maint@456$#'),
            'passsword_copy' => 'Maint@456$#',
        ]);

        User::create([
            'name' => 'maint_access3',
            'email' => 'maint_access3@mail.com',
            'username' => 'maint_access3',
            'role' => 'MAINT',
            'password' => bcrypt('Maint@789$&'),
            'passsword_copy' => 'Maint@789$&',
        ]);

        User::create([
            'name' => 'maint_access4',
            'email' => 'maint_access4@mail.com',
            'username' => 'maint_access4',
            'role' => 'MAINT',
            'password' => bcrypt('Maint@456$%'),
            'passsword_copy' => 'Maint@456$%',
        ]);

        //Vehiculo::factory(50)->create();
    }
}
