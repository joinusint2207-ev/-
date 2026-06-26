import React, { useState } from 'react';
import AppEn from './App_en';
import AppJp from './App_jp';

export default function App() {
  // Read initial language from localStorage or default to Japanese ('jp')
  const [lang, setLang] = useState<'jp' | 'en'>(() => {
    try {
      const saved = localStorage.getItem('mori_eloop_lang');
      if (saved === 'jp' || saved === 'en') {
        return saved;
      }
    } catch (e) {
      // ignore
    }
    return 'jp';
  });

  // Toggle between Japanese and English
  const handleSwitchLanguage = () => {
    const nextLang = lang === 'jp' ? 'en' : 'jp';
    setLang(nextLang);
    try {
      localStorage.setItem('mori_eloop_lang', nextLang);
    } catch (e) {
      // ignore
    }
  };

  return (
    <>
      {lang === 'jp' ? (
        <AppJp onSwitchLanguage={handleSwitchLanguage} currentLang="jp" />
      ) : (
        <AppEn onSwitchLanguage={handleSwitchLanguage} currentLang="en" />
      )}
    </>
  );
}
