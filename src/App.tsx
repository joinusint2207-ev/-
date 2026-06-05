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

export default function App() {
  const regenerativeEvImage = "/src/assets/images/regenerative_ev_1780636321278.png";

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
  const [currentVideoPhase, setCurrentVideoPhase] = useState<'start' | 'generation' | 'switching'>('generation');
  const [wavePoints, setWavePoints] = useState<number[]>([]);

  // Form states with correct Email Integration
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    inquiryType: '共同開発・協業について',
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
      setSubmitError('すべての必須項目を入力し、個人情報の取り扱いへの同意マークにチェックを入れてください。');
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
      setSubmitError('フォームの送信に失敗しました。お手数ですがしばらく時間をおいて再送信をお試しください。');
      setIsSubmitting(false);
    });
  };

  const handleResetForm = () => {
    setFormData({
      name: '',
      company: '',
      email: '',
      inquiryType: '共同開発・協業について',
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
          title: "Drive motor (駆動モーター)",
          desc: "走行時に電力を車輪の推進回転力へダイレクトに変換する心臓部。本構造では、モーターが駆動する際のエネルギー変換損失や、走行減速・慣性時に得られるオルタネータ還元力を高い並列度でコントローラーへと逆還流する構造が考慮されています。"
        };
      case 'switch':
        return {
          title: "Battery drive switch (バッテリー駆動切替機構)",
          desc: "森 幸信 博士の発案による極めて重要な切替機構。バッテリー(A)が走行駆動として放電している間、バッテリー(B)は完全回路遮断の上で新発明発電機から直接フィードバックされる急峻な再充電エネルギーのみを受け取ります。インジケータに基づき、放電と受電の役割を交互かつ無瞬断でスイッチング（双方向往還）します。"
        };
      case 'batteryA':
        return {
          title: "Battery (A) (一次バッテリー)",
          desc: "高サイクル充放電特性を備えた一次エネルギー貯蔵要素。システム図における『A側』を構成し、駆動スイッチを介してモーター側に電力を提供、または自律発電機からの高密度フィードバックにより、瞬時に待機充電完了状態へと移ります。"
        };
      case 'batteryB':
        return {
          title: "Battery (B) (二次バッテリー)",
          desc: "一次バッテリー(A)と全く対称に機能する『B側』の二次エネルギー貯蔵要素。Aがモーター駆動を担当しているとき、Bは発電系統専用に完全に結線がシフトされ、外部との干渉ロスのない効率的な急速充電を実行します。"
        };
      case 'controller':
        return {
          title: "Controller (制御ユニット / 昇圧コントローラー)",
          desc: "新発明発電機の回生出力を検知し、適切な昇圧、同期整流を行い、バッテリーA・Bのどちらかへ充電エネルギー流を分配制御するプロセッサーボード。駆動スイッチと連動することで、システム全体の自律バランスを維持します。"
        };
      case 'generator':
        return {
          title: "Newly invented Electric Generator (新たに発明された発電機)",
          desc: "出願番号「2025-160784」の最中核パーツ。森 幸信 博士の新発明による、EV搭載型の高効率運動力回収発電機。従来の発電用ダイナモで問題となっていた、逆起電力による回転抵抗（制動ロス）を、多極巻き線と独自ステーター構造により最適化。極限まで少ない回転負担で効率的な電力を再生成します。"
        };
      default:
        return {
          title: "システム各部をクリックしてください",
          desc: "特許出願中のE-LOOP技術を構成する5つの主要ユニットおよび特許発電コアです。各部をタップすると、森 幸信 博士が設計した役割の詳細が表示されます。"
        };
    }
  };

  return (
    <div id="mori-eloop-website" className="min-h-screen bg-[#faf8f5] text-slate-800 font-sans antialiased selection:bg-blue-600 selection:text-white">
      
      {/* ⚠️ TOP PATENT PENDING ALERT STRIP */}
      <div className="bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-700 text-white text-xs sm:text-sm py-2.5 px-4 shadow-sm text-center font-bold tracking-wider flex items-center justify-center gap-x-3 gap-y-1 flex-wrap border-b border-blue-500">
        <span className="inline-flex items-center gap-1 bg-yellow-400 text-slate-950 px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-tight">
          WORLD FIRST / 世界初
        </span>
        <span className="font-extrabold">日本国内特許出願中（特願 2025-160784） ／ 国際特許出願準備中 (PCT)</span>
        <span className="text-blue-250">|</span>
        <span>発明・出願人：森 幸信 博士 (Dr. Yukinobu Mori)</span>
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
              <p className="text-[10px] text-slate-500 font-bold tracking-wide">森 幸信 博士 発明特許技術実証</p>
            </div>
          </div>

          {/* Desktop Nav tabs link scrolling */}
          <nav className="hidden lg:flex items-center gap-1 text-sm font-bold text-slate-600">
            <a 
              href="#concept" 
              onClick={() => setActiveTab('concept')}
              className={`px-3.5 py-2 rounded-lg transition-colors ${activeTab === 'concept' ? 'text-blue-600 bg-blue-50/70' : 'hover:text-slate-900 hover:bg-slate-50'}`}
            >
              新発明のビジョン
            </a>
            <a 
              href="#patent-images" 
              onClick={() => setActiveTab('diagram')}
              className={`px-3.5 py-2 rounded-lg transition-colors ${activeTab === 'diagram' ? 'text-blue-600 bg-blue-50/70' : 'hover:text-slate-900 hover:bg-slate-50'}`}
            >
              特許詳細図
            </a>
            <a 
              href="#demokit" 
              onClick={() => setActiveTab('demokit')}
              className={`px-3.5 py-2 rounded-lg transition-colors ${activeTab === 'demokit' ? 'text-blue-600 bg-blue-50/70' : 'hover:text-slate-900 hover:bg-slate-50'}`}
            >
              実証デモキット
            </a>
            <a 
              href="#video-section" 
              onClick={() => setActiveTab('video')}
              className={`px-3.5 py-2 rounded-lg transition-colors ${activeTab === 'video' ? 'text-blue-600 bg-blue-50/70' : 'hover:text-slate-900 hover:bg-slate-50'}`}
            >
              実地ビデオ
            </a>
            <a 
              href="#patent-facts" 
              onClick={() => setActiveTab('patent')}
              className={`px-3.5 py-2 rounded-lg transition-colors ${activeTab === 'patent' ? 'text-blue-600 bg-blue-50/70' : 'hover:text-slate-900 hover:bg-slate-50'}`}
            >
              発明者情報
            </a>
          </nav>

          {/* CTA Action Direct Link */}
          <div>
            <a 
              href="#contact" 
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-bold bg-blue-600 text-white hover:bg-blue-700 transition active:scale-[0.98] shadow-lg shadow-blue-600/10 hover:shadow-blue-500/20"
            >
              <span>協業・共同開発の問合せ</span>
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
                <span>世界初！EV搭載型 新発明発電機 プロトタイプ起動中</span>
              </div>

              <div className="space-y-4">
                <p className="text-sm text-blue-600 font-extrabold tracking-widest uppercase">E-LOOP SYSTEM BY DR. YUKINOBU MORI</p>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 leading-[1.12] tracking-tight">
                  充電スタンド不要・
                  <br />
                  CO₂排出ゼロ。
                  <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-cyan-600 to-emerald-600">ただ走るだけ。</span>
                </h1>
              </div>

              <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl font-medium">
                「航続距離の不安から、道中で電気を買うために充電スポットを探し回る」というEVの不都合な常識を打破します。
                森 幸信 博士が設計したこのE-LOOPシステムは、車輪の運動サイクル、独自のバッテリードライブ切替機構、
                そして回転抵抗を徹底的に抑えた革新的な【新発明車載発電機】が三位一体となり、走りながら対のバッテリー（急速充電側）に充電を行う、自律的かつ環境に優しい革新的な走行モデルです。
              </p>

              {/* Real Patent Certificate Status Frame */}
              <div className="p-5 rounded-xl bg-white border border-slate-200 shadow-sm max-w-xl flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center flex-shrink-0 border border-emerald-200 shadow-xs">
                  <ShieldCheck className="w-7 h-7" />
                </div>
                <div>
                  <span className="text-[10px] font-black uppercase text-emerald-600 tracking-wider">OFFICIAL PATENT FILED</span>
                  <p className="text-base font-black text-slate-950 mt-0.5">特許出願中 : 出願番号 2025-160784</p>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed font-medium">
                    本技術は、理論上の仮説や数値改ざんのデータではなく、森 幸信 博士の独自の技術設計に基づき開発された実在の特許出願技術です。実際に動作する実機デモ装置が完備されています。
                  </p>
                </div>
              </div>

              {/* CTAs */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <a 
                  href="#patent-images" 
                  className="px-6 py-3.5 rounded-lg text-base font-bold bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-600/10 hover:shadow-blue-500/20 transition flex items-center gap-2"
                >
                  特許基本構成を確認する
                  <ChevronRight className="w-5 h-5 text-blue-200" />
                </a>
                <a 
                  href="#contact" 
                  className="px-6 py-3.5 rounded-lg text-base font-bold bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 shadow-xs transition"
                >
                  特許・実証データ請求
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
                  <p className="text-[11px] text-slate-500 font-medium">森 幸信 博士 考案 - 特許出願回路図のインタラクティブ・シミュレーター</p>
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
                      <text x="65" y="16" textAnchor="middle" fill="#2563eb" fontSize="7" fontWeight="black" letterSpacing="0.5">◀ 前方 [FRONT] 駆動輪</text>
                      <text x="320" y="16" textAnchor="middle" fill="#db2777" fontSize="7" fontWeight="black" letterSpacing="0.5">後方 [REAR] 発電極 ▶</text>
                      
                      {/* Main Car Chassis boundaries */}
                      <path d="M50,40 L320,40 C340,40 350,60 350,80 L350,160 C350,180 340,200 320,200 L50,200 Z" fill="none" stroke="#64748b" strokeWidth="3" />
                      
                      {/* Drive Motor (Front axle connected) */}
                      <rect x="40" y="95" width="50" height="50" rx="4" fill="#f8fafc" stroke="#3b82f6" strokeWidth="2" />
                      <text x="65" y="118" textAnchor="middle" fill="#1e3a8a" fontSize="8" fontWeight="bold">Drive motor</text>
                      <text x="65" y="130" textAnchor="middle" fill="#2563eb" fontSize="7">駆動用モーター</text>

                      {/* Connection Line with Flow to Motor */}
                      <line x1="115" y1="120" x2="90" y2="120" stroke="#3b82f6" strokeWidth="1.5" strokeDasharray={isRunning ? "3,3" : ""} markerEnd="url(#arr-blue)" />

                      {/* Battery drive switch (Double direction switching relay) */}
                      <rect x="115" y="102" width="50" height="36" rx="4" fill="#f8fafc" stroke="#f59e0b" strokeWidth="2" />
                      <text x="140" y="118" textAnchor="middle" fill="#78350f" fontSize="8" fontWeight="bold">Drive switch</text>
                      <text x="140" y="128" textAnchor="middle" fill="#d97706" fontSize="6">瞬間切替スイッチ</text>

                      {/* Connection Routes from batteries to switcher */}
                      <path d="M180,75 L165,115" stroke="#f59e0b" strokeWidth="1.5" fill="none" markerEnd="url(#arr-amber)" />
                      <path d="M180,165 L165,125" stroke="#f59e0b" strokeWidth="1.5" fill="none" markerEnd="url(#arr-amber)" />

                      {/* Battery (A) */}
                      <rect x="180" y="55" width="55" height="42" rx="4" fill={activeBattery === 'A' ? '#ecfdf5' : '#ffffff'} stroke={activeBattery === 'A' ? '#10b981' : '#cbd5e1'} strokeWidth={activeBattery === 'A' ? '2.5' : '1.5'} />
                      <text x="207" y="73" textAnchor="middle" fill={activeBattery === 'A' ? '#047857' : '#64748b'} fontSize="8" fontWeight="black">Battery (A)</text>
                      <text x="207" y="84" textAnchor="middle" fill="#94a3b8" fontSize="6">放電・駆動用電源</text>

                      {/* Battery (B) */}
                      <rect x="180" y="143" width="55" height="42" rx="4" fill={activeBattery === 'B' ? '#ecfdf5' : '#ffffff'} stroke={activeBattery === 'B' ? '#10b981' : '#cbd5e1'} strokeWidth={activeBattery === 'B' ? '2.5' : '1.5'} />
                      <text x="207" y="161" textAnchor="middle" fill={activeBattery === 'B' ? '#047857' : '#64748b'} fontSize="8" fontWeight="black">Battery (B)</text>
                      <text x="207" y="172" textAnchor="middle" fill="#94a3b8" fontSize="6">放電・駆動用電源</text>

                      {/* Controller */}
                      <rect x="250" y="100" width="45" height="40" rx="4" fill="#f8fafc" stroke="#6366f1" strokeWidth="1.5" />
                      <text x="272" y="120" textAnchor="middle" fill="#312e81" fontSize="8" fontWeight="bold">Controller</text>
                      <text x="272" y="130" textAnchor="middle" fill="#4f46e5" fontSize="6">制御分配盤</text>

                      {/* Routes to batteries from controller */}
                      <path d="M250,115 L235,75" stroke="#6366f1" strokeWidth="1.5" fill="none" markerEnd="url(#arr-indigo)" />
                      <path d="M250,125 L235,165" stroke="#6366f1" strokeWidth="1.5" fill="none" markerEnd="url(#arr-indigo)" />
                      <line x1="310" y1="120" x2="295" y2="120" stroke="#ec4899" strokeWidth="1.5" markerEnd="url(#arr-pink)" />

                      {/* Newly Invented Electric Generator */}
                      <rect x="310" y="85" width="55" height="70" rx="4" fill="#fdf2f8" stroke="#ec4899" strokeWidth="2.5" />
                      <text x="337" y="112" textAnchor="middle" fill="#9d174d" fontSize="8" fontWeight="black">Newly invented</text>
                      <text x="337" y="122" textAnchor="middle" fill="#9d174d" fontSize="8" fontWeight="black">Electric Generator</text>
                      <text x="337" y="134" textAnchor="middle" fill="#db2777" fontSize="6" fontWeight="bold">新開発発電機</text>
                      <text x="337" y="145" textAnchor="middle" fill="#047857" fontSize="6">特許 2025-160784</text>
                    </svg>

                  </div>

                  {/* Simulator Control Dash */}
                  <div className="w-full mt-5 space-y-4">
                    
                    <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 text-xs space-y-2.5">
                      <div className="flex justify-between items-center text-slate-700">
                        <span className="font-medium">現在駆動に使用中の一次系統:</span>
                        <span className="font-extrabold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                          {activeBattery === 'A' ? 'バッテリー (A)' : 'バッテリー (B)'}
                        </span>
                      </div>
                      <div className="flex justify-between items-center text-slate-700">
                        <span className="font-medium">バックグラウンド急速還元系統:</span>
                        <span className="font-extrabold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                          {activeBattery === 'A' ? 'バッテリー (B) [急速蓄電中]' : 'バッテリー (A) [急速蓄電中]'}
                        </span>
                      </div>
                      <div className="flex justify-between items-center text-slate-700 font-medium">
                        <span>森 博士式 発電・整流回路ステータス:</span>
                        <span className="font-bold text-pink-600 flex items-center gap-1 bg-pink-50/50 px-1.5 py-0.5 rounded">
                          <Zap className="w-3 h-3 text-pink-500 animate-bounce" />
                          車輪回転慣性から自律回充中
                        </span>
                      </div>
                    </div>

                    <div className="flex gap-2.5">
                      <button 
                        onClick={() => setIsRunning(!isRunning)}
                        className="flex-1 py-2.5 px-3 bg-slate-900 text-white rounded-lg font-bold text-xs hover:bg-slate-800 transition flex items-center justify-center gap-1.5 shadow-xs"
                      >
                        {isRunning ? <><Pause className="w-4 h-4 text-white" />シミュレータ停止</> : <><Play className="w-4 h-4 text-white" />擬似走行開始</>}
                      </button>
                      <button 
                        onClick={() => {
                          setActiveBattery(p => p === 'A' ? 'B' : 'A');
                          setSwitchCount(c => c + 1);
                        }}
                        className="flex-1 py-2.5 px-3 bg-white text-slate-700 border border-slate-200 rounded-lg font-bold text-xs hover:bg-slate-50 transition shadow-xs"
                      >
                        直列系統を手動切替 ⇄
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
                    YouTube完全密着公開プロジェクト
                  </span>
                </div>

                <div className="space-y-4">
                  <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 leading-tight">
                    世界に唯一無二である <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 via-yellow-650 to-amber-700 font-black">
                      「充電スタンド不要の電気自動車（No Charging Station Required EV）」
                    </span> <br />
                    初の試作実証・実用化開発プロジェクトに皆様を心より歓迎いたします！
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
                      総製作期間: <span className="text-amber-600">2ヶ月間</span>
                    </p>
                    <p className="text-xs text-slate-500 mt-1.5 leading-relaxed font-bold">
                      実用プロトタイプおよび実車での走行テスト検証まで、わずか2ヶ月での完遂を目指し、高速かつ集中的な製作ロードマップをスタートさせます。
                    </p>
                  </div>

                  <div className="p-5 bg-gradient-to-br from-red-50/20 to-red-50/50 rounded-2xl border border-red-200/50 shadow-xs">
                    <div className="flex items-center gap-2 mb-2 text-red-800">
                      <Video className="w-5 h-5 text-red-600" />
                      <span className="text-xs font-black uppercase tracking-wider">ENTIRE PROCESS BROADCAST</span>
                    </div>
                    <p className="text-xl font-black text-slate-900">
                      YouTubeで <span className="text-red-600">全工程を完全公開！</span>
                    </p>
                    <p className="text-xs text-slate-500 mt-1.5 leading-relaxed font-bold">
                      特許技術の透明性と動作実証を確かなものにするため、資材調達から切削・加工、実車への組み込み、公開テストデモまで、YouTubeでのノーカット動画公開を約束します。
                    </p>
                  </div>

                </div>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-semibold">
                  💡 <strong>充電インフラが未整備な過酷な環境や、世界中の孤立した地域・都市の死角</strong>でも一切制約のない自由な移動を実現するため、森 幸信 博士の生涯の技術理念、そしてオルタネーターを基礎とした独自の工学的アプローチが本プロジェクトに集約されています。この歴史的な試作・製作プロセスをともに見守り、応援・支援、あるいは事業として参画いただける自動車産業パートナー、機関投資家、そして技術革新に熱い情熱をお持ちの皆様の歓迎窓口を設けております。
                </p>

                {/* Subscribing placeholder button */}
                <div className="pt-2">
                  <a 
                    href="#contact"
                    className="inline-flex items-center gap-2 px-6 py-3.5 bg-slate-900 hover:bg-slate-850 text-white font-bold rounded-xl text-sm transition shadow-lg shadow-amber-600/5 active:scale-95"
                  >
                    <span>YouTube 視聴予約＆プロジェクト最新情報を入手</span>
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
                      実際の試作製作に向け設計を進めている車載用シャシープラットフォームの工学的CGレンダリング。前輪駆動モーターの配置を支え、走行の反作用から生じる発電（回生電力）を損失なく対のバッテリーパックへと帰還・分配させる構成です。
                    </p>
                  </div>

                </div>

                <div className="p-3 bg-amber-50/50 rounded-xl border border-amber-200/50 text-center text-[11px] text-amber-800 font-bold">
                  🌟 上記のレンダリング画像は、実際に森 幸信 博士の発電技術を実装するために設計中の、<strong>世界に唯一無二である「無充電型・自律回生式次世代EV」</strong>の最新コンセプトイメージです。
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
              特許設計図面と中核機能
            </h2>
            <p className="text-slate-500 text-sm font-medium">
              森 幸信 博士の特許出願要旨「特許出願 2025-160784」に基づき、
              システムの構造から最も重要な「Newly invented Electric Generator（新開発発電機）」をクローズアップして網羅しています。
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            
            {/* PATENT SPECIFICATION 1: CYCLING OVERVIEW */}
            <div className="lg:col-span-8 bg-slate-50 rounded-2xl border border-slate-200 p-6 sm:p-8 flex flex-col justify-between shadow-sm">
              
              <div className="flex justify-between items-center mb-6">
                <span className="text-[11px] font-black uppercase text-slate-600 tracking-wider">
                  ■ 特許基本結線シート (System Diagram Overview)
                </span>
                <span className="text-xs font-mono text-slate-400">
                  出願日: 近日特許公開予定
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
                  <text x="62" y="40" textAnchor="middle" fill="#2563eb" fontSize="7" fontWeight="black">◀ 前方 [FRONT] (駆動メイン)</text>
                  <text x="360" y="40" textAnchor="middle" fill="#db2777" fontSize="7" fontWeight="black">後方 [REAR] (回生発電メイン) ▶</text>
                  <text x="25" y="35" fill="#64748b" fontSize="7" fontWeight="bold" letterSpacing="1">E-LOOP 自律走行回路構成特許ドラフト</text>

                  {/* Interactively highlights chosen component */}
                  {/* Motor */}
                  <g className="cursor-pointer" onClick={() => setSelectedComponent('motor')}>
                    <rect x="25" y="120" width="75" height="50" rx="5" fill={selectedComponent === 'motor' ? '#eff6ff' : '#ffffff'} stroke="#3b82f6" strokeWidth={selectedComponent === 'motor' ? "2" : "1"} />
                    <text x="62" y="145" textAnchor="middle" fill="#1e3a8a" fontSize="9" fontWeight="bold">Drive motor</text>
                    <text x="62" y="157" textAnchor="middle" fill="#2563eb" fontSize="7">駆動モーター</text>
                  </g>

                  {/* Switch */}
                  <g className="cursor-pointer" onClick={() => setSelectedComponent('switch')}>
                    <rect x="125" y="120" width="80" height="50" rx="5" fill={selectedComponent === 'switch' ? '#fffbeb' : '#ffffff'} stroke="#f59e0b" strokeWidth={selectedComponent === 'switch' ? "2" : "1"} />
                    <text x="165" y="145" textAnchor="middle" fill="#78350f" fontSize="8" fontWeight="bold">Battery drive switch</text>
                    <text x="165" y="157" textAnchor="middle" fill="#d97706" fontSize="7">駆動切替機構</text>
                  </g>

                  {/* Battery A */}
                  <g className="cursor-pointer" onClick={() => setSelectedComponent('batteryA')}>
                    <rect x="235" y="60" width="80" height="50" rx="5" fill={selectedComponent === 'batteryA' ? '#ecfdf5' : '#ffffff'} stroke="#10b981" strokeWidth={selectedComponent === 'batteryA' ? "2" : "1"} />
                    <text x="275" y="85" textAnchor="middle" fill="#047857" fontSize="9" fontWeight="bold">Battery (A)</text>
                    <text x="275" y="97" textAnchor="middle" fill="#059669" fontSize="7">一次電槽</text>
                  </g>

                  {/* Battery B */}
                  <g className="cursor-pointer" onClick={() => setSelectedComponent('batteryB')}>
                    <rect x="235" y="180" width="80" height="50" rx="5" fill={selectedComponent === 'batteryB' ? '#ecfdf5' : '#ffffff'} stroke="#10b981" strokeWidth={selectedComponent === 'batteryB' ? "2" : "1"} />
                    <text x="275" y="205" textAnchor="middle" fill="#047857" fontSize="9" fontWeight="bold">Battery (B)</text>
                    <text x="275" y="217" textAnchor="middle" fill="#059669" fontSize="7">二次電槽</text>
                  </g>

                  {/* Controller */}
                  <g className="cursor-pointer" onClick={() => setSelectedComponent('controller')}>
                    <rect x="340" y="120" width="65" height="50" rx="5" fill={selectedComponent === 'controller' ? '#eef2ff' : '#ffffff'} stroke="#6366f1" strokeWidth={selectedComponent === 'controller' ? "2" : "1"} />
                    <text x="372" y="145" textAnchor="middle" fill="#312e81" fontSize="9" fontWeight="bold">Controller</text>
                    <text x="372" y="157" textAnchor="middle" fill="#4f46e5" fontSize="7">制御モジュール</text>
                  </g>

                  {/* Generator core (Core Electric Generator) */}
                  <g className="cursor-pointer" onClick={() => setSelectedComponent('generator')}>
                    <rect x="425" y="95" width="65" height="100" rx="5" fill={selectedComponent === 'generator' ? '#fdf2f8' : '#ffffff'} stroke="#ec4899" strokeWidth="2" />
                    <line x1="425" y1="125" x2="490" y2="125" stroke="#fbcfe8" strokeWidth="1" />
                    <line x1="425" y1="165" x2="490" y2="165" stroke="#fbcfe8" strokeWidth="1" />
                    <text x="457" y="112" textAnchor="middle" fill="#9d174d" fontSize="7" fontWeight="black">Newly</text>
                    <text x="457" y="122" textAnchor="middle" fill="#9d174d" fontSize="7" fontWeight="black">invented</text>
                    <text x="457" y="132" textAnchor="middle" fill="#9d174d" fontSize="7" fontWeight="black">Electric</text>
                    <text x="457" y="142" textAnchor="middle" fill="#9d174d" fontSize="7" fontWeight="black">Generator</text>
                    <text x="457" y="160" textAnchor="middle" fill="#db2777" fontSize="7" fontWeight="bold">核心特許</text>
                    <text x="457" y="172" textAnchor="middle" fill="#ec4899" fontSize="6" fontWeight="bold">森 幸信 博士</text>
                    <text x="457" y="182" textAnchor="middle" fill="#ec4899" fontSize="6" fontWeight="bold">発明</text>
                  </g>
                </svg>

              </div>

              {/* Information disclaimer explaining focus */}
              <div className="mt-4 p-4 bg-white rounded-lg text-xs leading-relaxed text-slate-700 border border-slate-200">
                <span className="text-slate-900 font-bold block mb-1">■ 基本動作フロー：</span>
                車体が走行を始めると、走行に伴う回転運動力が後部【Newly invented Electric Generator（新開発発電機：特許出願 2026-83613）】を回します。
                このとき発生する還元電力を【Controller】がバッテリーに返します。
                森 幸信 博士の発明の神髄は、【Battery drive switch（駆動切替機構：特許出願 2025-160784）】が、前輪駆動に使っている方の電槽と、発電電力を無瞬断で急速受電する反対側の電槽を交互に完璧に切り替える自律往還サイクルにあります。
              </div>

            </div>

            {/* PATENT SPECIFICATION 2: INDIVIDUAL DETAILED BLOCK (Col span 4) */}
            <div className="lg:col-span-4 flex flex-col justify-between">
              
              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 h-full flex flex-col justify-between space-y-6 shadow-sm">
                
                <div>
                  <div className="flex items-center gap-2 pb-4 border-b border-slate-200">
                    <div className="w-8 h-8 rounded bg-pink-100 text-pink-600 flex items-center justify-center font-bold">
                      精
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                        Selected Patent Component
                      </h4>
                      <h3 className="text-base font-black text-slate-800 mt-0.5">
                        主要コンポーネント詳細
                      </h3>
                    </div>
                  </div>

                  {/* Component description detail */}
                  <div className="space-y-4 pt-6">
                    <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs">
                      <span className="text-[10px] bg-blue-50 text-blue-600 font-extrabold px-1.5 py-0.5 rounded">
                        回路パーツ情報
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
                    <span className="font-medium text-slate-500">特許出願状況:</span>
                    <span className="font-bold text-emerald-600">現在出願完了・審査中</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium text-slate-500">実動プロトタイプ:</span>
                    <span className="font-bold text-blue-600">実証デモキット動作中</span>
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
                  充電スタンドが完全に不要な電気自動車の実現：<span className="text-amber-400 block sm:inline">「2大核心となる特許」</span>
                </h3>
                
                {/* Revolutionary Message Bullet */}
                <div className="bg-amber-400 text-slate-950 px-6 py-4 rounded-2xl max-w-3xl mx-auto shadow-xl font-extrabold text-sm sm:text-base leading-relaxed border border-amber-300 mt-6 animate-pulse">
                  「これまで世界中の誰も成し得ず、想像さえできなかったこれら強力な2つの技術力によって、外部の急速充電ステーションを一切必要としない『究極の自己給電EV』を創り出します。」
                </div>

                <p className="text-slate-400 text-xs sm:text-sm max-w-3.5xl mx-auto font-medium leading-relaxed pt-2">
                  森 幸信 博士の新発明した2つの相互補完特許は、一方が<strong>走行中に発電を自律回収する心臓部</strong>、他方が<strong>その電力を充放電干渉なく電池に蓄えるシステム</strong>となり、完璧なクローズドループ（自給自足のエネルギー循環）を実現します。
                </p>

                {/* Patent status indicator */}
                <div className="inline-flex flex-wrap items-center justify-center gap-2 px-4 py-2 bg-slate-950/60 rounded-xl border border-slate-800 text-[11px] sm:text-xs">
                  <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
                  <span className="text-slate-300 font-extrabold">【世界標準保証】</span>
                  <span className="text-white font-black">日本国内特許出願済 ＆ 同時に国際特許出願中（PCT）</span>
                  <span className="text-slate-400">で知的財産権を世界レベルで強固に保護。</span>
                </div>
              </div>

              {/* Three pillars grid */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
                
                {/* PATENT 1 CARD - Newly invented Electric Generator */}
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
                          新開発高効率自己発電機
                        </h4>
                        <p className="text-amber-400 font-mono text-[9px] font-extrabold">
                          Newly Invented Electric Generator
                        </p>
                      </div>
                    </div>

                    {/* Patent Reference */}
                    <div className="px-3 py-1.5 bg-amber-500/5 rounded border border-amber-500/20 text-[10px] text-amber-400 font-mono font-black flex justify-between items-center">
                      <span>【日本特許出願番号】</span>
                      <span>特願 2026-83613</span>
                    </div>

                    <p className="text-xs text-slate-300 leading-relaxed font-medium">
                      走行しながらEVのバッテリーを充電し続ける<strong>もっとも重要な「心臓部」に該当する新開発発電機特許</strong>です。通常のオルタネーターが持つ致命的な弱点（電力を生み出す際の逆起電力による重いブレーキ抵抗）を独自の3相交流極設計とエアギャップ最適化により打ち消しました。
                    </p>

                    <div className="p-4 bg-slate-900 rounded-xl border border-slate-800/80 space-y-2.5">
                      <div className="flex items-start gap-2">
                        <span className="text-amber-400 font-bold text-xs mt-0.5">✔</span>
                        <p className="text-[11px] text-slate-300 leading-relaxed font-semibold">
                          <strong className="text-white block mb-0.5">極低負荷 ＆ 100% 閉ループ：</strong> 
                          車輪が回転するごく微細な推進力から、走行を一切邪魔することなく高出力な電気エネルギーに回生し、常時バッテリーへと送り込むことができる唯一無二の回路・磁気設計です。
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-800/60 flex flex-col gap-1 text-[10px] font-bold text-amber-400 font-mono">
                    <div className="flex justify-between">
                      <span>・日本国内</span>
                      <span>特願 2026-83613 出願済</span>
                    </div>
                    <div className="flex justify-between text-slate-400">
                      <span>・グローバル</span>
                      <span>PCT国際出願手続き 同時進行中</span>
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
                      無充電型・自律移動EV コンセプトカー
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
                      森 幸信 博士の2大特許「特願 2026-83613（高効率発電機）」と「特願 2025-160784（A/B切替システム）」のコンビネーションが実証された、未来の完全自律循環EVプラットフォーム。
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-800/60 flex justify-center items-center text-[10px] text-amber-400 font-black z-10 bg-slate-950/50 -mx-6 -mb-6 p-4 rounded-b-2xl">
                    <span className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                      自律移動型電動エネルギー循環プラットフォーム
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
                          A/B独立 相互スワッピング充電システム
                        </h4>
                        <p className="text-emerald-400 font-mono text-[9px] font-extrabold">
                          Dual Swapping Battery Structure for EV
                        </p>
                      </div>
                    </div>

                    {/* Patent Reference */}
                    <div className="px-3 py-1.5 bg-emerald-500/5 rounded border border-emerald-500/20 text-[10px] text-emerald-400 font-mono font-black flex justify-between items-center">
                      <span>【日本特許出願番号】</span>
                      <span>特願 2025-160784</span>
                    </div>

                    <p className="text-xs text-slate-300 leading-relaxed font-medium">
                      走行のために放電している同一バッテリーに、同時に充電を流気させようとすると電気的衝突（逆サージや発熱抵抗）が起き能率がゼロに落ち込みます。本特許は、バッテリー構成を<strong>【一次電槽A】と【二次電槽B】という独立した2つのグループに完全二重分離</strong>します。
                    </p>

                    <div className="p-4 bg-slate-900 rounded-xl border border-slate-800/80 space-y-2.5">
                      <div className="flex items-start gap-2">
                        <span className="text-emerald-400 font-bold text-xs mt-0.5">✔</span>
                        <p className="text-[11px] text-slate-300 leading-relaxed font-semibold">
                          <strong className="text-white block mb-0.5">走行中のリアルタイム自動充電スワップ：</strong> 
                          【電槽A】がモーターを動かして車輪を走らせている背後で、発電機特許（2026-83613）が作り出した回生電流が、電気的に完全遮断されたもう一方の【電槽B】へ急速受電されます。一定の間隔（マイクロ秒〜分単位）で役割を非力化ロスなく相互交互に自動スワップを繰り返します。
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-800/60 flex flex-col gap-1 text-[10px] font-bold text-emerald-400 font-mono">
                    <div className="flex justify-between">
                      <span>・日本国内</span>
                      <span>特願 2025-160784 出願済</span>
                    </div>
                    <div className="flex justify-between text-slate-400">
                      <span>・グローバル</span>
                      <span>PCT国際出願手続き 同時進行中</span>
                    </div>
                  </div>
                </div>

              </div>

              {/* Intuitive visual loop banner */}
              <div className="mt-8 p-6 rounded-2xl bg-gradient-to-r from-amber-500/10 to-emerald-500/10 border border-slate-700/60 flex flex-col md:flex-row gap-5 items-center justify-between">
                <div className="space-y-1 text-center md:text-left">
                  <h5 className="text-sm font-black text-white flex items-center justify-center md:justify-start gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
                    💡 最も重要な核心コンセプト：プラグイン不要・究極の自律走行システム
                  </h5>
                  <p className="text-slate-300 text-[11px] sm:text-xs leading-relaxed max-w-3xl font-medium">
                    「走行中に失われる機械エネルギーが <b>① 特別設計された3相交流フィードバック発電機</b> によって摩擦ロス・負荷抵抗を極限まで抑えて高能率な電気へ回生され、これを相互に干渉しない <b>② A/Bに二重分割された独立バッテリー構造が完全自律スワッピング制御</b> で交互に充電し合います。常に『一方が走行、同時にもう一方が充電』の完全な閉ループが完成するため、本来自動車を走らせるために必要であった外部の専用急速充電スタンドが不要になり、究極の電力自給自給EVが誕生します。」
                  </p>
                </div>
                <div className="text-sm font-black text-slate-950 bg-amber-400 border border-amber-300 px-5 py-3 rounded-2xl shadow-lg tracking-tight whitespace-nowrap">
                  🔌 外部充電用インフラへの依存度0
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
              物理デモ機が証明する「数値的インパクト」と作動検証
            </h2>
            <p className="text-slate-600 text-sm font-semibold max-w-2xl mx-auto mt-2 leading-relaxed">
              E-LOOP開発チームは、単なる概念にとどまらず、実際に車輪の駆動慣性を模して自己発電・両面バッテリー交互切替を再現できる「1kWクラス物理デモキット」を構築・保有し、動作実証を完了しています。
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
                    数値インパクト：約192倍
                  </span>
                </div>
                <div>
                  <h3 className="text-lg font-black text-slate-900">5.2Wで起動 ➔ 1,000W級の発電を可能に</h3>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed font-bold">
                    一般的な家庭用冷蔵庫1台のエネルギー消費量が【約150W】であるのに対し、本発電システムはわずか【5.2W】の微細電力で起動し、約1,000W級の出力を取り戻す高能率設計（物理デモキット実証値）を誇ります。
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
                    特許製法コア
                  </span>
                </div>
                <div>
                  <h3 className="text-lg font-black text-slate-900">低速風力3相交流発電機の「電線分離」と還流</h3>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed font-bold">
                    車のオルタネーター（約100年の実績）から着想を得て、低速風力3相交流発電機が備える【3本の電源コード】に着目。従来はすべて「出力」として固定されていた構造の一部を「回路的に分離」し、発電機自身の再励磁へと戻す循環設計に転換しました。これによりロスとなる極損失を排除します。
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
                    デュアルバッテリー（特許出願中）
                  </span>
                </div>
                <div>
                  <h3 className="text-lg font-black text-slate-900">車内の「ミニ発電・充電所」構成の自律連動</h3>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed font-bold">
                    この発電機を電気自動車（EV）に実装することで、車内に「ミニ発電所」を搭載するのと同等の自立運行が可能になります。Aパックバッテリーで走行駆動を維持している間、絶縁・遮断された他方のBパックバッテリーへ発電電力を帰還。適切なタイミングでA・Bの充電・駆動役割を完全にスイッチング。これにより外部インフラへの依存を根底から脱却します。
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
                      【コア特許構造】 Newly invented Electric Generator
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
                          <span className="text-[7px] text-slate-500 font-bold block">極薄巻き線</span>
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
                          <span className="font-mono">＋系統 逆起抑制回路</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-[9px] font-bold text-slate-700">
                          <span className="w-2 h-1 bg-slate-400 rounded-xs" />
                          <span className="font-mono">－系統 自律還元アース</span>
                        </div>
                        <div className="text-[8px] bg-slate-50 text-slate-500 p-1.5 rounded font-mono border border-slate-200 font-bold mt-0.5">
                          森 博士式発電機 : 軸受けロス極小設計
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
                      <span className="text-[9px] text-slate-400 font-bold block">新開発多極オルタネーター</span>
                      <p className="text-xs text-slate-800 mt-1 font-extrabold pb-0.5">逆起抵抗を極限レベルまでキャンセル</p>
                    </div>
                    <div className="p-3 bg-white rounded border border-slate-200 shadow-xs">
                      <span className="text-[9px] text-slate-400 font-bold block">安定化分配スイッチ基板</span>
                      <p className="text-xs text-slate-800 mt-1 font-extrabold pb-0.5">高精度双放電切替による無損失化</p>
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
              実証デモ映像 ＆ 測定シミュレーター
            </h2>
            <p className="text-slate-500 text-sm max-w-2xl mx-auto font-medium">
              実際にデモカーを架台の上で回転・走行させ、
              連動発電から両翼への蓄電バランスが、どのように作動するか測定している様子をビジュアルで表現した実証インターフェースです。
            </p>
          </div>

          {/* Interactive Interactive Video/Oscilloscope Board */}
          <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200 shadow-lg grid grid-cols-1 lg:grid-cols-12 gap-6 text-left items-stretch">
            
            {/* Monitor Column (We retain the aesthetic dark oscilloscope frame here as requested for scientific looking contrast) */}
            <div className="lg:col-span-7 bg-slate-950 rounded-xl p-4 border border-slate-800 relative flex flex-col justify-between shadow-inner">
              
              <div className="flex justify-between items-center border-b border-slate-800 pb-2 mb-4">
                <div className="flex items-center gap-2">
                  <Video className="w-4 h-4 text-pink-500" />
                  <span className="text-[11px] font-black uppercase text-slate-200">実地走行発電データ・ビデオプレイヤー</span>
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
                    <span className="text-xs font-bold text-slate-400">実地ビデオシミュレーター停止中</span>
                  </div>
                )}

              </div>

              {/* Controller buttons below */}
              <div className="flex justify-between items-center mt-4 pt-2 border-t border-slate-850">
                <button 
                  onClick={() => setVideoPlaying(!videoPlaying)}
                  className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold rounded flex items-center gap-1.5 transition border border-slate-700"
                >
                  {videoPlaying ? <><Pause className="w-3.5 h-3.5" />モニター停止</> : <><Play className="w-3.5 h-3.5 text-emerald-450" />検証の再生</>}
                </button>
                <div className="flex items-center gap-1.5 text-xs text-slate-400">
                  <span className="text-[10px] text-slate-500 font-bold">試験状態分類:</span>
                  <div className="flex gap-1">
                    <button 
                      onClick={() => setCurrentVideoPhase('start')}
                      className={`px-2 py-0.5 rounded text-[9px] transition-colors ${currentVideoPhase === 'start' ? 'bg-blue-600 font-extrabold text-white' : 'bg-slate-800 hover:bg-slate-755 text-slate-350'}`}
                    >
                      起動慣性
                    </button>
                    <button 
                      onClick={() => setCurrentVideoPhase('generation')}
                      className={`px-2 py-0.5 rounded text-[9px] transition-colors ${currentVideoPhase === 'generation' ? 'bg-blue-600 font-extrabold text-white' : 'bg-slate-800 hover:bg-slate-755 text-slate-350'}`}
                    >
                      回生試験
                    </button>
                    <button 
                      onClick={() => setCurrentVideoPhase('switching')}
                      className={`px-2 py-0.5 rounded text-[9px] transition-colors ${currentVideoPhase === 'switching' ? 'bg-blue-600 font-extrabold text-white' : 'bg-slate-800 hover:bg-slate-755 text-slate-350'}`}
                    >
                      切替試験
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
                    <h4 className="text-sm font-black text-slate-850">走行開始・初動負荷サイクル</h4>
                    <p className="text-xs text-slate-600 leading-relaxed font-semibold">
                      初動時において、新開発の発電機はモーターに余分な逆トルクをかけません。独自のエアギャップ極性設計により、車体が十分にスピードに乗り慣性が働くまでの間、機械的コンダクタンスを切り離しスムースな加速を実現します。
                    </p>
                  </div>
                )}

                {currentVideoPhase === 'generation' && (
                  <div className="space-y-2">
                    <h4 className="text-sm font-black text-slate-850">走行慣性連動・高能率自律発電</h4>
                    <p className="text-xs text-slate-600 leading-relaxed font-semibold">
                      車が一定速度に達するか、下り坂などで生じる慣性運動力と強力なオルタネータ極線を完璧にチューニング。
                      オシロスコープに表示された電圧ピークは、そのまま一切の外部充電ポイントを経由せずにバッテリーに蓄電されています。
                    </p>
                  </div>
                )}

                {currentVideoPhase === 'switching' && (
                  <div className="space-y-2">
                    <h4 className="text-sm font-black text-slate-850">往往充放電切替 (無瞬断スイッチング)</h4>
                    <p className="text-xs text-slate-600 leading-relaxed font-semibold">
                      バッテリー(A)が完全空近くに近づく、あるいは一定のタイムフローを設定することで、バックグラウンドでの充電回路は自動的に(B)から(A)へと高速に入れ替わります。
                      デモモニターでもスパイク損失なく移行している検証挙動が確認されています。
                    </p>
                  </div>
                )}

                <div className="p-3 bg-slate-50 rounded-lg text-xs border border-slate-200 text-slate-600">
                  <span className="text-slate-800 block font-bold mb-1">■ 共同検証データの開示について</span>
                  お問い合せ頂ければ、森 幸信 博士本人の解説を含めた実地見学会、および実測データを直接ご提供致します。
                </div>
              </div>

              <a 
                href="#contact"
                className="mt-4 px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 text-center rounded text-xs font-bold transition block shadow-xs"
              >
                デモ動画・挙動報告書の請求 ✉
              </a>

            </div>

          </div>

        </div>
      </section>

      {/* 👤 DEVELOPER PROFILE PANEL */}
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
                  開発者・特許出願人：森 幸信 博士
                </h2>
              </div>
              <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 px-4 py-2 rounded-lg shadow-xs">
                <User className="w-5 h-5 text-blue-600" />
                <span className="text-sm font-bold text-slate-800">森 幸信 博士 (Dr. Yukinobu Mori)</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm">
              
              {/* Profile Card left */}
              <div className="space-y-4">
                <h3 className="text-base font-black text-slate-900 flex items-center gap-1.5 border-b border-slate-100 pb-2">
                  <FileText className="w-4 h-4 text-blue-500" />
                  特許権利の出願根拠
                </h3>
                
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-4 font-mono text-xs text-slate-700 shadow-inner">
                  <div className="flex justify-between border-b border-slate-200 pb-2">
                    <span className="text-slate-505 font-bold">権利ステータス:</span>
                    <span className="font-extrabold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-150">特許出願中 (Pending)</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-200 pb-2">
                    <span className="text-slate-505 font-bold">国内特許出願番号:</span>
                    <span className="font-extrabold text-slate-900">2025-160784</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-200 pb-2">
                    <span className="text-slate-505 font-bold">主要発明タイトル:</span>
                    <span className="font-extrabold text-slate-900 text-right">EV搭載型 新発明発電システム</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-505 font-bold">権利取得可能範囲:</span>
                    <span className="font-extrabold text-blue-600">自己循環およびバッテリースイッチング全般</span>
                  </div>
                </div>

                <div className="p-4 bg-blue-50/70 text-blue-900 rounded-xl border border-blue-200 text-xs leading-relaxed font-semibold">
                  <strong>■ 特許技術の主な特徴：</strong>
                  <ul className="list-disc list-inside space-y-1 mt-1 font-medium text-blue-950">
                    <li>多極巻き線と独自ステーター極設計による極小回転抵抗</li>
                    <li>双方向での無損失な自律バッテリースイッチング（往還式）</li>
                    <li>実際に連動・発電試験を執り行える実動デモ装置の完備</li>
                  </ul>
                </div>
              </div>

              {/* Founder Statement right */}
              <div className="flex flex-col justify-between">
                <div className="space-y-4">
                  <h3 className="text-base font-black text-slate-900 flex items-center gap-1.5 border-b border-slate-100 pb-2">
                    <Globe className="w-4 h-4 text-blue-500" />
                    開発者メッセージ
                  </h3>
                  <p className="text-slate-600 leading-relaxed italic text-xs font-semibold">
                    「昨今の電気自動車は航続距離を確保するために巨大なバッテリーを搭載し、その重量増によりエネルギーロスを招くという課題を抱えています。
                    車載発電による自律走行モデルを確立することで、外部インフラに過度に依存せず、クリーンに稼働する移動体が可能になります。
                    過疎地や電気の供給が困難な地域など、誰でも自由に移動できる未来の実現を目指して本技術を考案しました。開発者の皆様との協力を心よりお待ちしております。」
                  </p>
                </div>

                <p className="text-xs text-blue-600 pt-4 border-t border-slate-150 mt-4 font-bold">
                  現在、E-LOOPプロジェクトを自動車業界へ普及、量産化への検証へと共同で進めていただける自動車メーカー、部品各社、共同出資企業様を募集しております。
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
                OFFICIAL COOPERATION WINDOW
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                E-LOOPプロジェクト 共同開発・参画窓口
              </h3>
              <p className="text-slate-500 text-sm max-w-xl mx-auto font-medium">
                特許公開概要書・動作実証データの開示請求、実稼働デモキット等の見学会のご希望、その他各お問い合わせをこちらのコンタクトフォームからお寄せください。
              </p>
            </div>

            {/* Response notifications */}
            {submissionSuccess ? (
              <div className="p-8 rounded-xl bg-emerald-55 bg-emerald-50 border border-emerald-205 text-center space-y-4">
                <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto border border-emerald-200">
                  <Check className="w-6 h-6" />
                </div>
                <div className="space-y-2">
                  <h4 className="text-lg font-black text-emerald-700">お問い合わせが正常に同期・送信されました</h4>
                  <p className="text-sm text-slate-600 leading-relaxed font-semibold">
                    ご連絡ありがとうございます。Formspreeを通じて特許開発者の 森 幸信 博士（Dr. Yukinobu Mori）へ安全に情報が伝達されました。ご用意頂いたご連絡先、またはメールアドレス宛てに追って順番にご連絡いたします。
                  </p>
                  <div className="p-2 bg-slate-100 rounded border border-slate-200 inline-block font-mono text-xs text-blue-600 mt-2 font-bold shadow-xs">
                    お問い合せ追跡トークン: {submissionToken}
                  </div>
                </div>
                <button 
                  onClick={handleResetForm}
                  className="mt-4 px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-bold transition shadow-xs"
                >
                  新しいフォームを作成
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                
                {/* Field A: Name */}
                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-slate-400" />
                    お名前 / ご担当者名 <span className="text-red-500 font-extrabold">*</span>
                  </label>
                  <input 
                    type="text" 
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    placeholder="例：森 太郎"
                    className="w-full px-4 py-3 bg-white border border-slate-250 rounded-lg text-sm text-slate-950 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/30 shadow-xs font-medium"
                  />
                </div>

                {/* Field B: Company Information / Name of Firm */}
                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <Building className="w-3.5 h-3.5 text-slate-400" />
                    貴社名・ご所属団体名 <span className="text-red-500 font-extrabold">*</span>
                  </label>
                  <input 
                    type="text" 
                    required
                    value={formData.company}
                    onChange={(e) => setFormData({...formData, company: e.target.value})}
                    placeholder="例：次世代モビリティ株式会社 企画開発部"
                    className="w-full px-4 py-3 bg-white border border-slate-250 rounded-lg text-sm text-slate-950 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/30 shadow-xs font-medium"
                  />
                </div>

                {/* Field C: Email Address */}
                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-slate-400" />
                    ご連絡先メールアドレス <span className="text-red-500 font-extrabold">*</span>
                  </label>
                  <input 
                    type="email" 
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    placeholder="例：yamada@example.co.jp"
                    className="w-full px-4 py-3 bg-white border border-slate-250 rounded-lg text-sm text-slate-950 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/30 shadow-xs font-medium"
                  />
                </div>

                {/* Field D: Inquiry type */}
                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">
                    お問い合わせ種別 <span className="text-red-500 font-extrabold">*</span>
                  </label>
                  <select 
                    value={formData.inquiryType}
                    onChange={(e) => setFormData({...formData, inquiryType: e.target.value})}
                    className="w-full px-4 py-3 bg-white border border-slate-250 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/30 shadow-xs font-bold"
                  >
                    <option>共同開発・協業について</option>
                    <option>ライセンス契約・特許詳細の照会</option>
                    <option>投資・資本参画のご相談 (IR)</option>
                    <option>実験状況デモの見学希望</option>
                    <option>その他お問い合せ</option>
                  </select>
                </div>

                {/* Field E: Message content */}
                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <FileCode className="w-3.5 h-3.5 text-slate-400" />
                    お問い合わせ内容 <span className="text-red-500 font-extrabold">*</span>
                  </label>
                  <textarea 
                    required
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    placeholder="共同開発の方向性や、確認されたい事項などをご自由にご記入ください。"
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
                    入力された個人情報およびプロジェクトお問い合わせ内容は、森 幸信 博士および開発チームにおいて保護され、本共同開発案件の検討連絡のみに使用されることに同意します。 <span className="text-red-500 font-extrabold">*</span>
                  </label>
                </div>

                {/* Submit Feedback Error */}
                {submitError && (
                  <div className="p-4 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-lg flex items-center gap-2 font-bold">
                    <span className="font-extrabold">🚨 エラー:</span> {submitError}
                  </div>
                )}

                {/* Dispatch Button */}
                <div className="flex justify-end pt-2">
                  <button 
                    type="submit"
                    disabled={isSubmitting || !formData.privacyAccepted}
                    className="w-full sm:w-auto px-8 py-4 bg-blue-600 text-white rounded-lg font-bold text-sm hover:bg-blue-700 transition active:scale-[0.98] disabled:opacity-55 disabled:cursor-not-allowed shadow-lg shadow-blue-500/20"
                  >
                    {isSubmitting ? "送信処理中..." : "共同開発のお問い合わせを送信する 🚀"}
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
            世界初・EV搭載型 新発明発電機 特許出願ポートフォリオ / 出願人: 森 幸信 博士 (Dr. Yukinobu Mori)
          </p>
          <div className="text-[10px] text-slate-500 space-y-1 font-medium">
            <p>© 2026 E-LOOP Self-Regenerative Auto EV System. All Rights Reserved.</p>
            <p>※ 実働デモキット、オシロスコープ検証記録、特許図面の無断複製・無断公開を禁じます。</p>
          </div>
        </div>
      </footer>

    </div>
  );
}
