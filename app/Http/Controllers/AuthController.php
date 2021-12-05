<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Validator;

class AuthController extends BaseController
{
    public function cpSignIn(Request $request) //, AuthService $AuthService)
    {
        // return response(['message' => $AuthService->doSomethingUseful()], 200);
        $validator = Validator::make($request->all(), [
            'email' => 'required|string|email|max:255',
            'password' => 'required|string|min:8',
            'rememberMe' => 'boolean'
        ]);
        if ($validator->fails()) {
            return $this->cpResponse(['success' => false, 'errors' => $validator->errors()->all()], 422);
        }
        $mUser = User::where('email', $request['email'])->first();
        if ($mUser) {
            $userRole = $mUser->role;
            if ($userRole) {
                $this->scope = $userRole->role;
            }
            if (Hash::check($request['password'], $mUser->password)) {
                $tokenObj = $mUser->createToken($mUser->email . '-' . now());
                if ($request['rememberMe']) {
                    $tokenObj->token->expires_at = Carbon::now()->addWeeks(1);
                }
                $tokenObj->token->save();
                return response([
                    'access_token' => $tokenObj->accessToken,
                    // 'refresh_token' => $tokenObj->refreshToken,
                    'token_type' => 'Bearer',
                    'expires_at' => Carbon::parse($tokenObj->token->expires_at)->toDateTimeString()
                ], 200);
            } else {
                return response(['message' => 'Password mismatch'], 422);
            }
        }
    }

    public function cpSignUp(Request $request)
    {
        $mValidator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => [
                'required',
                'string',
                'min:8',
                'regex:/[a-z]/',      // must contain at least one lowercase letter
                'regex:/[A-Z]/',      // must contain at least one uppercase letter
                'regex:/[0-9]/',      // must contain at least one digit
                'regex:/[@$!%*#?&]/', // must contain a special character
                'confirmed'
            ],
            'password_confirmation' => 'same:password'
        ]);
        
        if ($mValidator->fails()) {
            // 422 Unprocessable Entity - occurs when a request is well-formed, however, due to semantic errors it is unable to be processed.
            return $this->cpFailureResponse(422, $mValidator->failed());
        }
        $request['password'] = Hash::make($request['password']);
        $request['rememberToken'] = Str::random(10);
        $mUser = User::create($request->toArray());
        $token = $mUser->createToken('financial app user')->accessToken;
        return $this->cpResponseWithResults(['token' => $token], 200);
    }
}
