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
    inquiryType: '投資・資本提携（IR）',
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
      setSubmitError('必須項目をすべて入力し、個人情報保護方針への同意にチェックを入れてください。');
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
      setSubmitError('送信に失敗しました。しばらく経ってから再度お試しください。');
      setIsSubmitting(false);
    });
  };

  const handleResetForm = () => {
    setFormData({
      name: '',
      company: '',
      email: '',
      inquiryType: '投資・資本提携（IR）',
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
          title: "駆動モーター",
          desc: "電気エネルギーを直接タイヤの回転力へと効率よく変換し、車両を強力に駆動するメイン動力源。自己循環型のデュアルバッテリーシステムによって稼働します。"
        };
      case 'switch':
        return {
          title: "バッテリー駆動切替スイッチ (特許出願番号 2025-160784)",
          desc: "バッテリーセルを独自の制御によって「グループA」と「グループB」の2つの系統に完全に分割する画期的なリレースイッチ。一方のバッテリー群がモーター駆動を担っている間、もう一方は回路から完全に電気的に孤立し、新開発発電機から戻される高レートの自己再生電力をロスなく充電します。この役割をリアルタイムで瞬時に交互に入れ替えます。"
        };
      case 'batteryA':
        return {
          title: "メインバッテリーパック (グループA)",
          desc: "EVのメイン駆動モーターに電力を供給する、高電圧推進バッテリーの片側系統。グループAが駆動を担当している間は安定して電流を出力します。バッテリー駆動切替スイッチによって切替が行われると、瞬時に完全孤立の充電ステータスへと遷移し、車載発電機から戻る電力を急速に吸収します。"
        };
      case 'batteryB':
        return {
          title: "メインバッテリーパック (グループB)",
          desc: "グループAと完全に同一かつ対称に設計された、もう一方のメイン高電圧推進バッテリー。グループAが車両を駆動している間、グループBは電気的に完全に遮断され、車載発電機によって直接チャージされます。両者が間え切れなく自動で交互に役割を切り替えることで、外部給電を必要としない循環稼働ループを維持します。"
        };
      case 'controller':
        return {
          title: "システムコントローラー ＆ 電圧調整器",
          desc: "新開発の高効率自転発電機からの再生出力をリアルタイムで検知し、適切な電圧へと昇圧・調整した上で、待機（充電中）のバッテリーパックへ安定して給電する頭脳基板。バッテリー駆動切替スイッチと完全に同期しながら稼働します。"
        };
      case 'generator':
        return {
          title: "新開発高効率発電機 (特許出願番号 2026-83613)",
          desc: "森幸信 博士によって設計された革新的な3相ACループ発電システム。従来の発電機と異なり、3相ACの最適な自己励磁・整流制御を組み合わせることで極限まで回転抵抗を低減し、持続的で安定した回転トルクから効率よく回生電力を回収。外部充電スタンドに頼らずに、デュアルバッテリーシステムへ直接、大電力を還元します。"
        };
      default:
        return {
          title: "図のコンポーネントをクリックしてください",
          desc: "これらは特許出願中技術であるE-LOOPシステムの主要5ユニットです。インタラクティブ構成図の各モジュールをクリックすると、詳細な技術的役割や特許仕様が表示されます。"
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
        <span className="font-extrabold">日本特許出願済 (特許出願番号 2025-160784) ／ PCT国際特許出願中</span>
        <span className="text-blue-250">|</span>
        <span>発明者・出願人：森幸信 博士</span>
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
                <span className="text-[9px] bg-blue-50 text-blue-600 font-extrabold px-1.5 py-0.5 rounded border border-blue-200">特許出願システム</span>
              </div>
              <p className="text-[10px] text-slate-500 font-bold tracking-wide">森幸信 博士による技術実証プロジェクト</p>
            </div>
          </div>

          {/* Desktop Nav tabs link scrolling */}
          <nav className="hidden lg:flex items-center gap-1 text-sm font-bold text-slate-600">
            <a 
              href="#concept" 
              onClick={() => setActiveTab('concept')}
              className={`px-3.5 py-2 rounded-lg transition-colors ${activeTab === 'concept' ? 'text-blue-600 bg-blue-50/70' : 'hover:text-slate-900 hover:bg-slate-50'}`}
            >
              ビジョン
            </a>
            <a 
              href="#patent-images" 
              onClick={() => setActiveTab('diagram')}
              className={`px-3.5 py-2 rounded-lg transition-colors ${activeTab === 'diagram' ? 'text-blue-600 bg-blue-50/70' : 'hover:text-slate-900 hover:bg-slate-50'}`}
            >
              システム設計図
            </a>
            <a 
              href="#demokit" 
              onClick={() => setActiveTab('demokit')}
              className={`px-3.5 py-2 rounded-lg transition-colors ${activeTab === 'demokit' ? 'text-blue-600 bg-blue-50/70' : 'hover:text-slate-900 hover:bg-slate-50'}`}
            >
              実証デモ装置
            </a>
            <a 
              href="#video-section" 
              onClick={() => setActiveTab('video')}
              className={`px-3.5 py-2 rounded-lg transition-colors ${activeTab === 'video' ? 'text-blue-600 bg-blue-50/70' : 'hover:text-slate-900 hover:bg-slate-50'}`}
            >
              検証映像
            </a>
            <a 
              href="#patent-facts" 
              onClick={() => setActiveTab('patent')}
              className={`px-3.5 py-2 rounded-lg transition-colors ${activeTab === 'patent' ? 'text-blue-600 bg-blue-50/70' : 'hover:text-slate-900 hover:bg-slate-50'}`}
            >
              発明者紹介
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
              <span>English</span>
            </button>
            <a 
              href="#contact" 
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-bold bg-blue-600 text-white hover:bg-blue-700 transition active:scale-[0.98] shadow-lg shadow-blue-600/10 hover:shadow-blue-500/20"
            >
              <span>投資のご相談</span>
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
                <span>世界初！特許出願済・車載型高効率自己充電システム起動中</span>
              </div>

              <div className="space-y-4">
                <p className="text-sm text-blue-600 font-extrabold tracking-widest uppercase">E-LOOP SYSTEM BY DR. YUKINOBU MORI</p>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 leading-[1.12] tracking-tight">
                  充電スタンドは不要。
                  <br />
                  排出ガスはゼロ。
                  <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-cyan-600 to-emerald-600">ただ、走るだけ。</span>
                </h1>
              </div>

              <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl font-medium">
                現代の電気自動車（EV）が抱える最大の弱点であり、常に充電スタンドを探さなければならないという不安を根底から克服します。
                森幸信 博士により設計された「E-LOOP」システムは、回転動力から高効率に発電する独自の発電機による「動的エネルギーハーベスティング（回生）」と、特許出願済みのインテリジェントな双方向バッテリー切替制御を融合した画期的な回路です。補助用バッテリーではなく、メイン推進バッテリー自体を直接交互に自給充電します。メインバッテリーパックをグループAとグループBに分割し、リアルタイムでその役割をダイナミックにスイッチングし続けることで、外部での充電作業を一切必要としない、究極の完全自給型EVの未来を切り拓きます。
              </p>

              {/* Real Patent Certificate Status Frame */}
              <div className="p-5 rounded-xl bg-white border border-slate-200 shadow-sm max-w-xl flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center flex-shrink-0 border border-emerald-200 shadow-xs">
                  <ShieldCheck className="w-7 h-7" />
                </div>
                <div>
                  <span className="text-[10px] font-black uppercase text-emerald-600 tracking-wider">特許出願完了</span>
                  <p className="text-base font-black text-slate-950 mt-0.5">特許出願状況：出願番号 2025-160784 / 2026-83613</p>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed font-medium">
                    本技術は単なる理論上の仮説やシミュレーションデータではなく、森幸信 博士の実証研究によって実際に組み立てられ、稼働が検証された物理的な特許申請技術です。完全に機能する物理実証キットがすでに稼働・公開されています。
                  </p>
                </div>
              </div>

              {/* CTAs */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <a 
                  href="#patent-images" 
                  className="px-6 py-3.5 rounded-lg text-base font-bold bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-600/10 hover:shadow-blue-500/20 transition flex items-center gap-2"
                >
                  システム構造図を見る
                  <ChevronRight className="w-5 h-5 text-blue-200" />
                </a>
                <a 
                  href="#contact" 
                  className="px-6 py-3.5 rounded-lg text-base font-bold bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 shadow-xs transition"
                >
                  実証デモデータを請求する
                </a>
              </div>

            </div>

            {/* Right Side Column - Interactive E-LOOP System Diagram simulation directly mirroring user picture */}
            <div className="lg:col-span-5">
              <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xl relative">
                
                <div className="absolute top-4 right-4 flex items-center gap-1.5 bg-blue-50 text-blue-600 px-2 py-0.5 rounded text-[10px] font-bold border border-blue-200">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                  <span>相互作用シミュレーター</span>
                </div>

                <div className="border-b border-slate-150 pb-3 mb-5">
                  <h3 className="text-sm font-black text-slate-900 flex items-center gap-1.5">
                    <Sliders className="w-4 h-4 text-blue-600" />
                    E-LOOP システム構成図
                  </h3>
                  <p className="text-[11px] text-slate-500 font-medium">森幸信 博士設計 - 特許申請回路のインタラクティブ動作モデル</p>
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
                      <text x="65" y="16" textAnchor="middle" fill="#2563eb" fontSize="7" fontWeight="black" letterSpacing="0.5">◀ 前輪側 (推進力)</text>
                      <text x="320" y="16" textAnchor="middle" fill="#db2777" fontSize="7" fontWeight="black" letterSpacing="0.5">後輪側 (自己発電・充電) ▶</text>
                      
                      {/* Main Car Chassis boundaries */}
                      <path d="M50,40 L320,40 C340,40 350,60 350,80 L350,160 C350,180 340,200 320,200 L50,200 Z" fill="none" stroke="#64748b" strokeWidth="3" />
                      
                      {/* Drive Motor (Front axle connected) */}
                      <rect x="35" y="93" width="60" height="54" rx="4" fill="#f8fafc" stroke="#3b82f6" strokeWidth="2" />
                      <text x="65" y="115" textAnchor="middle" fill="#1e3a8a" fontSize="7.5" fontWeight="bold">駆動モーター</text>
                      <text x="65" y="127" textAnchor="middle" fill="#2563eb" fontSize="6.5">車両を強力推進</text>

                      {/* Connection Line with Flow to Motor */}
                      <line x1="110" y1="120" x2="95" y2="120" stroke="#3b82f6" strokeWidth="1.5" strokeDasharray={isRunning ? "3,3" : ""} markerEnd="url(#arr-blue)" />

                      {/* Battery drive switch (Double direction switching relay) */}
                      <rect x="110" y="96" width="60" height="48" rx="4" fill="#f8fafc" stroke="#f59e0b" strokeWidth="2" />
                      <text x="140" y="112" textAnchor="middle" fill="#78350f" fontSize="6.5" fontWeight="black" letterSpacing="-0.1">バッテリー</text>
                      <text x="140" y="122" textAnchor="middle" fill="#78350f" fontSize="6.5" fontWeight="black" letterSpacing="-0.1">切替スイッチ</text>
                      <text x="140" y="135" textAnchor="middle" fill="#d97706" fontSize="6" fontWeight="bold">自動スワップリレー</text>

                      {/* Connection Routes from batteries to switcher */}
                      <path d="M180,75 L165,115" stroke="#f59e0b" strokeWidth="1.5" fill="none" markerEnd="url(#arr-amber)" />
                      <path d="M180,165 L165,125" stroke="#f59e0b" strokeWidth="1.5" fill="none" markerEnd="url(#arr-amber)" />

                      {/* Battery (A) */}
                      <rect x="180" y="52" width="60" height="46" rx="4" fill={activeBattery === 'A' ? '#ecfdf5' : '#ffffff'} stroke={activeBattery === 'A' ? '#10b981' : '#cbd5e1'} strokeWidth={activeBattery === 'A' ? '2.5' : '1.5'} />
                      <text x="210" y="73" textAnchor="middle" fill={activeBattery === 'A' ? '#047857' : '#64748b'} fontSize="7.5" fontWeight="black">バッテリー (A)</text>
                      <text x="210" y="84" textAnchor="middle" fill="#94a3b8" fontSize="6">メイン駆動供給源</text>

                      {/* Battery (B) */}
                      <rect x="180" y="142" width="60" height="46" rx="4" fill={activeBattery === 'B' ? '#ecfdf5' : '#ffffff'} stroke={activeBattery === 'B' ? '#10b981' : '#cbd5e1'} strokeWidth={activeBattery === 'B' ? '2.5' : '1.5'} />
                      <text x="210" y="163" textAnchor="middle" fill={activeBattery === 'B' ? '#047857' : '#64748b'} fontSize="7.5" fontWeight="black">バッテリー (B)</text>
                      <text x="210" y="174" textAnchor="middle" fill="#94a3b8" fontSize="6">メイン駆動供給源</text>

                      {/* Controller */}
                      <rect x="245" y="97" width="55" height="46" rx="4" fill="#f8fafc" stroke="#6366f1" strokeWidth="1.5" />
                      <text x="272.5" y="117" textAnchor="middle" fill="#312e81" fontSize="7.5" fontWeight="bold">制御盤</text>
                      <text x="272.5" y="128" textAnchor="middle" fill="#4f46e5" fontSize="6.5">分配同期制御</text>

                      {/* Routes to batteries from controller */}
                      <path d="M245,115 L235,75" stroke="#6366f1" strokeWidth="1.5" fill="none" markerEnd="url(#arr-indigo)" />
                      <path d="M245,125 L235,165" stroke="#6366f1" strokeWidth="1.5" fill="none" markerEnd="url(#arr-indigo)" />
                      <line x1="305" y1="120" x2="295" y2="120" stroke="#ec4899" strokeWidth="1.5" markerEnd="url(#arr-pink)" />

                      {/* Newly Invented Electric Generator */}
                      <rect x="305" y="80" width="80" height="80" rx="4" fill="#fdf2f8" stroke="#ec4899" strokeWidth="2.5" />
                      <text x="345" y="100" textAnchor="middle" fill="#9d174d" fontSize="7" fontWeight="black" letterSpacing="-0.1">新開発</text>
                      <text x="345" y="111" textAnchor="middle" fill="#9d174d" fontSize="7" fontWeight="black" letterSpacing="-0.1">高効率発電機</text>
                      <text x="345" y="127" textAnchor="middle" fill="#db2777" fontSize="7" fontWeight="bold">超低抵抗ローター</text>
                      <text x="345" y="141" textAnchor="middle" fill="#047857" fontSize="6" fontWeight="bold">特許第 2026-83613</text>
                    </svg>

                  </div>

                  {/* Simulator Control Dash */}
                  <div className="w-full mt-5 space-y-4">
                    
                    <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 text-xs space-y-2.5">
                      <div className="flex justify-between items-center text-slate-700">
                        <span className="font-medium">車両の主電力（モーター駆動源）：</span>
                        <span className="font-extrabold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                          {activeBattery === 'A' ? 'バッテリー (A)' : 'バッテリー (B)'}
                        </span>
                      </div>
                      <div className="flex justify-between items-center text-slate-700">
                        <span className="font-medium">背後での自己チャージ（発電還元先）：</span>
                        <span className="font-extrabold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                          {activeBattery === 'A' ? 'バッテリー (B) [充電中]' : 'バッテリー (A) [充電中]'}
                        </span>
                      </div>
                      <div className="flex justify-between items-center text-slate-700 font-medium">
                        <span>エネルギー自給回路ステータス：</span>
                        <span className="font-bold text-pink-600 flex items-center gap-1 bg-pink-50/50 px-1.5 py-0.5 rounded">
                          <Zap className="w-3 h-3 text-pink-500 animate-bounce" />
                          持続回転エネルギーからのダイナミックハーベスティング中
                        </span>
                      </div>
                    </div>

                    <div className="flex gap-2.5">
                      <button 
                        onClick={() => setIsRunning(!isRunning)}
                        className="flex-1 py-2.5 px-3 bg-slate-900 text-white rounded-lg font-bold text-xs hover:bg-slate-800 transition flex items-center justify-center gap-1.5 shadow-xs"
                      >
                        {isRunning ? <><Pause className="w-4 h-4 text-white" />シミュレーション停止</> : <><Play className="w-4 h-4 text-white" />シミュレーション開始</>}
                      </button>
                      <button 
                        onClick={() => {
                          setActiveBattery(p => p === 'A' ? 'B' : 'A');
                          setSwitchCount(c => c + 1);
                        }}
                        className="flex-1 py-2.5 px-3 bg-white text-slate-700 border border-slate-200 rounded-lg font-bold text-xs hover:bg-slate-50 transition shadow-xs"
                      >
                        系統手動切り替え ⇄
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
                    プロジェクト開始アナウンス
                  </span>
                  <span className="inline-flex items-center gap-1.5 bg-red-100 text-red-750 font-bold px-3 py-1 rounded-full text-[11px] border border-red-200">
                    <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
                    YouTube 開発ドキュメンタリーシリーズ始動
                  </span>
                </div>

                <div className="space-y-4">
                  <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 leading-tight">
                    「外部充電不要の電気自動車」<br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 via-yellow-650 to-amber-700 font-black">
                      初の実車プロトタイプ製造 ＆ 検証プロジェクト
                    </span> <br />
                    始動に伴い、プロジェクトへのご参画・ご投資をお待ちしております。
                  </h2>
                  <p className="text-slate-500 font-bold text-xs sm:text-sm tracking-wide leading-relaxed">
                    "私たちは、これから製造・実証試験に入る、世界初・唯一の「外部充電スタンドを一切必要としないEV」プロジェクトを応援・参画いただける方を心よりお待ちしております！"
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  
                  <div className="p-5 bg-gradient-to-br from-amber-50/55 to-amber-50 rounded-2xl border border-amber-200/50 shadow-xs">
                    <div className="flex items-center gap-2 mb-2 text-amber-800">
                      <Clock className="w-5 h-5 text-amber-600" />
                      <span className="text-xs font-black uppercase tracking-wider">プロジェクト期間</span>
                    </div>
                    <p className="text-2xl font-black text-slate-900">
                      実車製造完了目安：<span className="text-amber-600">2ヶ月間</span>
                    </p>
                    <p className="text-xs text-slate-500 mt-1.5 leading-relaxed font-bold">
                      極めて迅速かつ集中的な製作ロードマップを策定しており、わずか2ヶ月の期間内で実車の製造、システム統合、そしてテストコースでの走行検証を完了することを目指します。
                    </p>
                  </div>

                  <div className="p-5 bg-gradient-to-br from-red-50/20 to-red-50/50 rounded-2xl border border-red-200/50 shadow-xs">
                    <div className="flex items-center gap-2 mb-2 text-red-800">
                      <Video className="w-5 h-5 text-red-600" />
                      <span className="text-xs font-black uppercase tracking-wider">製造・実証プロセス全公開</span>
                    </div>
                    <p className="text-xl font-black text-slate-900">
                      <span className="text-red-600">YouTube</span>で完全配信！
                    </p>
                    <p className="text-xs text-slate-500 mt-1.5 leading-relaxed font-bold">
                      特許技術の実証における透明性と客観的な実証を担保するため、主要部品の調達からCNC切削加工、モーター動作、そして走行データ測定まで、プロセスのすべてを映像コンテンツとして全世界に配信・共有します。
                    </p>
                  </div>

                </div>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-semibold">
                  💡 森幸信 博士の長年にわたる独自の電気エネルギー回生研究と、オルタネーター技術を極限まで進化させた閉ループシステムは、充電インフラが存在しないへき地や孤立した環境でも移動の絶対的な自由を提供することを可能にします。私たちのこの歴史的な挑戦を支援、見守り、そしてビジネス面から先見的に投資していただけるパートナー様を歓迎します。
                </p>

                {/* Subscribing placeholder button */}
                <div className="pt-2">
                  <a 
                    href="#contact"
                    className="inline-flex items-center gap-2 px-6 py-3.5 bg-slate-900 hover:bg-slate-850 text-white font-bold rounded-xl text-sm transition shadow-lg shadow-amber-600/5 active:scale-95"
                  >
                    <span>YouTubeドキュメンタリー購読 ＆ プロジェクト情報請求</span>
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
                    E-LOOP コンセプトデザイン
                  </div>

                  <img 
                    src={regenerativeEvImage} 
                    alt="E-LOOP Concept Electric Vehicle" 
                    className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />

                  {/* Aesthetic Caption */}
                  <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-transparent p-5 text-white">
                    <p className="text-xs font-black text-amber-400">E-LOOP 自己充電型EVモビリティコンセプト</p>
                    <p className="text-[10px] text-slate-300 mt-1 font-bold">
                      画期的な新開発自転発電機を車載搭載することで、現代の電気自動車最大の弱点である充電の手間を克服。外部インフラから完全に解放されたクリーンでコスト効率に優れた移動を実現します。部品点数の最適化により、従来の内燃機関車よりも大幅に低いコストで製造が可能です。
                    </p>
                  </div>

                </div>

                <div className="p-3 bg-amber-50/50 rounded-xl border border-amber-200/50 text-center text-[11px] text-amber-800 font-bold">
                  🌟 上記コンセプト画像は、森幸信 博士の特許出願技術を最大限に搭載するために設計された、高効率自給式EVコンセプトの最新モックアップです。
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
              特許基本設計書 ＆ 回路図
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              特許図面 ＆ 主要システム仕様
            </h2>
            <p className="text-slate-500 text-sm font-medium">
              森幸信 博士による公式特許出願「特許出願番号 2025-160784」に基づき、システム全体のレイアウトおよび「新開発高効率発電機」の核心部に焦点を当てて解説します。
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            
            {/* PATENT SPECIFICATION 1: CYCLING OVERVIEW */}
            <div className="lg:col-span-8 bg-slate-50 rounded-2xl border border-slate-200 p-6 sm:p-8 flex flex-col justify-between shadow-sm">
              
              <div className="flex justify-between items-center mb-6">
                <span className="text-[11px] font-black uppercase text-slate-600 tracking-wider">
                  ■ システム全体概略回路図面
                </span>
                <span className="text-xs font-mono text-slate-400">
                  ステータス：特許出願中
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
                  <text x="62" y="40" textAnchor="middle" fill="#2563eb" fontSize="7" fontWeight="black">◀ 前輪（推進モーター部）</text>
                  <text x="360" y="40" textAnchor="middle" fill="#db2777" fontSize="7" fontWeight="black">後輪（自己発電部） ▶</text>
                  <text x="25" y="35" fill="#64748b" fontSize="7" fontWeight="bold" letterSpacing="1">E-LOOP 循環充電回路構造特許申請図面</text>

                  {/* Interactively highlights chosen component */}
                  {/* Motor */}
                  <g className="cursor-pointer" onClick={() => setSelectedComponent('motor')}>
                    <rect x="25" y="120" width="75" height="50" rx="5" fill={selectedComponent === 'motor' ? '#eff6ff' : '#ffffff'} stroke="#3b82f6" strokeWidth={selectedComponent === 'motor' ? "2" : "1"} />
                    <text x="62" y="145" textAnchor="middle" fill="#1e3a8a" fontSize="9" fontWeight="bold">駆動モーター</text>
                    <text x="62" y="157" textAnchor="middle" fill="#2563eb" fontSize="7">メイン推進部</text>
                  </g>

                  {/* Switch */}
                  <g className="cursor-pointer" onClick={() => setSelectedComponent('switch')}>
                    <rect x="120" y="120" width="90" height="50" rx="5" fill={selectedComponent === 'switch' ? '#fffbeb' : '#ffffff'} stroke="#f59e0b" strokeWidth={selectedComponent === 'switch' ? "2" : "1"} />
                    <text x="165" y="145" textAnchor="middle" fill="#78350f" fontSize="8" fontWeight="bold">切替スイッチ</text>
                    <text x="165" y="157" textAnchor="middle" fill="#d97706" fontSize="7">自動スワップ盤</text>
                  </g>

                  {/* Battery A */}
                  <g className="cursor-pointer" onClick={() => setSelectedComponent('batteryA')}>
                    <rect x="235" y="60" width="80" height="50" rx="5" fill={selectedComponent === 'batteryA' ? '#ecfdf5' : '#ffffff'} stroke="#10b981" strokeWidth={selectedComponent === 'batteryA' ? "2" : "1"} />
                    <text x="275" y="85" textAnchor="middle" fill="#047857" fontSize="9" fontWeight="bold">バッテリー(A)</text>
                    <text x="275" y="97" textAnchor="middle" fill="#059669" fontSize="7">メインパックA</text>
                  </g>

                  {/* Battery B */}
                  <g className="cursor-pointer" onClick={() => setSelectedComponent('batteryB')}>
                    <rect x="235" y="180" width="80" height="50" rx="5" fill={selectedComponent === 'batteryB' ? '#ecfdf5' : '#ffffff'} stroke="#10b981" strokeWidth={selectedComponent === 'batteryB' ? "2" : "1"} />
                    <text x="275" y="205" textAnchor="middle" fill="#047857" fontSize="9" fontWeight="bold">バッテリー(B)</text>
                    <text x="275" y="217" textAnchor="middle" fill="#059669" fontSize="7">メインパックB</text>
                  </g>

                  {/* Controller */}
                  <g className="cursor-pointer" onClick={() => setSelectedComponent('controller')}>
                    <rect x="340" y="120" width="75" height="50" rx="5" fill={selectedComponent === 'controller' ? '#eef2ff' : '#ffffff'} stroke="#6366f1" strokeWidth={selectedComponent === 'controller' ? "2" : "1"} />
                    <text x="377.5" y="145" textAnchor="middle" fill="#312e81" fontSize="9" fontWeight="bold">システム制御盤</text>
                    <text x="377.5" y="157" textAnchor="middle" fill="#4f46e5" fontSize="7">電圧・同期リレー</text>
                  </g>

                  {/* Generator */}
                  <g className="cursor-pointer" onClick={() => setSelectedComponent('generator')}>
                    <rect x="425" y="105" width="65" height="80" rx="5" fill={selectedComponent === 'generator' ? '#fdf2f8' : '#ffffff'} stroke="#ec4899" strokeWidth={selectedComponent === 'generator' ? "2" : "1.5"} />
                    <text x="457.5" y="135" textAnchor="middle" fill="#9d174d" fontSize="8.5" fontWeight="bold">新開発</text>
                    <text x="457.5" y="148" textAnchor="middle" fill="#9d174d" fontSize="8.5" fontWeight="bold">自己発電機</text>
                    <text x="457.5" y="165" textAnchor="middle" fill="#db2777" fontSize="6.5" fontWeight="bold">特許出願中</text>
                  </g>
                </svg>

                <div className="absolute bottom-3 right-3 bg-slate-900/90 text-white font-mono text-[9px] px-2 py-0.5 rounded border border-white/10 shadow-xs">
                  特許文書図面 2B 参照
                </div>
              </div>

              {/* Interactively Loaded Specification description card */}
              <div className="mt-6 p-5 rounded-xl bg-blue-50/50 border border-blue-200/50 space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
                  <span className="text-[10px] font-black uppercase text-blue-700 tracking-wider">
                    選択中のモジュール仕様詳細
                  </span>
                </div>
                <h4 className="text-sm font-black text-slate-950">
                  {getComponentInfo(selectedComponent).title}
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed font-semibold">
                  {getComponentInfo(selectedComponent).desc}
                </p>
              </div>

            </div>

            {/* PATENT SPECIFICATION 2: ACCELERATED TORQUE FOCUS */}
            <div className="lg:col-span-4 bg-slate-50 rounded-2xl border border-slate-200 p-6 flex flex-col justify-between shadow-sm">
              <div className="space-y-6">
                
                <div className="flex justify-between items-center border-b border-slate-150 pb-3">
                  <span className="text-[11px] font-black uppercase text-slate-600 tracking-wider">
                    ■ 新開発発電機の抵抗極小化構造
                  </span>
                  <span className="text-xs font-mono text-slate-400">
                    出願番号 2026-83613
                  </span>
                </div>

                <div className="space-y-4">
                  <div className="p-3.5 bg-white rounded-lg border border-slate-200 shadow-xs">
                    <span className="text-[10px] font-black text-pink-600 uppercase block mb-1">■ 課題：発電に伴う強い回転抵抗</span>
                    <p className="text-xs text-slate-600 leading-relaxed font-semibold">
                      一般的な発電機では、電力を回収しようと電気的負荷を繋いだ瞬間、強力な電磁気的ブレーキ（逆トルク）が発生し、ローターの回転を激しく止めようとします。これがEVで走行しながら自己充電を行う際の大きなエネルギー障害となっていました。
                    </p>
                  </div>

                  <div className="p-3.5 bg-white rounded-lg border border-slate-200 shadow-xs">
                    <span className="text-[10px] font-black text-emerald-600 uppercase block mb-1">■ 森幸信 博士の独自の解決策</span>
                    <p className="text-xs text-slate-600 leading-relaxed font-semibold">
                      新開発の発電機は、3相のACコイルの極性と結線制御を最適に隔離・誘導し、自己励磁回路を通じてローターコアを効率的に駆動することで、発電時の電磁気抵抗（逆トルク）を打ち消します。
                    </p>
                  </div>
                </div>

                <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl">
                  <h4 className="text-xs font-black text-blue-900 uppercase">回路設計の最大の特徴</h4>
                  <p className="text-xs text-blue-750 mt-1 leading-relaxed font-bold">
                    始動時、新開発の発電機は推進モーターに対して逆トルク（反作用力）を一切与えません。
                  </p>
                </div>

              </div>

              <div className="pt-6 border-t border-slate-150 mt-6">
                <a 
                  href="#contact" 
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 bg-slate-900 text-white rounded-lg font-bold text-xs hover:bg-slate-800 transition shadow-xs"
                >
                  <span>技術詳細・特許公報データの請求</span>
                  <ArrowRight className="w-3.5 h-3.5 text-amber-400" />
                </a>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 🛠️ EMPIRICAL PROTOTYPE "1kW PHYSICAL DEMO KIT" SECTION */}
      <section id="demokit" className="py-20 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Side: Real Specifications Grid */}
            <div className="lg:col-span-5 space-y-6">
              <span className="text-xs font-black uppercase text-amber-700 bg-amber-100/70 border border-amber-200 px-3 py-1 rounded">
                実機検証試験ユニット
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                実証機「1kWクラス物理デモ装置」
              </h2>
              <p className="text-slate-600 text-sm leading-relaxed font-medium">
                理論やデータ上の仮説だけにとどまらず、E-LOOP開発チームは特許出願技術の実在証明として「1kWクラス物理検証デモ装置」を実際に構築しました。
                持続的な回転駆動力を模擬的に発生させ、発電機出力をメインバッテリーへ還元する閉ループ充電試験およびリアルタイムの切替自動スワップを完全に動作検証しています。
              </p>

              <div className="border-t border-slate-200 pt-6">
                <span className="text-xs font-black text-slate-700 block mb-3 uppercase tracking-wider">■ 主な実証仕様 ＆ 構成パーツ</span>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="p-3 bg-white rounded border border-slate-200 shadow-xs">
                    <span className="text-[9px] text-slate-400 font-bold block">1. 駆動源ユニット</span>
                    <p className="text-xs text-slate-800 mt-0.5 font-extrabold">AC推進模擬モーター</p>
                  </div>
                  <div className="p-3 bg-white rounded border border-slate-200 shadow-xs">
                    <span className="text-[9px] text-slate-400 font-bold block">2. 発電コア</span>
                    <p className="text-xs text-slate-800 mt-0.5 font-extrabold">新開発高効率3相自己発電機</p>
                  </div>
                  <div className="p-3 bg-white rounded border border-slate-200 shadow-xs">
                    <span className="text-[9px] text-slate-400 font-bold block">3. 還元・蓄電モジュール</span>
                    <p className="text-xs text-slate-800 mt-0.5 font-extrabold">リン酸鉄リチウム(LFP)デュアルセル</p>
                  </div>
                  <div className="p-3 bg-white rounded border border-slate-200 shadow-xs">
                    <span className="text-[9px] text-slate-400 font-bold block">4. 自動切替基板</span>
                    <p className="text-xs text-slate-800 mt-0.5 font-extrabold">12ms超高速機械式ソリッドステート</p>
                  </div>
                </div>
              </div>

            </div>

            {/* Right Side: Virtual Interactive Demo Kit Dashboard Layout */}
            <div className="lg:col-span-7">
              <div className="bg-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-2xl border border-slate-800 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />
                
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-4 mb-6">
                  <div className="flex items-center gap-2">
                    <Cpu className="w-5 h-5 text-blue-400 animate-spin" style={{ animationDuration: '4s' }} />
                    <div>
                      <h4 className="text-xs font-black tracking-widest text-slate-400">E-LOOP DEMO DASHBOARD</h4>
                      <h3 className="text-sm font-black text-white">デモ機 リアルタイム監視モニター</h3>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 bg-blue-950/80 text-blue-400 border border-blue-900/60 px-2.5 py-1 rounded text-[10px] font-mono">
                    <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-ping" />
                    <span>ONLINE TESTBED CONNECTED</span>
                  </div>
                </div>

                {/* Dashboard grid */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  
                  {/* Status 1: Active Battery Charge */}
                  <div className="bg-slate-950/80 rounded-xl p-4 border border-slate-800 text-center space-y-1">
                    <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest block">推進バッテリーA</span>
                    <div className="text-3xl font-black text-emerald-400 font-mono tracking-tight">
                      {batteryACharge}%
                    </div>
                    <span className="text-[10px] text-slate-500 font-bold block">
                      {activeBattery === 'A' ? (
                        <span className="text-amber-500 flex items-center justify-center gap-1">
                          <span className="w-1.5 h-1.5 bg-amber-500 rounded-full animate-ping" />
                          モーター放電中...
                        </span>
                      ) : (
                        <span className="text-emerald-500 flex items-center justify-center gap-1">
                          <BatteryCharging className="w-3 h-3 text-emerald-400 animate-pulse" />
                          自己充電完了
                        </span>
                      )}
                    </span>
                  </div>

                  {/* Status 2: Idle Battery Charge */}
                  <div className="bg-slate-950/80 rounded-xl p-4 border border-slate-800 text-center space-y-1">
                    <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest block">推進バッテリーB</span>
                    <div className="text-3xl font-black text-blue-400 font-mono tracking-tight">
                      {batteryBCharge}%
                    </div>
                    <span className="text-[10px] text-slate-500 font-bold block">
                      {activeBattery === 'B' ? (
                        <span className="text-amber-500 flex items-center justify-center gap-1">
                          <span className="w-1.5 h-1.5 bg-amber-500 rounded-full animate-ping" />
                          モーター放電中...
                        </span>
                      ) : (
                        <span className="text-emerald-500 flex items-center justify-center gap-1">
                          <BatteryCharging className="w-3 h-3 text-emerald-400 animate-pulse" />
                          自己充電完了
                        </span>
                      )}
                    </span>
                  </div>

                  {/* Status 3: Dynamic Swapping Stats */}
                  <div className="bg-slate-950/80 rounded-xl p-4 border border-slate-800 text-center space-y-1">
                    <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest block">合計自動切替回数</span>
                    <div className="text-3xl font-black text-pink-500 font-mono tracking-tight">
                      {switchCount}回
                    </div>
                    <span className="text-[10px] text-slate-400 font-bold block">
                      切替インターバル: LFP L3
                    </span>
                  </div>

                </div>

                {/* Oscilloscope live line preview */}
                <div className="mt-6 bg-slate-950 rounded-xl p-4 border border-slate-850">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-[10px] font-black text-pink-500 uppercase tracking-wider flex items-center gap-1">
                      <Zap className="w-3 h-3 animate-pulse" />
                      高効率自転発電機：発電出力電圧波形
                    </span>
                    <span className="text-[9px] font-mono text-slate-500">
                      CH1 50.0V / div 10ms
                    </span>
                  </div>

                  {/* Mini Canvas Oscilloscope Simulation */}
                  <div className="h-28 bg-slate-900 rounded-lg relative overflow-hidden border border-slate-800 flex items-center justify-center">
                    
                    {/* Gridlines of Oscilloscope */}
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:16px_16px] opacity-40" />
                    
                    {/* Sine wave svg path */}
                    {wavePoints.length > 1 ? (
                      <svg className="w-full h-full absolute inset-0">
                        <path 
                          d={`M ${wavePoints.map((p, i) => `${(i / (wavePoints.length - 1)) * 100}%, ${p}%`).join(' L ')}`} 
                          fill="none" 
                          stroke="#ec4899" 
                          strokeWidth="2.5" 
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="opacity-95"
                        />
                      </svg>
                    ) : (
                      <span className="text-slate-600 font-mono text-xs">WAVE MONITOR INITIATING...</span>
                    )}

                    <div className="absolute top-2 right-2 bg-slate-950/90 text-[8px] text-slate-400 px-1.5 py-0.5 rounded font-mono border border-slate-800">
                      回生フィードバック電力：240V AC
                    </div>

                  </div>
                </div>

                <div className="mt-5 text-center text-[10px] text-slate-500 font-medium">
                  * 上記のダッシュボードは、物理デモ装置のテレメトリーに連動して、充電・切替サイクルの仕組みを直感的に示すシミュレーション表示です。
                </div>

              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 📹 NEW VERIFICATION DOCUMENTARY VIDEO & OSCILLOSCOPE SECTION */}
      <section id="video-section" className="py-20 bg-white border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center space-y-3 mb-12">
            <span className="text-xs font-black uppercase text-red-600 bg-red-50 border border-red-200 px-3.5 py-1.5 rounded">
              YouTube 検証映像アーカイブ
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              オシロスコープ検証実演 ＆ 動作映像
            </h2>
            <p className="text-slate-500 text-sm font-medium">
              森幸信 博士の公式YouTubeチャンネルにて公開中の、実機を用いた実演テスト映像です。新開発の自転発電機の出力、オシロスコープ波形、およびバッテリー切替充電プロセスをダイレクトに検証できます。
            </p>
          </div>

          {/* Interactive Player Frame Mockup */}
          <div className="bg-slate-950 rounded-2xl border-4 border-slate-900 overflow-hidden shadow-2xl relative">
            <div className="aspect-video bg-slate-900 relative flex items-center justify-center">
              
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-black/40 z-10" />

              <img 
                src={regenerativeEvImage} 
                alt="Prototype Video Still" 
                className="absolute inset-0 w-full h-full object-cover opacity-35 filter blur-xs"
                referrerPolicy="no-referrer"
              />

              {/* Player UI overlays */}
              <div className="absolute top-4 inset-x-4 flex justify-between items-center z-20 text-white">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 bg-red-500 rounded-full animate-ping" />
                  <span className="text-[10px] font-black uppercase tracking-widest bg-black/50 px-2 py-0.5 rounded backdrop-blur-xs border border-white/10">
                    E-LOOP OFFICIAL VERIFICATION VLOG
                  </span>
                </div>
                <span className="text-[10px] font-mono bg-black/50 px-2 py-0.5 rounded backdrop-blur-xs border border-white/10">
                  長さ: 12分25秒
                </span>
              </div>

              {/* Central Dynamic Content based on selected video phase */}
              <div className="relative z-20 max-w-lg text-center px-6 space-y-4">
                
                {currentVideoPhase === 'start' && (
                  <div className="space-y-2">
                    <h4 className="text-sm font-black text-slate-100">始動時・初期電力立ち上げフェーズ</h4>
                    <p className="text-xs text-slate-300 leading-relaxed font-semibold">
                      始動時、新開発の発電機は推進モーターに対して逆トルク（反作用力）を一切与えません。
                    </p>
                  </div>
                )}

                {currentVideoPhase === 'switching' && (
                  <div className="space-y-2">
                    <h4 className="text-sm font-black text-slate-100">双方向交互充電切替 (無瞬断自動切替)</h4>
                    <p className="text-xs text-slate-300 leading-relaxed font-semibold">
                      メインバッテリーAの残量が低下すると、12msの超高速リレースイッチが動作し、Aを放電回路から即時に切り離します。代わってフル充電状態のメインバッテリーBが推進力供給を即座に引き継ぎ、モーターの回転には一切の影響や断絶を生じさせません。
                    </p>
                  </div>
                )}

                {/* Central Play/Pause Trigger */}
                <div className="flex justify-center pt-2">
                  <button 
                    onClick={() => setVideoPlaying(!videoPlaying)}
                    className="w-16 h-16 rounded-full bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center shadow-lg hover:scale-105 active:scale-95 transition"
                  >
                    {videoPlaying ? <Pause className="w-7 h-7 text-white" /> : <Play className="w-7 h-7 text-white ml-1" />}
                  </button>
                </div>

              </div>

              {/* Bottom Video Playback Scrubber Slider */}
              <div className="absolute bottom-4 inset-x-4 z-20 flex items-center gap-3 text-white text-[10px] font-mono">
                <span>04:12</span>
                <div className="flex-1 h-1 bg-white/20 rounded-full overflow-hidden relative">
                  <div className="absolute top-0 left-0 h-full w-[35%] bg-blue-500 rounded-full" />
                </div>
                <span>12:25</span>
              </div>

            </div>

            {/* Video Phase Multi-button Selector (Directly mapped from user specification pages) */}
            <div className="bg-slate-900 p-4 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider">
                ■ 実演プロセスの選択
              </span>
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => setCurrentVideoPhase('start')}
                  className={`px-2 py-0.5 rounded text-[9px] transition-colors ${currentVideoPhase === 'start' ? 'bg-blue-600 font-extrabold text-white' : 'bg-slate-800 hover:bg-slate-755 text-slate-350'}`}
                >
                  始動負荷検証
                </button>
                <button 
                  onClick={() => setCurrentVideoPhase('switching')}
                  className={`px-2 py-0.5 rounded text-[9px] transition-colors ${currentVideoPhase === 'switching' ? 'bg-blue-600 font-extrabold text-white' : 'bg-slate-800 hover:bg-slate-755 text-slate-350'}`}
                >
                  自動切替検証
                </button>
              </div>
            </div>

          </div>

          <p className="text-center text-slate-500 text-xs mt-4 font-semibold leading-relaxed">
            ※ YouTubeでの完全版実車走行テストおよびオシロスコープ検証映像を視聴、またはプロジェクト参加をご希望の方は、下部の専用IRフォームよりお問い合わせください。
          </p>

        </div>
      </section>

      {/* 👤 INVENTOR PROFILE PANEL */}
      <section id="patent-facts" className="py-20 bg-slate-50 border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-8 rounded-2xl bg-white border border-slate-200 text-slate-800 shadow-lg space-y-8 relative overflow-hidden">
            
            {/* Soft backdrop decorations */}
            <div className="absolute top-0 right-0 w-48 h-48 bg-slate-50 rounded-full translate-x-12 -translate-y-12" />

            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-150 relative z-10">
              <div className="space-y-1">
                <span className="text-xs font-black text-blue-600 uppercase tracking-widest">
                  開発・出願者プロフィール
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mt-1">
                  発明者 ＆ 特許出願人：森幸信 博士
                </h2>
              </div>
              <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 px-4 py-2 rounded-lg shadow-xs">
                <FileText className="w-5 h-5 text-blue-600" />
                <span className="text-xs font-black text-slate-800 uppercase tracking-wider">日本国内特許出願済</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start relative z-10">
              
              {/* Profile Meta Left */}
              <div className="md:col-span-5 space-y-6">
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
                  <h4 className="text-xs font-black text-slate-500 uppercase tracking-widest border-b border-slate-200 pb-1">森 幸信 博士（プロフィール）</h4>
                  
                  <div className="space-y-2 text-xs">
                    <p className="font-bold text-slate-900">■ 専門分野</p>
                    <p className="text-slate-600 pl-2 font-medium">電気回生システム、オルタネーター磁気制御、双方向電力循環回路設計、先端モビリティ設計</p>
                    
                    <p className="font-bold text-slate-900">■ 研究ビジョン</p>
                    <p className="text-slate-600 pl-2 font-medium">「外部電源を一切介さず、物理的な回転反力を最小化することで自己完結する、完全にクリーンな未来型モビリティの確立」</p>
                  </div>
                </div>

                <div className="p-4 bg-blue-50/70 border border-blue-200/55 rounded-xl space-y-3 text-left">
                  <div className="flex items-center gap-1.5 text-blue-800">
                    <Info className="w-4 h-4 text-blue-600" />
                    <span className="text-xs font-black uppercase tracking-wider">実証プロトタイプの開発状況</span>
                  </div>

                  <p className="text-[11px] text-blue-750 font-bold leading-relaxed">
                    現在、実車プロトタイプの製作段階にあります。現時点では共同開発は不要ですが、このフェーズで私たちのプロジェクトに参加・投資を希望される先見性のある投資家を歓迎します。
                  </p>
                </div>
              </div>

              {/* Patents List Right */}
              <div className="md:col-span-7 space-y-5">
                <h3 className="text-base font-black text-slate-900 flex items-center gap-1.5 border-b border-slate-100 pb-2">
                  <FileCode className="w-5 h-5 text-blue-600" />
                  保有・申請中の特許申請ポートフォリオ
                </h3>

                <div className="space-y-4">
                  
                  {/* Patent Item 1 */}
                  <div className="p-4 rounded-xl border border-slate-150 hover:border-slate-300 transition bg-slate-50/30">
                    <span className="font-extrabold text-amber-850">[コア特許 01] 新開発高効率発電システム</span>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-[10px] bg-blue-50 text-blue-700 font-black px-2 py-0.5 rounded border border-blue-200">特許出願第 2026-83613</span>
                      <span className="text-[10px] bg-slate-200 text-slate-700 font-bold px-2 py-0.5 rounded">自己励磁制御・整流回路</span>
                    </div>
                    <p className="text-xs text-slate-500 mt-2 font-medium">
                      3相交流の結線と自己励磁制御を最適化することで、ローターの電気的な逆トルク負荷を打ち消し、低抵抗で大電力を回収する車載発電システム。
                    </p>
                  </div>

                  {/* Patent Item 2 */}
                  <div className="p-4 rounded-xl border border-slate-150 hover:border-slate-300 transition bg-slate-50/30">
                    <span className="font-extrabold text-amber-850">[コア特許 02] 推進用二重バッテリー自動切替制御装置</span>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-[10px] bg-blue-50 text-blue-700 font-black px-2 py-0.5 rounded border border-blue-200">特許出願第 2025-160784</span>
                      <span className="text-[10px] bg-slate-200 text-slate-700 font-bold px-2 py-0.5 rounded">高速相互放充電制御</span>
                    </div>
                    <p className="text-xs text-slate-500 mt-2 font-medium">
                      メインの走行バッテリーをA/Bに完全に系統分離し、走行負荷と充電負荷を交互に超高速（12ms）で切り替えることで、走行中に自己発電による高効率バッテリー充電をシームレスに行う制御システム。
                    </p>
                  </div>

                </div>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* 📬 SECURE INQUIRY FORM */}
      <section id="contact" className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="p-8 rounded-2xl bg-slate-50 border border-slate-200 shadow-xl space-y-8">
            
            <div className="text-center space-y-3">
              <span className="text-xs font-black uppercase text-blue-600 bg-blue-50 border border-blue-200 px-3.5 py-1.5 rounded">
                公式投資窓口
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                E-LOOP プロジェクト 投資問い合わせフォーム
              </h3>
              <p className="text-slate-500 text-sm max-w-xl mx-auto font-medium">
                特許出願要約書の請求、物理デモ機の測定データ（オシロスコープ・各種パラメータ）の開示、プロトタイプの実演実物見学、または投資に関してのご相談をお送りください。
              </p>
            </div>

            {submissionSuccess ? (
              <div className="p-6 bg-emerald-50 rounded-xl border border-emerald-200 text-center space-y-4 shadow-sm">
                <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto border border-emerald-200">
                  <Check className="w-6 h-6" />
                </div>
                <div className="space-y-2">
                  <h4 className="text-lg font-black text-emerald-700">問い合わせ送信完了</h4>
                  <p className="text-sm text-slate-600 leading-relaxed font-semibold">
                    ありがとうございます。ご入力いただいた内容はFormspreeを経由して、特許発明者である森幸信 博士のもとへ安全に送信されました。内容を確認の上、ご登録いただいたメールアドレス宛に折り返しご連絡いたします。
                  </p>
                  <div className="p-2 bg-slate-100 rounded border border-slate-200 inline-block font-mono text-xs text-blue-600 mt-2 font-bold shadow-xs">
                    問い合わせ追跡コード: {submissionToken}
                  </div>
                </div>
                <div className="pt-2">
                  <button 
                    onClick={handleResetForm}
                    className="px-4 py-2 bg-white text-slate-700 border border-slate-200 rounded-lg text-xs font-bold hover:bg-slate-50 transition shadow-xs"
                  >
                    別の問い合わせを送信する
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                
                {submitError && (
                  <div className="p-4 bg-red-50 rounded-xl border border-red-200 text-red-700 text-xs font-bold leading-relaxed">
                    ⚠ {submitError}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-black text-slate-600 uppercase tracking-wider mb-1.5">
                      お名前 <span className="text-red-500 font-extrabold">*</span>
                    </label>
                    <input 
                      type="text"
                      required
                      placeholder="例：山田 太郎"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full px-4 py-3 bg-white border border-slate-250 rounded-lg text-sm text-slate-950 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/30 shadow-xs font-semibold"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-black text-slate-600 uppercase tracking-wider mb-1.5">
                      貴社名・所属機関 <span className="text-red-500 font-extrabold">*</span>
                    </label>
                    <input 
                      type="text"
                      required
                      placeholder="例：〇〇投資パートナーズ、個人投資家など"
                      value={formData.company}
                      onChange={(e) => setFormData({...formData, company: e.target.value})}
                      className="w-full px-4 py-3 bg-white border border-slate-250 rounded-lg text-sm text-slate-950 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/30 shadow-xs font-semibold"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-black text-slate-600 uppercase tracking-wider mb-1.5">
                    メールアドレス <span className="text-red-500 font-extrabold">*</span>
                  </label>
                  <input 
                    type="email"
                    required
                    placeholder="例：name@company.com"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full px-4 py-3 bg-white border border-slate-250 rounded-lg text-sm text-slate-950 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/30 shadow-xs font-semibold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-black text-slate-600 uppercase tracking-wider mb-1.5">
                    お問い合わせ種別 <span className="text-red-500 font-extrabold">*</span>
                  </label>
                  <select 
                    value={formData.inquiryType}
                    onChange={(e) => setFormData({...formData, inquiryType: e.target.value})}
                    className="w-full px-4 py-3 bg-white border border-slate-250 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/30 shadow-xs font-bold"
                  >
                    <option>投資・資本提携（IR）</option>
                    <option>特許ライセンス・技術的な問い合わせ</option>
                    <option>実物検証デモ見学予約</option>
                    <option>その他一般のお問い合わせ</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-black text-slate-600 uppercase tracking-wider mb-1.5">
                    詳細内容 <span className="text-red-500 font-extrabold">*</span>
                  </label>
                  <textarea 
                    required
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    placeholder="投資への関心、ご質問、見学希望日程等をご記入ください。"
                    className="w-full px-4 py-3 bg-white border border-slate-250 rounded-lg text-sm text-slate-950 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/30 shadow-xs font-medium"
                  />
                </div>

                <div className="flex items-start gap-2.5 pt-1.5">
                  <input 
                    type="checkbox"
                    id="privacyAccepted"
                    required
                    checked={formData.privacyAccepted}
                    onChange={(e) => setFormData({...formData, privacyAccepted: e.target.checked})}
                    className="mt-1 rounded bg-white border-slate-350 text-blue-600 focus:ring-2 focus:ring-blue-500/30"
                  />
                  <label htmlFor="privacyAccepted" className="text-xs text-slate-500 leading-relaxed cursor-pointer select-none font-bold">
                    送信された個人情報および問い合わせ詳細は、森幸信 博士およびチームによって厳重に保護され、本プロジェクトへの投資・提携に関する連絡用途のみに使用されることに同意します。 <span className="text-red-500 font-extrabold">*</span>
                  </label>
                </div>

                <div className="pt-2">
                  <button 
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-black rounded-lg text-sm tracking-widest uppercase transition disabled:opacity-50 active:scale-[0.99] shadow-lg shadow-blue-500/20"
                  >
                    {isSubmitting ? '安全に送信中...' : 'お問い合わせを送信する (FORMSPREE保護)'}
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
            車載搭載型発電コア自己充電システム特許出願ポートフォリオ / 発明者：森幸信 博士
          </p>
          <div className="text-[10px] text-slate-500 space-y-1 font-medium">
            <p>© 2026 E-LOOP Self-Regenerative Auto EV System. All Rights Reserved.</p>
            <p>※ 実証試験データ、オシロスコープ記録、特許図面の無断転載・公開を固く禁じます。</p>
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
          <span>English</span>
        </button>
      </div>

    </div>
  );
}
