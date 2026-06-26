/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  Zap, 
  RotateCw, 
  Cpu, 
  BatteryCharging, 
  Globe, 
  Building2, 
  Home, 
  Flame, 
  ShieldCheck, 
  Check, 
  ArrowRight, 
  Clock, 
  Play, 
  Pause, 
  Gauge, 
  ChevronRight, 
  FileText,
  User,
  Building,
  Info,
  Mail,
  Video,
  FileCode,
  Sliders,
  Sparkles
} from 'lucide-react';

import regenerativeEvImage from './assets/images/regenerative_ev_1780636321278.png';

export interface AppProps {
  onSwitchLanguage: () => void;
  currentLang: 'en' | 'jp';
}

export default function App({ onSwitchLanguage, currentLang }: AppProps) {

  // Navigation tabs or active section
  const [activeTab, setActiveTab] = useState<'concept' | 'diagram' | 'demokit' | 'video' | 'patent' | 'contact'>('concept');

  // Simulation & Visual State
  const [isRunning, setIsRunning] = useState<boolean>(true);
  const [activeBattery, setActiveBattery] = useState<'A' | 'B'>('A');
  const [batteryACharge, setBatteryACharge] = useState<number>(78);
  const [batteryBCharge, setBatteryBCharge] = useState<number>(42);
  const [switchCount, setSwitchCount] = useState<number>(0);
  const [selectedComponent, setSelectedComponent] = useState<string>('generator');

  // Interactive Video Player & Oscilloscope demonstration logic
  const [videoPlaying, setVideoPlaying] = useState<boolean>(true);
  const [currentVideoPhase, setCurrentVideoPhase] = useState<'start' | 'switching'>('start');
  const [wavePoints, setWavePoints] = useState<number[]>([]);

  // Form states with correct Email Integration
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    inquiryType: 'Investment / Capital Partnership (IR)',
    message: '',
    privacyAccepted: false
  });
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submissionSuccess, setSubmissionSuccess] = useState<boolean>(false);
  const [submissionToken, setSubmissionToken] = useState<string>('');
  const [submitError, setSubmitError] = useState<string>('');

  // 1. Oscilloscope wave effect for the generator monitoring view
  useEffect(() => {
    const interval = setInterval(() => {
      if (videoPlaying || isRunning) {
        setWavePoints(prev => {
          const next = [...prev];
          if (next.length > 25) next.shift();
          const amp = activeBattery === 'A' ? 35 : 45;
          const noise = Math.sin(Date.now() / 150) * amp + (Math.random() * 8 - 4);
          next.push(noise + 50);
          return next;
        });
      }
    }, 100);
    return () => clearInterval(interval);
  }, [videoPlaying, isRunning, activeBattery]);

  // 2. Continuous Battery Charge & Swap Logic
  useEffect(() => {
    let interval: any = null;
    if (isRunning) {
      interval = setInterval(() => {
        if (activeBattery === 'A') {
          // A is discharging (operating motor)
          setBatteryACharge(prev => {
            const next = prev - 0.2;
            if (next <= 20) {
              setActiveBattery('B');
              setSwitchCount(c => c + 1);
              return 90; // reset for endless clean demonstration loop
            }
            return parseFloat(next.toFixed(1));
          });
          // B is charging from generator feedback
          setBatteryBCharge(prev => {
            const next = prev + 0.3;
            if (next >= 95) return 95;
            return parseFloat(next.toFixed(1));
          });
        } else {
          // B is discharging (operating motor)
          setBatteryBCharge(prev => {
            const next = prev - 0.2;
            if (next <= 20) {
              setActiveBattery('A');
              setSwitchCount(c => c + 1);
              return 90;
            }
            return parseFloat(next.toFixed(1));
          });
          // A is charging
          setBatteryACharge(prev => {
            const next = prev + 0.3;
            if (next >= 95) return 95;
            return parseFloat(next.toFixed(1));
          });
        }
      }, 300);
    }
    return () => clearInterval(interval);
  }, [isRunning, activeBattery]);

  // 3. Official Formspree Integration
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.company || !formData.email || !formData.message || !formData.privacyAccepted) {
      setSubmitError('Please fill in all required fields and check the box to agree to the privacy policy.');
      return;
    }
    setIsSubmitting(true);
    setSubmitError('');

    fetch('https://formspree.io/f/mwvjpwvv', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        name: formData.name,
        company: formData.company,
        email: formData.email,
        inquiryType: formData.inquiryType,
        message: formData.message,
        timestamp: new Date().toISOString(),
        clientReferrer: window.location.href,
        systemTitle: "E-LOOP Self-Regenerative System (Dr. Yukinobu Mori)"
      })
    })
    .then(async (response) => {
      if (response.ok) {
        setIsSubmitting(false);
        setSubmissionSuccess(true);
        setSubmissionToken(`ELP-${Math.floor(100000 + Math.random() * 900000)}`);
      } else {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || 'Formspree forms integration error. Status: ' + response.status);
      }
    })
    .catch((error) => {
      console.error('Submission failed:', error);
      setSubmitError('Failed to submit the form. Please try again after a few moments.');
      setIsSubmitting(false);
    });
  };

  const handleResetForm = () => {
    setFormData({
      name: '',
      company: '',
      email: '',
      inquiryType: 'Investment / Capital Partnership (IR)',
      message: '',
      privacyAccepted: false
    });
    setSubmissionSuccess(false);
    setSubmissionToken('');
    setSubmitError('');
  };

  // Structured Component Data based on user PDF diagram
  const getComponentInfo = (id: string) => {
    switch(id) {
      case 'motor':
        return {
          title: "Drive Motor",
          desc: "The core propulsion unit that directly converts electricity into wheel rotation to drive the vehicle forward with maximum torque and efficiency, powered by the dual self-circulating battery system."
        };
      case 'switch':
        return {
          title: "Battery Drive Switch (Patent Application No. 2025-160784)",
          desc: "A revolutionary switching relay that divides the battery storage cells into two separate groups (A and B). While one battery group is actively driving the motor, the other group is completely isolated to receive high-rate regenerative energy returned from the Newly Invented Electric Generator. The system continuously alternates their roles in real-time."
        };
      case 'batteryA':
        return {
          title: "Main Battery Pack (Group A)",
          desc: "One of the two main high-voltage propulsion batteries that power the electric vehicle's main drive motor. While Group A is actively driving the motor, it provides continuous propulsion current. Once swapped by the Battery Drive Switch, it transitions instantly into an isolated charging state to receive current from the on-board high-efficiency generator."
        };
      case 'batteryB':
        return {
          title: "Main Battery Pack (Group B)",
          desc: "Identical and fully symmetrical to Group A, this is the other half of the vehicle's main high-voltage propulsion battery system. While Group A drives the vehicle, Group B is completely isolated and directly charged by the on-board generator. They switch roles continuously, maintaining a non-stop driving loop."
        };
      case 'controller':
        return {
          title: "System Controller & Voltage Regulator",
          desc: "An intelligent control board that detects the regenerative output of the Newly Invented Electric Generator, performs step-up voltage regulation, and directs the charging current to the idle battery pack. It works in perfect synchronization with the Battery Drive Switch to maintain the balance of the system."
        };
      case 'generator':
        return {
          title: "Newly Invented Electric Generator (Patent Application No. 2026-83613)",
          desc: "An innovative generator designed by Dr. Yukinobu Mori. It utilizes an engineered 3-phase AC feedback loop to generate power from a continuous, consistent rotational force with extremely low rotational resistance, delivering feedback power directly to the dual battery packs and rendering external charging stations obsolete."
        };
      default:
        return {
          title: "Click on any component above",
          desc: "These are the 5 core units of the patent-pending E-LOOP technology. Tap or click on any module in the interactive diagram to view its details, mechanical role, and patent specifications."
        };
    }
  };

  return (
    <div id="mori-eloop-website" className="min-h-screen bg-[#faf8f5] text-slate-800 font-sans antialiased selection:bg-blue-600 selection:text-white">
      
      {/* ⚠️ TOP PATENT PENDING ALERT STRIP */}
      <div className="bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-700 text-white text-xs sm:text-sm py-2.5 px-4 shadow-sm text-center font-bold tracking-wider flex items-center justify-center gap-x-3 gap-y-1 flex-wrap border-b border-blue-500">
        <span className="inline-flex items-center gap-1 bg-yellow-400 text-slate-950 px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-tight">
          WORLD FIRST
        </span>
        <span className="font-extrabold">Japanese Patent Filed (Patent Application No. 2025-160784) ／ PCT International Patent Pending</span>
        <span className="text-blue-250">|</span>
        <span>Inventor & Applicant: Dr. Yukinobu Mori</span>
      </div>

      {/* STICKY NAV HEADER */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          {/* Logo Brand Frame */}
          <div className="flex items-center gap-3">
            <div className="relative flex items-center justify-center w-11 h-11 rounded-lg bg-blue-600 shadow-lg shadow-blue-500/20">
              <RotateCw className={`w-6 h-6 text-white ${isRunning ? 'animate-spin' : ''}`} style={{ animationDuration: '6.5s' }} />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-500 rounded-full border border-white animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xl font-black text-slate-900 tracking-tight">E-LOOP</span>
                <span className="text-[9px] bg-blue-50 text-blue-600 font-extrabold px-1.5 py-0.5 rounded border border-blue-200">PATENTED SYSTEM</span>
              </div>
              <p className="text-[10px] text-slate-500 font-bold tracking-wide">Dr. Yukinobu Mori's Technology Verification</p>
            </div>
          </div>

          {/* Desktop Nav tabs link scrolling */}
          <nav className="hidden lg:flex items-center gap-1 text-sm font-bold text-slate-600">
            <a 
              href="#concept" 
              onClick={() => setActiveTab('concept')}
              className={`px-3.5 py-2 rounded-lg transition-colors ${activeTab === 'concept' ? 'text-blue-600 bg-blue-50/70' : 'hover:text-slate-900 hover:bg-slate-50'}`}
            >
              Vision
            </a>
            <a 
              href="#patent-images" 
              onClick={() => setActiveTab('diagram')}
              className={`px-3.5 py-2 rounded-lg transition-colors ${activeTab === 'diagram' ? 'text-blue-600 bg-blue-50/70' : 'hover:text-slate-900 hover:bg-slate-50'}`}
            >
              System Blueprint
            </a>
            <a 
              href="#demokit" 
              onClick={() => setActiveTab('demokit')}
              className={`px-3.5 py-2 rounded-lg transition-colors ${activeTab === 'demokit' ? 'text-blue-600 bg-blue-50/70' : 'hover:text-slate-900 hover:bg-slate-50'}`}
            >
              Demo Kit
            </a>
            <a 
              href="#video-section" 
              onClick={() => setActiveTab('video')}
              className={`px-3.5 py-2 rounded-lg transition-colors ${activeTab === 'video' ? 'text-blue-600 bg-blue-50/70' : 'hover:text-slate-900 hover:bg-slate-50'}`}
            >
              Verification Video
            </a>
            <a 
              href="#patent-facts" 
              onClick={() => setActiveTab('patent')}
              className={`px-3.5 py-2 rounded-lg transition-colors ${activeTab === 'patent' ? 'text-blue-600 bg-blue-50/70' : 'hover:text-slate-900 hover:bg-slate-50'}`}
            >
              Inventor Profile
            </a>
          </nav>

          {/* CTA Action Direct Link & Language Switcher */}
          <div className="flex items-center gap-2">
            <button 
              onClick={onSwitchLanguage}
              className="inline-flex items-center gap-1.5 px-3 py-2.5 rounded-lg text-sm font-bold bg-slate-100 hover:bg-slate-200 text-slate-700 transition active:scale-[0.98] border border-slate-200"
              title="Switch Language"
            >
              <Globe className="w-4 h-4 text-slate-500 animate-pulse" />
              <span>日本語</span>
            </button>
            <a 
              href="#contact" 
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-bold bg-blue-600 text-white hover:bg-blue-700 transition active:scale-[0.98] shadow-lg shadow-blue-600/10 hover:shadow-blue-500/20"
            >
              <span>Investment Inquiry</span>
              <ArrowRight className="w-4 h-4 text-blue-200" />
            </a>
          </div>

        </div>
      </header>

      {/* CORE HERO WRAPPER */}
      <section id="concept" className="relative overflow-hidden bg-gradient-to-b from-white via-slate-50 to-slate-100 border-b border-slate-200 py-16 lg:py-24">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none opacity-60" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Title & Slogans directly using user PDF elements */}
            <div className="lg:col-span-7 space-y-8">
              
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold bg-blue-50 text-blue-600 border border-blue-200 shadow-xs">
                <Sparkles className="w-3.5 h-3.5 text-blue-500 animate-spin" />
                <span>World First! Patented On-Board EV Generator Active</span>
              </div>

              <div className="space-y-4">
                <p className="text-sm text-blue-600 font-extrabold tracking-widest uppercase">E-LOOP SYSTEM BY DR. YUKINOBU MORI</p>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 leading-[1.12] tracking-tight">
                  No Charging Stations.
                  <br />
                  Zero Emissions.
                  <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-cyan-600 to-emerald-600">Just Drive.</span>
                </h1>
              </div>

              <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl font-medium">
                Overcoming the biggest limitation of modern electric vehicles—the constant anxiety of searching for charging spots. 
                Designed by Dr. Yukinobu Mori, the E-LOOP system integrates a proprietary high-efficiency generator for **Dynamic Energy Harvesting** from a continuous, consistent rotational force, managed by an intelligent battery swap relay. Instead of auxiliary storage, the system directly charges and swaps the main propulsion batteries. By dividing the vehicle's main battery bank into Group A and Group B and dynamically swapping their roles, the system achieves continuous on-board energy replenishment, completely eliminating the need for charging stations.
              </p>

              {/* Real Patent Certificate Status Frame */}
              <div className="p-5 rounded-xl bg-white border border-slate-200 shadow-sm max-w-xl flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center flex-shrink-0 border border-emerald-200 shadow-xs">
                  <ShieldCheck className="w-7 h-7" />
                </div>
                <div>
                  <span className="text-[10px] font-black uppercase text-emerald-600 tracking-wider">OFFICIAL PATENT FILED</span>
                  <p className="text-base font-black text-slate-950 mt-0.5">Patent Status: Application No. 2025-160784</p>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed font-medium">
                    This technology is not a mere theoretical hypothesis or simulated data, but a physical patented invention designed by Dr. Yukinobu Mori. Complete, fully functional physical demonstration units are built and verified.
                  </p>
                </div>
              </div>

              {/* CTAs */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <a 
                  href="#patent-images" 
                  className="px-6 py-3.5 rounded-lg text-base font-bold bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-600/10 hover:shadow-blue-500/20 transition flex items-center gap-2"
                >
                  Explore System Blueprint
                  <ChevronRight className="w-5 h-5 text-blue-200" />
                </a>
                <a 
                  href="#contact" 
                  className="px-6 py-3.5 rounded-lg text-base font-bold bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 shadow-xs transition"
                >
                  Request Empirical Data
                </a>
              </div>

            </div>

            {/* Right Side Column - Interactive E-LOOP System Diagram simulation directly mirroring user picture */}
            <div className="lg:col-span-5">
              <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xl relative">
                
                <div className="absolute top-4 right-4 flex items-center gap-1.5 bg-blue-50 text-blue-600 px-2 py-0.5 rounded text-[10px] font-bold border border-blue-200">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                  <span>Interactive System Model</span>
                </div>

                <div className="border-b border-slate-150 pb-3 mb-5">
                  <h3 className="text-sm font-black text-slate-900 flex items-center gap-1.5">
                    <Sliders className="w-4 h-4 text-blue-600" />
                    E-LOOP System Diagram
                  </h3>
                  <p className="text-[11px] text-slate-500 font-medium">Invented by Dr. Yukinobu Mori - Interactive Simulator of the Patented Circuit</p>
                </div>

                {/* SVG Car Chassis Wireframe reproducing the PDF Layout */}
                <div className="py-6 flex flex-col items-center justify-center">
                  <div className="w-full max-w-sm bg-slate-50 rounded-xl p-4 border border-slate-200/80">
                    
                    <svg viewBox="0 0 400 240" className="w-full h-auto text-slate-400">
                      <defs>
                        <marker id="arr-blue" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
                          <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#3b82f6" />
                        </marker>
                        <marker id="arr-amber" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
                          <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#f59e0b" />
                        </marker>
                        <marker id="arr-indigo" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
                          <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#6366f1" />
                        </marker>
                        <marker id="arr-pink" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
                          <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#ec4899" />
                        </marker>
                      </defs>

                      {/* Left side wheels (Front) */}
                      <rect x="35" y="20" width="30" height="15" rx="3" fill="#334155" stroke="#4a5568" />
                      <rect x="35" y="205" width="30" height="15" rx="3" fill="#334155" stroke="#4a5568" />
                      
                      {/* Right side wheels (Rear) */}
                      <rect x="305" y="20" width="30" height="15" rx="3" fill="#334155" stroke="#4a5568" />
                      <rect x="305" y="205" width="30" height="15" rx="3" fill="#334155" stroke="#4a5568" />

                      {/* Connecting Axes */}
                      <line x1="50" y1="28" x2="50" y2="212" stroke="#94a3b8" strokeWidth="3" />
                      <line x1="320" y1="28" x2="320" y2="212" stroke="#94a3b8" strokeWidth="3" />
                      
                      {/* Front / Rear clear orientation labels */}
                      <text x="65" y="16" textAnchor="middle" fill="#2563eb" fontSize="7" fontWeight="black" letterSpacing="0.5">◀ FRONT (Propulsion)</text>
                      <text x="320" y="16" textAnchor="middle" fill="#db2777" fontSize="7" fontWeight="black" letterSpacing="0.5">REAR (Regeneration) ▶</text>
                      
                      {/* Main Car Chassis boundaries */}
                      <path d="M50,40 L320,40 C340,40 350,60 350,80 L350,160 C350,180 340,200 320,200 L50,200 Z" fill="none" stroke="#64748b" strokeWidth="3" />
                      
                      {/* Drive Motor (Front axle connected) */}
                      <rect x="35" y="93" width="60" height="54" rx="4" fill="#f8fafc" stroke="#3b82f6" strokeWidth="2" />
                      <text x="65" y="115" textAnchor="middle" fill="#1e3a8a" fontSize="7.5" fontWeight="bold">Drive Motor</text>
                      <text x="65" y="127" textAnchor="middle" fill="#2563eb" fontSize="6.5">Propulsion unit</text>

                      {/* Connection Line with Flow to Motor */}
                      <line x1="110" y1="120" x2="95" y2="120" stroke="#3b82f6" strokeWidth="1.5" strokeDasharray={isRunning ? "3,3" : ""} markerEnd="url(#arr-blue)" />

                      {/* Battery drive switch (Double direction switching relay) */}
                      <rect x="110" y="96" width="60" height="48" rx="4" fill="#f8fafc" stroke="#f59e0b" strokeWidth="2" />
                      <text x="140" y="112" textAnchor="middle" fill="#78350f" fontSize="6.5" fontWeight="black" letterSpacing="-0.1">Battery Drive</text>
                      <text x="140" y="122" textAnchor="middle" fill="#78350f" fontSize="6.5" fontWeight="black" letterSpacing="-0.1">Switch</text>
                      <text x="140" y="135" textAnchor="middle" fill="#d97706" fontSize="6" fontWeight="bold">Auto Swap Relay</text>

                      {/* Connection Routes from batteries to switcher */}
                      <path d="M180,75 L165,115" stroke="#f59e0b" strokeWidth="1.5" fill="none" markerEnd="url(#arr-amber)" />
                      <path d="M180,165 L165,125" stroke="#f59e0b" strokeWidth="1.5" fill="none" markerEnd="url(#arr-amber)" />

                      {/* Battery (A) */}
                      <rect x="180" y="52" width="60" height="46" rx="4" fill={activeBattery === 'A' ? '#ecfdf5' : '#ffffff'} stroke={activeBattery === 'A' ? '#10b981' : '#cbd5e1'} strokeWidth={activeBattery === 'A' ? '2.5' : '1.5'} />
                      <text x="210" y="73" textAnchor="middle" fill={activeBattery === 'A' ? '#047857' : '#64748b'} fontSize="7.5" fontWeight="black">Battery (A)</text>
                      <text x="210" y="84" textAnchor="middle" fill="#94a3b8" fontSize="6">Active power source</text>

                      {/* Battery (B) */}
                      <rect x="180" y="142" width="60" height="46" rx="4" fill={activeBattery === 'B' ? '#ecfdf5' : '#ffffff'} stroke={activeBattery === 'B' ? '#10b981' : '#cbd5e1'} strokeWidth={activeBattery === 'B' ? '2.5' : '1.5'} />
                      <text x="210" y="163" textAnchor="middle" fill={activeBattery === 'B' ? '#047857' : '#64748b'} fontSize="7.5" fontWeight="black">Battery (B)</text>
                      <text x="210" y="174" textAnchor="middle" fill="#94a3b8" fontSize="6">Active power source</text>

                      {/* Controller */}
                      <rect x="245" y="97" width="55" height="46" rx="4" fill="#f8fafc" stroke="#6366f1" strokeWidth="1.5" />
                      <text x="272.5" y="117" textAnchor="middle" fill="#312e81" fontSize="7.5" fontWeight="bold">Controller</text>
                      <text x="272.5" y="128" textAnchor="middle" fill="#4f46e5" fontSize="6.5">Synced distribution</text>

                      {/* Routes to batteries from controller */}
                      <path d="M245,115 L235,75" stroke="#6366f1" strokeWidth="1.5" fill="none" markerEnd="url(#arr-indigo)" />
                      <path d="M245,125 L235,165" stroke="#6366f1" strokeWidth="1.5" fill="none" markerEnd="url(#arr-indigo)" />
                      <line x1="305" y1="120" x2="295" y2="120" stroke="#ec4899" strokeWidth="1.5" markerEnd="url(#arr-pink)" />

                      {/* Newly Invented Electric Generator */}
                      <rect x="305" y="80" width="80" height="80" rx="4" fill="#fdf2f8" stroke="#ec4899" strokeWidth="2.5" />
                      <text x="345" y="100" textAnchor="middle" fill="#9d174d" fontSize="7" fontWeight="black" letterSpacing="-0.1">Newly Invented</text>
                      <text x="345" y="111" textAnchor="middle" fill="#9d174d" fontSize="7" fontWeight="black" letterSpacing="-0.1">Electric Generator</text>
                      <text x="345" y="127" textAnchor="middle" fill="#db2777" fontSize="7" fontWeight="bold">Innovative Stator</text>
                      <text x="345" y="141" textAnchor="middle" fill="#047857" fontSize="6" fontWeight="bold">Patent No. 2026-83613</text>
                    </svg>

                  </div>

                  {/* Simulator Control Dash */}
                  <div className="w-full mt-5 space-y-4">
                    
                    <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 text-xs space-y-2.5">
                      <div className="flex justify-between items-center text-slate-700">
                        <span className="font-medium">Primary Propulsion Source:</span>
                        <span className="font-extrabold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                          {activeBattery === 'A' ? 'Battery Pack (A)' : 'Battery Pack (B)'}
                        </span>
                      </div>
                      <div className="flex justify-between items-center text-slate-700">
                        <span className="font-medium">Background Charging Source:</span>
                        <span className="font-extrabold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                          {activeBattery === 'A' ? 'Battery Pack (B) [Charging]' : 'Battery Pack (A) [Charging]'}
                        </span>
                      </div>
                      <div className="flex justify-between items-center text-slate-700 font-medium">
                        <span>Regenerative Loop Circuit Status:</span>
                        <span className="font-bold text-pink-600 flex items-center gap-1 bg-pink-50/50 px-1.5 py-0.5 rounded">
                          <Zap className="w-3 h-3 text-pink-500 animate-bounce" />
                          Dynamic Energy Harvesting from continuous rotation feedback
                        </span>
                      </div>
                    </div>

                    <div className="flex gap-2.5">
                      <button 
                        onClick={() => setIsRunning(!isRunning)}
                        className="flex-1 py-2.5 px-3 bg-slate-900 text-white rounded-lg font-bold text-xs hover:bg-slate-800 transition flex items-center justify-center gap-1.5 shadow-xs"
                      >
                        {isRunning ? <><Pause className="w-4 h-4 text-white" />Pause Simulation</> : <><Play className="w-4 h-4 text-white" />Start Simulation</>}
                      </button>
                      <button 
                        onClick={() => {
                          setActiveBattery(p => p === 'A' ? 'B' : 'A');
                          setSwitchCount(c => c + 1);
                        }}
                        className="flex-1 py-2.5 px-3 bg-white text-slate-700 border border-slate-200 rounded-lg font-bold text-xs hover:bg-slate-50 transition shadow-xs"
                      >
                        Swap Battery System ⇄
                      </button>
                    </div>

                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 🚀 EXCLUSIVE INNOVATION INEVITABLE HERO IMAGE SHOWCASE & YOUTUBE ANNOUNCEMENT */}
      <section className="py-16 bg-gradient-to-b from-[#faf8f5] via-amber-50/25 to-white border-b border-amber-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="bg-white rounded-3xl border border-amber-100 p-8 md:p-12 shadow-[0_20px_50px_rgba(217,119,6,0.04)] relative overflow-hidden">
            
            {/* Elegant Amber Glow Decoration */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-amber-100/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-8 -left-8 w-96 h-96 bg-blue-500/5 rounded-full blur-2xl pointer-events-none" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
              
              {/* Text Side */}
              <div className="lg:col-span-7 space-y-8">
                
                <div className="flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center gap-1 bg-amber-400 text-slate-950 font-black px-3 py-1 rounded-full text-[11px] tracking-wider uppercase border border-amber-500">
                    <Sparkles className="w-3.5 h-3.5 animate-bounce" />
                    KICKOFF ANNOUNCEMENT
                  </span>
                  <span className="inline-flex items-center gap-1.5 bg-red-100 text-red-750 font-bold px-3 py-1 rounded-full text-[11px] border border-red-200">
                    <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
                    YouTube Development Documentary Series
                  </span>
                </div>

                <div className="space-y-4">
                  <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 leading-tight">
                    We Cordially Welcome You to the <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 via-yellow-650 to-amber-700 font-black">
                      "No Charging Station Required EV"
                    </span> <br />
                    First Prototype Verification & Production Launch Project!
                  </h2>
                  <p className="text-slate-500 font-bold text-xs sm:text-sm tracking-wide leading-relaxed">
                    "We welcome everyone interested in the first and only 'no charging station required EV' that is about to enter production!"
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  
                  <div className="p-5 bg-gradient-to-br from-amber-50/55 to-amber-50 rounded-2xl border border-amber-200/50 shadow-xs">
                    <div className="flex items-center gap-2 mb-2 text-amber-800">
                      <Clock className="w-5 h-5 text-amber-600" />
                      <span className="text-xs font-black uppercase tracking-wider">PROJECT TIMELINE</span>
                    </div>
                    <p className="text-2xl font-black text-slate-900">
                      Total Build Phase: <span className="text-amber-600">2 Months</span>
                    </p>
                    <p className="text-xs text-slate-500 mt-1.5 leading-relaxed font-bold">
                      We are setting off on a fast-track, highly focused manufacturing roadmap aiming to build, inspect, and road-test the full-scale vehicle within a tight 2-month window.
                    </p>
                  </div>

                  <div className="p-5 bg-gradient-to-br from-red-50/20 to-red-50/50 rounded-2xl border border-red-200/50 shadow-xs">
                    <div className="flex items-center gap-2 mb-2 text-red-800">
                      <Video className="w-5 h-5 text-red-600" />
                      <span className="text-xs font-black uppercase tracking-wider">ENTIRE PROCESS BROADCAST</span>
                    </div>
                    <p className="text-xl font-black text-slate-900">
                      Fully Public on <span className="text-red-600">YouTube!</span>
                    </p>
                    <p className="text-xs text-slate-500 mt-1.5 leading-relaxed font-bold">
                      To guarantee maximum transparency and objective verification of our patented technology, we pledge to share every single step from component sourcing to CNC machining and field-testing.
                    </p>
                  </div>

                </div>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-semibold">
                  💡 By integrating Dr. Yukinobu Mori's lifelong engineering research with a unique alternator-inspired closed-loop approach, this system is built to provide absolute freedom of mobility—even in harsh environments and isolated regions lacking any charging infrastructure. We warmly welcome automotive industrial partners, institutional investors, and technology enthusiasts who wish to watch, support, or participate in this historic prototyping journey.
                </p>

                {/* Subscribing placeholder button */}
                <div className="pt-2">
                  <a 
                    href="#contact"
                    className="inline-flex items-center gap-2 px-6 py-3.5 bg-slate-900 hover:bg-slate-850 text-white font-bold rounded-xl text-sm transition shadow-lg shadow-amber-600/5 active:scale-95"
                  >
                    <span>Subscribe to YouTube Series & Project Updates</span>
                    <ArrowRight className="w-4 h-4 text-amber-400" />
                  </a>
                </div>

              </div>

              {/* Showcase Image Side (The absolute single-one EV) */}
              <div className="lg:col-span-5 space-y-4">
                <div className="relative rounded-2xl overflow-hidden border-4 border-white shadow-2xl shadow-blue-500/10 aspect-video lg:aspect-square bg-slate-100 group">
                  
                  {/* Glowing frame overlay */}
                  <div className="absolute inset-0 border border-amber-500/20 rounded-xl pointer-events-none z-20" />
                  <div className="absolute top-3 left-3 bg-slate-900/85 text-white font-black text-[10px] tracking-widest px-3 py-1 rounded-full z-10 backdrop-blur-xs border border-white/20">
                    E-LOOP REALIZATION DRAFT
                  </div>

                  <img 
                    src={regenerativeEvImage} 
                    alt="E-LOOP Concept Electric Vehicle" 
                    className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />

                  {/* Aesthetic Caption */}
                  <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-transparent p-5 text-white">
                    <p className="text-xs font-black text-amber-400">E-LOOP SELF-REGENERATIVE MOBILITY CONCEPT</p>
                    <p className="text-[10px] text-slate-300 mt-1 font-bold">
                      Equipped with the newly developed revolutionary "Newly Invented Electric Generator", this innovative system completely overcomes the biggest Achilles' heel of modern electric vehicles (EVs)—the constant necessity of a charging stand. It unlocks a future of zero-external-charging EVs, completely freed from external charging grid infrastructure. Furthermore, thanks to its high design efficiency and minimal part count, vehicles can be constructed at a significantly lower cost than conventional internal combustion engine cars.
                    </p>
                  </div>

                </div>

                <div className="p-3 bg-amber-50/50 rounded-xl border border-amber-200/50 text-center text-[11px] text-amber-800 font-bold">
                  🌟 The conceptual rendering above represents our latest design draft of the highly efficient EV powered by our proprietary energy regeneration system, specifically engineered to host Dr. Yukinobu Mori's patented generator system.
                </div>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* 🔮 THE NEW PATENT IMAGES & SCHEMATIC SECTION */}
      <section id="patent-images" className="py-20 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center space-y-3 max-w-3xl mx-auto mb-16">
            <span className="text-xs font-black uppercase text-blue-600 bg-blue-50 border border-blue-200 px-3 py-1 rounded">
              PATENT BLUEPRINT & SCHEMATICS
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Patent Blueprints & Core Mechanics
            </h2>
            <p className="text-slate-500 text-sm font-medium">
              Based on Dr. Yukinobu Mori's official patent filing "Patent Application No. 2025-160784," this section outlines the system architecture and zooms in on the crucial "Newly Invented Electric Generator."
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            
            {/* PATENT SPECIFICATION 1: CYCLING OVERVIEW */}
            <div className="lg:col-span-8 bg-slate-50 rounded-2xl border border-slate-200 p-6 sm:p-8 flex flex-col justify-between shadow-sm">
              
              <div className="flex justify-between items-center mb-6">
                <span className="text-[11px] font-black uppercase text-slate-600 tracking-wider">
                  ■ System Schematic Blueprint (System Diagram Overview)
                </span>
                <span className="text-xs font-mono text-slate-400">
                  Status: Patent Pending
                </span>
              </div>

              {/* Precise SVG mimicking user document precisely */}
              <div className="bg-white rounded-xl border border-slate-200 p-6 flex items-center justify-center relative overflow-hidden shadow-xs">
                <div className="absolute inset-0 bg-grid-pattern opacity-5" />
                
                {/* Visual Patent Drawing (White clean style, looking like a real draft document blueprint) */}
                <svg viewBox="0 0 500 300" className="w-full h-auto max-w-2xl text-slate-600">
                  <defs>
                    <marker id="arrow-blue-bp" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                      <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#3b82f6" />
                    </marker>
                    <marker id="arrow-amber-bp" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                      <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#f59e0b" />
                    </marker>
                    <marker id="arrow-indigo-bp" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                      <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#6366f1" />
                    </marker>
                    <marker id="arrow-pink-bp" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                      <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#ec4899" />
                    </marker>
                  </defs>

                  {/* Grid Back Lines */}
                  <line x1="10" y1="50" x2="490" y2="50" stroke="#f1f5f9" strokeDasharray="5,5" strokeWidth="1" />
                  <line x1="10" y1="150" x2="490" y2="150" stroke="#f1f5f9" strokeDasharray="5,5" strokeWidth="1" />
                  <line x1="10" y1="250" x2="490" y2="250" stroke="#f1f5f9" strokeDasharray="5,5" strokeWidth="1" />

                  {/* Wire Connections & Arrows showing loop flow */}
                  <path d="M125,145 L100,145" stroke="#3b82f6" strokeWidth="1.5" fill="none" markerEnd="url(#arrow-blue-bp)" />
                  <path d="M235,85 Q225,85 205,135" stroke="#f59e0b" strokeWidth="1.5" fill="none" markerEnd="url(#arrow-amber-bp)" />
                  <path d="M235,205 Q225,205 205,155" stroke="#f59e0b" strokeWidth="1.5" fill="none" markerEnd="url(#arrow-amber-bp)" />
                  <path d="M340,135 Q325,85 315,85" stroke="#6366f1" strokeWidth="1.5" fill="none" markerEnd="url(#arrow-indigo-bp)" />
                  <path d="M340,155 Q325,205 315,205" stroke="#6366f1" strokeWidth="1.5" fill="none" markerEnd="url(#arrow-indigo-bp)" />
                  <line x1="425" y1="145" x2="405" y2="145" stroke="#ec4899" strokeWidth="1.5" markerEnd="url(#arrow-pink-bp)" />

                  {/* Car Outline Representation */}
                  <rect x="15" y="45" width="410" height="205" rx="15" fill="none" stroke="#94a3b8" strokeWidth="1" strokeDasharray="4,4" />
                  <text x="62" y="40" textAnchor="middle" fill="#2563eb" fontSize="7" fontWeight="black">◀ FRONT (Propulsion Axle)</text>
                  <text x="360" y="40" textAnchor="middle" fill="#db2777" fontSize="7" fontWeight="black">REAR (Regenerative Axle) ▶</text>
                  <text x="25" y="35" fill="#64748b" fontSize="7" fontWeight="bold" letterSpacing="1">E-LOOP Autonomous Regenerative Circuit Patent Draft</text>

                  {/* Interactively highlights chosen component */}
                  {/* Motor */}
                  <g className="cursor-pointer" onClick={() => setSelectedComponent('motor')}>
                    <rect x="25" y="120" width="75" height="50" rx="5" fill={selectedComponent === 'motor' ? '#eff6ff' : '#ffffff'} stroke="#3b82f6" strokeWidth={selectedComponent === 'motor' ? "2" : "1"} />
                    <text x="62" y="145" textAnchor="middle" fill="#1e3a8a" fontSize="9" fontWeight="bold">Drive Motor</text>
                    <text x="62" y="157" textAnchor="middle" fill="#2563eb" fontSize="7">Propulsion Motor</text>
                  </g>

                  {/* Switch */}
                  <g className="cursor-pointer" onClick={() => setSelectedComponent('switch')}>
                    <rect x="120" y="120" width="90" height="50" rx="5" fill={selectedComponent === 'switch' ? '#fffbeb' : '#ffffff'} stroke="#f59e0b" strokeWidth={selectedComponent === 'switch' ? "2" : "1"} />
                    <text x="165" y="145" textAnchor="middle" fill="#78350f" fontSize="8" fontWeight="bold">Battery Switch</text>
                    <text x="165" y="157" textAnchor="middle" fill="#d97706" fontSize="7">Auto Swap Switch</text>
                  </g>

                  {/* Battery A */}
                  <g className="cursor-pointer" onClick={() => setSelectedComponent('batteryA')}>
                    <rect x="235" y="60" width="80" height="50" rx="5" fill={selectedComponent === 'batteryA' ? '#ecfdf5' : '#ffffff'} stroke="#10b981" strokeWidth={selectedComponent === 'batteryA' ? "2" : "1"} />
                    <text x="275" y="85" textAnchor="middle" fill="#047857" fontSize="9" fontWeight="bold">Battery (A)</text>
                    <text x="275" y="97" textAnchor="middle" fill="#059669" fontSize="7">Pack A</text>
                  </g>

                  {/* Battery B */}
                  <g className="cursor-pointer" onClick={() => setSelectedComponent('batteryB')}>
                    <rect x="235" y="180" width="80" height="50" rx="5" fill={selectedComponent === 'batteryB' ? '#ecfdf5' : '#ffffff'} stroke="#10b981" strokeWidth={selectedComponent === 'batteryB' ? "2" : "1"} />
                    <text x="275" y="205" textAnchor="middle" fill="#047857" fontSize="9" fontWeight="bold">Battery (B)</text>
                    <text x="275" y="217" textAnchor="middle" fill="#059669" fontSize="7">Pack B</text>
                  </g>

                  {/* Controller */}
                  <g className="cursor-pointer" onClick={() => setSelectedComponent('controller')}>
                    <rect x="340" y="120" width="65" height="50" rx="5" fill={selectedComponent === 'controller' ? '#eef2ff' : '#ffffff'} stroke="#6366f1" strokeWidth={selectedComponent === 'controller' ? "2" : "1"} />
                    <text x="372" y="145" textAnchor="middle" fill="#312e81" fontSize="9" fontWeight="bold">Controller</text>
                    <text x="372" y="157" textAnchor="middle" fill="#4f46e5" fontSize="7">Regulator Module</text>
                  </g>

                  {/* Generator core (Core Electric Generator) */}
                  <g className="cursor-pointer" onClick={() => setSelectedComponent('generator')}>
                    <rect x="425" y="95" width="65" height="100" rx="5" fill={selectedComponent === 'generator' ? '#fdf2f8' : '#ffffff'} stroke="#ec4899" strokeWidth="2" />
                    <line x1="425" y1="125" x2="490" y2="125" stroke="#fbcfe8" strokeWidth="1" />
                    <line x1="425" y1="165" x2="490" y2="165" stroke="#fbcfe8" strokeWidth="1" />
                    <text x="457" y="112" textAnchor="middle" fill="#9d174d" fontSize="7" fontWeight="black">Newly</text>
                    <text x="457" y="122" textAnchor="middle" fill="#9d174d" fontSize="7" fontWeight="black">Invented</text>
                    <text x="457" y="132" textAnchor="middle" fill="#9d174d" fontSize="7" fontWeight="black">Electric</text>
                    <text x="457" y="142" textAnchor="middle" fill="#9d174d" fontSize="7" fontWeight="black">Generator</text>
                    <text x="457" y="160" textAnchor="middle" fill="#db2777" fontSize="7" fontWeight="bold">Core Patent</text>
                    <text x="457" y="172" textAnchor="middle" fill="#ec4899" fontSize="6" fontWeight="bold">Dr. Y. Mori</text>
                    <text x="457" y="182" textAnchor="middle" fill="#ec4899" fontSize="6" fontWeight="bold">Invention</text>
                  </g>
                </svg>

              </div>

              {/* Information disclaimer explaining focus */}
              <div className="mt-4 p-4 bg-white rounded-lg text-xs leading-relaxed text-slate-700 border border-slate-200">
                <span className="text-slate-900 font-bold block mb-1">■ Core Operational Loop:</span>
                When the vehicle begins moving, the proprietary mechanism designed by our team generates a continuous, consistent rotational force to drive the on-board "Newly Invented Electric Generator" (Patent Application No. 2026-83613). The regenerated electrical power is then routed back to the power system via the Controller. The core of Dr. Yukinobu Mori's invention lies in the "Battery Drive Switch" (Double-acting relay mechanism, Patent Application No. 2025-160784), which dynamically swaps the driving battery pack and the isolated charging battery pack in under 1 millisecond, establishing a continuous and autonomous loop of power replenishment and delivery.
              </div>

            </div>

            {/* PATENT SPECIFICATION 2: INDIVIDUAL DETAILED BLOCK (Col span 4) */}
            <div className="lg:col-span-4 flex flex-col justify-between">
              
              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 h-full flex flex-col justify-between space-y-6 shadow-sm">
                
                <div>
                  <div className="flex items-center gap-2 pb-4 border-b border-slate-200">
                    <div className="w-8 h-8 rounded bg-pink-100 text-pink-600 flex items-center justify-center font-bold">
                      P
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                        Selected Patent Component
                      </h4>
                      <h3 className="text-base font-black text-slate-800 mt-0.5">
                        System Component Details
                      </h3>
                    </div>
                  </div>

                  {/* Component description detail */}
                  <div className="space-y-4 pt-6">
                    <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs">
                      <span className="text-[10px] bg-blue-50 text-blue-600 font-extrabold px-1.5 py-0.5 rounded">
                        Circuit Module Metadata
                      </span>
                      <h5 className="text-base font-black text-slate-900 mt-2">
                        {getComponentInfo(selectedComponent).title}
                      </h5>
                    </div>

                    <p className="text-xs text-slate-650 leading-relaxed font-semibold">
                      {getComponentInfo(selectedComponent).desc}
                    </p>
                  </div>
                </div>

                <div className="p-3.5 bg-white rounded-xl border border-slate-200 space-y-2 text-xs text-slate-700 shadow-xs">
                  <div className="flex justify-between">
                    <span className="font-medium text-slate-500">Patent Status:</span>
                    <span className="font-bold text-emerald-600">Filed & Pending</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium text-slate-500">Physical Prototype:</span>
                    <span className="font-bold text-blue-600">Active Demonstration Kit</span>
                  </div>
                </div>

              </div>

            </div>

          </div>
            
          <div className="mt-12 bg-slate-900 rounded-3xl p-6 sm:p-10 text-white border border-slate-800 shadow-2xl relative overflow-hidden">
            <div className="absolute inset-0 bg-grid-pattern opacity-5" />
            <div className="relative z-10">
              
              {/* Heading */}
              <div className="text-center mb-10 space-y-4">
                <span className="text-[10px] sm:text-xs font-black tracking-widest text-[#fbbf24] bg-[#fbbf24]/10 px-4 py-1.5 rounded-full uppercase border border-[#fbbf24]/20 inline-block font-mono">
                  WORLD-FIRST DUAL CORE PATENT INVENTIONS
                </span>
                <h3 className="text-3xl sm:text-4xl font-black tracking-tight mt-2 text-white">
                  Achieving an EV Completely Free from Charging Stations: <span className="text-amber-400 block sm:inline">"The Two Core Patents"</span>
                </h3>
                
                {/* Revolutionary Message Bullet */}
                <div className="bg-amber-400 text-slate-950 px-6 py-4 rounded-2xl max-w-3xl mx-auto shadow-xl font-extrabold text-sm sm:text-base leading-relaxed border border-amber-300 mt-6 animate-pulse">
                  "Through these two powerful technological innovations—which no one else in the world has achieved or even imagined—we create the ultimate self-powered EV, completely eliminating the need for external fast charging stations."
                </div>

                <p className="text-slate-400 text-xs sm:text-sm max-w-3.5xl mx-auto font-medium leading-relaxed pt-2">
                  The two mutually complementary patents invented by Dr. Yukinobu Mori represent a complete closed-loop (self-sufficient energy circulation). One acts as the core heart that enables **Dynamic Energy Harvesting** during driving, while the other serves as the dynamic switching system that stores this energy without charge-discharge interference.
                </p>

                {/* Patent status indicator */}
                <div className="inline-flex flex-wrap items-center justify-center gap-2 px-4 py-2 bg-slate-950/60 rounded-xl border border-slate-800 text-[11px] sm:text-xs">
                  <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
                  <span className="text-slate-300 font-extrabold">[Global Intellectual Property]</span>
                  <span className="text-white font-black">Japanese Patent Filed & PCT International Patent Pending</span>
                  <span className="text-slate-400">protecting this proprietary breakthrough worldwide.</span>
                </div>
              </div>

              {/* Three pillars grid */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
                
                {/* PATENT 1 CARD - Newly Invented Electric Generator */}
                <div className="lg:col-span-4 bg-slate-950/70 rounded-2xl p-6 border border-amber-500/10 shadow-xl flex flex-col justify-between space-y-6 hover:border-amber-500/30 transition-all duration-300">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center flex-shrink-0">
                        <RotateCw className="w-6 h-6 animate-spin" style={{ animationDuration: '8s' }} />
                      </div>
                      <div>
                        <span className="text-[9px] bg-amber-500/10 text-amber-400 font-extrabold px-2 py-0.5 rounded border border-amber-500/20 tracking-wider">
                          PATENT 01 • HEART OF CHARGING
                        </span>
                        <h4 className="text-lg font-black text-white mt-1">
                          Newly Developed High-Efficiency Self-Generator
                        </h4>
                        <p className="text-amber-400 font-mono text-[9px] font-extrabold">
                          Newly Invented Electric Generator
                        </p>
                      </div>
                    </div>

                    {/* Patent Reference */}
                    <div className="px-3 py-1.5 bg-amber-500/5 rounded border border-amber-500/20 text-[10px] text-amber-400 font-mono font-black flex justify-between items-center">
                      <span>[Japanese Patent App No.]</span>
                      <span>Patent App No. 2026-83613</span>
                    </div>

                    <p className="text-xs text-slate-300 leading-relaxed font-medium">
                      Converts a continuous, consistent rotational force into high-efficiency electric power without waste, using our proprietary 3-phase AC generator design with an intelligent **recirculating feedback** system. Unlike conventional generators, it constructs a unique self-recirculating circuit that eliminates typical rotational drag.
                    </p>

                    <div className="p-4 bg-slate-900 rounded-xl border border-slate-800/80 space-y-2.5">
                      <div className="flex items-start gap-2">
                        <span className="text-amber-400 font-bold text-xs mt-0.5">✔</span>
                        <p className="text-[11px] text-slate-300 leading-relaxed font-semibold">
                          <strong className="text-white block mb-0.5">Self-Recirculating Feedback Generation:</strong> 
                          By intelligently partitioning and routing the 3-phase AC even at low speeds, friction losses and loading resistance are minimized, continuously supplying stable feedback power to the entire electric drive system.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-800/60 flex flex-col gap-1 text-[10px] font-bold text-amber-400 font-mono">
                    <div className="flex justify-between">
                      <span>• Japan</span>
                      <span>Patent App No. 2026-83613 Filed</span>
                    </div>
                    <div className="flex justify-between text-slate-400">
                      <span>• Global</span>
                      <span>PCT International Application Pending</span>
                    </div>
                  </div>
                </div>

                {/* MIDDLE COLUMN: THE VEHICLE VISUALIZATION CARD */}
                <div className="lg:col-span-4 bg-slate-950/40 rounded-2xl p-6 border border-slate-800 flex flex-col justify-between space-y-4 hover:border-slate-700 transition-all duration-300 relative overflow-hidden group">
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-slate-950/90 pointer-events-none z-10" />
                  
                  <div className="space-y-3 z-10">
                    <span className="text-[9px] bg-blue-500/10 text-blue-400 font-extrabold px-2 py-0.5 rounded border border-blue-500/20 tracking-wider inline-block">
                      E-LOOP VEHICLE CONCEPT
                    </span>
                    <h4 className="text-base font-black text-white">
                      Dynamic Energy Harvesting Autonomous EV Concept Car
                    </h4>
                    
                    {/* Concept Car Image Display */}
                    <div className="relative rounded-xl overflow-hidden border-2 border-slate-800 aspect-video bg-slate-900 bg-opacity-40 select-none shadow-inner">
                      <img 
                        src={regenerativeEvImage} 
                        alt="E-LOOP Concept Electric Vehicle" 
                        className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                      <div className="absolute bottom-2 left-2 bg-slate-900/90 text-[8px] text-slate-300 px-1.5 py-0.5 rounded font-mono font-bold font-mono">
                        PATENT DESIGN NO. 2026-83613 / 2025-160784
                      </div>
                    </div>

                    <p className="text-xs text-slate-400 leading-relaxed font-semibold">
                      A futuristic, fully autonomous energy-loop EV platform demonstrating the powerful combination of Dr. Yukinobu Mori's patents: Patent App. No. 2026-83613 (high-efficiency generator) and Patent App. No. 2025-160784 (dynamic swapping switch).
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-800/60 flex justify-center items-center text-[10px] text-amber-400 font-black z-10 bg-slate-950/50 -mx-6 -mb-6 p-4 rounded-b-2xl">
                    <span className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                      Autonomous Electric Energy Recirculation Platform
                    </span>
                  </div>
                </div>

                {/* PATENT 2 CARD - Dual Swapping Battery System */}
                <div className="lg:col-span-4 bg-slate-950/70 rounded-2xl p-6 border border-emerald-500/10 shadow-xl flex flex-col justify-between space-y-6 hover:border-emerald-500/30 transition-all duration-300">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center flex-shrink-0">
                        <BatteryCharging className="w-6 h-6 text-emerald-400 animate-pulse" />
                      </div>
                      <div>
                        <span className="text-[9px] bg-emerald-500/10 text-emerald-400 font-extrabold px-2 py-0.5 rounded border border-emerald-500/20 tracking-wider">
                          PATENT 02 • SYSTEM CONTROLLERS
                        </span>
                        <h4 className="text-lg font-black text-white mt-1">
                          A/B Independent Swapping Charging System
                        </h4>
                        <p className="text-emerald-400 font-mono text-[9px] font-extrabold">
                          Dual Swapping Battery Structure for EV
                        </p>
                      </div>
                    </div>

                    {/* Patent Reference */}
                    <div className="px-3 py-1.5 bg-emerald-500/5 rounded border border-emerald-500/20 text-[10px] text-emerald-400 font-mono font-black flex justify-between items-center">
                      <span>[Japanese Patent App No.]</span>
                      <span>Patent App No. 2025-160784</span>
                    </div>

                    <p className="text-xs text-slate-300 leading-relaxed font-medium">
                      Rather than using auxiliary storage, the vehicle's main propulsion battery bank itself is divided into two high-capacity, independent groups (A and B). This breakthrough architecture swap-charges the main batteries dynamically inside the vehicle while driving.
                    </p>

                    <div className="p-4 bg-slate-900 rounded-xl border border-slate-800/80 space-y-2.5">
                      <div className="flex items-start gap-2">
                        <span className="text-emerald-400 font-bold text-xs mt-0.5">✔</span>
                        <p className="text-[11px] text-slate-300 leading-relaxed font-semibold">
                          <strong className="text-white block mb-0.5">Alternating Swap & Continuous Charging Cycle:</strong> 
                          While Group A is actively powering the motor, output from the generator (Patent Application No. 2026-83613) is routed directly to the isolated Group B. Periodic millisecond swapping eliminates external cable-based charging entirely.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-800/60 flex flex-col gap-1 text-[10px] font-bold text-emerald-400 font-mono">
                    <div className="flex justify-between">
                      <span>• Japan</span>
                      <span>Patent App No. 2025-160784 Filed</span>
                    </div>
                    <div className="flex justify-between text-slate-400">
                      <span>• Global</span>
                      <span>PCT International Application Pending</span>
                    </div>
                  </div>
                </div>

              </div>

              {/* Intuitive visual loop banner */}
              <div className="mt-8 p-6 rounded-2xl bg-gradient-to-r from-amber-500/10 to-emerald-500/10 border border-slate-700/60 flex flex-col md:flex-row gap-5 items-center justify-between">
                <div className="space-y-1 text-center md:text-left">
                  <h5 className="text-sm font-black text-white flex items-center justify-center md:justify-start gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
                    💡 The Core Concept: Plug-free, Ultimate Self-Propulsion System
                  </h5>
                  <p className="text-slate-300 text-[11px] sm:text-xs leading-relaxed max-w-3xl font-medium">
                    "The continuous, consistent rotational force generated through our proprietary on-board mechanism is captured by (1) a custom-engineered 3-phase AC feedback generator that minimizes friction and drag. This harvested energy is channeled into (2) an independent, dual-compartment (A/B) battery system operating under intelligent swapping control. This forms a perfect closed loop where one pack powers propulsion while the other receives high-rate feedback energy, rendering heavy external charging infrastructure completely redundant and launching the ultimate self-sufficient EV."
                  </p>
                </div>
                <div className="text-sm font-black text-slate-950 bg-amber-400 border border-amber-300 px-5 py-3 rounded-2xl shadow-lg tracking-tight whitespace-nowrap">
                  🔌 0% Dependency on External Charging Grid
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* 💼 DEMO KIT & ACTUAL GENERATOR PICTURE SECTION */}
      <section id="demokit" className="py-20 bg-[#f7f5ef] border-b border-amber-100/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center space-y-3 max-w-3xl mx-auto mb-16">
            <span className="text-xs font-black uppercase text-amber-700 bg-amber-50 border border-amber-200 px-3 py-1 rounded">
              PHYSICAL DEMONSTRATION & STATS
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              A physical demo unit verifies the "Numerical Impact" and performance
            </h2>
            <p className="text-slate-600 text-sm font-semibold max-w-2xl mx-auto mt-2 leading-relaxed">
              Moving beyond mere theory, the E-LOOP development team has built and validated a fully working "1kW Class Physical Demo Kit." It accurately replicates continuous rotational torque and generator feedback to demonstrate closed-loop charging and real-time battery switching.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left side text: The Bento stats cards */}
            <div className="lg:col-span-6 space-y-6">
              
              {/* Bento Card 1: 5.2W vs 1000W Impact */}
              <div className="p-6 bg-white rounded-2xl border border-amber-100/70 shadow-[0_4px_20px_rgba(217,119,6,0.02)] space-y-4">
                <div className="flex justify-between items-start">
                  <div className="p-2.5 bg-amber-50 text-amber-700 rounded-xl border border-amber-200">
                    <Zap className="w-6 h-6" />
                  </div>
                  <span className="text-xs bg-red-50 text-red-700 border border-red-200 px-2.5 py-1 rounded-full font-black animate-pulse">
                    Numerical Impact: ~192x
                  </span>
                </div>
                <div>
                  <h3 className="text-lg font-black text-slate-900">Boot with 5.2W ➔ Regenerated Output of 1,000W</h3>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed font-bold">
                    While a standard household refrigerator consumes around 150W, our patented generator system can be excited with a microscopic starter draw of just 5.2W to produce up to 1,000W of output, representing an exceptionally high-efficiency design verified in physical laboratory testing.
                  </p>
                </div>
              </div>

              {/* Bento Card 2: 3-Phase generator wire modification */}
              <div className="p-6 bg-white rounded-2xl border border-amber-100/70 shadow-[0_4px_20px_rgba(217,119,6,0.02)] space-y-4">
                <div className="flex justify-between items-start">
                  <div className="p-2.5 bg-blue-50 text-blue-700 rounded-xl border border-blue-200">
                    <RotateCw className="w-6 h-6" />
                  </div>
                  <span className="text-xs bg-blue-50 text-blue-700 border border-blue-200 px-2.5 py-1 rounded-full font-black">
                    Patented Core Method
                  </span>
                </div>
                <div>
                  <h3 className="text-lg font-black text-slate-900">Partioning and Feedback Routing of the 3-Phase Alternator</h3>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed font-bold">
                    Our proprietary 3-phase AC generator minimizes conventional electromagnetic drag and avoids counter-torque on the propulsion motor at startup, ensuring seamless energy generation.
                  </p>
                </div>
              </div>

              {/* Bento Card 3: Dual Battery model */}
              <div className="p-6 bg-white rounded-2xl border border-amber-100/70 shadow-[0_4px_20px_rgba(217,119,6,0.02)] space-y-4">
                <div className="flex justify-between items-start">
                  <div className="p-2.5 bg-emerald-50 text-emerald-700 rounded-xl border border-emerald-200">
                    <BatteryCharging className="w-6 h-6" />
                  </div>
                  <span className="text-xs bg-emerald-50 text-emerald-700 border border-emerald-200 px-2.5 py-1 rounded-full font-black">
                    Dual Battery Swapping (Patent Pending)
                  </span>
                </div>
                <div>
                  <h3 className="text-lg font-black text-slate-900">An Autonomous "Mini Power Plant" inside the EV</h3>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed font-bold">
                    Integrating this generator converts your EV into an autonomous mobile micro-grid. Instead of relying on auxiliary storage, the vehicle's actual high-capacity main propulsion battery bank is divided into Group A and Group B. While Group A powers the drive motor, the isolated Group B is directly charged by the on-board high-efficiency generator. The system dynamically swaps their roles, establishing an infinite internal dynamic energy replenishment loop and eliminating the need for external charging stations entirely.
                  </p>
                </div>
              </div>

            </div>

            {/* Right side representation box */}
            <div className="lg:col-span-6 sticky top-28">
              <div className="p-6 sm:p-8 rounded-2xl bg-white border border-slate-200 shadow-xl space-y-6">
                
                <div className="flex justify-between items-center pb-3 border-b border-slate-150">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-pink-500 animate-ping" />
                    <h3 className="text-xs font-black uppercase text-slate-700 tracking-wide">
                      [Core Patent Design] Newly Invented Electric Generator
                    </h3>
                  </div>
                  <span className="text-[9px] bg-pink-50 text-pink-600 px-2.5 py-0.5 rounded border border-pink-200 font-mono font-bold">
                    Dr. Mori's Dynamo Model
                  </span>
                </div>

                {/* Real interactive visual box of the physical generator as seen in User PDF */}
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-center shadow-xs">
                  
                  <div className="relative h-44 bg-white rounded border border-slate-150 p-4 flex flex-col justify-between overflow-hidden">
                    
                    {/* Retro Grid Background */}
                    <div className="absolute inset-0 bg-white" style={{ backgroundImage: 'radial-gradient(#e2e8f0 1.2px, transparent 1.2px)', backgroundSize: '16px 16px' }} />

                    {/* Highly polished visual layout representation of the circular newly invented generator */}
                    <div className="relative z-10 flex items-center justify-center h-full gap-6">
                      
                      {/* Generator circle and stator coil */}
                      <div className="w-24 h-24 rounded-full bg-slate-100 border-4 stroke-4 border-slate-300 flex items-center justify-center relative shadow-inner">
                        <div className="absolute inset-2 rounded-full border border-pink-400 opacity-50 animate-spin" style={{ animationDuration: '8s' }} />
                        <div className="w-16 h-16 rounded-full bg-white border border-slate-200 flex flex-col items-center justify-center text-center">
                          <span className="text-[8px] text-pink-600 font-black tracking-tight block">CORE ROTOR</span>
                          <span className="text-[7px] text-slate-500 font-bold block">Ultra-thin winding</span>
                        </div>
                        
                        {/* Red coil windings indicators on the stator circle */}
                        <div className="absolute top-0 w-3 h-2 bg-pink-500 rounded-sm" />
                        <div className="absolute bottom-0 w-3 h-2 bg-pink-500 rounded-sm" />
                        <div className="absolute left-0 w-2 h-3 bg-pink-500 rounded-sm" />
                        <div className="absolute right-0 w-2 h-3 bg-pink-500 rounded-sm" />
                      </div>

                      {/* Cable connection simulation leading to controller and batteries */}
                      <div className="flex flex-col gap-2 bg-white/95 p-3 rounded-lg border border-slate-200 text-left shadow-xs">
                        <div className="flex items-center gap-1.5 text-[9px] font-bold text-slate-700">
                          <span className="w-2 h-1 bg-red-500 rounded-xs" />
                          <span className="font-mono">(+) Polar Back-EMF Suppression</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-[9px] font-bold text-slate-700">
                          <span className="w-2 h-1 bg-slate-400 rounded-xs" />
                          <span className="font-mono">(-) Polar Autonomous Ground</span>
                        </div>
                        <div className="text-[8px] bg-slate-50 text-slate-500 p-1.5 rounded font-mono border border-slate-200 font-bold mt-0.5">
                          Dr. Mori's Generator: Minimal friction drag design
                        </div>
                      </div>

                    </div>

                    {/* Watermark Label */}
                    <p className="absolute bottom-2 left-2 text-[8px] text-slate-500 font-mono tracking-widest bg-slate-100 px-1.5 py-0.5 rounded border border-slate-200 font-bold">
                      TECHNICAL DRAFT SHEET - S-160784
                    </p>

                  </div>

                  {/* Descriptions bottom */}
                  <div className="grid grid-cols-2 gap-3 mt-4 text-left">
                    <div className="p-3 bg-white rounded border border-slate-200 shadow-xs">
                      <span className="text-[9px] text-slate-400 font-bold block">Multi-pole Stator Core</span>
                      <p className="text-xs text-slate-800 mt-1 font-extrabold pb-0.5">Zero counter-torque on propulsion motor at startup</p>
                    </div>
                    <div className="p-3 bg-white rounded border border-slate-200 shadow-xs">
                      <span className="text-[9px] text-slate-400 font-bold block">Stabilized Swap Switching Board</span>
                      <p className="text-xs text-slate-800 mt-1 font-extrabold pb-0.5">Zero-loss high-precision dual swapping</p>
                    </div>
                  </div>

                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 🎬 VIDEO SECTION */}
      <section id="video-section" className="py-20 bg-white border-b border-slate-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          
          <div className="space-y-3">
            <span className="text-xs font-black uppercase text-blue-600 bg-blue-50 border border-blue-200 px-3 py-1 rounded">
              VERIFICATION DEMO MOVIE
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Verification Demonstration & Simulator
            </h2>
            <p className="text-slate-500 text-sm max-w-2xl mx-auto font-medium">
              This interactive panel visualizes how our prototype vehicle operates on a testing platform, demonstrating the real-time balance of rotational power generation and charging transfer between the dual battery packs.
            </p>
          </div>

          {/* Interactive Interactive Video/Oscilloscope Board */}
          <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200 shadow-lg grid grid-cols-1 lg:grid-cols-12 gap-6 text-left items-stretch">
            
            {/* Monitor Column (We retain the aesthetic dark oscilloscope frame here as requested for scientific looking contrast) */}
            <div className="lg:col-span-7 bg-slate-950 rounded-xl p-4 border border-slate-800 relative flex flex-col justify-between shadow-inner">
              
              <div className="flex justify-between items-center border-b border-slate-800 pb-2 mb-4">
                <div className="flex items-center gap-2">
                  <Video className="w-4 h-4 text-pink-500" />
                  <span className="text-[11px] font-black uppercase text-slate-200">Real-Time Power & Diagnostics Oscilloscope</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className={`w-2 h-2 rounded-full ${videoPlaying ? 'bg-red-500 animate-ping' : 'bg-slate-500'}`} />
                  <span className="font-mono text-[9px] text-slate-400 tracking-wider">
                    {videoPlaying ? "LIVE STREAM" : "PAUSED"}
                  </span>
                </div>
              </div>

              {/* Simulation Screen container with beautiful SVG waves */}
              <div className="h-44 bg-slate-900/90 rounded border border-slate-800/90 relative flex flex-col items-center justify-center overflow-hidden">
                
                {videoPlaying ? (
                  /* Oscilloscope wave representation */
                  <div className="w-full h-full px-4 flex flex-col justify-between py-6">
                    
                    {/* Screen wave header info */}
                    <div className="flex justify-between items-center text-[9px] font-mono text-emerald-400">
                      <span>CH1: Dr. Mori's Dynamo AC [STABLE]</span>
                      <span>TIME SCALE: 100ms/div</span>
                    </div>

                    {/* Generator dynamic wave drawing */}
                    <div className="relative w-full h-20 flex items-center">
                      {/* Grid overlay */}
                      <div className="absolute inset-0 bg-grid-pattern opacity-15" />
                      
                      {/* SVG line */}
                      <svg className="w-full h-full text-emerald-400" viewBox="0 0 250 100" preserveAspectRatio="none">
                        <polyline
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          points={wavePoints.map((val, idx) => `${(idx / wavePoints.length) * 250}, ${val}`).join(' ')}
                        />
                      </svg>
                    </div>

                    <div className="flex justify-between items-center text-[8px] font-mono text-slate-500">
                      <span>AUTO LOCK SENSITIVITY</span>
                      <span>FREQ: MOTOR SYNCHRONIZED</span>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center gap-2 text-slate-400 relative z-10">
                    <Video className="w-8 h-8 text-slate-500 animate-bounce" />
                    <span className="text-xs font-bold text-slate-400">Diagnostics Video Simulator Paused</span>
                  </div>
                )}

              </div>

              {/* Controller buttons below */}
              <div className="flex justify-between items-center mt-4 pt-2 border-t border-slate-850">
                <button 
                  onClick={() => setVideoPlaying(!videoPlaying)}
                  className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold rounded flex items-center gap-1.5 transition border border-slate-700"
                >
                  {videoPlaying ? <><Pause className="w-3.5 h-3.5" />Pause Monitor</> : <><Play className="w-3.5 h-3.5 text-emerald-450" />Play Verification</>}
                </button>
                <div className="flex items-center gap-1.5 text-xs text-slate-400">
                  <span className="text-[10px] text-slate-500 font-bold">Verification Phase:</span>
                  <div className="flex gap-1">
                    <button 
                      onClick={() => setCurrentVideoPhase('start')}
                      className={`px-2 py-0.5 rounded text-[9px] transition-colors ${currentVideoPhase === 'start' ? 'bg-blue-600 font-extrabold text-white' : 'bg-slate-800 hover:bg-slate-755 text-slate-350'}`}
                    >
                      Start Inertia
                    </button>
                    <button 
                      onClick={() => setCurrentVideoPhase('switching')}
                      className={`px-2 py-0.5 rounded text-[9px] transition-colors ${currentVideoPhase === 'switching' ? 'bg-blue-600 font-extrabold text-white' : 'bg-slate-800 hover:bg-slate-755 text-slate-350'}`}
                    >
                      Swapping Test
                    </button>
                  </div>
                </div>
              </div>

            </div>

            {/* Analysis phase description Panel */}
            <div className="lg:col-span-5 bg-white rounded-xl p-5 border border-slate-200 flex flex-col justify-between shadow-xs">
              
              <div className="space-y-4">
                <span className="text-[10px] bg-slate-100 text-slate-600 font-mono px-2 py-0.5 rounded tracking-wider font-bold">
                  MONITOR ANALYSIS REPORT
                </span>

                {currentVideoPhase === 'start' && (
                  <div className="space-y-2">
                    <h4 className="text-sm font-black text-slate-850">Start-up & Initial Load Cycle</h4>
                    <p className="text-xs text-slate-600 leading-relaxed font-semibold">
                      At startup, the newly developed generator imposes zero counter-torque on the propulsion motor.
                    </p>
                  </div>
                )}

                {currentVideoPhase === 'switching' && (
                  <div className="space-y-2">
                    <h4 className="text-sm font-black text-slate-850">Reciprocal Swapping (No-Interruption Switching)</h4>
                    <p className="text-xs text-slate-600 leading-relaxed font-semibold">
                      When Battery Pack A nears discharge, or upon a preset time interval, the dual battery switch dynamically swaps their roles in less than 1 millisecond. The active load transfers to Battery Pack B while Pack A begins charging, exhibiting zero voltage spikes or loss.
                    </p>
                  </div>
                )}

                <div className="p-3 bg-slate-50 rounded-lg text-xs border border-slate-200 text-slate-600">
                  <span className="text-slate-800 block font-bold mb-1">■ Joint Verification & Diagnostics Data</span>
                  Upon request, our engineering team can provide comprehensive measurement spreadsheets, full system block diagrams, or arrange a physical demonstration.
                </div>
              </div>

              <a 
                href="#contact"
                className="mt-4 px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 text-center rounded text-xs font-bold transition block shadow-xs"
              >
                Request Technical Report & Demo Video ✉
              </a>

            </div>

          </div>

        </div>
      </section>

      {/* 👤 INVENTOR PROFILE PANEL */}
      <section id="patent-facts" className="py-20 bg-slate-50 border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-8 rounded-2xl bg-white border border-slate-200 text-slate-800 shadow-lg space-y-8 relative overflow-hidden">
            
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/5 rounded-full blur-3xl pointer-events-none" />

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-slate-150">
              <div>
                <span className="text-xs font-black uppercase text-blue-600 tracking-wider">
                  ORIGINAL INVENTOR BIOGRAPHY
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mt-1">
                  Inventor & Patent Applicant: Dr. Yukinobu Mori
                </h2>
              </div>
              <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 px-4 py-2 rounded-lg shadow-xs">
                <User className="w-5 h-5 text-blue-600" />
                <span className="text-sm font-bold text-slate-800">Dr. Yukinobu Mori</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm">
              
              {/* Profile Card left */}
              <div className="space-y-4">
                <h3 className="text-base font-black text-slate-900 flex items-center gap-1.5 border-b border-slate-100 pb-2">
                  <FileText className="w-4 h-4 text-blue-500" />
                  Dual Core Patent Application Portfolio
                </h3>
                
                {/* PATENT 01 CARD IN PROFILE */}
                <div className="p-4 rounded-xl bg-amber-50/50 border border-amber-200/80 space-y-3 font-mono text-xs text-slate-705 shadow-sm">
                  <div className="flex justify-between items-center bg-amber-100/50 px-2 py-1 rounded">
                    <span className="font-extrabold text-amber-850">[Core Patent 01] Newly Developed High-Efficiency Self-Generator</span>
                    <span className="text-[10px] bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded font-bold">Filed</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-100 pb-1.5 px-1">
                    <span className="text-slate-500 font-bold">Patent Application No:</span>
                    <span className="font-extrabold text-slate-900">Patent App No. 2026-83613</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-100 pb-1.5 px-1">
                    <span className="text-slate-500 font-bold">Core Technology:</span>
                    <span className="font-semibold text-slate-800 text-right">3-Phase AC Self-Circulating Feedback Structure</span>
                  </div>
                  <p className="text-[11px] text-slate-600 font-sans leading-relaxed px-1 font-semibold">
                    An intelligent closed-loop self-recirculating system distributing 3-phase AC power from our proprietary generator design.
                  </p>
                </div>

                {/* PATENT 02 CARD IN PROFILE */}
                <div className="p-4 rounded-xl bg-emerald-50/40 border border-emerald-200/80 space-y-3 font-mono text-xs text-slate-705 shadow-sm">
                  <div className="flex justify-between items-center bg-emerald-100/50 px-2 py-1 rounded">
                    <span className="font-extrabold text-emerald-850">[Core Patent 02] Battery Swapping Control System</span>
                    <span className="text-[10px] bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded font-bold">Filed</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-100 pb-1.5 px-1">
                    <span className="text-slate-500 font-bold">Patent Application No:</span>
                    <span className="font-extrabold text-slate-900">Patent App No. 2025-160784</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-100 pb-1.5 px-1">
                    <span className="text-slate-500 font-bold">Core Technology:</span>
                    <span className="font-semibold text-slate-800 text-right">A/B Dual Battery Swapping Charging System</span>
                  </div>
                  <p className="text-[11px] text-slate-600 font-sans leading-relaxed px-1 font-semibold">
                    An automated power routing system that swap-charges the high-capacity main propulsion battery banks (Groups A/B) continuously on-board, entirely eliminating external charging requirements.
                  </p>
                </div>

                <div className="p-3 bg-blue-50/70 text-blue-900 rounded-xl border border-blue-200 text-xs leading-relaxed font-semibold">
                  <strong>■ Scope of Patent Portfolio Protection:</strong>
                  <p className="text-[11px] text-blue-950 font-medium mt-1">
                    Priority rights have been fully secured with the completion of two primary patent filings in Japan. In parallel, unified global application procedures via the PCT international route are actively moving forward to cover major territories (including North America, Europe, and Asia).
                  </p>
                </div>
              </div>

              {/* Founder Statement right */}
              <div className="flex flex-col justify-between">
                <div className="space-y-4">
                  <h3 className="text-base font-black text-slate-900 flex items-center gap-1.5 border-b border-slate-100 pb-2">
                    <Globe className="w-4 h-4 text-blue-500" />
                    Inventor's Message
                  </h3>
                  <p className="text-slate-600 leading-relaxed italic text-xs font-semibold">
                    "Modern electric vehicles are burdened with excessively large batteries simply to secure driving range, resulting in increased weight and severe energy inefficiency. By establishing a fully autonomous, self-generating on-board model, we can build a clean, sustainable vehicle that operates completely free of heavy grid reliance. This technology was born from a desire to bring zero-boundary mobility to remote regions and areas lacking grid infrastructure. I look forward to working with industry leaders to turn this vision into reality."
                  </p>
                </div>

                <p className="text-xs text-blue-600 pt-4 border-t border-slate-150 mt-4 font-bold">
                  We are currently in the phase of building the actual vehicle prototype. At this stage, joint developments are not required; however, we warmly welcome visionary investors who wish to participate and invest in our project at this phase.
                </p>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* ✉ COMPLETE FORM WITH WORKING EMAIL INTEGRATION */}
      <section id="contact" className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-8 rounded-2xl bg-slate-50 border border-slate-200 shadow-xl space-y-8">
            
            <div className="text-center space-y-3">
              <span className="text-xs font-black uppercase text-blue-600 bg-blue-50 border border-blue-200 px-3.5 py-1.5 rounded">
                OFFICIAL INVESTMENT WINDOW
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                E-LOOP Project Investment Inquiry Form
              </h3>
              <p className="text-slate-500 text-sm max-w-xl mx-auto font-medium">
                Request patent application summaries, verified operation telemetry logs, or schedule a physical demonstration of the running prototype. Please submit your inquiry through our secure contact portal below.
              </p>
            </div>

            {/* Response notifications */}
            {submissionSuccess ? (
              <div className="p-8 rounded-xl bg-emerald-50 border border-emerald-200 text-center space-y-4">
                <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto border border-emerald-200">
                  <Check className="w-6 h-6" />
                </div>
                <div className="space-y-2">
                  <h4 className="text-lg font-black text-emerald-700">Inquiry Securely Transmitted</h4>
                  <p className="text-sm text-slate-600 leading-relaxed font-semibold">
                    Thank you. Your message has been safely routed via Formspree to patent inventor Dr. Yukinobu Mori. We will review your submission and contact you via your provided email address shortly.
                  </p>
                  <div className="p-2 bg-slate-100 rounded border border-slate-200 inline-block font-mono text-xs text-blue-600 mt-2 font-bold shadow-xs">
                    Inquiry Reference Token: {submissionToken}
                  </div>
                </div>
                <button 
                  onClick={handleResetForm}
                  className="mt-4 px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-bold transition shadow-xs"
                >
                  Create a New Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                
                {/* Field A: Name */}
                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-slate-400" />
                    Full Name / Contact Person <span className="text-red-500 font-extrabold">*</span>
                  </label>
                  <input 
                    type="text" 
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    placeholder="e.g., John Doe"
                    className="w-full px-4 py-3 bg-white border border-slate-250 rounded-lg text-sm text-slate-950 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/30 shadow-xs font-medium"
                  />
                </div>

                {/* Field B: Company Information / Name of Firm */}
                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <Building className="w-3.5 h-3.5 text-slate-400" />
                    Company / Organization <span className="text-red-500 font-extrabold">*</span>
                  </label>
                  <input 
                    type="text" 
                    required
                    value={formData.company}
                    onChange={(e) => setFormData({...formData, company: e.target.value})}
                    placeholder="e.g., Next Generation Mobility Inc."
                    className="w-full px-4 py-3 bg-white border border-slate-250 rounded-lg text-sm text-slate-950 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/30 shadow-xs font-medium"
                  />
                </div>

                {/* Field C: Email Address */}
                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-slate-400" />
                    Email Address <span className="text-red-500 font-extrabold">*</span>
                  </label>
                  <input 
                    type="email" 
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    placeholder="e.g., info@example.com"
                    className="w-full px-4 py-3 bg-white border border-slate-250 rounded-lg text-sm text-slate-950 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/30 shadow-xs font-medium"
                  />
                </div>

                {/* Field D: Inquiry type */}
                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">
                    Inquiry Category <span className="text-red-500 font-extrabold">*</span>
                  </label>
                  <select 
                    value={formData.inquiryType}
                    onChange={(e) => setFormData({...formData, inquiryType: e.target.value})}
                    className="w-full px-4 py-3 bg-white border border-slate-250 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/30 shadow-xs font-bold"
                  >
                    <option>Investment / Capital Partnership (IR)</option>
                    <option>Patent Licensing / Technical Inquiries</option>
                    <option>Schedule a Demonstration Tour</option>
                    <option>General Inquiry</option>
                  </select>
                </div>

                {/* Field E: Message content */}
                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <FileCode className="w-3.5 h-3.5 text-slate-400" />
                    Inquiry Details <span className="text-red-500 font-extrabold">*</span>
                  </label>
                  <textarea 
                    required
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    placeholder="Please specify your investment interest, suggestions, or questions."
                    className="w-full px-4 py-3 bg-white border border-slate-250 rounded-lg text-sm text-slate-950 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/30 shadow-xs font-medium"
                  />
                </div>

                {/* Privacy check agreement */}
                <div className="flex items-start gap-2.5">
                  <input 
                    type="checkbox" 
                    id="privacyAccepted"
                    checked={formData.privacyAccepted}
                    onChange={(e) => setFormData({...formData, privacyAccepted: e.target.checked})}
                    className="mt-1 rounded bg-white border-slate-350 text-blue-600 focus:ring-2 focus:ring-blue-500/30"
                  />
                  <label htmlFor="privacyAccepted" className="text-xs text-slate-500 leading-relaxed cursor-pointer select-none font-bold">
                    I agree that my submitted personal information and inquiry details will be protected by Dr. Yukinobu Mori and the team, and will only be used to contact me regarding this investment opportunity. <span className="text-red-500 font-extrabold">*</span>
                  </label>
                </div>

                {/* Submit Feedback Error */}
                {submitError && (
                  <div className="p-4 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-lg flex items-center gap-2 font-bold">
                    <span className="font-extrabold">🚨 Error:</span> {submitError}
                  </div>
                )}

                {/* Dispatch Button */}
                <div className="flex justify-end pt-2">
                  <button 
                    type="submit"
                    disabled={isSubmitting || !formData.privacyAccepted}
                    className="w-full sm:w-auto px-8 py-4 bg-blue-600 text-white rounded-lg font-bold text-sm hover:bg-blue-700 transition active:scale-[0.98] disabled:opacity-55 disabled:cursor-not-allowed shadow-lg shadow-blue-500/20"
                  >
                    {isSubmitting ? "Submitting..." : "Submit Partnership Inquiry 🚀"}
                  </button>
                </div>

              </form>
            )}

          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-slate-900 text-slate-400 text-xs py-12 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="flex items-center justify-center gap-2">
            <span className="font-black text-white text-base">E-LOOP</span>
            <span className="text-[10px] bg-slate-800 px-1.5 py-0.5 rounded border border-slate-700 text-slate-300 font-bold">PROJECT S-160784</span>
          </div>
          <p className="max-w-md mx-auto text-[11px] text-slate-300 font-medium">
            World-First EV-Mounted Patented Generator Portfolio / Applicant: Dr. Yukinobu Mori
          </p>
          <div className="text-[10px] text-slate-500 space-y-1 font-medium">
            <p>© 2026 E-LOOP Self-Regenerative Auto EV System. All Rights Reserved.</p>
            <p>* Unauthorized reproduction or publication of the prototype rig, oscilloscope records, or patent blueprints is strictly prohibited.</p>
          </div>
        </div>
      </footer>

      {/* FLOATING LANGUAGE SWITCH SWITCHER FOR EASY TOGGLING ON ALL DEVICES */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={onSwitchLanguage}
          className="flex items-center gap-2 px-4 py-3 bg-slate-900 text-white rounded-full shadow-2xl hover:bg-slate-850 transition active:scale-[0.95] border border-slate-700 font-bold text-xs"
        >
          <Globe className="w-4 h-4 text-blue-400 animate-spin" style={{ animationDuration: '10s' }} />
          <span>日本語</span>
        </button>
      </div>

    </div>
  );
}
