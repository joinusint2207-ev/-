import React, { useState } from 'react';
import {
  Atom,
  ShieldCheck,
  Zap,
  Stethoscope,
  Award,
  FileText,
  CheckCircle2,
  ChevronRight,
  Sparkles,
  RefreshCw,
  Layers,
  Activity,
  Brain,
  Building2,
  Mail,
  Globe,
  ArrowRight,
  RotateCcw,
  AlertTriangle,
  Droplets,
  Flame,
  Check,
  Send,
  Lock,
  Cpu,
  Play,
  Youtube,
  ExternalLink,
  Calendar,
  X,
  Video
} from 'lucide-react';
import { translations } from './translations';

function getYouTubeEmbedUrl(urlOrId: string): string {
  if (!urlOrId) return 'https://www.youtube.com/embed/dQw4w9WgXcQ';
  const trimmed = urlOrId.trim();
  if (/^[a-zA-Z0-9_-]{11}$/.test(trimmed)) {
    return `https://www.youtube.com/embed/${trimmed}`;
  }
  const match = trimmed.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/);
  if (match && match[1]) {
    return `https://www.youtube.com/embed/${match[1]}`;
  }
  return 'https://www.youtube.com/embed/dQw4w9WgXcQ';
}

export default function App() {
  // Language State
  const [lang, setLang] = useState<'en' | 'jp' | 'kr'>('en'); // Default to English as requested
  const t = translations[lang];

  // Interactive Simulator 1: Magnesium Surface Control
  const [magApplied, setMagApplied] = useState<boolean>(false);
  const [magReacting, setMagReacting] = useState<boolean>(false);

  const handleApplyMagSolution = () => {
    setMagReacting(true);
    setTimeout(() => {
      setMagApplied(true);
      setMagReacting(false);
    }, 1200);
  };

  const handleResetMag = () => {
    setMagApplied(false);
    setMagReacting(false);
  };

  // YouTube Video Modal & Custom URL state for Magnesium Oxide removal
  const [ytUrlInput, setYtUrlInput] = useState<string>('https://www.youtube.com/watch?v=dQw4w9WgXcQ');
  const [activeYtUrl, setActiveYtUrl] = useState<string>('https://www.youtube.com/watch?v=dQw4w9WgXcQ');
  const [showVideoModal, setShowVideoModal] = useState<boolean>(false);

  // JFRL Official Laboratory Certificates Modal State
  const [showJfrlModal, setShowJfrlModal] = useState<boolean>(false);

  const handleUpdateYtVideo = (e: React.FormEvent) => {
    e.preventDefault();
    if (ytUrlInput.trim()) {
      setActiveYtUrl(ytUrlInput.trim());
    }
  };

  // Interactive Simulator 2: EV Battery Swapping Loop
  const [activePack, setActivePack] = useState<'A' | 'B'>('A');
  const [swapping, setSwapping] = useState<boolean>(false);

  const handleSwapPack = () => {
    setSwapping(true);
    setTimeout(() => {
      setActivePack((prev) => (prev === 'A' ? 'B' : 'A'));
      setSwapping(false);
    }, 800);
  };

  // Inquiry Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    category: 'catLicensing',
    message: ''
  });
  const [formSubmitted, setFormSubmitted] = useState<boolean>(false);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    setFormSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans antialiased selection:bg-blue-600 selection:text-white">
      
      {/* 🏛️ Top Header & Navigation Bar */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            
            {/* Logo / Official Seal */}
            <a href="#" className="flex items-center gap-3 group">
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center text-white shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform border border-blue-400/30">
                <Atom className="w-6 h-6 animate-pulse" />
              </div>
              <div>
                <h1 className="text-base font-black tracking-tight text-slate-900 group-hover:text-blue-600 transition-colors">
                  {t.title}
                </h1>
                <p className="text-[11px] font-semibold text-slate-500 tracking-wider">
                  {t.subtitle}
                </p>
              </div>
            </a>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-6 text-xs font-bold text-slate-600">
              <a href="#summary" className="hover:text-blue-600 transition-colors">{t.navSummary}</a>
              <a href="#innovations" className="hover:text-blue-600 transition-colors">{t.navInnovations}</a>
              <a href="#authority" className="hover:text-blue-600 transition-colors">{t.navAuthority}</a>
              <a href="#patents" className="hover:text-blue-600 transition-colors">{t.navPatents}</a>
              <a href="#contact" className="hover:text-blue-600 transition-colors">{t.navContact}</a>
            </nav>

            {/* Language Toggle Controls & Action CTA */}
            <div className="flex items-center gap-3">
              <div className="flex bg-slate-100 p-1 rounded-lg border border-slate-200 text-xs font-black">
                <button
                  onClick={() => setLang('kr')}
                  className={`px-2.5 py-1 rounded-md transition-all ${
                    lang === 'kr' ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  한국어
                </button>
                <button
                  onClick={() => setLang('jp')}
                  className={`px-2.5 py-1 rounded-md transition-all ${
                    lang === 'jp' ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  日本語
                </button>
                <button
                  onClick={() => setLang('en')}
                  className={`px-2.5 py-1 rounded-md transition-all ${
                    lang === 'en' ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  EN
                </button>
              </div>

              <a
                href="#contact"
                className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs rounded-xl shadow-md shadow-blue-600/15 transition-all hover:scale-105 active:scale-95"
              >
                <span>{t.navContact}</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </a>
            </div>

          </div>
        </div>
      </header>

      {/* 🚀 Hero Section (Bright High-Contrast Theme) */}
      <section className="relative overflow-hidden pt-12 pb-20 lg:pt-20 lg:pb-28 border-b border-slate-200 bg-gradient-to-b from-blue-50/70 via-slate-50 to-white">
        {/* Subtle Ambient Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#cbd5e1_1px,transparent_1px),linear-gradient(to_bottom,#cbd5e1_1px,transparent_1px)] bg-[size:32px_32px] opacity-30" />
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-blue-300/30 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-indigo-300/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Hero Left Content */}
            <div className="lg:col-span-7 space-y-6">
              
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-blue-100 border border-blue-200 rounded-full text-blue-700 text-xs font-black tracking-wide shadow-xs">
                <Sparkles className="w-3.5 h-3.5 text-blue-600 animate-spin" style={{ animationDuration: '6s' }} />
                <span>{t.heroBadge}</span>
              </div>

              <h1 className="text-3xl sm:text-5xl font-black text-slate-900 leading-tight tracking-tight">
                {t.heroHeading}
              </h1>

              <p className="text-slate-600 text-base sm:text-lg leading-relaxed font-medium max-w-2xl">
                {t.heroLead}
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4 pt-2">
                <a
                  href="#innovations"
                  className="px-6 py-3.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-extrabold rounded-xl shadow-lg shadow-blue-600/20 transition-all flex items-center gap-2 hover:-translate-y-0.5"
                >
                  <Atom className="w-4 h-4" />
                  <span>{t.btnInnovations}</span>
                  <ArrowRight className="w-4 h-4" />
                </a>

                <a
                  href="#patents"
                  className="px-6 py-3.5 bg-white hover:bg-slate-100 text-slate-800 border border-slate-300 text-sm font-extrabold rounded-xl shadow-xs transition-all flex items-center gap-2"
                >
                  <FileText className="w-4 h-4 text-blue-600" />
                  <span>{t.btnPatentData}</span>
                </a>
              </div>

              {/* Stats Bar */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-slate-200">
                <div className="p-3.5 bg-white border border-slate-200 rounded-xl shadow-xs">
                  <p className="text-xl font-black text-blue-600 font-mono">{t.statYears}</p>
                  <p className="text-[11px] font-bold text-slate-500">{t.statYearsLabel}</p>
                </div>
                <div className="p-3.5 bg-white border border-slate-200 rounded-xl shadow-xs">
                  <p className="text-xl font-black text-emerald-600 font-mono">{t.statPatents}</p>
                  <p className="text-[11px] font-bold text-slate-500">{t.statPatentsLabel}</p>
                </div>
                <div className="p-3.5 bg-white border border-slate-200 rounded-xl shadow-xs">
                  <p className="text-xl font-black text-amber-600 font-mono">{t.statOxford}</p>
                  <p className="text-[11px] font-bold text-slate-500">{t.statOxfordLabel}</p>
                </div>
                <div className="p-3.5 bg-white border border-slate-200 rounded-xl shadow-xs">
                  <p className="text-xl font-black text-rose-600 font-mono">{t.statAmr}</p>
                  <p className="text-[11px] font-bold text-slate-500">{t.statAmrLabel}</p>
                </div>
              </div>

            </div>

            {/* Hero Right Visual Card - Portrait & Credentials */}
            <div className="lg:col-span-5">
              <div className="relative bg-white border border-slate-200/90 rounded-3xl p-6 shadow-xl space-y-6">
                
                {/* Visual Frame */}
                <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-700 p-6 text-center space-y-4 text-white">
                  <div className="w-28 h-28 mx-auto rounded-full bg-gradient-to-tr from-blue-500 via-indigo-500 to-amber-400 p-1 shadow-lg">
                    <div className="w-full h-full rounded-full bg-slate-900 flex items-center justify-center text-4xl font-black text-blue-400">
                      YM
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-black text-white tracking-wide">
                      {t.title}
                    </h3>
                    <p className="text-xs font-bold text-blue-300 uppercase tracking-widest mt-1">
                      {t.subtitle}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-slate-700 flex justify-center gap-2 flex-wrap">
                    <span className="px-2.5 py-1 bg-slate-800/80 border border-slate-700 text-[10px] font-bold text-slate-200 rounded-md">
                      Oxford Univ. Science Park
                    </span>
                    <span className="px-2.5 py-1 bg-slate-800/80 border border-slate-700 text-[10px] font-bold text-slate-200 rounded-md">
                      Clayton Univ. Hon. Doctor
                    </span>
                    <span className="px-2.5 py-1 bg-slate-800/80 border border-slate-700 text-[10px] font-bold text-slate-200 rounded-md">
                      Linus Pauling Scholar
                    </span>
                  </div>
                </div>

                {/* Key Affiliation Box */}
                <div className="p-4 bg-blue-50 border border-blue-200 rounded-2xl flex items-start gap-3">
                  <Building2 className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div className="text-xs space-y-1">
                    <p className="font-extrabold text-blue-900">
                      Research Laboratory of Preventive Medicine
                    </p>
                    <p className="text-slate-600 leading-relaxed font-medium">
                      Founder & Inventor, Research Laboratory of Preventive Medicine, Oxford University Science Park, UK.
                    </p>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 📜 Section 1: Executive Summary */}
      <section id="summary" className="py-20 bg-white border-b border-slate-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          
          <div className="text-center space-y-2">
            <span className="px-3 py-1 bg-blue-100 border border-blue-200 text-blue-800 text-xs font-extrabold rounded-full uppercase tracking-wider">
              {t.execTitle}
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
              {t.execHeading}
            </h2>
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-3xl p-8 sm:p-10 shadow-sm space-y-6 relative">
            <div className="text-6xl text-blue-600/10 font-serif absolute top-2 left-6 pointer-events-none">“</div>
            
            <p className="text-slate-800 text-base sm:text-lg leading-relaxed font-semibold pl-4 sm:pl-6 border-l-4 border-blue-600">
              {t.execP1}
            </p>

            <p className="text-slate-700 text-sm sm:text-base leading-relaxed font-medium pl-4 sm:pl-6 border-l-4 border-slate-300">
              {t.execP2}
            </p>

            <p className="text-slate-700 text-sm sm:text-base leading-relaxed font-medium pl-4 sm:pl-6 border-l-4 border-slate-300">
              {t.execP3}
            </p>

            <div className="pt-4 border-t border-slate-200 flex flex-wrap justify-between items-center text-xs text-slate-500 font-mono font-bold gap-4">
              <span>FOUNDER & INVENTOR: RESEARCH LABORATORY OF PREVENTIVE MEDICINE</span>
              <span>OXFORD UNIVERSITY SCIENCE PARK, UK</span>
            </div>
          </div>

        </div>
      </section>

      {/* 💡 Section 2: Core Innovations */}
      <section id="innovations" className="py-20 border-b border-slate-200 bg-slate-50/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          
          <div className="text-center space-y-3 max-w-3xl mx-auto">
            <span className="px-3 py-1 bg-amber-100 border border-amber-300 text-amber-900 text-xs font-extrabold rounded-full uppercase tracking-wider">
              {t.innovationsTitle}
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              {t.innovationsSubtitle}
            </h2>
          </div>

          {/* INNOVATION 1: MAGNESIUM SURFACE CONTROL */}
          <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-10 shadow-lg grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            <div className="lg:col-span-6 space-y-5">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-50 border border-amber-200 text-amber-800 text-xs font-black rounded-lg">
                <Flame className="w-3.5 h-3.5 text-amber-600" />
                <span>{t.magBadge}</span>
              </div>

              <h3 className="text-2xl font-black text-slate-900 leading-snug">
                {t.magTitle}
              </h3>

              <p className="text-slate-600 text-sm leading-relaxed font-medium">
                {t.magDesc}
              </p>

              <div className="space-y-2.5 pt-2">
                <div className="flex items-start gap-2 text-xs font-bold text-slate-800">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <span>{t.magHighlight1}</span>
                </div>
                <div className="flex items-start gap-2 text-xs font-bold text-slate-800">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <span>{t.magHighlight2}</span>
                </div>
                <div className="flex items-start gap-2 text-xs font-bold text-slate-800">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <span>{t.magHighlight3}</span>
                </div>
              </div>

              {/* 📺 Prominent YouTube Demonstration Card & Link Option */}
              <div className="pt-4 border-t border-slate-200 space-y-3">
                <div className="p-4 bg-gradient-to-r from-red-50 to-amber-50 border border-red-200 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="space-y-1">
                    <p className="text-xs font-black text-red-900 flex items-center gap-1.5">
                      <Youtube className="w-4 h-4 text-red-600 fill-red-600" />
                      <span>{t.magVideoTitle}</span>
                    </p>
                    <p className="text-[11px] text-slate-600 font-medium leading-relaxed">
                      {t.magVideoDesc}
                    </p>
                  </div>
                  <button
                    onClick={() => setShowVideoModal(true)}
                    className="px-4 py-2.5 bg-red-600 hover:bg-red-700 text-white font-extrabold text-xs rounded-xl shadow-md shadow-red-600/20 transition flex items-center justify-center gap-1.5 flex-shrink-0"
                  >
                    <Play className="w-3.5 h-3.5 fill-white" />
                    <span>{t.magVideoBtn}</span>
                  </button>
                </div>
              </div>

            </div>

            {/* Interactive Magnesium Simulator & Embedded Video Frame */}
            <div className="lg:col-span-6 space-y-5">
              
              {/* Simulator Card */}
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 text-white space-y-5 shadow-md">
                <div className="flex justify-between items-center text-xs font-mono font-bold">
                  <span className="text-amber-400 flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4" />
                    {t.magSimTitle}
                  </span>
                  <span className="text-slate-400">3-Sec Reaction</span>
                </div>

                {/* Metal Plate Visual */}
                <div className="relative h-40 rounded-xl border border-slate-700 flex flex-col items-center justify-center p-4 transition-all overflow-hidden"
                     style={{
                       background: magApplied
                         ? 'linear-gradient(135deg, #e2e8f0 0%, #94a3b8 50%, #f8fafc 100%)'
                         : 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)'
                     }}>
                  
                  {magReacting && (
                    <div className="absolute inset-0 bg-amber-500/20 backdrop-blur-xs flex items-center justify-center animate-pulse">
                      <span className="text-amber-300 font-mono text-xs font-black bg-slate-950 px-3 py-1 rounded-full border border-amber-500/50">
                        Shattering Oxide Barrier (3s)...
                      </span>
                    </div>
                  )}

                  <p className={`text-sm font-black font-mono transition-colors ${magApplied ? 'text-slate-900' : 'text-slate-400'}`}>
                    {magApplied ? t.magSimTreated : t.magSimUntreated}
                  </p>

                  {magApplied && (
                    <div className="mt-3 flex gap-2 flex-wrap justify-center">
                      <span className="px-2.5 py-1 bg-emerald-600 text-white font-mono text-[10px] font-bold rounded-md flex items-center gap-1 shadow-xs">
                        <Check className="w-3 h-3" /> {t.magStatusSilver}
                      </span>
                      <span className="px-2.5 py-1 bg-blue-600 text-white font-mono text-[10px] font-bold rounded-md flex items-center gap-1 shadow-xs">
                        <Droplets className="w-3 h-3" /> {t.magStatusHydrogen}
                      </span>
                    </div>
                  )}
                </div>

                {/* Simulator Action Buttons */}
                <div className="flex gap-3">
                  <button
                    onClick={handleApplyMagSolution}
                    disabled={magReacting || magApplied}
                    className="flex-1 py-2.5 bg-amber-600 hover:bg-amber-500 disabled:bg-slate-800 disabled:text-slate-600 text-white font-extrabold text-xs rounded-xl transition shadow-md flex items-center justify-center gap-1.5"
                  >
                    <Flame className="w-3.5 h-3.5" />
                    <span>{t.magSimApplyBtn}</span>
                  </button>

                  <button
                    onClick={handleResetMag}
                    className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs rounded-xl transition border border-slate-700 flex items-center gap-1.5"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>{t.magSimResetBtn}</span>
                  </button>
                </div>
              </div>

              {/* YouTube Video Quick Embed Preview Frame */}
              <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm space-y-3">
                <div className="flex items-center justify-between text-xs font-extrabold text-slate-900">
                  <span className="flex items-center gap-1.5 text-red-600">
                    <Video className="w-4 h-4" />
                    {t.magVideoTitle}
                  </span>
                  <a
                    href={activeYtUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-[11px] font-bold text-blue-600 hover:underline flex items-center gap-1"
                  >
                    YouTube Link <ExternalLink className="w-3 h-3" />
                  </a>
                </div>

                {/* Video Player Frame */}
                <div className="aspect-video w-full rounded-xl overflow-hidden bg-slate-900 border border-slate-200">
                  <iframe
                    src={getYouTubeEmbedUrl(activeYtUrl)}
                    title="Magnesium Oxide Layer Removal YouTube Video"
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>

              </div>

            </div>

          </div>


          {/* INNOVATION 2: ENERGY & EV BATTERY SWAPPING */}
          <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-10 shadow-lg grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-6 space-y-5">
              <div className="flex items-center gap-2 flex-wrap">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-50 border border-amber-300 text-amber-900 text-xs font-black rounded-lg">
                  <Zap className="w-3.5 h-3.5 text-amber-600" />
                  <span>{t.energyBadge}</span>
                </div>
                <span className="px-2.5 py-0.5 bg-amber-100 border border-amber-300 text-amber-900 font-mono font-black text-[10px] rounded-full shadow-2xs">
                  {t.energyDevNotice}
                </span>
              </div>

              <h3 className="text-2xl font-black text-slate-900 leading-snug">
                {t.energyTitle}
              </h3>

              <div className="space-y-4 pt-1">
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
                  <p className="text-sm font-black text-blue-900 flex items-center justify-between">
                    <span>{t.genTitle}</span>
                    <span className="text-[10px] font-mono font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded border border-amber-300">
                      In Development
                    </span>
                  </p>
                  <p className="text-xs text-slate-700 font-medium">{t.genDesc}</p>
                  <p className="text-[11px] font-mono text-slate-500 font-bold pt-1">{t.genPatent}</p>
                </div>

                <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
                  <p className="text-sm font-black text-blue-900 flex items-center justify-between">
                    <span>{t.evTitle}</span>
                    <span className="text-[10px] font-mono font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded border border-amber-300">
                      In Development
                    </span>
                  </p>
                  <p className="text-xs text-slate-700 font-medium">{t.evDesc}</p>
                  <p className="text-[11px] font-mono text-slate-500 font-bold pt-1">{t.evPatent}</p>
                </div>
              </div>
            </div>

            {/* Interactive A/B Battery Simulator */}
            <div className="lg:col-span-6 bg-slate-900 border border-slate-800 rounded-2xl p-6 text-white space-y-5 shadow-md">
              <div className="flex justify-between items-center text-xs font-mono font-bold">
                <span className="text-blue-400 flex items-center gap-1.5">
                  <Cpu className="w-4 h-4" />
                  {t.evSimTitle}
                </span>
                <span className="text-emerald-400">Autonomous Relay</span>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {/* Pack A */}
                <div className={`p-4 rounded-xl border transition-all ${
                  activePack === 'A'
                    ? 'bg-blue-950/80 border-blue-400 shadow-lg shadow-blue-500/20'
                    : 'bg-slate-950 border-slate-800 opacity-60'
                }`}>
                  <p className="text-xs font-black font-mono text-white flex items-center justify-between">
                    <span>{t.evSimPackA}</span>
                    {activePack === 'A' && <span className="w-2 h-2 rounded-full bg-blue-400 animate-ping" />}
                  </p>
                  <p className="text-[11px] font-bold mt-2 text-blue-300">
                    {activePack === 'A' ? t.evSimStatusActive : t.evSimStatusCharging}
                  </p>
                </div>

                {/* Pack B */}
                <div className={`p-4 rounded-xl border transition-all ${
                  activePack === 'B'
                    ? 'bg-emerald-950/80 border-emerald-400 shadow-lg shadow-emerald-500/20'
                    : 'bg-slate-950 border-slate-800 opacity-60'
                }`}>
                  <p className="text-xs font-black font-mono text-white flex items-center justify-between">
                    <span>{t.evSimPackB}</span>
                    {activePack === 'B' && <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />}
                  </p>
                  <p className="text-[11px] font-bold mt-2 text-emerald-300">
                    {activePack === 'B' ? t.evSimStatusActive : t.evSimStatusCharging}
                  </p>
                </div>
              </div>

              <button
                onClick={handleSwapPack}
                disabled={swapping}
                className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white font-extrabold text-xs rounded-xl transition shadow-md flex items-center justify-center gap-2"
              >
                <RefreshCw className={`w-4 h-4 ${swapping ? 'animate-spin' : ''}`} />
                <span>{t.evSimSwapBtn}</span>
              </button>
            </div>

          </div>


          {/* INNOVATION 3: AMR SOLUTIONS (Highlighting 2004 & 2023 Verified Data Reports) */}
          <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-10 shadow-lg grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-6 space-y-5">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-rose-50 border border-rose-200 text-rose-800 text-xs font-black rounded-lg">
                <Stethoscope className="w-3.5 h-3.5 text-rose-600" />
                <span>{t.amrBadge}</span>
              </div>

              <h3 className="text-2xl font-black text-slate-900 leading-snug">
                {t.amrTitle}
              </h3>

              <div className="space-y-3 text-xs text-slate-700 font-medium leading-relaxed">
                <div className="p-3.5 bg-rose-50 border border-rose-200 rounded-xl space-y-1">
                  <p className="font-extrabold text-rose-900 flex items-center gap-1.5">
                    <AlertTriangle className="w-4 h-4 text-rose-600" /> {t.amrCrisisTitle}
                  </p>
                  <p>{t.amrCrisisDesc}</p>
                </div>

                <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
                  <p className="font-extrabold text-blue-900">{t.amrEradTitle}</p>
                  <p>{t.amrEradDesc}</p>
                </div>

                <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
                  <p className="font-extrabold text-emerald-900">{t.amrValidationTitle}</p>
                  <p>{t.amrValidationDesc}</p>
                </div>

                {/* 🌟 Highlighted 2004 & 2023 Official Study Data Feature */}
                <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-300/80 rounded-xl space-y-2.5 shadow-xs">
                  <div className="flex items-center justify-between">
                    <p className="font-black text-blue-950 text-xs flex items-center gap-1.5">
                      <Calendar className="w-4 h-4 text-blue-600" />
                      <span>{t.amrDataYearsTitle}</span>
                    </p>
                    <span className="px-2 py-0.5 bg-blue-600 text-white font-mono font-black text-[10px] rounded-full shadow-xs">
                      2004 & 2023 JFRL
                    </span>
                  </div>
                  <p className="text-slate-700 leading-relaxed font-semibold">
                    {t.amrDataYearsDesc}
                  </p>
                  <button
                    onClick={() => setShowJfrlModal(true)}
                    className="w-full py-2.5 bg-blue-900 hover:bg-blue-800 text-white font-extrabold text-xs rounded-lg transition flex items-center justify-center gap-2 shadow-xs"
                  >
                    <FileText className="w-4 h-4 text-blue-300" />
                    <span>{t.jfrlBtnText}</span>
                  </button>
                </div>

              </div>
            </div>

            {/* AMR Eradication Comparison Display */}
            <div className="lg:col-span-6 bg-slate-900 border border-slate-800 rounded-2xl p-6 text-white space-y-5 shadow-md">
              <div className="text-xs font-mono font-bold text-rose-400 flex items-center gap-1.5">
                <Activity className="w-4 h-4" />
                <span>Pathogen Eradication Speed (MRSA & FQREC)</span>
              </div>

              <div className="space-y-4">
                {/* SN Water */}
                <div className="p-4 rounded-xl bg-emerald-950/60 border border-emerald-500/50 space-y-2">
                  <div className="flex justify-between items-center text-xs font-black">
                    <span className="text-emerald-300">{t.amrCompareFast}</span>
                    <span className="px-2 py-0.5 bg-emerald-500 text-slate-950 rounded font-mono font-bold">15 SEC</span>
                  </div>
                  <div className="w-full bg-slate-950 h-2.5 rounded-full overflow-hidden">
                    <div className="bg-emerald-400 h-full w-full animate-pulse" />
                  </div>
                </div>

                {/* Conventional */}
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2 opacity-60">
                  <div className="flex justify-between items-center text-xs font-bold text-slate-400">
                    <span>{t.amrCompareSlow}</span>
                    <span className="font-mono">HOURS/DAYS</span>
                  </div>
                  <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden">
                    <div className="bg-rose-500/50 h-full w-1/4" />
                  </div>
                </div>

                {/* Data Years Callout in Card */}
                <div className="p-3.5 bg-slate-950/90 border border-slate-800 rounded-xl text-center space-y-2">
                  <p className="text-[11px] font-mono font-bold text-slate-300">
                    Official Certified Laboratory Reports: <span className="text-blue-400">2004</span> & <span className="text-blue-400">2023</span>
                  </p>
                  <p className="text-[10px] text-slate-400 font-medium">
                    Verified under MHLW testing protocols by Japan Food Research Laboratories
                  </p>
                  <button
                    onClick={() => setShowJfrlModal(true)}
                    className="w-full py-2 bg-blue-600/30 hover:bg-blue-600/50 border border-blue-500/50 text-blue-200 font-mono font-bold text-[11px] rounded-lg transition flex items-center justify-center gap-1.5"
                  >
                    <Award className="w-3.5 h-3.5 text-blue-400" />
                    <span>Inspect JFRL Reports (Certificate No. 23056849001)</span>
                  </button>
                </div>

              </div>
            </div>

          </div>


          {/* INNOVATION 4: DEMENTIA PREVENTION */}
          <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-10 shadow-lg grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-50 border border-indigo-200 text-indigo-800 text-xs font-black rounded-lg">
                <Brain className="w-3.5 h-3.5 text-indigo-600" />
                <span>{t.dementiaBadge}</span>
              </div>

              <h3 className="text-2xl font-black text-slate-900 leading-snug">
                {t.dementiaTitle}
              </h3>

              <p className="text-slate-600 text-sm leading-relaxed font-medium">
                {t.dementiaDesc}
              </p>
            </div>

            <div className="lg:col-span-5 bg-gradient-to-br from-indigo-50 to-blue-50 border border-indigo-200 rounded-2xl p-6 text-center space-y-3">
              <Brain className="w-12 h-12 text-indigo-600 mx-auto animate-pulse" />
              <p className="text-xs font-black text-slate-900 uppercase tracking-wider">
                Patented Mg + H2 Ionized Water Structure
              </p>
              <p className="text-[11px] text-slate-600 font-semibold leading-relaxed">
                Directly targets neuro-vascular longevity and cellular oxidative reduction in brain tissues.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* 🎓 Section 3: Academic & Research Authority */}
      <section id="authority" className="py-20 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          
          <div className="text-center space-y-3 max-w-3xl mx-auto">
            <span className="px-3 py-1 bg-blue-100 border border-blue-200 text-blue-900 text-xs font-extrabold rounded-full uppercase tracking-wider">
              {t.authTitle}
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              {t.authSubtitle}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* UPenn */}
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 space-y-3 hover:border-slate-300 transition shadow-xs">
              <div className="w-10 h-10 rounded-xl bg-blue-600/10 border border-blue-500/20 flex items-center justify-center text-blue-600 font-black">
                UP
              </div>
              <h3 className="text-lg font-black text-slate-900">{t.upennTitle}</h3>
              <p className="text-xs text-slate-600 font-medium leading-relaxed">{t.upennDesc}</p>
            </div>

            {/* Linus Pauling Collaboration */}
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 space-y-3 hover:border-slate-300 transition shadow-xs">
              <div className="w-10 h-10 rounded-xl bg-amber-600/10 border border-amber-500/20 flex items-center justify-center text-amber-600 font-black">
                LP
              </div>
              <h3 className="text-lg font-black text-slate-900">{t.paulingTitle}</h3>
              <p className="text-xs text-slate-600 font-medium leading-relaxed">{t.paulingDesc}</p>
            </div>

            {/* Honorary Doctorate */}
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 space-y-3 hover:border-slate-300 transition shadow-xs">
              <div className="w-10 h-10 rounded-xl bg-emerald-600/10 border border-emerald-500/20 flex items-center justify-center text-emerald-600 font-black">
                MD
              </div>
              <h3 className="text-lg font-black text-slate-900">{t.claytonTitle}</h3>
              <p className="text-xs text-slate-600 font-medium leading-relaxed">{t.claytonDesc}</p>
            </div>

            {/* Oxford Science Park */}
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 space-y-3 hover:border-slate-300 transition shadow-xs">
              <div className="w-10 h-10 rounded-xl bg-rose-600/10 border border-rose-500/20 flex items-center justify-center text-rose-600 font-black">
                OX
              </div>
              <h3 className="text-lg font-black text-slate-900">{t.oxfordTitle}</h3>
              <p className="text-xs text-slate-600 font-medium leading-relaxed">{t.oxfordDesc}</p>
            </div>

          </div>

        </div>
      </section>

      {/* 📊 Section 4: Patent Portfolio Table */}
      <section id="patents" className="py-20 bg-slate-50/80 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="text-center space-y-3 max-w-3xl mx-auto">
            <span className="px-3 py-1 bg-emerald-100 border border-emerald-300 text-emerald-900 text-xs font-extrabold rounded-full uppercase tracking-wider">
              {t.patentTableTitle}
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              {t.patentTableSub}
            </h2>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-100 border-b border-slate-200 text-slate-700 font-mono font-bold uppercase tracking-wider">
                <tr>
                  <th className="p-4">{t.colPatentName}</th>
                  <th className="p-4">{t.colAppNo}</th>
                  <th className="p-4">{t.colCategory}</th>
                  <th className="p-4">{t.colSafety}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 font-medium text-slate-800">
                <tr className="hover:bg-slate-50/50">
                  <td className="p-4 font-black text-slate-900">{t.p1Name}</td>
                  <td className="p-4 font-mono text-amber-700 font-bold">{t.p1No}</td>
                  <td className="p-4">{t.p1Cat}</td>
                  <td className="p-4 text-emerald-700 font-bold">{t.p1Safety}</td>
                </tr>
                <tr className="hover:bg-slate-50/50">
                  <td className="p-4 font-black text-slate-900">{t.p2Name}</td>
                  <td className="p-4 font-mono text-blue-700 font-bold">{t.p2No}</td>
                  <td className="p-4">{t.p2Cat}</td>
                  <td className="p-4 text-emerald-700 font-bold">{t.p2Safety}</td>
                </tr>
                <tr className="hover:bg-slate-50/50">
                  <td className="p-4 font-black text-slate-900">{t.p3Name}</td>
                  <td className="p-4 font-mono text-blue-700 font-bold">{t.p3No}</td>
                  <td className="p-4">{t.p3Cat}</td>
                  <td className="p-4 text-emerald-700 font-bold">{t.p3Safety}</td>
                </tr>
                <tr className="hover:bg-slate-50/50">
                  <td className="p-4 font-black text-slate-900">{t.p4Name}</td>
                  <td className="p-4 font-mono text-amber-700 font-bold">{t.p4No} (2004 & 2023 Data)</td>
                  <td className="p-4">{t.p4Cat}</td>
                  <td className="p-4 text-emerald-700 font-bold">{t.p4Safety}</td>
                </tr>
                <tr className="hover:bg-slate-50/50">
                  <td className="p-4 font-black text-slate-900">{t.p5Name}</td>
                  <td className="p-4 font-mono text-indigo-700 font-bold">{t.p5No}</td>
                  <td className="p-4">{t.p5Cat}</td>
                  <td className="p-4 text-emerald-700 font-bold">{t.p5Safety}</td>
                </tr>
              </tbody>
            </table>
          </div>

        </div>
      </section>

      {/* ✉️ Section 5: Inquiry & Licensing Form */}
      <section id="contact" className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          
          <div className="text-center space-y-3">
            <span className="px-3 py-1 bg-blue-100 border border-blue-200 text-blue-900 text-xs font-extrabold rounded-full uppercase tracking-wider">
              {t.contactTitle}
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              {t.contactSubtitle}
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm font-medium max-w-2xl mx-auto leading-relaxed">
              {t.contactDesc}
            </p>
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-3xl p-6 sm:p-10 shadow-lg">
            {formSubmitted ? (
              <div className="p-6 bg-emerald-50 border border-emerald-200 rounded-2xl text-center space-y-3">
                <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                <p className="text-base font-black text-slate-900">
                  {t.submitSuccess}
                </p>
                <button
                  onClick={() => setFormSubmitted(false)}
                  className="px-4 py-2 bg-slate-900 text-white font-bold text-xs rounded-xl hover:bg-slate-800 transition"
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} className="space-y-6">
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-800">{t.fieldName}</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Dr. John Doe / Global Health Inst."
                      className="w-full px-4 py-3 bg-white border border-slate-300 rounded-xl text-xs font-semibold text-slate-900 focus:outline-none focus:border-blue-600 transition shadow-2xs"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-800">{t.fieldEmail}</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="office@organization.com"
                      className="w-full px-4 py-3 bg-white border border-slate-300 rounded-xl text-xs font-semibold text-slate-900 focus:outline-none focus:border-blue-600 transition shadow-2xs"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-800">{t.fieldCategory}</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-4 py-3 bg-white border border-slate-300 rounded-xl text-xs font-semibold text-slate-900 focus:outline-none focus:border-blue-600 transition shadow-2xs"
                  >
                    <option value="catLicensing">{t.catLicensing}</option>
                    <option value="catAmrData">{t.catAmrData}</option>
                    <option value="catMagnesium">{t.catMagnesium}</option>
                    <option value="catEvEnergy">{t.catEvEnergy}</option>
                    <option value="catAcademic">{t.catAcademic}</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-800">{t.fieldMsg}</label>
                  <textarea
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Please specify your organization's intent, requested data scope, or proposal details..."
                    className="w-full px-4 py-3 bg-white border border-slate-300 rounded-xl text-xs font-semibold text-slate-900 focus:outline-none focus:border-blue-600 transition shadow-2xs"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs rounded-xl shadow-lg shadow-blue-600/20 transition flex items-center justify-center gap-2 hover:scale-[1.01]"
                >
                  <Send className="w-4 h-4" />
                  <span>{t.btnSubmit}</span>
                </button>

              </form>
            )}
          </div>

        </div>
      </section>

      {/* 🏁 Footer */}
      <footer className="py-12 bg-slate-900 text-slate-400 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4 text-center">
          <p className="font-bold text-slate-200">{t.footerCopy}</p>
          <p className="max-w-3xl mx-auto leading-relaxed text-[11px] text-slate-400">{t.footerNote}</p>
        </div>
      </footer>

      {/* 🎬 YouTube Demonstration Video Modal */}
      {showVideoModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fadeIn">
          <div className="relative w-full max-w-3xl bg-white border border-slate-200 rounded-3xl p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            
            <div className="flex items-center justify-between border-b border-slate-200 pb-4">
              <div className="flex items-center gap-2 text-red-600 font-black text-sm">
                <Youtube className="w-5 h-5 fill-red-600" />
                <span>{t.magVideoModalTitle}</span>
              </div>
              <button
                onClick={() => setShowVideoModal(false)}
                className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-slate-600 font-medium">
              {t.magVideoModalSub}
            </p>

            {/* Embedded YouTube Player */}
            <div className="aspect-video w-full rounded-2xl overflow-hidden bg-slate-900 border border-slate-200 shadow-md">
              <iframe
                src={getYouTubeEmbedUrl(activeYtUrl)}
                title="Magnesium Oxide Layer Removal YouTube Demonstration"
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>

            {/* Custom YouTube Link Input Form */}
            <form onSubmit={handleUpdateYtVideo} className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-3">
              <label className="text-xs font-bold text-slate-800 block">
                {t.magVideoInputLabel}
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={ytUrlInput}
                  onChange={(e) => setYtUrlInput(e.target.value)}
                  placeholder="e.g. https://www.youtube.com/watch?v=..."
                  className="flex-1 px-3.5 py-2.5 bg-white border border-slate-300 rounded-xl text-xs font-medium text-slate-900 focus:outline-none focus:border-red-500"
                />
                <button
                  type="submit"
                  className="px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-xs rounded-xl transition shadow-xs flex items-center gap-1.5"
                >
                  <Play className="w-3.5 h-3.5 fill-white" />
                  <span>{t.magVideoChangeBtn}</span>
                </button>
              </div>
            </form>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setShowVideoModal(false)}
                className="px-5 py-2.5 bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold text-xs rounded-xl transition"
              >
                Close Window
              </button>
            </div>

          </div>
        </div>
      )}

      {/* JFRL Official Certificates & Test Data Modal */}
      {showJfrlModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto animate-fadeIn">
          <div className="bg-white border border-slate-200 rounded-3xl max-w-4xl w-full p-6 sm:p-8 shadow-2xl space-y-6 relative max-h-[90vh] overflow-y-auto">
            
            {/* Header */}
            <div className="flex justify-between items-start border-b border-slate-200 pb-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="px-3 py-1 bg-blue-100 border border-blue-300 text-blue-900 font-mono font-black text-xs rounded-lg">
                    JFRL Official Analysis
                  </span>
                  <span className="px-2.5 py-0.5 bg-emerald-100 border border-emerald-300 text-emerald-900 font-mono font-black text-[10px] rounded-full">
                    Accredited by Japanese Government
                  </span>
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-slate-900">
                  {t.jfrlSectionTitle}
                </h3>
                <p className="text-xs text-slate-600 font-medium">
                  Client: <strong className="text-slate-900">Oxford High-Tech Research Institute Co., Ltd.</strong> (Setagaya-ku, Tokyo) • Issued: <strong className="text-blue-700">July 2023</strong>
                </p>
              </div>
              <button
                onClick={() => setShowJfrlModal(false)}
                className="p-2 bg-slate-100 hover:bg-slate-200 rounded-full text-slate-600 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Document 1 & 2 Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              {/* Document 1: Soft Drink Beverage Safety Certificate */}
              <div className="p-5 bg-slate-50 border border-slate-200 rounded-2xl space-y-4">
                <div className="flex justify-between items-start border-b border-slate-200 pb-3">
                  <div>
                    <span className="text-[10px] font-mono font-bold text-blue-800 bg-blue-100 px-2 py-0.5 rounded">
                      CERTIFICATE OF ANALYSIS
                    </span>
                    <h4 className="font-extrabold text-slate-900 text-sm mt-1">
                      No. 23056849001-0301
                    </h4>
                    <p className="text-[11px] font-mono text-slate-500">Issued: July 11, 2023</p>
                  </div>
                  <ShieldCheck className="w-6 h-6 text-emerald-600" />
                </div>

                <div className="space-y-2 text-xs">
                  <p className="font-bold text-slate-800">
                    MHLW Soft Drink Beverage Safety Standards
                  </p>
                  <p className="text-slate-600 text-[11px]">
                    Notification No. 370 (1959) &quot;Specifications and Standards for Foods, Food Additives, etc.&quot;
                  </p>
                </div>

                <div className="bg-white border border-slate-200 rounded-xl p-3 space-y-2 text-xs">
                  <div className="flex justify-between items-center py-1 border-b border-slate-100 font-medium">
                    <span className="text-slate-700">Turbidity</span>
                    <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 font-mono font-bold text-[11px] rounded">CONFORM</span>
                  </div>
                  <div className="flex justify-between items-center py-1 border-b border-slate-100 font-medium">
                    <span className="text-slate-700">Sediment & Foreign Matter</span>
                    <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 font-mono font-bold text-[11px] rounded">CONFORM</span>
                  </div>
                  <div className="flex justify-between items-center py-1 border-b border-slate-100 font-medium">
                    <span className="text-slate-700">Coliform Group</span>
                    <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 font-mono font-bold text-[11px] rounded">CONFORM</span>
                  </div>
                  <div className="flex justify-between items-center py-1 border-b border-slate-100 font-medium">
                    <span className="text-slate-700">Arsenic (as As₂O₃)</span>
                    <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 font-mono font-bold text-[11px] rounded">CONFORM</span>
                  </div>
                  <div className="flex justify-between items-center py-1 font-medium">
                    <span className="text-slate-700">Lead</span>
                    <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 font-mono font-bold text-[11px] rounded">CONFORM</span>
                  </div>
                </div>

                <p className="text-[10px] text-slate-500 font-medium italic text-right">
                  Signed: Kumiko Yoshioka (Documentation Section, JFRL)
                </p>
              </div>

              {/* Document 2: Bactericidal Efficiency Test (MRSA) */}
              <div className="p-5 bg-slate-900 border border-slate-800 rounded-2xl text-white space-y-4 shadow-md">
                <div className="flex justify-between items-start border-b border-slate-800 pb-3">
                  <div>
                    <span className="text-[10px] font-mono font-bold text-rose-300 bg-rose-950 px-2 py-0.5 rounded border border-rose-800">
                      BACTERICIDAL TEST REPORT
                    </span>
                    <h4 className="font-extrabold text-white text-sm mt-1">
                      No. 23056849001-0401
                    </h4>
                    <p className="text-[11px] font-mono text-slate-400">Issued: June 30, 2023 (English: July 17, 2023)</p>
                  </div>
                  <Activity className="w-6 h-6 text-rose-400" />
                </div>

                <div className="space-y-1 text-xs">
                  <p className="font-extrabold text-rose-300">
                    Test Organism: MRSA (Staphylococcus aureus IID 1677)
                  </p>
                  <p className="text-slate-400 text-[11px]">
                    Bactericidal efficiency measured at 15s, 30s, 60s, and 120s exposure.
                  </p>
                </div>

                {/* Test Table */}
                <div className="bg-slate-950 border border-slate-800 rounded-xl p-3 space-y-2 text-xs font-mono">
                  <div className="flex justify-between items-center py-1 border-b border-slate-800 text-[11px]">
                    <span className="text-slate-400">Initial Control</span>
                    <span className="text-slate-200 font-bold">9.0 × 10⁵ / mL</span>
                  </div>
                  <div className="flex justify-between items-center py-1 border-b border-slate-800 text-[11px]">
                    <span className="text-slate-400">After 15 Seconds</span>
                    <span className="text-amber-300 font-bold">7.0 × 10⁵ / mL</span>
                  </div>
                  <div className="flex justify-between items-center py-1 border-b border-slate-800 text-[11px]">
                    <span className="text-slate-400">After 30 Seconds</span>
                    <span className="text-amber-300 font-bold">5.9 × 10⁵ / mL</span>
                  </div>
                  <div className="flex justify-between items-center py-1 border-b border-slate-800 text-[11px]">
                    <span className="text-slate-400">After 60 Seconds</span>
                    <span className="text-amber-300 font-bold">6.3 × 10⁴ / mL</span>
                  </div>
                  <div className="flex justify-between items-center py-1 bg-emerald-950/60 p-1.5 rounded border border-emerald-500/40 text-[11px]">
                    <span className="text-emerald-300 font-bold">After 120 Seconds</span>
                    <span className="text-emerald-400 font-black px-2 py-0.5 bg-emerald-500/20 rounded">
                      &lt;1000 / mL (UNDETECTED)
                    </span>
                  </div>
                </div>

                <p className="text-[10px] text-slate-400 font-medium italic text-right">
                  Signed: Kumiko Yoshioka (Section of Analysis Documentation, JFRL)
                </p>
              </div>

            </div>

            {/* Footer Notice */}
            <div className="p-4 bg-slate-100 border border-slate-200 rounded-2xl flex flex-wrap justify-between items-center text-xs text-slate-700 font-medium gap-3">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>
                  Official analysis datasets and clinical verification reports from both <strong>2004 and 2023 studies</strong> are fully archived.
                </span>
              </div>
              <button
                onClick={() => setShowJfrlModal(false)}
                className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-black text-xs rounded-xl transition shadow-xs"
              >
                Close Certificate Inspector
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
