<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Stichoza\GoogleTranslate\GoogleTranslate;

class TranslateController extends Controller
{
    public function translate(Request $request)
    { 

        $request->validate([
            'OriginalHtmlCode' => 'required',
            'Language' => 'required'
        ]);

        $htmlInput = $request->input('OriginalHtmlCode');
        $language = $request->input('Language');

        // Using Google Translate API
        $tr = new GoogleTranslate();
        $tr->setTarget($language);

        // Extract text from HTML
        $dom = new \DOMDocument();
        @$dom->loadHTML($htmlInput);
        $xpath = new \DOMXPath($dom);
        $nodes = $xpath->query('//text()');

        foreach ($nodes as $node) {
            $translatedText = $tr->translate($node->nodeValue);
            $node->nodeValue = $translatedText;
        } 
        $translatedHtml = $dom->saveHTML(); 
        // dd($translatedHtml);  
        return Inertia::render('Translate', [
            'translated_text' => $translatedHtml,
        ]); 
    } 

}
