import React, { useEffect } from 'react'   
import GuestLayout from '@/Layouts/GuestLayout';
import { Textarea } from "@/components/ui/textarea"; 
import { Button } from "@/components/ui/button"
import { Head, Link, useForm, usePage  } from '@inertiajs/react'
import Select from 'react-select'

const Translate = () => {

  const { translated_text } = usePage().props;

  const options = [
    { value: 'es', label: 'Spanish' },
    { value: 'de', label: 'German' },
    { value: 'en', label: 'English' },
    { value: 'it', label: 'Italian' },
    { value: 'fr', label: 'French' },
    { value: 'fi', label: 'Finnish' },
    { value: 'sv', label: 'Swedish' },
    { value: 'nl', label: 'Dutch' },
    { value: 'tr', label: 'Turkish' },
    { value: 'pl', label: 'Polish' },
    { value: 'vi', label: 'Vietnamese' },
    { value: 'fi', label: 'Finnish' },
    { value: 'no', label: 'Norwegian' },
    { value: 'da', label: 'Danish' }, 
    { value: 'hr', label: 'Croatian' },
    { value: 'cy', label: 'Welsh' },
    { value: 'eo', label: 'Esperanto' }, 
  ];
  

  const { data, setData, post, processing, errors, reset } = useForm({
    OriginalHtmlCode: '', 
    TranslatedHtmlCode: '',
    Language: '',
  });   

  const submit = (e) => {
    e.preventDefault();   
    console.log(data); 
    post(route('translate')); 
  }; 

  // Update state with initial value from props
  useEffect(() => {
    if (translated_text) {
        setData((prevData) => ({
            ...prevData,
            TranslatedHtmlCode: translated_text,
        }));
    }
  }, [translated_text]);
 


  return (
    <GuestLayout>

      <Head title="Translate Templates"></Head>

        <form onSubmit={submit} className='p-4'> 

          <div className='mt-5 flex gap-5 mb-5'>
              <Button className="border border-indigo-600 rounded">Translate</Button>
              <select value={data.Language} onChange={(e) => setData('Language', e.target.value)} className='px-10' required>
                <option value="" selected disabled>Select a Lang</option>
                <option value="en">English</option> 
                <option value="it">Italian</option> 
                <option value="fr">French</option> 
                <option value="du">Dutch</option>
                <option value="se">Swedish</option> 
                <option value="fi">Finnish</option> 
                <option value="de">German</option> 
              </select>
            </div> 

          <div className="w-full flex gap-5 min-h-96"> 

            <Textarea 
                value={data.OriginalHtmlCode} 
                onChange={(e) => setData('OriginalHtmlCode', e.target.value)} 
                name='OriginalHtmlCode' 
                className="rounded max-h-96" 
                placeholder="Type your HTML code here." 
            />

            <Textarea 
                value={data.TranslatedHtmlCode} 
                onChange={(e) => setData('TranslatedHtmlCode', e.target.value)} 
                name='TranslatedHtmlCode' className="rounded max-h-96" 
                placeholder="Your translated HTML code here." 
            />

          </div> 
 
        </form>
    </GuestLayout>
  )
}

export default Translate