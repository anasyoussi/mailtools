import React, { useState } from 'react';
import GuestLayout from '@/Layouts/GuestLayout'; 
import { Controlled as CodeMirror } from 'react-codemirror2';
import 'codemirror/lib/codemirror.css';
import 'codemirror/mode/xml/xml'; // for HTML
import 'codemirror/theme/material.css'; // optional: choose a theme
import { Head } from '@inertiajs/react';

const DuplicateImg = () => { 

  const [htmlTemplate, setHtmlTemplate] = useState('');
  const [modifiedHtml, setModifiedHtml] = useState('');

  const handleInputChange = (event) => {
    setHtmlTemplate(event.target.value);
  };

  const cleanEditors = () => {
    setHtmlTemplate(''); 
    setModifiedHtml(''); 
  }

  const duplicateImages = () => { 
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlTemplate, 'text/html');

    // Select all img elements
    const imgElements = doc.querySelectorAll('img');

    // Duplicate each img tag
    imgElements.forEach(imgElement => {
        // Clone the img element
        const duplicateImgElement = imgElement.cloneNode(true);

        // Remove the protocol from the src attribute
        const originalSrc = imgElement.getAttribute('src');
        const modifiedSrc = originalSrc ? originalSrc.replace(/^https?:/, '') : '';

        // Set the modified src attribute on the duplicate img element
        duplicateImgElement.setAttribute('src', modifiedSrc);

        // Insert the duplicate img element after the original img element
        imgElement.insertAdjacentElement('afterend', duplicateImgElement);
    });

    // Serialize the modified HTML back to string
    let modifiedHtmlString = new XMLSerializer().serializeToString(doc);

    // Replace '&gt;' and '&lt;' with '>' and '<' respectively
    modifiedHtmlString = modifiedHtmlString.replace(/&gt;/g, '>').replace(/&lt;/g, '<');

    // Update state with modified HTML
    setModifiedHtml(modifiedHtmlString);
  };
 

  console.log(modifiedHtml); 

  return (
    <GuestLayout >
      <Head title="Duplicate Images For Hotmail"></Head>
      
      <div className='flex gap-3 my-2'>
        <button className='border p-3' onClick={duplicateImages}>Duplicate Images</button>
        <button className='border p-3' onClick={cleanEditors}>Clean</button>
      </div>

      <div className='p-9'> 
          <CodeMirror
            value={htmlTemplate}
            options={{
              mode: 'xml',
              theme: 'material',
              lineNumbers: true, 
            }}
            onBeforeChange={(editor, data, value) => {
              setHtmlTemplate(value);
            }}   
            className="border rounded-md mb-5"  
          />   
          <CodeMirror
            value={modifiedHtml}
            options={{
              mode: 'xml',
              theme: 'material',
              lineNumbers: true, 
            }}  
            className="border rounded-md" 
          /> 
      </div>

      {modifiedHtml.length > 0 ? (
        <>
            <h2 className='px-9'>Modified HTML:</h2>
            <div className='p-9'>
                <iframe
                    title="Modified HTML"
                    srcDoc={modifiedHtml}
                    style={{ width: '100%', height: '400px', border: '1px solid #ccc' }}
                />
            </div>
        </>
      ) : ""}

    </GuestLayout>
  )
}

export default DuplicateImg