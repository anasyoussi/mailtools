<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\TranslateController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

// Route::get('/', function () {
//     redirect()->route('CreativeTranslation');
// }); 

Route::get('/method2', function() {
    return Inertia::render('Translation2'); 
}); 

Route::get('/', function () {
    return Inertia::render('Translate');
})->name('CreativeTranslation');

Route::post('translate', [TranslateController::class, 'translate'])->name('translate'); 


Route::get('/DuplicateImgs', function () { 
    return Inertia::render('DuplicateImg');
});


 

require __DIR__.'/auth.php';
