import React, { useState, useEffect } from 'react';
import { Globe, ChevronDown } from 'lucide-react';

export default function GoogleTranslateSwitcher() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('en');

  const ALL_LANGUAGES = [
    { code: 'af', name: 'Afrikaans' },
    { code: 'sq', name: 'Albanian' },
    { code: 'am', name: 'Amharic' },
    { code: 'ar', name: 'Arabic' },
    { code: 'hy', name: 'Armenian' },
    { code: 'az', name: 'Azerbaijani' },
    { code: 'eu', name: 'Basque' },
    { code: 'be', name: 'Belarusian' },
    { code: 'bn', name: 'Bengali' },
    { code: 'bs', name: 'Bosnian' },
    { code: 'bg', name: 'Bulgarian' },
    { code: 'ca', name: 'Catalan' },
    { code: 'ceb', name: 'Cebuano' },
    { code: 'ny', name: 'Chichewa' },
    { code: 'zh-CN', name: 'Chinese (Simplified)' },
    { code: 'zh-TW', name: 'Chinese (Traditional)' },
    { code: 'co', name: 'Corsican' },
    { code: 'hr', name: 'Croatian' },
    { code: 'cs', name: 'Czech' },
    { code: 'da', name: 'Danish' },
    { code: 'nl', name: 'Dutch' },
    { code: 'en', name: 'English' },
    { code: 'eo', name: 'Esperanto' },
    { code: 'et', name: 'Estonian' },
    { code: 'tl', name: 'Filipino' },
    { code: 'fi', name: 'Finnish' },
    { code: 'fr', name: 'French' },
    { code: 'fy', name: 'Frisian' },
    { code: 'gl', name: 'Galician' },
    { code: 'ka', name: 'Georgian' },
    { code: 'de', name: 'German' },
    { code: 'el', name: 'Greek' },
    { code: 'gu', name: 'Gujarati' },
    { code: 'ht', name: 'Haitian Creole' },
    { code: 'ha', name: 'Hausa' },
    { code: 'haw', name: 'Hawaiian' },
    { code: 'he', name: 'Hebrew' },
    { code: 'hi', name: 'Hindi' },
    { code: 'hmn', name: 'Hmong' },
    { code: 'hu', name: 'Hungarian' },
    { code: 'is', name: 'Icelandic' },
    { code: 'ig', name: 'Igbo' },
    { code: 'id', name: 'Indonesian' },
    { code: 'ga', name: 'Irish' },
    { code: 'it', name: 'Italian' },
    { code: 'ja', name: 'Japanese' },
    { code: 'jw', name: 'Javanese' },
    { code: 'kn', name: 'Kannada' },
    { code: 'kk', name: 'Kazakh' },
    { code: 'km', name: 'Khmer' },
    { code: 'ki', name: 'Kikuyu' },
    { code: 'rw', name: 'Kinyarwanda' },
    { code: 'ku', name: 'Kurdish' },
    { code: 'ky', name: 'Kyrgyz' },
    { code: 'lo', name: 'Lao' },
    { code: 'la', name: 'Latin' },
    { code: 'lv', name: 'Latvian' },
    { code: 'lt', name: 'Lithuanian' },
    { code: 'lb', name: 'Luxembourgish' },
    { code: 'mk', name: 'Macedonian' },
    { code: 'mg', name: 'Malagasy' },
    { code: 'ms', name: 'Malay' },
    { code: 'ml', name: 'Malayalam' },
    { code: 'mt', name: 'Maltese' },
    { code: 'mi', name: 'Maori' },
    { code: 'mr', name: 'Marathi' },
    { code: 'mn', name: 'Mongolian' },
    { code: 'my', name: 'Myanmar' },
    { code: 'ne', name: 'Nepali' },
    { code: 'no', name: 'Norwegian' },
    { code: 'or', name: 'Odia' },
    { code: 'ps', name: 'Pashto' },
    { code: 'fa', name: 'Persian' },
    { code: 'pl', name: 'Polish' },
    { code: 'pt', name: 'Portuguese' },
    { code: 'pa', name: 'Punjabi' },
    { code: 'ro', name: 'Romanian' },
    { code: 'ru', name: 'Russian' },
    { code: 'sm', name: 'Samoan' },
    { code: 'gd', name: 'Scots Gaelic' },
    { code: 'sr', name: 'Serbian' },
    { code: 'st', name: 'Sesotho' },
    { code: 'sn', name: 'Shona' },
    { code: 'sd', name: 'Sindhi' },
    { code: 'si', name: 'Sinhala' },
    { code: 'sk', name: 'Slovak' },
    { code: 'sl', name: 'Slovenian' },
    { code: 'so', name: 'Somali' },
    { code: 'es', name: 'Spanish' },
    { code: 'su', name: 'Sundanese' },
    { code: 'sw', name: 'Swahili' },
    { code: 'sv', name: 'Swedish' },
    { code: 'tg', name: 'Tajik' },
    { code: 'ta', name: 'Tamil' },
    { code: 'tt', name: 'Tatar' },
    { code: 'te', name: 'Telugu' },
    { code: 'th', name: 'Thai' },
    { code: 'tr', name: 'Turkish' },
    { code: 'tk', name: 'Turkmen' },
    { code: 'uk', name: 'Ukrainian' },
    { code: 'ur', name: 'Urdu' },
    { code: 'ug', name: 'Uyghur' },
    { code: 'uz', name: 'Uzbek' },
    { code: 'vi', name: 'Vietnamese' },
    { code: 'cy', name: 'Welsh' },
    { code: 'xh', name: 'Xhosa' },
    { code: 'yi', name: 'Yiddish' },
    { code: 'yo', name: 'Yoruba' },
    { code: 'zu', name: 'Zulu' },
  ];

  useEffect(() => {
    // const savedLanguage = localStorage.getItem('google_translate_language') || 'en';
    const savedLanguage = localStorage.getItem('google_translate_language') || 'en';
    setCurrentLanguage(savedLanguage);

    // Initialize Google Translate
    if (!window.googleTranslateElementInit) {
      window.googleTranslateElementInit = function () {
        if (window.google?.translate?.TranslateElement) {
          new window.google.translate.TranslateElement(
            {
              pageLanguage: 'en',
              layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE
            },
            'google_translate_element'
          );
        }
      };

      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
      script.async = true;
      document.head.appendChild(script);
    }

    // Hide Google Translate's native banner - KEEP VISIBLE for ToS compliance but make it less intrusive
    const style = document.createElement('style');
    style.textContent = `
      .goog-te-banner-frame {
        display: block !important;
        width: 100% !important;
        height: auto !important;
        top: 0 !important;
        left: 0 !important;
        right: 0 !important;
        background: linear-gradient(to right, #f8f9fa, #ffffff) !important;
        border-bottom: 1px solid #e0e0e0 !important;
        box-shadow: 0 1px 3px rgba(0,0,0,0.05) !important;
        z-index: 999 !important;
        padding: 4px 0 !important;
      }
      
      .goog-te-banner-frame > * {
        font-size: 12px !important;
        padding: 2px 8px !important;
      }
      
      .goog-te-gadget {
        font-size: 12px !important;
        padding: 2px 0 !important;
        color: #666 !important;
      }
      
      .goog-te-gadget-simple .goog-te-combo {
        background-color: #f0f0f0 !important;
        border: 1px solid #d0d0d0 !important;
        border-radius: 3px !important;
        padding: 3px 6px !important;
        font-size: 11px !important;
        color: #333 !important;
      }
      
      .goog-te-gadget-simple {
        padding: 2px 4px !important;
        background: transparent !important;
        border: none !important;
      }
      
      .goog-te-gadget a {
        font-size: 11px !important;
        text-decoration: none !important;
        color: #1a73e8 !important;
        padding: 2px 4px !important;
      }
      
      .goog-te-notification-popup {
        display: none !important;
      }
      
      body {
        top: 0 !important;
      }
      
      .skiptranslate {
        display: none !important;
      }
    `;
    if (!document.getElementById('google-translate-hide-style')) {
      style.id = 'google-translate-hide-style';
      document.head.appendChild(style);
    }
  }, []);

  const handleLanguageChange = (langCode) => {
    setCurrentLanguage(langCode);
    localStorage.setItem('google_translate_language', langCode);
    setIsOpen(false);

    const selectElement = document.querySelector('.goog-te-combo');
    if (selectElement) {
      selectElement.value = langCode;
      selectElement.dispatchEvent(new Event('change', { bubbles: true }));
    }

    setTimeout(() => {
      if (langCode !== 'en') {
        document.cookie = `googtrans=/en/${langCode}; path=/; max-age=31536000`;
        window.location.reload();
      } else {
        // Clear the googtrans cookie on all possible paths and domains
        const domains = ['', window.location.hostname, '.google.com', '.translate.google.com'];
        const paths = ['/', window.location.pathname, ''];
        
        domains.forEach(domain => {
          paths.forEach(path => {
            const cookieDomain = domain ? `; domain=${domain}` : '';
            const cookiePath = path ? `; path=${path}` : '';
            document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:01 GMT; max-age=0${cookieDomain}${cookiePath}`;
            document.cookie = `googtrans=/en/fr; expires=Thu, 01 Jan 1970 00:00:01 GMT; max-age=0${cookieDomain}${cookiePath}`;
          });
        });
        
        // Clear any other common Google Translate cookies
        document.cookie = 'googtrans=; domain=.google.com; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
        document.cookie = 'googtrans=; domain=.translate.google.com; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
        
        // Remove localStorage items
        localStorage.removeItem('google_translate_language');
        
        // Force remove any existing Google Translate iframe
        const gtFrame = document.querySelector('.goog-te-banner-frame, #goog-gt-tt');
        if (gtFrame) {
          gtFrame.remove();
        }
        
        // Force clear the select element and dispatch multiple events
        if (selectElement) {
          selectElement.value = 'en';
          selectElement.dispatchEvent(new Event('change', { bubbles: true }));
          selectElement.dispatchEvent(new Event('input', { bubbles: true }));
        }
        
        // Longer delay to ensure widget processes the change
        setTimeout(() => {
          window.location.reload();
        }, 500);
      }
    }, 300);
  };
  const selectedLanguage = ALL_LANGUAGES.find(lang => lang.code === currentLanguage) || ALL_LANGUAGES[21];

  return (
    <>
      <div id="google_translate_element" style={{ display: 'none' }}></div>

      <div className="text-sm inline-block fixed top-4 right-5 md:left-0 md:top-0 z-50">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="btn btn-sm btn-base text-sm"
          title="Change language"
        >
          <Globe size={18} />
          <span className='border-r border-base-100 pr-2 py-1 '>Translator</span>
          <span className="hidden sm:inline">{currentLanguage.toUpperCase()}</span>
          <ChevronDown size={14} className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
        </button>

        {isOpen && (
          <div className="absolute mt-2 w-56 shadow-lg z-50 bg-base-100 backdrop-blur-sm max-h-96 overflow-y-auto">
            <div className="p-1">
              {ALL_LANGUAGES.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => handleLanguageChange(lang.code)}
                  className={`w-full text-left px-4 py-2 rounded-md transition-colors duration-200 text-sm text-base-content ${currentLanguage === lang.code
                    ? 'bg-base-300 font-semibold'
                    : 'hover:bg-base-300'
                    }`}
                >
                  <div className="flex justify-between items-center">
                    <span>{lang.name}</span>
                    <span className="text-xs opacity-75">{lang.code}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        <select
          value={currentLanguage}
          onChange={(e) => handleLanguageChange(e.target.value)}
          className="sm:hidden absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        >
          {ALL_LANGUAGES.map((lang) => (
            <option key={lang.code} value={lang.code}>
              {lang.name}
            </option>
          ))}
        </select>
      </div>
    </>
  );
}

