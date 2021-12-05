<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\FinancialController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/


Route::group(['middleware' => 'CORS'], function () {
    Route::post('register', [AuthController::class, 'cpSignUp']);
    Route::post('login', [AuthController::class, 'cpSignIn']);

    Route::middleware(['auth:api'])->group(function () {
        Route::get('getProfile', [FinancialController::class, 'cpGetCompanyProfile']);
        Route::get('getQuote', [FinancialController::class, 'cpGetCompanyQuote']);
    });
});
