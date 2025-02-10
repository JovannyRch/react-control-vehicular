<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;

class UsersController extends Controller
{
    //store
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required',
            'email' => 'required',
            'password' => 'required',
            'role' => 'required',
        ]);



        $user = new User();
        $user->username = $request->name;
        $user->name  = $request->name;
        $user->email = $request->email;
        $user->passsword_copy = $request->password;
        $user->password = Hash::make($request->password);
        $user->role = $request->role;

        $user->save();

        return redirect()->route('admin.users');
    }

    public function update(Request $request, User $user)
    {
        $request->validate([
            'name' => 'required',
            'email' => 'required',
            'role' => 'required',
            'password' => 'required',
        ]);



        $user->name = $request->name;
        $user->username = $request->name;
        $user->email = $request->email;
        $user->role = $request->role;
        $user->password = Hash::make($request->password);
        $user->passsword_copy = $request->password;

        $user->save();

        return redirect()->route('admin.users');
    }

    public function destroy(User $user)
    {
        $user->delete();
        return redirect()->route('admin.users');
    }

    public function admin()
    {
        $pagination = User::paginate(50);

        return Inertia::render('Usuarios/Admin', [
            'pagination' => $pagination
        ]);
    }
}
