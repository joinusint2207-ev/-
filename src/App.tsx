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
  GraduationCap
} from 'lucide-react';
import { translations } from './translations';

export default function App() {
  // Language State (Default to Korean 'kr' as requested)
  const [lang, setLang] = useState<'kr' | 'jp' | 'en'>('kr');
  const t = translations[lang];

  // JFRL Official Laboratory Certificates Modal State
  const [showJfrlModal, setShowJfrlModal] = useState<boolean>(false);

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
    setFormSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans antialiased selection:bg-blue-600 selection:text-white">
      
      {/* 🏛️ Top Header & Navigation Bar */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
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
              <a href="#mrsa" className="hover:text-blue-600 transition-colors text-blue-700 font-extrabold">{t.navAmr}</a>
              <a href="#resume" className="hover:text-blue-600 transition-colors">{t.navResume}</a>
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

      {/* 🚀 Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-16 lg:pt-16 lg:pb-24 border-b border-slate-200 bg-gradient-to-b from-blue-50/80 via-slate-50 to-white">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#cbd5e1_1px,transparent_1px),linear-gradient(to_bottom,#cbd5e1_1px,transparent_1px)] bg-[size:32px_32px] opacity-30" />
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-blue-300/30 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-indigo-300/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Hero Left Content */}
            <div className="lg:col-span-7 space-y-6">
              
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100/90 border border-blue-300/80 text-blue-900 text-xs font-black shadow-xs">
                <Sparkles className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                <span>{t.heroBadge}</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-[1.15]">
                {t.heroHeading}
              </h1>

              <p className="text-base sm:text-lg text-slate-700 font-medium leading-relaxed max-w-2xl">
                {t.heroLead}
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4 pt-2">
                <a
                  href="#mrsa"
                  className="px-6 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-sm rounded-xl shadow-lg shadow-blue-600/20 transition-all flex items-center gap-2 hover:scale-105 active:scale-95"
                >
                  <ShieldCheck className="w-4 h-4 text-blue-200" />
                  <span>{t.btnAmr}</span>
                </a>
                <a
                  href="#resume"
                  className="px-6 py-3.5 bg-white hover:bg-slate-100 border-2 border-slate-300 text-slate-800 font-extrabold text-sm rounded-xl shadow-xs transition-all flex items-center gap-2 hover:border-slate-400"
                >
                  <GraduationCap className="w-4 h-4 text-slate-600" />
                  <span>{t.btnResume}</span>
                </a>
              </div>

            </div>

            {/* Hero Right Metrics Grid (Highlighting 20 Patent Applications & 15s MRSA Eradication) */}
            <div className="lg:col-span-5">
              <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xl relative space-y-6">
                
                <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                  <div className="flex items-center gap-2">
                    <Award className="w-5 h-5 text-blue-600" />
                    <span className="font-extrabold text-slate-900 text-sm">Key Qualifications</span>
                  </div>
                  <span className="px-2.5 py-0.5 bg-emerald-100 text-emerald-800 font-mono font-bold text-[10px] rounded-full">
                    Verified Profile
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

                <div className="p-3.5 bg-slate-900 rounded-2xl text-slate-300 text-xs font-medium flex items-center gap-3">
                  <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
                  <span>
                    Oxford Science Park Research Founder & MHLW Soft Drink Standard Compliant.
                  </span>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>


      {/* 🦠 1. SPOTLIGHT TOP SECTION: MRSA & AMR ERADICATION (SN Water) */}
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
            
            {/* Left Card: The Crisis vs. SN Water Solution */}
            <div className="lg:col-span-7 bg-slate-900 text-white rounded-3xl p-6 sm:p-10 space-y-6 shadow-2xl flex flex-col justify-between relative overflow-hidden border border-slate-800">
              <div className="absolute -top-24 -right-24 w-64 h-64 bg-rose-600/10 rounded-full blur-3xl pointer-events-none" />

              <div className="space-y-6">
                
                {/* WHO Crisis Box */}
                <div className="p-4 bg-rose-950/60 border border-rose-500/30 rounded-2xl space-y-2">
                  <div className="flex items-center gap-2 text-rose-400 font-black text-xs uppercase tracking-wider">
                    <Activity className="w-4 h-4" />
                    <span>{t.amrCrisisTitle}</span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-medium">
                    {t.amrCrisisDesc}
                  </p>
                </div>

                {/* SN Water Eradication & Trade Secret */}
                <div className="space-y-3">
                  <h3 className="text-xl sm:text-2xl font-black text-emerald-400 flex items-center gap-2">
                    <ShieldCheck className="w-6 h-6 text-emerald-400" />
                    <span>{t.amrEradTitle}</span>
                  </h3>
                  <p className="text-slate-200 text-sm sm:text-base leading-relaxed font-normal">
                    {t.amrEradDesc}
                  </p>
                </div>

                {/* Speed Comparison Banner */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <div className="p-3.5 bg-emerald-950/80 border border-emerald-500/40 rounded-xl space-y-1">
                    <p className="text-[11px] font-mono text-emerald-400 font-extrabold uppercase">SN Water Eradication</p>
                    <p className="text-xs font-black text-white">{t.amrCompareFast}</p>
                  </div>
                  <div className="p-3.5 bg-slate-950 border border-slate-800 rounded-xl space-y-1">
                    <p className="text-[11px] font-mono text-slate-400 font-bold uppercase">Conventional Antibiotics</p>
                    <p className="text-xs font-medium text-slate-400">{t.amrCompareSlow}</p>
                  </div>
                </div>

              </div>

              {/* Bottom Trade Secret Security Badge */}
              <div className="pt-4 border-t border-slate-800 flex items-center gap-3 text-slate-400 text-xs font-mono">
                <Lock className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Protected via Proprietary Trade Secret (Coca-Cola Formula Model)</span>
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

              </div>

              {/* Open Modal Button */}
              <button
                onClick={() => setShowJfrlModal(true)}
                className="w-full py-3 bg-blue-900 hover:bg-blue-800 text-white font-extrabold text-xs sm:text-sm rounded-xl transition flex items-center justify-center gap-2 shadow-md hover:scale-[1.02] active:scale-[0.98] mt-4"
              >
                <FileText className="w-4 h-4 text-blue-300" />
                <span>{t.jfrlBtnText}</span>
              </button>

            </div>

          </div>

        </div>
      </section>


      {/* 🎓 2. EXECUTIVE RESUME & ACADEMIC AUTHORITY SECTION */}
      <section id="resume" className="py-16 sm:py-24 bg-slate-100/80 border-b border-slate-200">
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

        </div>
      </section>


      {/* 📜 3. OFFICIAL PATENT PORTFOLIO (20 Patent Applications Filed as Independent Inventor) */}
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


      {/* ✉️ 4. DIRECT INQUIRY & RESEARCH PARTNERSHIPS */}
      <section id="contact" className="py-16 sm:py-24 bg-slate-900 text-white relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          
          <div className="text-center space-y-3">
            <span className="px-3.5 py-1 bg-blue-900 border border-blue-700 text-blue-300 font-mono font-black text-xs rounded-full uppercase">
              {t.contactTitle}
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              {t.contactSubtitle}
            </h2>
            <p className="text-slate-400 text-sm sm:text-base font-normal max-w-2xl mx-auto">
              {t.contactDesc}
            </p>
          </div>

          {/* Form Card */}
          <div className="bg-slate-950 border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl space-y-6">
            
            {formSubmitted ? (
              <div className="p-8 bg-emerald-950/80 border border-emerald-500/40 rounded-2xl text-center space-y-4">
                <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
                <h3 className="text-xl font-black text-white">Inquiry Successfully Received</h3>
                <p className="text-slate-300 text-sm font-medium">{t.submitSuccess}</p>
                <button
                  onClick={() => setFormSubmitted(false)}
                  className="px-6 py-2 bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs rounded-xl transition"
                >
                  Submit Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} className="space-y-5">
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-300">{t.fieldName}</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g., Dr. John Smith / Oxford Health"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 bg-slate-900 border border-slate-800 rounded-xl text-white placeholder-slate-500 text-sm focus:outline-hidden focus:border-blue-500 font-medium"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-300">{t.fieldEmail}</label>
                    <input
                      type="email"
                      required
                      placeholder="e.g., contact@institution.org"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 bg-slate-900 border border-slate-800 rounded-xl text-white placeholder-slate-500 text-sm focus:outline-hidden focus:border-blue-500 font-medium"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-300">{t.fieldCategory}</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-4 py-3 bg-slate-900 border border-slate-800 rounded-xl text-white text-sm focus:outline-hidden focus:border-blue-500 font-medium"
                  >
                    <option value="catAmrData">{t.catAmrData}</option>
                    <option value="catLicensing">{t.catLicensing}</option>
                    <option value="catAcademic">{t.catAcademic}</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-300">{t.fieldMsg}</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Please describe your organization and specific data or licensing requirements..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 bg-slate-900 border border-slate-800 rounded-xl text-white placeholder-slate-500 text-sm focus:outline-hidden focus:border-blue-500 font-medium resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 bg-blue-600 hover:bg-blue-500 text-white font-extrabold text-sm rounded-xl shadow-lg transition flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4 text-blue-200" />
                  <span>{t.btnSubmit}</span>
                </button>

              </form>
            )}

          </div>

        </div>
      </section>


      {/* 🏛️ FOOTER */}
      <footer className="py-8 bg-slate-950 text-slate-500 text-xs border-t border-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap justify-between items-center gap-4">
          <p className="font-bold text-slate-400">{t.footerCopy}</p>
          <p className="text-slate-500 max-w-xl text-right font-normal leading-relaxed">
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
