<?php

namespace Modules\Auth\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        try {
            $credentials = $request->validate([
                'email' => 'required|string|email',
                'password' => 'required|string',
            ]);

            if (!Auth::attempt($credentials)) {
                return response()->json(['error' => 'Invalid credentials', 'message' => 'As credenciais informadas são inválidas.'], Response::HTTP_UNAUTHORIZED);
            }

            $user = Auth::user();
            $token = $user->createToken('auth_token')->plainTextToken;

            Log::info('User logged in successfully', ['user_id' => $user->id, 'email' => $user->email]);
            return response()->json([
                'message' => 'User logged in successfully', 
                'data' => ['user' => $user, 'token' => $token], 
                'success' => true
            ], Response::HTTP_OK);
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json(['error' => 'Failed to login user', 'message' => 'Falha ao fazer login do usuário.', 'messages' => $e->errors()], Response::HTTP_UNPROCESSABLE_ENTITY);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Failed to login user', 'message' => 'Falha ao fazer login do usuário.', 'messages' => $e->getMessage()], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
    
    public function register(Request $request)
    {
        sleep(3);
        try {
            $data = $request->validate([
                "nome" => 'required|string|max:255',
                "username" => 'required|string|max:255|unique:users',
                "email" => 'required|string|email|max:255|unique:users',
                "password" => 'required|string|min:8|confirmed',
            ]);

            $user = User::create([
                'nome' => $data['nome'],
                'username' => $data['username'],
                'email' => $data['email'],
                'password' => $data['password'],
            ]);

            $token = $user->createToken('auth_token')->plainTextToken;

            Log::info('User registered successfully', ['user_id' => $user->id, 'email' => $user->email]);
            return response()->json([
                'message' => 'User registered successfully', 
                'data' => ['user' => $user, 'token' => $token], 
                'success' => true
            ], Response::HTTP_CREATED);
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json(['error' => 'Validation failed', 'messages' => $e->errors()], Response::HTTP_UNPROCESSABLE_ENTITY);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Failed to register user', 'message' => $e->getMessage()], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function logout(Request $request)
    {
        try {
            $request->user()->currentAccessToken()->delete();
            return response()->json(['message' => 'User logged out successfully', 'success' => true], Response::HTTP_OK);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Failed to logout user', 'message' => $e->getMessage()], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function user(Request $request)
    {
        return response()->json(['user' => $request->user()], Response::HTTP_OK);
    }
}
