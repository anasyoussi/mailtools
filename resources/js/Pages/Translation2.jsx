import GuestLayout from '@/Layouts/GuestLayout';
import React, { useState, useRef, useEffect } from 'react';
import { Controlled as CodeMirror } from 'react-codemirror2';
import 'codemirror/lib/codemirror.css';
import 'codemirror/mode/xml/xml'; // for HTML
import 'codemirror/theme/material.css'; // optional: choose a theme

const HTMLTranslator = () => {
  const [htmlInput, setHtmlInput] = useState('');
  const [iframeContent, setIframeContent] = useState('');
  const iframeRef = useRef(null);
  const [translatedHTML, setTranslatedHTML] = useState('');

  const handleRenderButtonClick = () => {
    setIframeContent(htmlInput);
  };

  const cleanUpGoogleTranslate = () => {
    const iframe = iframeRef.current;
    const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
    const skipTranslateDiv = iframeDoc.querySelector('.skiptranslate');
    if (skipTranslateDiv) {
      const googleTranslateIframe = skipTranslateDiv.querySelector('iframe');
      if (googleTranslateIframe) {
        googleTranslateIframe.remove();
      }
      const googleTeGadgetDiv = iframeDoc.querySelector('.skiptranslate.goog-te-gadget');
      if (googleTeGadgetDiv) {
        googleTeGadgetDiv.remove();
      }
    }
  };

  const copyTranslatedHTML = () => {
    // Get the reference to the iframe
    const iframe = iframeRef?.current?.contentWindow.document;

    // Get the HTML source code of the iframe document
    const iframeSource = iframe.documentElement.outerHTML;

    // Create a temporary textarea element
    const tempTextArea = document.createElement('textarea');

    // Set the value of the textarea to the HTML source code
    tempTextArea.value = iframeSource;

    // Append the textarea to the document body
    document.body.appendChild(tempTextArea);

    // Select the text inside the textarea
    tempTextArea.select();

    // Copy the selected text to the clipboard
    document.execCommand('copy');

    // Remove the temporary textarea
    document.body.removeChild(tempTextArea);

    // Optionally, you can provide feedback to the user
    alert('Iframe source code copied to clipboard!');
  };

  const displayTranslatedHTML = () => {
    const iframe = iframeRef.current;
    const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
    const translatedHtml = iframeDoc.documentElement.outerHTML;
    setTranslatedHTML(translatedHtml);
  };

  useEffect(() => {
    if (iframeContent) {
      const iframe = iframeRef.current;
      const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
      iframeDoc.open();
      iframeDoc.write(iframeContent);
      iframeDoc.close();

      // Inject the Google Translate div
      const translateDiv = iframeDoc.createElement('div');
      translateDiv.id = 'google_translate_element';
      iframeDoc.body.appendChild(translateDiv);

      // Inject the Google Translate initialization script
      const translateScript = iframeDoc.createElement('script');
      translateScript.type = 'text/javascript';
      translateScript.text = `
        function googleTranslateElementInit() {
          new google.translate.TranslateElement({pageLanguage: 'en'}, 'google_translate_element');
        }
      `;
      iframeDoc.body.appendChild(translateScript);

      // Load the Google Translate API script
      const apiScript = iframeDoc.createElement('script');
      apiScript.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
      iframeDoc.body.appendChild(apiScript);
    }

    
  }, [iframeContent]);
  
  console.log(iframeRef?.current?.contentWindow.document.body); 
  

  return (
    <GuestLayout>
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">HTML Translator</h1>
        <div className="form-group mb-4">
          <label htmlFor="html_input" className="block text-sm font-medium text-gray-700 mb-2">HTML Input:</label>
          <CodeMirror
            value={htmlInput}
            options={{
              mode: 'xml',
              theme: 'material',
              lineNumbers: true
            }}
            onBeforeChange={(editor, data, value) => {
              setHtmlInput(value);
            }}
            className="border rounded-md"
          />
        </div>
        <div className="flex items-center space-x-4 mb-4">
          <button
            type="button"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={handleRenderButtonClick}
          >
            Render HTML
          </button>
          {iframeContent && (
            <>
              <button
                type="button"
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                onClick={cleanUpGoogleTranslate}
              >
                Clean up Google Translate
              </button>
              <button
                type="button"
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                onClick={copyTranslatedHTML}
              >
                Copy Translated HTML
              </button>
              <button
                type="button"
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                onClick={displayTranslatedHTML}
              >
                Display Translated HTML
              </button>
            </>
          )}
        </div>

        <h2 className="text-xl font-semibold mt-6 mb-2">Rendered HTML</h2>
        <iframe
          id='result'
          ref={iframeRef}
          style={{ width: '100%', height: '300px', border: '1px solid #ccc' }}
          title="Rendered HTML"
          className="border rounded-md"
        ></iframe>
      </div>
    </GuestLayout>
  );
};

export default HTMLTranslator;
