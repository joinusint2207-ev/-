import React, { useState } from 'react';
import {
  Atom,
  ShieldCheck,
  Award,
  FileText,
  CheckCircle2,
  ChevronRight,
  Activity,
  Building2,
  Mail,
  Send,
  Calendar,
  X,
  Lock,
  Check,
  Sparkles,
  FlaskConical,
  GraduationCap,
  Globe,
  MapPin,
  Briefcase,
  Zap,
  Clock,
  UserCheck,
  Users,
  Handshake,
  Loader2,
  Settings,
  Coins,
  Scale,
  Newspaper,
  ExternalLink,
  Search
} from 'lucide-react';
import { translations } from './translations';

export default function App() {
  // Language State (Default to Japanese 'jp')
  const [lang, setLang] = useState<'jp' | 'en' | 'kr'>('jp');
  const t = translations[lang];

  // JFRL Official Laboratory Certificates Modal State
  const [showJfrlModal, setShowJfrlModal] = useState<boolean>(false);

  // Target Recipient Email
  const RECIPIENT_EMAIL = 'arthursophia2207@icloud.com';

  // Inquiry Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    category: 'catAmrData',
    message: ''
  });
  const [formSubmitted, setFormSubmitted] = useState<boolean>(false);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    const categoryLabel = t[formData.category as keyof typeof t] || formData.category;
    const subject = encodeURIComponent(`[Oxford High-Tech Inquiry] ${categoryLabel} - ${formData.name}`);
    const body = encodeURIComponent(
      `Full Name / Organization: ${formData.name}\nOfficial Corporate Email: ${formData.email}\nInquiry Category: ${categoryLabel}\n\nMessage:\n${formData.message}\n\n---\nTarget Recipient: ${RECIPIENT_EMAIL}`
    );

    // Direct mailto link dispatch
    window.location.href = `mailto:${RECIPIENT_EMAIL}?subject=${subject}&body=${body}`;
    setFormSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans antialiased selection:bg-blue-600 selection:text-white">
      
      {/* 🏛️ Top Corporate Header & Navigation Bar */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            
            {/* Logo / Official Company Name */}
            <a href="#" className="flex items-center gap-3.5 group">
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-950 flex items-center justify-center text-white shadow-md shadow-blue-900/20 group-hover:scale-105 transition-transform border border-blue-400/30">
                <Atom className="w-6 h-6 animate-pulse text-blue-300" />
              </div>
              <div>
                <h1 className="text-sm sm:text-base font-black tracking-tight text-slate-900 group-hover:text-blue-700 transition-colors uppercase font-mono">
                  {t.companyEnglishName || "OXFORD HIGH-TECH RESEARCH INSTITUTE CO., LTD."}
                </h1>
                <p className="text-[11px] font-bold text-blue-800 tracking-wider">
                  {t.companyBrand} • {t.companyTagline}
                </p>
              </div>
            </a>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-4.5 text-xs font-bold text-slate-600">
              <a href="#overview" className="hover:text-blue-600 transition-colors">{t.navOverview}</a>
              <a href="#mrsa" className="hover:text-blue-600 transition-colors text-blue-700 font-extrabold">{t.navAmr}</a>
              <a href="#dementia" className="hover:text-purple-700 transition-colors text-indigo-700 font-extrabold">{t.navMgDementia}</a>
              <a href="#founder" className="hover:text-blue-600 transition-colors">{t.navFounder}</a>
              <a href="#media" className="hover:text-blue-600 transition-colors">{t.navMedia}</a>
              <a href="#patents" className="hover:text-blue-600 transition-colors">{t.navPatents}</a>
              <a href="#contact" className="hover:text-blue-600 transition-colors">{t.navContact}</a>
            </nav>

            {/* Language Toggle Controls & Action CTA */}
            <div className="flex items-center gap-3">
              <div className="flex bg-slate-100 p-1 rounded-lg border border-slate-200 text-xs font-black">
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
                  English
                </button>
                <button
                  onClick={() => setLang('kr')}
                  className={`px-2.5 py-1 rounded-md transition-all ${
                    lang === 'kr' ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  한국어
                </button>
              </div>

              <a
                href="#contact"
                className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 bg-blue-900 hover:bg-blue-800 text-white font-extrabold text-xs rounded-xl shadow-md transition-all hover:scale-105 active:scale-95"
              >
                <span>{t.navContact}</span>
                <ChevronRight className="w-3.5 h-3.5 text-blue-300" />
              </a>
            </div>

          </div>
        </div>
      </header>

      {/* 🚀 Corporate Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-16 lg:pt-16 lg:pb-24 border-b border-slate-200 bg-gradient-to-b from-blue-50/80 via-slate-50 to-white">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#cbd5e1_1px,transparent_1px),linear-gradient(to_bottom,#cbd5e1_1px,transparent_1px)] bg-[size:32px_32px] opacity-30" />
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-blue-300/30 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-indigo-300/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Hero Left Content */}
            <div className="lg:col-span-7 space-y-6">
              
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100/90 border border-blue-300/80 text-blue-900 text-xs font-black shadow-xs">
                <Building2 className="w-3.5 h-3.5 text-blue-700 shrink-0" />
                <span>{t.heroBadge}</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-[1.15]">
                {t.heroHeading}
              </h1>

              <p className="text-base sm:text-lg text-slate-700 font-medium leading-relaxed max-w-2xl">
                {t.heroLead}
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3.5 pt-2">
                <a
                  href="#mrsa"
                  className="px-5 py-3 bg-blue-900 hover:bg-blue-800 text-white font-extrabold text-xs sm:text-sm rounded-xl shadow-lg shadow-blue-900/20 transition-all flex items-center gap-2 hover:scale-105 active:scale-95"
                >
                  <ShieldCheck className="w-4 h-4 text-blue-300" />
                  <span>{t.btnAmr}</span>
                </a>
                <a
                  href="#dementia"
                  className="px-5 py-3 bg-gradient-to-r from-indigo-900 via-purple-900 to-indigo-950 hover:from-indigo-800 hover:to-purple-900 text-white font-extrabold text-xs sm:text-sm rounded-xl shadow-lg shadow-indigo-900/20 transition-all flex items-center gap-2 hover:scale-105 active:scale-95"
                >
                  <Sparkles className="w-4 h-4 text-purple-300" />
                  <span>{t.btnMgDementia}</span>
                </a>
                <a
                  href="#overview"
                  className="px-5 py-3 bg-white hover:bg-slate-100 border-2 border-slate-300 text-slate-800 font-extrabold text-xs sm:text-sm rounded-xl shadow-xs transition-all flex items-center gap-2 hover:border-slate-400"
                >
                  <Building2 className="w-4 h-4 text-slate-600" />
                  <span>{t.navOverview}</span>
                </a>
              </div>

            </div>

            {/* Hero Right Metrics Grid */}
            <div className="lg:col-span-5">
              <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xl relative space-y-6">
                
                <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                  <div className="flex items-center gap-2">
                    <Building2 className="w-5 h-5 text-blue-700" />
                    <span className="font-black text-slate-900 text-xs sm:text-sm font-mono uppercase">oxfordhightech</span>
                  </div>
                  <span className="px-2.5 py-0.5 bg-emerald-100 text-emerald-800 font-mono font-bold text-[10px] rounded-full">
                    Official Legal Entity
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  
                  <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-1">
                    <p className="text-2xl sm:text-3xl font-black text-blue-900">{t.statYears}</p>
                    <p className="text-xs font-bold text-slate-600">{t.statYearsLabel}</p>
                  </div>

                  <div className="p-4 bg-blue-900 border border-blue-800 text-white rounded-2xl space-y-1 shadow-sm">
                    <p className="text-2xl sm:text-3xl font-black text-amber-300">{t.statPatents}</p>
                    <p className="text-xs font-extrabold text-blue-100">{t.statPatentsLabel}</p>
                  </div>

                  <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-1">
                    <p className="text-lg font-black text-slate-900">{t.statOxford}</p>
                    <p className="text-xs font-bold text-slate-600">{t.statOxfordLabel}</p>
                  </div>

                  <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl space-y-1">
                    <p className="text-2xl sm:text-3xl font-black text-emerald-700">{t.statAmr}</p>
                    <p className="text-xs font-bold text-emerald-900">{t.statAmrLabel}</p>
                  </div>

                </div>

                <div className="p-3.5 bg-blue-50/90 border border-blue-200 rounded-2xl text-blue-950 text-xs font-semibold flex items-center gap-3 shadow-xs">
                  <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
                  <span>
                    Oxford Science Park Research Founder &amp; JFRL Certificate Recipient.
                  </span>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>


      {/* 🦠 1. FLAGSHIP TECHNOLOGY: MRSA & AMR ERADICATION (SN Water) */}
      <section id="mrsa" className="py-16 sm:py-24 bg-white border-b border-slate-200 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="px-3.5 py-1.5 bg-rose-100 border border-rose-300 text-rose-900 font-mono font-black text-xs rounded-full uppercase tracking-wider">
              {t.amrBadge}
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              {t.amrHeading}
            </h2>
            <p className="text-slate-600 font-semibold text-sm sm:text-base">
              {t.amrTitle}
            </p>
          </div>

          {/* Main MRSA Solution Spotlight Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            
            {/* Left Card: The Crisis vs. SN Water Solution (Clean, Bright Medical White & Platinum Palette) */}
            <div className="lg:col-span-7 bg-white text-slate-900 rounded-3xl p-6 sm:p-10 space-y-6 shadow-xl flex flex-col justify-between relative overflow-hidden border-2 border-slate-200">
              <div className="absolute -top-24 -right-24 w-64 h-64 bg-blue-100/60 rounded-full blur-3xl pointer-events-none" />

              <div className="space-y-6 relative z-10">
                
                {/* WHO Crisis Box (Crisp Rose/Crimson Light Alert) */}
                <div className="p-4 sm:p-5 bg-rose-50 border border-rose-200 rounded-2xl space-y-2">
                  <div className="flex items-center gap-2 text-rose-700 font-black text-xs uppercase tracking-wider">
                    <Activity className="w-4 h-4" />
                    <span>{t.amrCrisisTitle}</span>
                  </div>
                  <p className="text-xs sm:text-sm text-rose-950 leading-relaxed font-medium">
                    {t.amrCrisisDesc}
                  </p>
                </div>

                {/* SN Water Eradication & Trade Secret */}
                <div className="space-y-3">
                  <h3 className="text-xl sm:text-2xl font-black text-blue-900 flex items-center gap-2">
                    <ShieldCheck className="w-6 h-6 text-emerald-600 shrink-0" />
                    <span>{t.amrEradTitle}</span>
                  </h3>
                  <p className="text-slate-700 text-sm sm:text-base leading-relaxed font-normal">
                    {t.amrEradDesc}
                  </p>
                </div>

                {/* 🌟 Nobel Laureate Dr. Linus Pauling Quantum Physics Legacy & Drinkable Strong Acid Origin (High-Visibility Spotlight) */}
                <div className="relative overflow-hidden p-5 sm:p-6 bg-gradient-to-br from-amber-500/10 via-blue-500/10 to-indigo-500/15 border-2 border-amber-400/80 rounded-2xl space-y-3 shadow-lg ring-4 ring-amber-400/10">
                  <div className="absolute top-0 right-0 -mt-2 -mr-2 bg-gradient-to-r from-amber-500 to-amber-600 text-white font-extrabold text-[10px] sm:text-xs px-3 py-1 rounded-full shadow-md uppercase tracking-wider flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-yellow-200" />
                    <span>Nobel Laureate Legacy</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="p-2.5 bg-amber-100 border border-amber-300 rounded-xl text-amber-700 shadow-sm shrink-0 mt-0.5">
                      <Award className="w-6 h-6 text-amber-600" />
                    </div>
                    <div className="space-y-1.5">
                      <h4 className="text-sm sm:text-base font-black text-slate-900 leading-snug break-keep flex items-center gap-1.5">
                        <span className="text-amber-800">★</span> {t.amrPaulingOriginTitle}
                      </h4>
                      <p className="text-xs sm:text-[13px] text-slate-700 leading-relaxed font-medium break-keep">
                        {t.amrPaulingOriginDesc}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Speed Comparison Banner */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <div className="p-3.5 bg-emerald-50 border-2 border-emerald-300 rounded-xl space-y-1 shadow-sm">
                    <p className="text-[11px] font-mono text-emerald-800 font-extrabold uppercase">SN Water Eradication</p>
                    <p className="text-xs font-black text-emerald-950">{t.amrCompareFast}</p>
                  </div>
                  <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
                    <p className="text-[11px] font-mono text-slate-500 font-bold uppercase">Conventional Antibiotics</p>
                    <p className="text-xs font-medium text-slate-600">{t.amrCompareSlow}</p>
                  </div>
                </div>

              </div>

              {/* Bottom Trade Secret Security Badge */}
              <div className="pt-4 border-t border-slate-200 flex items-center gap-3 text-slate-600 text-xs font-mono">
                <Lock className="w-4 h-4 text-amber-600 shrink-0" />
                <span className="font-semibold text-slate-700">Protected via Proprietary Trade Secret (Coca-Cola Formula Model)</span>
              </div>

            </div>

            {/* Right Card: MHLW Safety & JFRL Laboratory Verification */}
            <div className="lg:col-span-5 bg-blue-50/90 border-2 border-blue-200 rounded-3xl p-6 sm:p-8 space-y-6 shadow-md flex flex-col justify-between">
              
              <div className="space-y-5">
                <div className="flex items-center justify-between border-b border-blue-200 pb-3">
                  <span className="px-3 py-1 bg-blue-900 text-white font-mono font-black text-xs rounded-lg">
                    MHLW & JFRL VERIFIED
                  </span>
                  <FlaskConical className="w-5 h-5 text-blue-700" />
                </div>

                <div className="space-y-2">
                  <h4 className="font-extrabold text-slate-900 text-base">
                    {t.amrValidationTitle}
                  </h4>
                  <p className="text-slate-700 text-xs sm:text-sm leading-relaxed font-medium">
                    {t.amrValidationDesc}
                  </p>
                </div>

                {/* Highlighted 2004 & 2023 JFRL Report Box */}
                <div className="p-4 bg-white border border-blue-300 rounded-2xl space-y-3 shadow-xs">
                  <div className="flex items-center justify-between">
                    <p className="font-black text-blue-950 text-xs flex items-center gap-1.5">
                      <Calendar className="w-4 h-4 text-blue-600" />
                      <span>{t.amrDataYearsTitle}</span>
                    </p>
                    <span className="px-2 py-0.5 bg-blue-600 text-white font-mono font-black text-[10px] rounded-full">
                      2004 & 2023 JFRL
                    </span>
                  </div>
                  <p className="text-slate-700 text-xs leading-relaxed font-medium">
                    {t.amrDataYearsDesc}
                  </p>
                </div>

                {/* Added 2023 BMSA FQREC Report Box */}
                <div className="p-4 bg-indigo-900 border border-indigo-700 rounded-2xl space-y-2 text-white shadow-xs">
                  <div className="flex items-center justify-between">
                    <p className="font-black text-indigo-100 text-xs flex items-center gap-1.5">
                      <Award className="w-4 h-4 text-amber-400" />
                      <span>{t.fqrecTitle}</span>
                    </p>
                    <span className="px-2 py-0.5 bg-indigo-700 text-amber-300 font-mono font-black text-[10px] rounded-full">
                      2023 BMSA R5-31
                    </span>
                  </div>
                  <p className="text-indigo-200 text-xs leading-relaxed font-medium">
                    {t.fqrecDesc}
                  </p>
                </div>

              </div>

              {/* Open Modal Button */}
              <button
                id="btn-open-jfrl-inspector"
                onClick={() => setShowJfrlModal(true)}
                className="w-full py-3 bg-blue-900 hover:bg-blue-800 text-white font-extrabold text-xs sm:text-sm rounded-xl transition flex items-center justify-center gap-2 shadow-md hover:scale-[1.02] active:scale-[0.98] mt-4"
              >
                <FileText className="w-4 h-4 text-blue-300" />
                <span>{t.jfrlBtnText}</span>
              </button>

            </div>

          </div>

          {/* 🔬 IN VITRO CERTIFIED BACTERICIDAL TEST RESULTS SUMMARY (Bright, Clean Medical Platinum & Pearl Theme) */}
          <div className="bg-gradient-to-br from-slate-50 via-blue-50/60 to-indigo-50/40 text-slate-900 rounded-3xl p-6 sm:p-8 border-2 border-blue-200/80 shadow-xl space-y-6 overflow-hidden relative">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5 border-b border-blue-200/60 pb-6">
              <div className="space-y-2 max-w-2xl">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-3 py-1 bg-rose-100 text-rose-800 border border-rose-300 rounded-full text-xs font-mono font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-xs">
                    <FlaskConical className="w-3.5 h-3.5 text-rose-700" />
                    <span>IN VITRO LABORATORY DATA</span>
                  </span>
                  <span className="px-3 py-1 bg-emerald-100 text-emerald-900 border border-emerald-300 rounded-full text-xs font-mono font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-xs">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
                    <span>100% ERADICATED</span>
                  </span>
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight break-keep">
                  {t.strainsTableTitle}
                </h3>
                <p className="text-slate-700 text-xs sm:text-sm font-medium leading-relaxed break-keep">
                  {t.strainsTableSub}
                </p>
              </div>

              <div className="flex flex-wrap sm:flex-nowrap lg:flex-col xl:flex-row gap-2.5">
                <div className="px-3.5 py-2 bg-blue-100/90 border border-blue-300 rounded-xl text-blue-950 text-xs font-bold flex items-center gap-2 shadow-xs">
                  <Award className="w-4 h-4 text-blue-700 shrink-0" />
                  <span className="leading-tight">{t.mhlwAuthorityBadge}</span>
                </div>
                <div className="px-3.5 py-2 bg-emerald-100/90 border border-emerald-300 rounded-xl text-emerald-950 text-xs font-bold flex items-center gap-2 shadow-xs">
                  <Clock className="w-4 h-4 text-emerald-700 shrink-0" />
                  <span className="leading-tight">{t.reproducibilityBadge}</span>
                </div>
              </div>
            </div>

            {/* 3 Major Strains Eradication Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
              
              {/* Strain 1: MRSA */}
              <div className="bg-white border-2 border-rose-200/90 rounded-2xl p-5 space-y-4 flex flex-col justify-between hover:border-rose-400 transition shadow-sm hover:shadow-md">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-0.5 bg-rose-100 text-rose-800 border border-rose-300 text-[10px] font-mono font-bold rounded">
                      SUPERBUG #1
                    </span>
                    <span className="text-xs font-mono font-bold text-slate-600">JFRL Certified</span>
                  </div>
                  <h4 className="text-sm sm:text-base font-extrabold text-slate-900 leading-snug">
                    {t.strainMrsaTitle}
                  </h4>
                  <div className="pt-2">
                    <span className="text-xs font-mono text-slate-600 font-semibold">Exposure Time:</span>
                    <p className="text-sm font-black text-rose-700">{t.strainMrsaTime}</p>
                  </div>
                </div>
                <div className="p-3 bg-emerald-50 border border-emerald-300 rounded-xl text-center shadow-xs">
                  <p className="text-xs font-black text-emerald-800">{t.strainMrsaResult}</p>
                </div>
              </div>

              {/* Strain 2: General & Enteric Pathogens */}
              <div className="bg-white border-2 border-blue-200/90 rounded-2xl p-5 space-y-4 flex flex-col justify-between hover:border-blue-400 transition shadow-sm hover:shadow-md">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-0.5 bg-blue-100 text-blue-800 border border-blue-300 text-[10px] font-mono font-bold rounded">
                      PATHOGENS
                    </span>
                    <span className="text-xs font-mono font-bold text-slate-600">JFRL Certified</span>
                  </div>
                  <h4 className="text-sm sm:text-base font-extrabold text-slate-900 leading-snug">
                    {t.strainGeneralTitle}
                  </h4>
                  <div className="pt-2">
                    <span className="text-xs font-mono text-slate-600 font-semibold">Exposure Time:</span>
                    <p className="text-sm font-black text-blue-700">{t.strainGeneralTime}</p>
                  </div>
                </div>
                <div className="p-3 bg-emerald-50 border border-emerald-300 rounded-xl text-center shadow-xs">
                  <p className="text-xs font-black text-emerald-800">{t.strainGeneralResult}</p>
                </div>
              </div>

              {/* Strain 3: FQREC Multidrug-Resistant E. coli */}
              <div className="bg-white border-2 border-indigo-200/90 rounded-2xl p-5 space-y-4 flex flex-col justify-between hover:border-indigo-400 transition shadow-sm hover:shadow-md">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-0.5 bg-indigo-100 text-indigo-800 border border-indigo-300 text-[10px] font-mono font-bold rounded">
                      DRUG RESISTANT
                    </span>
                    <span className="text-xs font-mono font-bold text-slate-600">BMSA Certified</span>
                  </div>
                  <h4 className="text-sm sm:text-base font-extrabold text-slate-900 leading-snug">
                    {t.strainFqrecTitle}
                  </h4>
                  <div className="pt-2">
                    <span className="text-xs font-mono text-slate-600 font-semibold">Exposure & Dilution:</span>
                    <p className="text-sm font-black text-indigo-700">{t.strainFqrecTime}</p>
                  </div>
                </div>
                <div className="p-3 bg-emerald-50 border border-emerald-300 rounded-xl text-center shadow-xs">
                  <p className="text-xs font-black text-emerald-800">{t.strainFqrecResult}</p>
                </div>
              </div>

            </div>

            {/* Bottom Summary Notice */}
            <div className="p-4 bg-white/90 border border-blue-200 rounded-2xl flex items-start gap-3 text-xs text-slate-800 shadow-xs">
              <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <p className="leading-relaxed font-medium">
                {t.inVitroSummaryNotice}
              </p>
            </div>
          </div>

          {/* 🏛️ 5 CORE AMR TARGET PATHOGENS BENCHMARK COMPARISON (Bright, Elegant High-End Light Theme) */}
          <div className="bg-gradient-to-br from-indigo-50/90 via-white to-blue-50/90 text-slate-900 rounded-3xl p-6 sm:p-8 lg:p-10 border-2 border-indigo-300/80 shadow-2xl space-y-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-100/40 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-100/40 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 space-y-4 max-w-4xl">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-3.5 py-1.5 bg-indigo-100 text-indigo-900 border border-indigo-300 rounded-full text-xs font-mono font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-xs">
                  <Award className="w-4 h-4 text-indigo-700" />
                  <span>{t.pasteurBadge}</span>
                </span>
                <span className="px-3 py-1 bg-emerald-100 text-emerald-900 border border-emerald-300 rounded-full text-xs font-mono font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-xs">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>5/5 (100%) Targets Eradicated</span>
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl lg:text-3xl font-black text-slate-900 tracking-tight leading-snug break-keep">
                {t.pasteurSectionTitle}
              </h3>
              <p className="text-slate-700 text-xs sm:text-sm font-medium leading-relaxed break-keep">
                {t.pasteurSectionSub}
              </p>
            </div>

            {/* 5 Core Strains Cards Grid */}
            <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
              
              {/* Strain 1: Pseudomonas aeruginosa */}
              <div className="bg-white border-2 border-indigo-100 hover:border-indigo-400 rounded-2xl p-5 space-y-4 flex flex-col justify-between transition group shadow-sm hover:shadow-md">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-1 bg-indigo-50 text-indigo-800 border border-indigo-200 text-[10px] font-mono font-bold rounded-lg">
                      CORE TARGET #1
                    </span>
                    <span className="px-2 py-0.5 bg-emerald-50 text-emerald-800 border border-emerald-200 text-[10px] font-mono font-bold rounded">
                      {t.pasteurP1Cert}
                    </span>
                  </div>
                  <div>
                    <h4 className="text-base font-black text-slate-900 group-hover:text-indigo-900 transition">
                      {t.pasteurP1Name}
                    </h4>
                    <p className="text-xs font-semibold text-indigo-700 mt-0.5">
                      {t.pasteurP1Role}
                    </p>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {t.pasteurP1Desc}
                  </p>
                </div>
                <div className="p-3 bg-emerald-50 border border-emerald-300 rounded-xl">
                  <div className="flex items-center justify-between text-[11px] font-mono text-slate-600 mb-1">
                    <span>SN Water Eradication:</span>
                    <span className="text-emerald-700 font-bold">100% COMPLETE</span>
                  </div>
                  <p className="text-xs font-black text-emerald-900">{t.pasteurP1Result}</p>
                </div>
              </div>

              {/* Strain 2: Staphylococcus aureus */}
              <div className="bg-white border-2 border-indigo-100 hover:border-indigo-400 rounded-2xl p-5 space-y-4 flex flex-col justify-between transition group shadow-sm hover:shadow-md">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-1 bg-indigo-50 text-indigo-800 border border-indigo-200 text-[10px] font-mono font-bold rounded-lg">
                      CORE TARGET #2
                    </span>
                    <span className="px-2 py-0.5 bg-emerald-50 text-emerald-800 border border-emerald-200 text-[10px] font-mono font-bold rounded">
                      {t.pasteurP2Cert}
                    </span>
                  </div>
                  <div>
                    <h4 className="text-base font-black text-slate-900 group-hover:text-indigo-900 transition">
                      {t.pasteurP2Name}
                    </h4>
                    <p className="text-xs font-semibold text-indigo-700 mt-0.5">
                      {t.pasteurP2Role}
                    </p>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {t.pasteurP2Desc}
                  </p>
                </div>
                <div className="p-3 bg-emerald-50 border border-emerald-300 rounded-xl">
                  <div className="flex items-center justify-between text-[11px] font-mono text-slate-600 mb-1">
                    <span>SN Water Eradication:</span>
                    <span className="text-emerald-700 font-bold">&lt;10/mL UNDETECTED</span>
                  </div>
                  <p className="text-xs font-black text-emerald-900">{t.pasteurP2Result}</p>
                </div>
              </div>

              {/* Strain 3: MRSA (IID 1677) */}
              <div className="bg-white border-2 border-rose-300 hover:border-rose-500 rounded-2xl p-5 space-y-4 flex flex-col justify-between transition group shadow-md hover:shadow-lg ring-2 ring-rose-100">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-1 bg-rose-100 text-rose-900 border border-rose-300 text-[10px] font-mono font-black rounded-lg flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-rose-600" />
                      <span>CORE TARGET #3 (KEY SUPERBUG)</span>
                    </span>
                    <span className="px-2 py-0.5 bg-amber-50 text-amber-900 border border-amber-300 text-[10px] font-mono font-bold rounded">
                      {t.pasteurP3Cert}
                    </span>
                  </div>
                  <div>
                    <h4 className="text-base font-black text-slate-900 group-hover:text-rose-900 transition">
                      {t.pasteurP3Name}
                    </h4>
                    <p className="text-xs font-semibold text-rose-700 mt-0.5">
                      {t.pasteurP3Role}
                    </p>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {t.pasteurP3Desc}
                  </p>
                </div>
                <div className="p-3 bg-emerald-50 border-2 border-emerald-400/80 rounded-xl">
                  <div className="flex items-center justify-between text-[11px] font-mono text-slate-600 mb-1">
                    <span>SN Water Eradication:</span>
                    <span className="text-emerald-700 font-bold">100% REPRODUCIBLE</span>
                  </div>
                  <p className="text-xs font-black text-emerald-900">{t.pasteurP3Result}</p>
                </div>
              </div>

              {/* Strain 4: Escherichia coli (IFO 3972) */}
              <div className="bg-white border-2 border-indigo-100 hover:border-indigo-400 rounded-2xl p-5 space-y-4 flex flex-col justify-between transition group shadow-sm hover:shadow-md">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-1 bg-indigo-50 text-indigo-800 border border-indigo-200 text-[10px] font-mono font-bold rounded-lg">
                      CORE TARGET #4
                    </span>
                    <span className="px-2 py-0.5 bg-emerald-50 text-emerald-800 border border-emerald-200 text-[10px] font-mono font-bold rounded">
                      {t.pasteurP4Cert}
                    </span>
                  </div>
                  <div>
                    <h4 className="text-base font-black text-slate-900 group-hover:text-indigo-900 transition">
                      {t.pasteurP4Name}
                    </h4>
                    <p className="text-xs font-semibold text-indigo-700 mt-0.5">
                      {t.pasteurP4Role}
                    </p>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {t.pasteurP4Desc}
                  </p>
                </div>
                <div className="p-3 bg-emerald-50 border border-emerald-300 rounded-xl">
                  <div className="flex items-center justify-between text-[11px] font-mono text-slate-600 mb-1">
                    <span>SN Water Eradication:</span>
                    <span className="text-emerald-700 font-bold">100% COMPLETE</span>
                  </div>
                  <p className="text-xs font-black text-emerald-900">{t.pasteurP4Result}</p>
                </div>
              </div>

              {/* Strain 5: FQREC (IMGR1240 / IMGR1251) */}
              <div className="bg-white border-2 border-indigo-200 hover:border-indigo-400 rounded-2xl p-5 space-y-4 flex flex-col justify-between transition group shadow-md hover:shadow-lg md:col-span-2 lg:col-span-2">
                <div className="space-y-3">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="px-2.5 py-1 bg-indigo-100 text-indigo-900 border border-indigo-300 text-[10px] font-mono font-black rounded-lg">
                      CORE TARGET #5 (CLINICAL MULTIDRUG-RESISTANT)
                    </span>
                    <span className="px-2 py-0.5 bg-amber-50 text-amber-900 border border-amber-300 text-[10px] font-mono font-bold rounded">
                      {t.pasteurP5Cert}
                    </span>
                  </div>
                  <div>
                    <h4 className="text-base font-black text-slate-900 group-hover:text-indigo-900 transition">
                      {t.pasteurP5Name}
                    </h4>
                    <p className="text-xs font-semibold text-indigo-700 mt-0.5">
                      {t.pasteurP5Role}
                    </p>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {t.pasteurP5Desc}
                  </p>
                </div>
                <div className="p-3.5 bg-emerald-50 border-2 border-emerald-300 rounded-xl flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                  <div>
                    <span className="text-[11px] font-mono text-slate-600">SN Water Dilution Performance:</span>
                    <p className="text-xs font-black text-emerald-900">{t.pasteurP5Result}</p>
                  </div>
                  <div className="text-right">
                    <span className="px-3 py-1 bg-emerald-700 text-white font-mono font-bold text-xs rounded-lg shadow-xs">
                      All Bacteria Died (-)
                    </span>
                  </div>
                </div>
              </div>

            </div>

            {/* Bottom Key Takeaway Callout Box */}
            <div className="relative z-10 p-5 bg-gradient-to-r from-amber-50 via-indigo-50 to-blue-50 border-2 border-amber-300/80 rounded-2xl flex items-start gap-4 text-xs sm:text-sm text-slate-800 shadow-md">
              <Sparkles className="w-6 h-6 text-amber-600 shrink-0 mt-0.5" />
              <p className="leading-relaxed font-semibold text-slate-900 break-keep">
                {t.pasteurKeyTakeaway}
              </p>
            </div>

          </div>

          {/* 🌟 Technological Greatness & Unmatched Differentiation (3 Pillars) */}
          <div className="pt-12 space-y-8 border-t border-slate-200 mt-12">
            <div className="text-center space-y-2 max-w-3xl mx-auto">
              <span className="px-3.5 py-1.5 bg-emerald-100 text-emerald-900 font-mono font-black text-xs rounded-full uppercase tracking-wider inline-flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                <span>CORE SUPERIORITY & DIFFERENTIATION</span>
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                {t.superiorityTitle}
              </h3>
              <p className="text-slate-600 text-xs sm:text-sm font-medium">
                {t.superioritySub}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Pillar 1: Official Drinking Safety */}
              <div className="bg-white border-2 border-emerald-100 hover:border-emerald-300 rounded-3xl p-6 space-y-4 shadow-sm transition-all hover:shadow-md flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="w-10 h-10 bg-emerald-100 text-emerald-800 rounded-2xl flex items-center justify-center font-black">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  <h4 className="font-extrabold text-slate-900 text-base leading-snug">
                    {t.sup1Title}
                  </h4>
                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-normal">
                    {t.sup1Desc}
                  </p>
                </div>
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] font-mono font-bold text-emerald-700">
                  <span>MHLW No. 370 Soft Drink</span>
                  <span className="px-2 py-0.5 bg-emerald-50 text-emerald-800 rounded">JFRL CONFORM</span>
                </div>
              </div>

              {/* Pillar 2: Selective Bactericidal Power */}
              <div className="bg-white border-2 border-rose-200 hover:border-rose-400 rounded-3xl p-6 space-y-4 shadow-sm transition-all hover:shadow-md flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 bg-rose-100 text-rose-800 rounded-2xl flex items-center justify-center font-black">
                      <Zap className="w-6 h-6" />
                    </div>
                    <span className="px-2.5 py-1 bg-rose-50 text-rose-800 border border-rose-200 text-[10px] font-mono font-bold rounded-lg">
                      5 CORE TARGET PATHOGENS
                    </span>
                  </div>
                  <h4 className="font-extrabold text-slate-900 text-base leading-snug">
                    {t.sup2Title}
                  </h4>
                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-normal">
                    {t.sup2Desc}
                  </p>

                  {/* 5 Core Pathogens Kill-Time Visual Chips */}
                  <div className="pt-2 grid grid-cols-2 gap-1.5 text-[11px] font-medium">
                    <div className="p-2 bg-rose-50/80 border border-rose-100 rounded-xl flex items-center justify-between">
                      <span className="font-bold text-rose-950 truncate">① MRSA (IID 1677)</span>
                      <span className="font-mono font-black text-rose-700 shrink-0 ml-1">120s (&lt;1000/mL)</span>
                    </div>
                    <div className="p-2 bg-amber-50/80 border border-amber-100 rounded-xl flex items-center justify-between">
                      <span className="font-bold text-amber-950 truncate">② FQREC (IMGR1240)</span>
                      <span className="font-mono font-black text-amber-800 shrink-0 ml-1">1~5m (15x)</span>
                    </div>
                    <div className="p-2 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between">
                      <span className="font-bold text-slate-900 truncate">③ 녹농균 (Pseudomonas)</span>
                      <span className="font-mono font-black text-emerald-700 shrink-0 ml-1">15s</span>
                    </div>
                    <div className="p-2 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between">
                      <span className="font-bold text-slate-900 truncate">④ 황색포도상구균 (IFO 12732)</span>
                      <span className="font-mono font-black text-emerald-700 shrink-0 ml-1">&lt;10/mL</span>
                    </div>
                    <div className="p-2 bg-slate-50 border border-slate-200 rounded-xl col-span-2 flex items-center justify-between">
                      <span className="font-bold text-slate-900 truncate">⑤ 대장균 (E. coli, IFO 3972)</span>
                      <span className="font-mono font-black text-emerald-700 shrink-0 ml-1">15s (100% 사멸)</span>
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] font-mono font-bold text-rose-700">
                  <span>120s MRSA &amp; 5 Targets Elimination</span>
                  <span className="px-2 py-0.5 bg-rose-50 text-rose-800 rounded">&lt;1000/mL &amp; 100% COMPLETE</span>
                </div>
              </div>

              {/* Pillar 3: 20-Year Reproducibility */}
              <div className="bg-white border-2 border-indigo-100 hover:border-indigo-300 rounded-3xl p-6 space-y-4 shadow-sm transition-all hover:shadow-md flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="w-10 h-10 bg-indigo-100 text-indigo-800 rounded-2xl flex items-center justify-center font-black">
                    <Clock className="w-6 h-6" />
                  </div>
                  <h4 className="font-extrabold text-slate-900 text-base leading-snug">
                    {t.sup3Title}
                  </h4>
                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-normal">
                    {t.sup3Desc}
                  </p>
                </div>
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] font-mono font-bold text-indigo-700">
                  <span>2004 & 2023 Studies</span>
                  <span className="px-2 py-0.5 bg-indigo-50 text-indigo-800 rounded">100% REPRODUCIBLE</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>


      {/* 🧠 3. 2ND CORE PATENT: WORLD-FIRST Mg+H2 ION WATER GENERATOR FOR DEMENTIA PREVENTIVE MEDICINE */}
      <section id="dementia" className="py-16 sm:py-24 bg-gradient-to-b from-purple-50/80 via-indigo-50/40 to-slate-50 text-slate-900 border-b border-slate-200 relative overflow-hidden">
        {/* Background Decorative Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#cbd5e1_1px,transparent_1px),linear-gradient(to_bottom,#cbd5e1_1px,transparent_1px)] bg-[size:32px_32px] opacity-35" />
        <div className="absolute top-1/4 -left-20 w-80 h-80 bg-purple-300/30 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-blue-300/30 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          {/* Section Header */}
          <div className="text-center max-w-4xl mx-auto space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-100 border border-purple-300 text-purple-900 font-mono font-black text-xs uppercase tracking-wider shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-purple-700 shrink-0" />
              <span>{t.mgBadge}</span>
            </div>
            
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight text-slate-900 leading-tight">
              {t.mgTitle}
            </h2>
            
            <p className="text-slate-700 text-sm sm:text-base lg:text-lg font-semibold leading-relaxed max-w-3xl mx-auto">
              {t.mgLead}
            </p>
          </div>

          {/* Key Why Needed Grid: 4 Clinical Evidence Cards */}
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                {t.mgWhyTitle}
              </h3>
              <p className="text-xs sm:text-sm text-purple-800 font-mono font-extrabold">
                {t.mgWhySub}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Card 1: ANU Dementia Crisis Doubling */}
              <div className="bg-white border border-amber-200 rounded-3xl p-6 sm:p-8 space-y-4 shadow-md hover:shadow-xl hover:border-amber-400 transition relative">
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 bg-amber-100 text-amber-900 border border-amber-300 font-mono font-bold text-[10px] rounded-full uppercase">
                    {t.mgWhy1Source}
                  </span>
                  <div className="w-9 h-9 rounded-xl bg-amber-100 flex items-center justify-center text-amber-700">
                    <Activity className="w-5 h-5" />
                  </div>
                </div>
                <h4 className="text-base sm:text-lg font-black text-slate-900 leading-snug">
                  {t.mgWhy1Title}
                </h4>
                <p className="text-slate-700 text-xs sm:text-sm leading-relaxed font-medium">
                  {t.mgWhy1Desc}
                </p>
              </div>

              {/* Card 2: 30 Years of Drug Failures */}
              <div className="bg-white border border-rose-200 rounded-3xl p-6 sm:p-8 space-y-4 shadow-md hover:shadow-xl hover:border-rose-400 transition relative">
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 bg-rose-100 text-rose-900 border border-rose-300 font-mono font-bold text-[10px] rounded-full uppercase">
                    {t.mgWhy2Source}
                  </span>
                  <div className="w-9 h-9 rounded-xl bg-rose-100 flex items-center justify-center text-rose-700">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                </div>
                <h4 className="text-base sm:text-lg font-black text-slate-900 leading-snug">
                  {t.mgWhy2Title}
                </h4>
                <p className="text-slate-700 text-xs sm:text-sm leading-relaxed font-medium">
                  {t.mgWhy2Desc}
                </p>
              </div>

              {/* Card 3: ANU Clinical Study (6000+ Subjects) */}
              <div className="bg-white border border-emerald-200 rounded-3xl p-6 sm:p-8 space-y-4 shadow-md hover:shadow-xl hover:border-emerald-400 transition relative md:col-span-1">
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 bg-emerald-100 text-emerald-900 border border-emerald-300 font-mono font-bold text-[10px] rounded-full uppercase">
                    {t.mgWhy3Source}
                  </span>
                  <div className="w-9 h-9 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-700">
                    <Award className="w-5 h-5" />
                  </div>
                </div>
                <h4 className="text-base sm:text-lg font-black text-slate-900 leading-snug">
                  {t.mgWhy3Title}
                </h4>
                <p className="text-slate-700 text-xs sm:text-sm leading-relaxed font-medium">
                  {t.mgWhy3Desc}
                </p>
              </div>

              {/* Card 4: Oxford Academic Paper */}
              <div className="bg-white border border-blue-200 rounded-3xl p-6 sm:p-8 space-y-4 shadow-md hover:shadow-xl hover:border-blue-400 transition relative md:col-span-1">
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 bg-blue-100 text-blue-900 border border-blue-300 font-mono font-bold text-[10px] rounded-full uppercase">
                    {t.mgWhy4Source}
                  </span>
                  <div className="w-9 h-9 rounded-xl bg-blue-100 flex items-center justify-center text-blue-700">
                    <FlaskConical className="w-5 h-5" />
                  </div>
                </div>
                <h4 className="text-base sm:text-lg font-black text-slate-900 leading-snug">
                  {t.mgWhy4Title}
                </h4>
                <p className="text-slate-700 text-xs sm:text-sm leading-relaxed font-medium">
                  {t.mgWhy4Desc}
                </p>
              </div>

            </div>
          </div>

          {/* Innovation Summary Callout Banner */}
          <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-purple-950 border border-blue-800 rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl text-white">
            <div className="space-y-2 text-center md:text-left">
              <span className="text-xs font-mono font-bold text-purple-300 uppercase tracking-widest">
                Oxford High-Tech Research Institute Co., Ltd. • Flagship Patent #2
              </span>
              <h4 className="text-lg sm:text-xl font-black text-white">
                World's First Patented Mg+H2 Ion Water Generator for Dementia Prevention
              </h4>
              <p className="text-xs sm:text-sm text-slate-200 max-w-2xl font-medium">
                Engineered under the leadership of Hon. Dr. Yukinobu Mori (40 years Quantum Physics research). Open for institutional partnerships & technology licensing.
              </p>
            </div>
            
            <a
              href="#contact"
              className="shrink-0 px-6 py-3.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs sm:text-sm rounded-xl transition shadow-lg hover:scale-105 active:scale-95 flex items-center gap-2"
            >
              <span>{t.navContact}</span>
              <ChevronRight className="w-4 h-4" />
            </a>
          </div>

        </div>
      </section>
      <section id="founder" className="py-16 sm:py-24 bg-slate-100/80 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="px-3 py-1 bg-slate-200 border border-slate-300 text-slate-800 font-mono font-black text-xs rounded-full uppercase">
              {t.authSubtitle}
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              {t.authTitle}
            </h2>
            <p className="text-slate-700 font-medium text-sm sm:text-base leading-relaxed">
              {t.authP1}
            </p>
          </div>

          {/* Academic Career Timeline Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            
            {/* 1. Univ of Pennsylvania */}
            <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 space-y-4 shadow-sm hover:shadow-md transition">
              <div className="w-12 h-12 rounded-2xl bg-blue-100 flex items-center justify-center text-blue-700 font-black">
                <GraduationCap className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <span className="text-[11px] font-mono font-bold text-blue-600 uppercase">Quantum Physics Foundation</span>
                <h3 className="text-lg font-black text-slate-900">{t.upennTitle}</h3>
              </div>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-medium">
                {t.upennDesc}
              </p>
            </div>

            {/* 2. Dr. Linus Pauling Collaboration */}
            <div className="bg-white border border-blue-200 rounded-3xl p-6 sm:p-8 space-y-4 shadow-md relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-blue-600 text-white font-mono text-[10px] font-black px-3 py-1 rounded-bl-xl">
                Nobel Laureate Mentorship
              </div>
              <div className="w-12 h-12 rounded-2xl bg-indigo-100 flex items-center justify-center text-indigo-700 font-black">
                <Award className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <span className="text-[11px] font-mono font-bold text-indigo-600 uppercase">Quantum Chemistry Mentorship</span>
                <h3 className="text-lg font-black text-slate-900">{t.paulingTitle}</h3>
              </div>
              <p className="text-slate-700 text-xs sm:text-sm leading-relaxed font-semibold">
                {t.paulingDesc}
              </p>
            </div>

            {/* 3. Clayton University Honorary Doctorate */}
            <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 space-y-4 shadow-sm hover:shadow-md transition">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 flex items-center justify-center text-emerald-700 font-black">
                <FileText className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <span className="text-[11px] font-mono font-bold text-emerald-700 uppercase">Academic Distinction</span>
                <h3 className="text-lg font-black text-slate-900">{t.claytonTitle}</h3>
              </div>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-medium">
                {t.claytonDesc}
              </p>
            </div>

            {/* 4. Oxford University Science Park Lab */}
            <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 space-y-4 shadow-sm hover:shadow-md transition">
              <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-800 font-black">
                <Building2 className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <span className="text-[11px] font-mono font-bold text-slate-600 uppercase">Research Founder & Inventor</span>
                <h3 className="text-lg font-black text-slate-900">{t.oxfordTitle}</h3>
              </div>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-medium">
                {t.oxfordDesc}
              </p>
            </div>

          </div>

          {/* 🤝 30-Year Trust & Global Scholarly Collaboration Section */}
          <div className="pt-12 border-t border-slate-200 mt-12 space-y-8">
            <div className="text-center max-w-3xl mx-auto space-y-2">
              <span className="px-3.5 py-1.5 bg-indigo-100 text-indigo-900 border border-indigo-200 font-mono font-black text-xs rounded-full uppercase tracking-wider inline-flex items-center gap-1.5">
                <Handshake className="w-3.5 h-3.5 text-indigo-600" />
                <span>GLOBAL COLLABORATION & TRUST</span>
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                {t.synergyHeaderTitle}
              </h3>
              <p className="text-slate-600 text-xs sm:text-sm font-medium">
                {t.synergyHeaderSub}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
              {/* Card 1: 30-Year Trust & 5 Elite Researchers */}
              <div className="bg-gradient-to-br from-white via-slate-50 to-blue-50/50 border-2 border-blue-100 hover:border-blue-300 rounded-3xl p-6 sm:p-8 space-y-4 shadow-sm hover:shadow-md transition flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-800 flex items-center justify-center font-black">
                      <Users className="w-6 h-6" />
                    </div>
                    <span className="px-3 py-1 bg-blue-100 text-blue-900 font-mono font-extrabold text-[11px] rounded-full">
                      {t.synergyCard1Badge}
                    </span>
                  </div>
                  <h4 className="text-lg font-black text-slate-900 leading-snug">
                    {t.synergyCard1Title}
                  </h4>
                  <p className="text-slate-700 text-xs sm:text-sm leading-relaxed font-medium">
                    {t.synergyCard1Desc}
                  </p>
                </div>
                <div className="pt-4 border-t border-blue-100/60 flex items-center justify-between text-xs font-mono font-bold text-blue-800">
                  <span>30+ Years Leadership</span>
                  <span className="px-2.5 py-1 bg-blue-100 rounded-lg">Elite Senior JP Researchers</span>
                </div>
              </div>

              {/* Card 2: Prof. Shigeo Ohta Collaboration */}
              <div className="bg-gradient-to-br from-white via-slate-50 to-purple-50/50 border-2 border-purple-100 hover:border-purple-300 rounded-3xl p-6 sm:p-8 space-y-4 shadow-sm hover:shadow-md transition flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-2xl bg-purple-100 text-purple-800 flex items-center justify-center font-black">
                      <Sparkles className="w-6 h-6" />
                    </div>
                    <span className="px-3 py-1 bg-purple-100 text-purple-900 font-mono font-extrabold text-[11px] rounded-full">
                      {t.synergyCard2Badge}
                    </span>
                  </div>
                  <h4 className="text-lg font-black text-slate-900 leading-snug">
                    {t.synergyCard2Title}
                  </h4>
                  <p className="text-slate-700 text-xs sm:text-sm leading-relaxed font-medium">
                    {t.synergyCard2Desc}
                  </p>
                </div>
                <div className="pt-4 border-t border-purple-100/60 flex items-center justify-between text-xs font-mono font-bold text-purple-800">
                  <span>Prof. Shigeo Ohta (太田成男)</span>
                  <span className="px-2.5 py-1 bg-purple-100 rounded-lg">Partner & Sponsor • New Joint Patents</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 📰 MEDIA & PRESS COVERAGE (공식 언론 보도 및 특집 인터뷰 - 바이오타임즈 / 구글·네이버·다음 검색 보도) */}
      <section id="media" className="py-16 sm:py-20 bg-gradient-to-b from-slate-50 via-blue-50/30 to-white border-b border-slate-200 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 relative z-10">
          
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="px-3.5 py-1 bg-blue-100 border border-blue-300 text-blue-900 font-mono font-black text-xs rounded-full uppercase tracking-wider inline-flex items-center gap-1.5">
              <Newspaper className="w-3.5 h-3.5 text-blue-700" />
              <span>{t.mediaSectionBadge}</span>
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight">
              {t.mediaSectionTitle}
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm font-medium leading-relaxed">
              {t.mediaSectionSub}
            </p>
          </div>

          {/* Featured Press Card */}
          <div className="bg-white border-2 border-blue-200/80 rounded-3xl shadow-xl p-6 sm:p-10 space-y-8 relative overflow-hidden hover:border-blue-400 transition-colors">
            <div className="absolute top-0 right-0 w-80 h-80 bg-blue-600/5 rounded-full blur-3xl pointer-events-none" />

            {/* Top Bar: Publisher + Portal Badges */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-blue-900 text-white flex items-center justify-center font-black shadow-md">
                  <Newspaper className="w-6 h-6 text-blue-300" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-extrabold text-slate-900 text-base sm:text-lg">
                      {t.mediaPublisher}
                    </span>
                    <span className="px-2.5 py-0.5 bg-blue-100 text-blue-800 text-[11px] font-mono font-bold rounded-md">
                      {t.mediaDate}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 font-mono">
                    Bio-Medical Technology Journal &amp; Press
                  </p>
                </div>
              </div>

              {/* Verified Portal Indexing Badges (Google, Naver, Daum) */}
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-slate-100 border border-slate-200 text-slate-700 text-xs font-mono font-bold rounded-full shadow-xs">
                  <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                  <span>{t.mediaPortalBadgeGoogle}</span>
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-slate-100 border border-slate-200 text-slate-700 text-xs font-mono font-bold rounded-full shadow-xs">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span>{t.mediaPortalBadgeNaver}</span>
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-slate-100 border border-slate-200 text-slate-700 text-xs font-mono font-bold rounded-full shadow-xs">
                  <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                  <span>{t.mediaPortalBadgeDaum}</span>
                </span>
              </div>
            </div>

            {/* Main Article Content */}
            <div className="space-y-4">
              <h3 className="text-xl sm:text-2xl font-black text-slate-900 leading-tight">
                {t.mediaArticleTitle}
              </h3>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-medium">
                {t.mediaSummaryLead}
              </p>
            </div>

            {/* 3 Key Takeaways Checklist Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-2">
                <div className="flex items-center gap-2 text-blue-700 font-bold text-xs font-mono">
                  <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>01. 20-Year AMR Dataset</span>
                </div>
                <p className="text-xs text-slate-700 leading-relaxed font-medium">
                  {t.mediaKeyPoint1}
                </p>
              </div>

              <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-2">
                <div className="flex items-center gap-2 text-emerald-700 font-bold text-xs font-mono">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>02. JFRL &amp; MHLW Verification</span>
                </div>
                <p className="text-xs text-slate-700 leading-relaxed font-medium">
                  {t.mediaKeyPoint2}
                </p>
              </div>

              <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-2">
                <div className="flex items-center gap-2 text-purple-700 font-bold text-xs font-mono">
                  <Sparkles className="w-4 h-4 text-purple-600 shrink-0" />
                  <span>03. Open Innovation &amp; Patents</span>
                </div>
                <p className="text-xs text-slate-700 leading-relaxed font-medium">
                  {t.mediaKeyPoint3}
                </p>
              </div>
            </div>

            {/* Article Linkout & Search Guide Footer */}
            <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <Search className="w-4 h-4 text-slate-400 shrink-0" />
                <span>
                  {lang === 'kr'
                    ? "포털 3사(구글, 네이버, 다음)에서 '신지숙 SN Water' 또는 '옥스퍼드 하이테크 리서치 인스티튜트' 검색 시 기사 전문 확인 가능"
                    : lang === 'jp'
                    ? "主要ポータル（Google・Naver・Daum）にて『申志淑 SN Water』または『オックスフォード・ハイテック』で検索可能"
                    : "Searchable across Google, Naver, and Daum via 'Jisuk Shin SN Water' or 'Oxford High-Tech Research Institute'"}
                </span>
              </div>

              <a
                href="https://www.biotimes.co.kr/news/articleView.html?idxno=34045"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-blue-900 hover:bg-blue-800 text-white font-extrabold text-xs sm:text-sm rounded-xl shadow-md hover:shadow-lg transition-all hover:scale-105 active:scale-95 text-center shrink-0"
              >
                <span>{t.mediaReadArticleBtn}</span>
                <ExternalLink className="w-4 h-4 text-blue-300" />
              </a>
            </div>

          </div>

        </div>
      </section>


      {/* 📜 4. INTELLECTUAL PROPERTY & PATENT PORTFOLIO */}
      <section id="patents" className="py-16 sm:py-24 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="px-3.5 py-1 bg-blue-100 border border-blue-300 text-blue-900 font-mono font-black text-xs rounded-full">
              {t.patentTableSub}
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              {t.patentTableTitle}
            </h2>
          </div>

          {/* Patent Portfolio Summary Table */}
          <div className="bg-white border border-slate-200 rounded-3xl shadow-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-900 text-white font-mono text-xs uppercase tracking-wider">
                    <th className="py-4 px-6 font-extrabold">{t.colPatentName}</th>
                    <th className="py-4 px-6 font-extrabold">{t.colAppNo}</th>
                    <th className="py-4 px-6 font-extrabold">{t.colCategory}</th>
                    <th className="py-4 px-6 font-extrabold">{t.colSafety}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 text-xs sm:text-sm font-medium text-slate-800">
                  
                  <tr className="hover:bg-slate-50 transition">
                    <td className="py-4 px-6 font-black text-slate-900 flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>{t.p1Name}</span>
                    </td>
                    <td className="py-4 px-6 font-mono text-amber-700 font-bold bg-amber-50/50">
                      {t.p1No}
                    </td>
                    <td className="py-4 px-6 text-slate-600">{t.p1Cat}</td>
                    <td className="py-4 px-6">
                      <span className="px-2.5 py-1 bg-emerald-100 text-emerald-800 font-mono font-bold text-[11px] rounded-md">
                        {t.p1Safety}
                      </span>
                    </td>
                  </tr>

                  <tr className="hover:bg-slate-50 transition">
                    <td className="py-4 px-6 font-bold text-slate-900">
                      {t.p2Name}
                    </td>
                    <td className="py-4 px-6 font-mono text-slate-700 font-medium">
                      {t.p2No}
                    </td>
                    <td className="py-4 px-6 text-slate-600">{t.p2Cat}</td>
                    <td className="py-4 px-6">
                      <span className="px-2.5 py-1 bg-blue-100 text-blue-900 font-mono font-bold text-[11px] rounded-md">
                        {t.p2Safety}
                      </span>
                    </td>
                  </tr>

                  <tr className="hover:bg-slate-50 transition">
                    <td className="py-4 px-6 font-bold text-slate-900">
                      {t.p3Name}
                    </td>
                    <td className="py-4 px-6 font-mono text-blue-800 font-extrabold bg-blue-50/80">
                      {t.p3No}
                    </td>
                    <td className="py-4 px-6 text-slate-600">{t.p3Cat}</td>
                    <td className="py-4 px-6">
                      <span className="px-2.5 py-1 bg-slate-100 text-slate-800 font-mono font-bold text-[11px] rounded-md">
                        {t.p3Safety}
                      </span>
                    </td>
                  </tr>

                </tbody>
              </table>
            </div>
          </div>

        </div>
      </section>


      {/* ✉️ 5. CORPORATE INQUIRY & LICENSING FORM */}
      <section id="contact" className="py-16 sm:py-24 bg-slate-100/90 text-slate-900 border-b border-slate-200 relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          
          <div className="text-center space-y-3">
            <span className="px-3.5 py-1 bg-blue-100 border border-blue-300 text-blue-900 font-mono font-black text-xs rounded-full uppercase">
              {t.contactTitle}
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              {t.contactSubtitle}
            </h2>
            <p className="text-slate-700 text-sm sm:text-base font-medium max-w-2xl mx-auto leading-relaxed">
              {t.contactDesc}
            </p>
          </div>

            {/* Clean Direct Email Contact Card to arthursophia2207@icloud.com */}
            <div className="bg-white border border-slate-200 rounded-3xl p-8 sm:p-12 shadow-xl text-center space-y-6 max-w-2xl mx-auto">
              <div className="w-16 h-16 bg-blue-50 border border-blue-200 rounded-2xl flex items-center justify-center mx-auto shadow-xs">
                <Mail className="w-8 h-8 text-blue-900" />
              </div>
              
              <div className="space-y-2">
                <h3 className="text-xl sm:text-2xl font-black text-slate-900">
                  Direct Email Contact
                </h3>
                <p className="text-slate-600 text-sm font-medium">
                  Click the button below to send a direct inquiry email to our team.
                </p>
                <div className="pt-2">
                  <span className="text-blue-950 font-mono text-base sm:text-lg font-black bg-blue-50 py-2.5 px-5 rounded-xl border border-blue-200/80 inline-block shadow-2xs">
                    arthursophia2207@icloud.com
                  </span>
                </div>
              </div>

              <div className="pt-2">
                <a
                  href="mailto:arthursophia2207@icloud.com?subject=%5BOxford%20High-Tech%20Inquiry%5D"
                  className="inline-flex items-center justify-center gap-2.5 px-8 py-4 bg-blue-900 hover:bg-blue-800 text-white font-extrabold text-sm rounded-xl shadow-lg transition hover:scale-[1.02] active:scale-[0.98]"
                >
                  <Send className="w-4 h-4 text-blue-200" />
                  <span>Send Direct Email (arthursophia2207@icloud.com)</span>
                </a>
              </div>
            </div>

        </div>
      </section>


      {/* 🏛️ 6. CORPORATE OVERVIEW (会社概要 / 공식 법인 개요 - 글로벌 표준 단일 테이블) */}
      <section id="overview" className="py-12 bg-slate-900/90 text-slate-200 border-t border-slate-800 scroll-mt-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          
          <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
            <Building2 className="w-4 h-4 text-blue-400" />
            <h3 className="text-sm font-mono font-bold text-white tracking-wider uppercase">
              {t.profileTitle}
            </h3>
          </div>

          {/* Clean Institutional Table Layout */}
          <div className="border border-slate-800 rounded-xl overflow-hidden bg-slate-950/80 text-xs sm:text-sm">
            <dl className="divide-y divide-slate-800/80">
              
              {/* Row 1: Legal Name */}
              <div className="grid grid-cols-1 sm:grid-cols-4 px-5 py-3 hover:bg-slate-900/40 transition-colors">
                <dt className="font-mono text-slate-400 font-medium sm:col-span-1">{t.profileCompNameLabel}</dt>
                <dd className="text-slate-100 font-semibold sm:col-span-3 mt-1 sm:mt-0">
                  {t.profileCompNameVal}
                </dd>
              </div>

              {/* Row 2: Structure & Capital (단 한 번만 깔끔하게 표기) */}
              <div className="grid grid-cols-1 sm:grid-cols-4 px-5 py-3 hover:bg-slate-900/40 transition-colors">
                <dt className="font-mono text-slate-400 font-medium sm:col-span-1">{t.profileTypeLabel} / {t.profileCapitalLabel}</dt>
                <dd className="text-slate-200 sm:col-span-3 mt-1 sm:mt-0 flex flex-wrap items-center gap-x-4 gap-y-1">
                  <span>{t.profileTypeVal}</span>
                  <span className="text-slate-600">•</span>
                  <span>{t.profileCapitalLabel}: <strong className="text-slate-100 font-mono font-semibold">{t.profileCapitalVal}</strong></span>
                </dd>
              </div>

              {/* Row 3: Leadership */}
              <div className="grid grid-cols-1 sm:grid-cols-4 px-5 py-3 hover:bg-slate-900/40 transition-colors">
                <dt className="font-mono text-slate-400 font-medium sm:col-span-1">{t.profileLeadershipLabel}</dt>
                <dd className="text-slate-200 sm:col-span-3 mt-1 sm:mt-0">
                  {t.profileLeadershipVal}
                </dd>
              </div>

              {/* Row 4: Core Business */}
              <div className="grid grid-cols-1 sm:grid-cols-4 px-5 py-3 hover:bg-slate-900/40 transition-colors">
                <dt className="font-mono text-slate-400 font-medium sm:col-span-1">{t.profileBusinessLabel}</dt>
                <dd className="text-slate-300 sm:col-span-3 mt-1 sm:mt-0 leading-relaxed text-xs">
                  {t.profileBusinessVal}
                </dd>
              </div>

              {/* Row 5: Validations */}
              <div className="grid grid-cols-1 sm:grid-cols-4 px-5 py-3 hover:bg-slate-900/40 transition-colors">
                <dt className="font-mono text-slate-400 font-medium sm:col-span-1">{t.profileCertLabel}</dt>
                <dd className="text-slate-300 sm:col-span-3 mt-1 sm:mt-0 leading-relaxed text-xs">
                  {t.profileCertVal}
                </dd>
              </div>

            </dl>
          </div>

        </div>
      </section>

      {/* 🏛️ FOOTER */}
      <footer className="py-6 bg-slate-950 text-slate-400 text-xs border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap justify-between items-center gap-4">
          <p className="font-bold text-slate-300">{t.footerCopy}</p>
          <p className="text-slate-400 max-w-xl text-right font-medium leading-relaxed">
            {t.footerNote}
          </p>
        </div>
      </footer>


      {/* 📄 JFRL OFFICIAL CERTIFICATES & TEST DATA MODAL */}
      {showJfrlModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto animate-fadeIn">
          <div className="bg-white border border-slate-200 rounded-3xl max-w-4xl w-full p-6 sm:p-8 shadow-2xl space-y-6 relative max-h-[90vh] overflow-y-auto">
            
            {/* Modal Header */}
            <div className="flex justify-between items-start border-b border-slate-200 pb-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="px-3 py-1 bg-blue-100 border border-blue-300 text-blue-900 font-mono font-black text-xs rounded-lg">
                    JFRL Official Certificate
                  </span>
                  <span className="px-2.5 py-0.5 bg-emerald-100 border border-emerald-300 text-emerald-900 font-mono font-black text-[10px] rounded-full">
                    Accredited by Japanese Government
                  </span>
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-slate-900">
                  {t.jfrlSectionTitle}
                </h3>
                <p className="text-xs text-slate-600 font-medium">
                  Issued to: <strong className="text-slate-900">Oxford High-Tech Research Institute Co., Ltd.</strong> (Setagaya-ku, Tokyo) • Issued: <strong className="text-blue-700">July 2023</strong>
                </p>
              </div>
              <button
                onClick={() => setShowJfrlModal(false)}
                className="p-2 bg-slate-100 hover:bg-slate-200 rounded-full text-slate-600 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Document Grid: 3 Official Reports */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

              {/* Document 1: Soft Drink Beverage Safety Certificate */}
              <div className="p-5 bg-slate-50 border border-slate-200 rounded-2xl space-y-4 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex justify-between items-start border-b border-slate-200 pb-3">
                    <div>
                      <span className="text-[10px] font-mono font-bold text-blue-800 bg-blue-100 px-2 py-0.5 rounded">
                        CERTIFICATE OF ANALYSIS
                      </span>
                      <h4 className="font-extrabold text-slate-900 text-sm mt-1">
                        No. 23056849001-0301
                      </h4>
                      <p className="text-[11px] font-mono text-slate-500">Issued: July 11, 2023 (JFRL)</p>
                    </div>
                    <ShieldCheck className="w-6 h-6 text-emerald-600 shrink-0" />
                  </div>

                  <div className="space-y-1 text-xs">
                    <p className="font-bold text-slate-800">
                      MHLW Soft Drink Beverage Safety Standards
                    </p>
                    <p className="text-slate-600 text-[11px]">
                      Notification No. 370 &quot;Specifications and Standards for Foods, Additives, etc.&quot;
                    </p>
                  </div>

                  <div className="bg-white border border-slate-200 rounded-xl p-3 space-y-2 text-xs">
                    <div className="flex justify-between items-center py-1 border-b border-slate-100 font-medium">
                      <span className="text-slate-700">Turbidity</span>
                      <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 font-mono font-bold text-[10px] rounded">CONFORM</span>
                    </div>
                    <div className="flex justify-between items-center py-1 border-b border-slate-100 font-medium">
                      <span className="text-slate-700">Sediment & Foreign Matter</span>
                      <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 font-mono font-bold text-[10px] rounded">CONFORM</span>
                    </div>
                    <div className="flex justify-between items-center py-1 border-b border-slate-100 font-medium">
                      <span className="text-slate-700">Coliform Group</span>
                      <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 font-mono font-bold text-[10px] rounded">CONFORM</span>
                    </div>
                    <div className="flex justify-between items-center py-1 border-b border-slate-100 font-medium">
                      <span className="text-slate-700">Arsenic (as As₂O₃)</span>
                      <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 font-mono font-bold text-[10px] rounded">CONFORM</span>
                    </div>
                    <div className="flex justify-between items-center py-1 font-medium">
                      <span className="text-slate-700">Lead</span>
                      <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 font-mono font-bold text-[10px] rounded">CONFORM</span>
                    </div>
                  </div>
                </div>

                <p className="text-[10px] text-slate-500 font-medium italic text-right pt-2 border-t border-slate-200">
                  Client: Oxford High-Tech Research Institute Co., Ltd. • JFRL
                </p>
              </div>

              {/* Document 2: Bactericidal Efficiency Test (MRSA & General Pathogens) */}
              <div className="p-5 bg-slate-900 border border-slate-800 rounded-2xl text-white space-y-4 shadow-md flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex justify-between items-start border-b border-slate-800 pb-3">
                    <div>
                      <span className="text-[10px] font-mono font-bold text-rose-300 bg-rose-950 px-2 py-0.5 rounded border border-rose-800">
                        MRSA & PATHOGENS REPORT
                      </span>
                      <h4 className="font-extrabold text-white text-sm mt-1">
                        No. 23056849001-0401
                      </h4>
                      <p className="text-[11px] font-mono text-slate-400">Issued: July 17, 2023 (JFRL)</p>
                    </div>
                    <Activity className="w-6 h-6 text-rose-400 shrink-0" />
                  </div>

                  <div className="space-y-1 text-xs">
                    <p className="font-extrabold text-rose-300">
                      MRSA (S. aureus IID 1677) & General Pathogens
                    </p>
                    <p className="text-slate-400 text-[11px]">
                      Bactericidal efficiency measured from 15s to 120s exposure.
                    </p>
                  </div>

                  {/* Test Table */}
                  <div className="bg-slate-950 border border-slate-800 rounded-xl p-3 space-y-2 text-xs font-mono">
                    <div className="flex justify-between items-center py-1 border-b border-slate-800 text-[11px]">
                      <span className="text-slate-400">MRSA Initial Count</span>
                      <span className="text-slate-200 font-bold">9.0 × 10⁵ / mL</span>
                    </div>
                    <div className="flex justify-between items-center py-1 border-b border-slate-800 text-[11px]">
                      <span className="text-slate-400">MRSA (15s ~ 60s)</span>
                      <span className="text-amber-300 font-bold">7.0 × 10⁵ → 6.3 × 10⁴</span>
                    </div>
                    <div className="flex justify-between items-center py-1 bg-emerald-950/60 p-1.5 rounded border border-emerald-500/40 text-[11px]">
                      <span className="text-emerald-300 font-bold">MRSA (120s)</span>
                      <span className="text-emerald-400 font-black px-1.5 py-0.5 bg-emerald-500/20 rounded">
                        &lt;1000/mL (UNDETECTED)
                      </span>
                    </div>
                    <div className="flex justify-between items-center py-1 bg-blue-950/60 p-1.5 rounded border border-blue-500/40 text-[11px]">
                      <span className="text-blue-300 font-bold">E. coli / Salmonella / Pseudomonas (15~60s)</span>
                      <span className="text-blue-200 font-black px-1.5 py-0.5 bg-blue-500/20 rounded">
                        100% ERADICATED
                      </span>
                    </div>
                  </div>
                </div>

                <p className="text-[10px] text-slate-400 font-medium italic text-right pt-2 border-t border-slate-800">
                  Client: Oxford High-Tech Research Institute Co., Ltd. • JFRL
                </p>
              </div>

              {/* Document 3: BMSA FQREC Resistant E. coli Eradication Test Report */}
              <div className="p-5 bg-indigo-950 border border-indigo-800 rounded-2xl text-white space-y-4 shadow-md flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex justify-between items-start border-b border-indigo-800 pb-3">
                    <div>
                      <span className="text-[10px] font-mono font-bold text-indigo-300 bg-indigo-900 px-2 py-0.5 rounded border border-indigo-700">
                        FQREC TEST REPORT
                      </span>
                      <h4 className="font-extrabold text-white text-sm mt-1">
                        Report No. R5-31
                      </h4>
                      <p className="text-[11px] font-mono text-indigo-300">Issued: Sept 21, 2023 (BMSA)</p>
                    </div>
                    <Award className="w-6 h-6 text-amber-400 shrink-0" />
                  </div>

                  <div className="space-y-1 text-xs">
                    <p className="font-extrabold text-indigo-200">
                      Gunma Univ. Med. School FQREC E. coli (IMGR1240 / 1251)
                    </p>
                    <p className="text-indigo-300 text-[11px]">
                      Fluoroquinolone-Resistant E. coli Superbug (2.8 × 10⁸ CFU/mL)
                    </p>
                  </div>

                  {/* Test Table */}
                  <div className="bg-slate-950 border border-indigo-900 rounded-xl p-3 space-y-2 text-xs font-mono">
                    <div className="flex justify-between items-center py-1 border-b border-indigo-900 text-[11px]">
                      <span className="text-slate-400">Initial Concentration</span>
                      <span className="text-indigo-200 font-bold">2.8 × 10⁸ CFU/mL</span>
                    </div>
                    <div className="flex justify-between items-center py-1 border-b border-indigo-900 text-[11px]">
                      <span className="text-slate-400">At 1 Minute Exposure</span>
                      <span className="text-amber-300 font-bold">Some Alive (+)</span>
                    </div>
                    <div className="flex justify-between items-center py-1 bg-emerald-950/80 p-1.5 rounded border border-emerald-500/50 text-[11px]">
                      <span className="text-emerald-300 font-bold">At 5 Min (x8~x15 Dilution)</span>
                      <span className="text-emerald-300 font-black px-1.5 py-0.5 bg-emerald-500/30 rounded uppercase">
                        ALL BACTERIA DIED (-)
                      </span>
                    </div>
                    <div className="text-[10px] text-indigo-300 italic pt-1 text-center">
                      Tested across x8, x10, x15 dilutions (0/3 colonies surviving)
                    </div>
                  </div>
                </div>

                <p className="text-[10px] text-indigo-300 font-medium italic text-right pt-2 border-t border-indigo-900">
                  NPO Biomedical Science Association Narashino Laboratory
                </p>
              </div>

            </div>

            {/* Benchmark Alignment Callout */}
            <div className="p-4 bg-gradient-to-r from-blue-50 via-indigo-50 to-emerald-50 border border-indigo-200 rounded-2xl flex items-start gap-3 text-xs text-slate-800">
              <Award className="w-5 h-5 text-indigo-700 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <p className="font-extrabold text-indigo-950">
                  Global AMR Priority 5 Core Target Pathogens Verification Match
                </p>
                <p className="text-slate-700 leading-relaxed font-medium">
                  The certified test reports above (JFRL &amp; BMSA) directly validate 100% complete eradication of all 5 critical target pathogens: <em>Pseudomonas aeruginosa</em> (15s), <em>Staphylococcus aureus</em> (&lt;10/mL), <em>MRSA</em> (120s), <em>Escherichia coli</em> (15s), and <em>FQREC</em> (5 min, 15x dilution).
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
