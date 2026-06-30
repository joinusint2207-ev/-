import React, { useState, useEffect } from 'react';
import { 
  Zap, 
  RotateCw, 
  Globe, 
  ShieldCheck, 
  ArrowRight, 
  Clock, 
  Play, 
  Pause, 
  Gauge, 
  ChevronRight, 
  User,
  Building,
  Mail,
  Video,
  Sliders,
  Sparkles,
  Youtube,
  Link
} from 'lucide-react';

import regenerativeEvImage from './assets/images/regenerative_ev_1780636321278.png';
import { translations } from './translations';

function extractYouTubeId(url: string): string | null {
  if (!url) return null;
  const trimmed = url.trim();
  if (/^[a-zA-Z0-9_-]{11}$/.test(trimmed)) {
    return trimmed;
  }
  
  const patterns = [
    /(?:https?:\/\/)?(?:www\.)?youtube\.com\/watch\?v=([a-zA-Z0-9_-]{11})/,
    /(?:https?:\/\/)?(?:www\.)?youtu\.be\/([a-zA-Z0-9_-]{11})/,
    /(?:https?:\/\/)?(?:www\.)?youtube\.com\/embed\/([a-zA-Z0-9_-]{11})/,
    /(?:https?:\/\/)?(?:www\.)?youtube\.com\/v\/([a-zA-Z0-9_-]{11})/,
    /(?:https?:\/\/)?(?:www\.)?youtube\.com\/shorts\/([a-zA-Z0-9_-]{11})/,
    /(?:https?:\/\/)?(?:www\.)?youtube\.com\/live\/([a-zA-Z0-9_-]{11})/
  ];

  for (const pattern of patterns) {
    const match = trimmed.match(pattern);
    if (match && match[1]) {
      return match[1];
    }
  }
  return null;
}

function isYouTubeChannelUrl(url: string): boolean {
  if (!url) return false;
  const trimmed = url.trim();
  return trimmed.includes('youtube.com/@') || 
         trimmed.includes('youtube.com/channel/') || 
         trimmed.includes('youtube.com/c/') || 
         trimmed.includes('youtube.com/user/') ||
         trimmed.startsWith('@') ||
         trimmed.toLowerCase().includes('yukimori2207');
}

function getYouTubeChannelCleanUrl(url: string): string {
  const trimmed = url.trim();
  if (trimmed.startsWith('@')) {
    return `https://youtube.com/${trimmed}`;
  }
  if (!trimmed.startsWith('http') && trimmed.toLowerCase().includes('yukimori2207')) {
    return `https://youtube.com/@yukimori2207`;
  }
  return trimmed;
}

export default function App() {
  // 1. Language State with LocalStorage persistence
  const [lang, setLang] = useState<'en' | 'jp'>(() => {
    const saved = localStorage.getItem('mori_eloop_lang');
    return (saved === 'en' || saved === 'jp') ? saved : 'en';
  });

  const handleSwitchLanguage = () => {
    setLang(prev => {
      const next = prev === 'jp' ? 'en' : 'jp';
      localStorage.setItem('mori_eloop_lang', next);
      return next;
    });
  };

  useEffect(() => {
    // Dynamic document title based on active language selection
    if (lang === 'jp') {
      document.title = "E-LOOP 自己回生・車載発電システム — 森 幸信 博士";
    } else {
      document.title = "Zero Charging EV — E-LOOP Regenerative System";
    }
  }, [lang]);

  const t = translations[lang];

  // 2. Simulation & Visual State
  const [isRunning, setIsRunning] = useState<boolean>(true);
  const [activeBattery, setActiveBattery] = useState<'A' | 'B'>('A');
  const [batteryACharge, setBatteryACharge] = useState<number>(78);
  const [batteryBCharge, setBatteryBCharge] = useState<number>(42);
  const [switchCount, setSwitchCount] = useState<number>(0);
  const [selectedComponent, setSelectedComponent] = useState<string>('generator');

  // Interactive Video Player & Oscilloscope demonstration logic
  const [videoPlaying, setVideoPlaying] = useState<boolean>(true);
  const [wavePoints, setWavePoints] = useState<number[]>([]);

  // YouTube Integration State
  const [youtubeInput, setYoutubeInput] = useState<string>(() => {
    return localStorage.getItem('mori_eloop_youtube_input') || 'https://youtube.com/@yukimori2207?si=DFuoZCKzcdr25_tS';
  });
  const [youtubeChannelUrl, setYoutubeChannelUrl] = useState<string>(() => {
    return localStorage.getItem('mori_eloop_youtube_channel') || 'https://youtube.com/@yukimori2207?si=DFuoZCKzcdr25_tS';
  });
  const [youtubeVideoId, setYoutubeVideoId] = useState<string | null>(() => {
    const saved = localStorage.getItem('mori_eloop_youtube_input') || 'https://youtube.com/@yukimori2207?si=DFuoZCKzcdr25_tS';
    if (isYouTubeChannelUrl(saved)) {
      return null;
    }
    return extractYouTubeId(saved);
  });
  const [youtubeInputError, setYoutubeInputError] = useState<string>('');

  const handleConnectYouTube = () => {
    setYoutubeInputError('');
    const inputStr = youtubeInput.trim();
    if (!inputStr) {
      setYoutubeInputError(lang === 'jp' 
        ? 'YouTubeのURL、チャンネルリンク、または動画IDを入力してください。' 
        : 'Please enter a YouTube video URL, channel URL, or ID.'
      );
      return;
    }

    if (isYouTubeChannelUrl(inputStr)) {
      const cleanChannelUrl = getYouTubeChannelCleanUrl(inputStr);
      setYoutubeChannelUrl(cleanChannelUrl);
      setYoutubeVideoId(null);
      localStorage.setItem('mori_eloop_youtube_channel', cleanChannelUrl);
      localStorage.setItem('mori_eloop_youtube_input', cleanChannelUrl);
    } else {
      const extracted = extractYouTubeId(inputStr);
      if (extracted) {
        setYoutubeVideoId(extracted);
        localStorage.setItem('mori_eloop_youtube_input', inputStr);
      } else {
        setYoutubeInputError(lang === 'jp' 
          ? '有効なYouTubeのURL（動画またはチャンネル）を入力してください。' 
          : 'Invalid YouTube URL format. Please provide a valid channel URL or video URL.'
        );
      }
    }
  };

  // Form states with correct Email Integration (Formspree)
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

  // Oscilloscope wave effect for the generator monitoring view
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

  // Continuous Battery Charge & Swap Logic (Endless Clean Demonstration Loop)
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

  // Formspree Submission Integration
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.company || !formData.email || !formData.message || !formData.privacyAccepted) {
      setSubmitError(lang === 'jp' 
        ? '必須フィールドをすべて入力し、プライバシーポリシーへの同意ボックスにチェックを入れてください。'
        : 'Please fill in all required fields and check the box to agree to the privacy policy.'
      );
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
        throw new Error(errorData.error || 'Formspree integration error. Status: ' + response.status);
      }
    })
    .catch((error) => {
      console.error('Submission failed:', error);
      setSubmitError(lang === 'jp'
        ? 'フォームの送信に失敗しました。しばらく経ってからもう一度お試しください。'
        : 'Failed to submit the form. Please try again after a few moments.'
      );
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

  // Localized Component Info panel for interactive SVG schematic
  const getComponentInfo = (id: string) => {
    if (lang === 'jp') {
      switch(id) {
        case 'motor':
          return {
            title: "駆動用モーター",
            desc: "電気エネルギーを車輪の回転力に直接変換し、最大のトルクと効率で車両を前進させる中核推進ユニット。二系統の Energy Regenerative & Management System によって給電されます。"
          };
        case 'switch':
          return {
            title: "バッテリー切替スイッチ (特許出願番号 2025-160784)",
            desc: "メインの蓄電池セルを2つの独立したグループ（AとB）に分割する、革新的な高速切替リレー。一方のバッテリーグループがアクティブにモーターを駆動している間、もう一方は完全に隔離され、新開発の高効率車載発電機から戻される高レートの回生電力を直接受け取ります。システムは、これら2つの役割をリアルタイムで継続的に交互に切り替えます。"
          };
        case 'batteryA':
          return {
            title: "メインバッテリーパック (グループA)",
            desc: "電気自動車の主推進モーターに電力を供給する、2つの高電圧推進用バッテリーの片系統。グループAがアクティブに駆動している間は、安定した駆動用電流を供給します。バッテリー切替スイッチによってスワップされると、即座に隔離された充電状態へと移行し、車載の高効率車載発電機からの回生電流を受け取ります。"
          };
        case 'batteryB':
          return {
            title: "メインバッテリーパック (グループB)",
            desc: "グループAと完全に同一かつ対称的な構成を持つ、もう一つの高電圧推進用バッテリー系統。グループAが車両を駆動している間、グループBは完全に電気的に隔離され、車載発電機から直接高速充電されます。この役割を自動で交互にスワップし続けることで、外部充電不要の駆動ループを維持します。"
          };
        case 'controller':
          return {
            title: "システムコントローラー ＆ 電圧レギュレーター",
            desc: "新開発高効率車載発電機の回生出力を検出し、最適な電圧に昇圧調整した上で、待機状態（充電側）のバッテリーパックへ充電電流を導くインテリジェントな制御基板。バッテリー切替スイッチと完全に同期して動作し、システム全体のエネルギーバランスを維持します。"
          };
        case 'generator':
          return {
            title: "新開発高効率車載発電機 (特許出願番号 2026-83613)",
            desc: "森幸信 博士によって設計された革新的な発電機。独自の3相ACフィードバックループを採用し、連続的かつ安定した回転力から、3相AC発電機をフィードバックシステムとして使用し、独立した発電機（車内のミニ充電スタンド）として高効率に電力を生成。回収された電力を直接二系統のバッテリーパックへフィードバックし、外部の充電スタンドを不要にする中核メカニズムです。"
          };
        default:
          return {
            title: "図中のコンポーネントをクリックしてください",
            desc: "これらは特許出願中技術「E-LOOP」を構成する5つの中核ユニットです。インタラクティブ回路図内の各モジュールをタップまたはクリックすると、その詳細な機能、機構的役割、および特許仕様が表示されます。"
          };
      }
    } else {
      switch(id) {
        case 'motor':
          return {
            title: "Drive Motor",
            desc: "The core propulsion unit that directly converts electricity into wheel rotation to drive the vehicle forward with maximum torque and efficiency, powered by the dual Energy Regenerative & Management System."
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
            desc: "An innovative generator designed by Dr. Yukinobu Mori. It utilizes an engineered 3-phase AC feedback loop to generate power from a continuous, consistent rotational force by utilizing a 3-phase AC generator feedback system to act as an independent generator (a mini charging station inside the vehicle), delivering feedback power directly to the dual battery packs and rendering external charging stations obsolete."
          };
        default:
          return {
            title: "Click on any component above",
            desc: "These are the 5 core units of the patent-pending E-LOOP technology. Tap or click on any module in the interactive diagram to view its details, mechanical role, and patent specifications."
          };
      }
    }
  };

  const categories = [
    { value: 'Investment / Capital Partnership (IR)', label: t.categoryOption1 },
    { value: 'Technical License Agreement', label: t.categoryOption2 },
    { value: 'Joint Research and Development', label: t.categoryOption3 },
    { value: 'Requesting Empirical Data', label: t.categoryOption4 }
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-850 font-sans selection:bg-blue-600 selection:text-white" id="mori-multilingual-wrapper">
      
      {/* ⚠️ TOP PATENT PENDING ALERT STRIP */}
      <div className="bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-700 text-white text-xs sm:text-sm py-2.5 px-4 shadow-sm text-center font-bold tracking-wider flex items-center justify-center gap-x-3 gap-y-1 flex-wrap border-b border-blue-500">
        <span className="inline-flex items-center gap-1 bg-yellow-400 text-slate-950 px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-tight">
          WORLD FIRST
        </span>
        <span className="font-extrabold">{t.alert}</span>
        <span className="text-blue-200">|</span>
        <span>{t.inventorLabel}</span>
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
              <p className="text-[10px] text-slate-500 font-bold tracking-wide">{t.subtitle}</p>
            </div>
          </div>

          {/* Desktop Nav tabs link scrolling */}
          <nav className="hidden lg:flex items-center gap-1 text-sm font-bold text-slate-600">
            <a href="#concept" className="px-3.5 py-2 rounded-lg transition-colors hover:text-slate-900 hover:bg-slate-50">
              {t.navVision}
            </a>
            <a href="#patent-images" className="px-3.5 py-2 rounded-lg transition-colors hover:text-slate-900 hover:bg-slate-50">
              {t.navBlueprint}
            </a>
            <a href="#demokit" className="px-3.5 py-2 rounded-lg transition-colors hover:text-slate-900 hover:bg-slate-50">
              {t.navDemokit}
            </a>
            <a href="#video-section" className="px-3.5 py-2 rounded-lg transition-colors hover:text-slate-900 hover:bg-slate-50">
              {t.navVideo}
            </a>
            <a href="#patent-facts" className="px-3.5 py-2 rounded-lg transition-colors hover:text-slate-900 hover:bg-slate-50">
              {t.navInventor}
            </a>
            <a href="#contact" className="px-3.5 py-2 rounded-lg transition-colors hover:text-slate-900 hover:bg-slate-50">
              {t.navContact}
            </a>
          </nav>

          {/* CTA Action Direct Link & Language Switcher */}
          <div className="flex items-center gap-2">
            <button 
              onClick={handleSwitchLanguage}
              className="inline-flex items-center gap-1.5 px-3 py-2.5 rounded-lg text-sm font-bold bg-slate-100 hover:bg-slate-200 text-slate-700 transition active:scale-[0.98] border border-slate-200"
              title={lang === 'en' ? "Switch to Japanese" : "Switch to English"}
            >
              <Globe className="w-4 h-4 text-slate-500 animate-pulse" />
              <span>{lang === 'en' ? "日本語" : "English"}</span>
            </button>
            <a 
              href="#contact" 
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-bold bg-blue-600 text-white hover:bg-blue-700 transition active:scale-[0.98] shadow-lg shadow-blue-600/10 hover:shadow-blue-500/20"
            >
              <span>{t.navContact}</span>
              <ArrowRight className="w-4 h-4 text-blue-200" />
            </a>
          </div>

        </div>
      </header>

      {/* 🔮 HERO SECTION */}
      <section id="concept" className="relative py-20 bg-gradient-to-b from-white via-[#faf8f5] to-[#faf8f5] overflow-hidden border-b border-slate-200">
        
        {/* Decorative Grid Mesh */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Title & Slogans */}
            <div className="lg:col-span-7 space-y-8">
              
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold bg-blue-50 text-blue-600 border border-blue-200 shadow-xs">
                <Sparkles className="w-3.5 h-3.5 text-blue-500 animate-spin" />
                <span>{t.heroBadge}</span>
              </div>

              <div className="space-y-4">
                <p className="text-sm text-blue-600 font-extrabold tracking-widest uppercase">{t.heroSystemTitle}</p>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 leading-[1.12] tracking-tight">
                  {lang === 'jp' ? "充電スタンドは不要。" : "No Charging Stations."}
                  <br />
                  {lang === 'jp' ? "排出ガスはゼロ。" : "Zero Emissions."}
                  <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-cyan-600 to-emerald-600">
                    {lang === 'jp' ? "ただ、走るだけ。" : "Just Drive."}
                  </span>
                </h1>
              </div>

              <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl font-medium">
                {t.heroDescription}
              </p>

              {/* Real Patent Certificate Status Frame */}
              <div className="p-5 rounded-xl bg-white border border-slate-200 shadow-sm max-w-xl flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center flex-shrink-0 border border-emerald-200 shadow-xs">
                  <ShieldCheck className="w-7 h-7" />
                </div>
                <div>
                  <span className="text-[10px] font-black uppercase text-emerald-600 tracking-wider">{t.patentTitle}</span>
                  <p className="text-base font-black text-slate-950 mt-0.5">{t.patentStatus}</p>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed font-medium">
                    {t.patentDesc}
                  </p>
                </div>
              </div>

              {/* CTAs */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <a 
                  href="#patent-images" 
                  className="px-6 py-3.5 rounded-lg text-base font-bold bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-600/10 hover:shadow-blue-500/20 transition flex items-center gap-2"
                >
                  {t.btnBlueprint}
                  <ChevronRight className="w-5 h-5 text-blue-200" />
                </a>
                <a 
                  href="#contact" 
                  className="px-6 py-3.5 rounded-lg text-base font-bold bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 shadow-xs transition"
                >
                  {t.btnEmpirical}
                </a>
              </div>

            </div>

            {/* Right Side Column - Interactive E-LOOP System Diagram */}
            <div className="lg:col-span-5">
              <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xl relative">
                
                <div className="absolute top-4 right-4 flex items-center gap-1.5 bg-blue-50 text-blue-600 px-2 py-0.5 rounded text-[10px] font-bold border border-blue-200">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                  <span>{t.interactiveTitle}</span>
                </div>

                <div className="border-b border-slate-150 pb-3 mb-5">
                  <h3 className="text-sm font-black text-slate-900 flex items-center gap-1.5">
                    <Sliders className="w-4 h-4 text-blue-600" />
                    {t.diagramTitle}
                  </h3>
                  <p className="text-[11px] text-slate-500 font-medium">{t.diagramSubtitle}</p>
                </div>

                {/* SVG Car Chassis Wireframe */}
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
                      <text x="65" y="16" textAnchor="middle" fill="#2563eb" fontSize="7" fontWeight="black" letterSpacing="0.5">{t.frontLabel}</text>
                      <text x="320" y="16" textAnchor="middle" fill="#db2777" fontSize="7" fontWeight="black" letterSpacing="0.5">{t.rearLabel}</text>
                      
                      {/* Main Car Chassis boundaries */}
                      <path d="M50,40 L320,40 C340,40 350,60 350,80 L350,160 C350,180 340,200 320,200 L50,200 Z" fill="none" stroke="#64748b" strokeWidth="3" />
                      
                      {/* Drive Motor (Front axle connected) */}
                      <rect x="35" y="93" width="60" height="54" rx="4" fill="#f8fafc" stroke="#3b82f6" strokeWidth="2" className="cursor-pointer" onClick={() => setSelectedComponent('motor')} />
                      <text x="65" y="115" textAnchor="middle" fill="#1e3a8a" fontSize="7.5" fontWeight="bold" className="cursor-pointer" onClick={() => setSelectedComponent('motor')}>{t.driveMotor}</text>
                      <text x="65" y="127" textAnchor="middle" fill="#2563eb" fontSize="6.5" className="cursor-pointer" onClick={() => setSelectedComponent('motor')}>{t.driveMotorDesc}</text>

                      {/* Connection Line with Flow to Motor */}
                      <line x1="110" y1="120" x2="95" y2="120" stroke="#3b82f6" strokeWidth="1.5" strokeDasharray={isRunning ? "3,3" : ""} markerEnd="url(#arr-blue)" />

                      {/* Battery drive switch (Double direction switching relay) */}
                      <rect x="110" y="96" width="60" height="48" rx="4" fill="#f8fafc" stroke="#f59e0b" strokeWidth="2" className="cursor-pointer" onClick={() => setSelectedComponent('switch')} />
                      {t.batteryDriveSwitch.split('\n').map((line, i) => (
                        <text key={i} x="140" y={112 + i * 10} textAnchor="middle" fill="#78350f" fontSize="6.5" fontWeight="black" letterSpacing="-0.1" className="cursor-pointer" onClick={() => setSelectedComponent('switch')}>{line}</text>
                      ))}
                      <text x="140" y="135" textAnchor="middle" fill="#d97706" fontSize="6" fontWeight="bold" className="cursor-pointer" onClick={() => setSelectedComponent('switch')}>{t.batterySwitchDesc}</text>

                      {/* Connection Routes from batteries to switcher */}
                      <path d="M180,75 L165,115" stroke="#f59e0b" strokeWidth="1.5" fill="none" markerEnd="url(#arr-amber)" />
                      <path d="M180,165 L165,125" stroke="#f59e0b" strokeWidth="1.5" fill="none" markerEnd="url(#arr-amber)" />

                      {/* Battery (A) */}
                      <rect x="180" y="52" width="60" height="46" rx="4" fill={activeBattery === 'A' ? '#ecfdf5' : '#ffffff'} stroke={activeBattery === 'A' ? '#10b981' : '#cbd5e1'} strokeWidth={activeBattery === 'A' ? '2.5' : '1.5'} className="cursor-pointer" onClick={() => setSelectedComponent('batteryA')} />
                      <text x="210" y="73" textAnchor="middle" fill={activeBattery === 'A' ? '#047857' : '#64748b'} fontSize="7.5" fontWeight="black" className="cursor-pointer" onClick={() => setSelectedComponent('batteryA')}>{t.batteryA}</text>
                      <text x="210" y="84" textAnchor="middle" fill="#94a3b8" fontSize="6" className="cursor-pointer" onClick={() => setSelectedComponent('batteryA')}>{t.batteryActiveSource}</text>

                      {/* Battery (B) */}
                      <rect x="180" y="142" width="60" height="46" rx="4" fill={activeBattery === 'B' ? '#ecfdf5' : '#ffffff'} stroke={activeBattery === 'B' ? '#10b981' : '#cbd5e1'} strokeWidth={activeBattery === 'B' ? '2.5' : '1.5'} className="cursor-pointer" onClick={() => setSelectedComponent('batteryB')} />
                      <text x="210" y="163" textAnchor="middle" fill={activeBattery === 'B' ? '#047857' : '#64748b'} fontSize="7.5" fontWeight="black" className="cursor-pointer" onClick={() => setSelectedComponent('batteryB')}>{t.batteryB}</text>
                      <text x="210" y="174" textAnchor="middle" fill="#94a3b8" fontSize="6" className="cursor-pointer" onClick={() => setSelectedComponent('batteryB')}>{t.batteryActiveSource}</text>

                      {/* Controller */}
                      <rect x="245" y="97" width="55" height="46" rx="4" fill="#f8fafc" stroke="#6366f1" strokeWidth="1.5" className="cursor-pointer" onClick={() => setSelectedComponent('controller')} />
                      <text x="272.5" y="117" textAnchor="middle" fill="#312e81" fontSize="7.5" fontWeight="bold" className="cursor-pointer" onClick={() => setSelectedComponent('controller')}>{t.controller}</text>
                      <text x="272.5" y="128" textAnchor="middle" fill="#4f46e5" fontSize="6.5" className="cursor-pointer" onClick={() => setSelectedComponent('controller')}>{t.controllerDesc}</text>

                      {/* Routes to batteries from controller */}
                      <path d="M245,115 L235,75" stroke="#6366f1" strokeWidth="1.5" fill="none" markerEnd="url(#arr-indigo)" />
                      <path d="M245,125 L235,165" stroke="#6366f1" strokeWidth="1.5" fill="none" markerEnd="url(#arr-indigo)" />
                      <line x1="305" y1="120" x2="295" y2="120" stroke="#ec4899" strokeWidth="1.5" markerEnd="url(#arr-pink)" />

                      {/* Newly Invented Electric Generator */}
                      <rect x="305" y="80" width="80" height="80" rx="4" fill="#fdf2f8" stroke="#ec4899" strokeWidth="2.5" className="cursor-pointer" onClick={() => setSelectedComponent('generator')} />
                      {t.newlyInventedGenerator.split('\n').map((line, i) => (
                        <text key={i} x="345" y={100 + i * 11} textAnchor="middle" fill="#9d174d" fontSize="7" fontWeight="black" letterSpacing="-0.1" className="cursor-pointer" onClick={() => setSelectedComponent('generator')}>{line}</text>
                      ))}
                      <text x="345" y="141" textAnchor="middle" fill="#047857" fontSize="6" fontWeight="bold" className="cursor-pointer" onClick={() => setSelectedComponent('generator')}>{t.patentNo2026}</text>
                    </svg>

                  </div>

                  {/* Simulator Control Dash */}
                  <div className="w-full mt-5 space-y-4">
                    
                    <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 text-xs space-y-2.5">
                      <div className="flex justify-between items-center text-slate-700">
                        <span className="font-medium">{t.simPrimarySource}</span>
                        <span className="font-extrabold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                          {activeBattery === 'A' ? `${t.batteryA}` : `${t.batteryB}`}
                        </span>
                      </div>
                      <div className="flex justify-between items-center text-slate-700">
                        <span className="font-medium">{t.simBackgroundSource}</span>
                        <span className="font-extrabold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                          {activeBattery === 'A' ? `${t.batteryB} ${t.simCharging}` : `${t.batteryA} ${t.simCharging}`}
                        </span>
                      </div>
                      <div className="flex justify-between items-center text-slate-700 font-medium">
                        <span>{t.simCircuitStatus}</span>
                        <span className="font-bold text-pink-600 flex items-center gap-1 bg-pink-50/50 px-1.5 py-0.5 rounded">
                          <Zap className="w-3 h-3 text-pink-500 animate-bounce" />
                          {t.simCircuitDesc}
                        </span>
                      </div>
                    </div>

                    <div className="flex gap-2.5">
                      <button 
                        onClick={() => setIsRunning(!isRunning)}
                        className="flex-1 py-2.5 px-3 bg-slate-900 text-white rounded-lg font-bold text-xs hover:bg-slate-800 transition flex items-center justify-center gap-1.5 shadow-xs"
                      >
                        {isRunning ? <><Pause className="w-4 h-4 text-white" />{t.simPause}</> : <><Play className="w-4 h-4 text-white" />{t.simStart}</>}
                      </button>
                      <button 
                        onClick={() => {
                          setActiveBattery(p => p === 'A' ? 'B' : 'A');
                          setSwitchCount(c => c + 1);
                        }}
                        className="flex-1 py-2.5 px-3 bg-white text-slate-700 border border-slate-200 rounded-lg font-bold text-xs hover:bg-slate-50 transition shadow-xs"
                      >
                        {t.simSwap}
                      </button>
                    </div>

                  </div>
                </div>

                {/* Selected Schematic Component Meta Panel */}
                <div className="mt-2 p-4 rounded-xl bg-slate-950 text-white border border-slate-800 shadow-inner relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/5 rounded-full blur-xl pointer-events-none" />
                  <span className="text-[9px] font-mono font-bold tracking-widest text-slate-500 block uppercase">
                    {t.circuitModuleMetadata}
                  </span>
                  <h4 className="text-sm font-black text-blue-400 mt-1">
                    {getComponentInfo(selectedComponent).title}
                  </h4>
                  <p className="text-xs text-slate-400 mt-1.5 leading-relaxed font-semibold">
                    {getComponentInfo(selectedComponent).desc}
                  </p>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 🚀 EXCLUSIVE INNOVATION INEVITABLE HERO IMAGE SHOWCASE & YOUTUBE ANNOUNCEMENT */}
      <section className="py-16 bg-gradient-to-b from-[#faf8f5] via-amber-50/25 to-white border-b border-amber-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* YouTube Broadcast and Timeline Block */}
            <div className="lg:col-span-7 space-y-6">
              
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="inline-flex items-center gap-1.5 bg-amber-100 text-amber-850 font-black px-3.5 py-1 rounded-full text-[10px] border border-amber-250 tracking-wider">
                  <Sparkles className="w-3.5 h-3.5 animate-bounce" />
                  {t.kickoffBadge}
                </span>
                <span className="inline-flex items-center gap-1.5 bg-red-100 text-red-850 font-bold px-3 py-1 rounded-full text-[11px] border border-red-250">
                  <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
                  {t.youtubeBadge}
                </span>
              </div>

              <div className="space-y-4">
                <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 leading-tight">
                  {lang === 'jp' ? (
                    <>
                      「充電スタンド不要のEV」 <br />
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 via-yellow-600 to-amber-700 font-black">
                        初号試作車の実証および量産立ち上げプロジェクト
                      </span> へ、 <br />
                      皆様を心より歓迎いたします！
                    </>
                  ) : (
                    <>
                      We Cordially Welcome You to the <br />
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 via-yellow-600 to-amber-700 font-black">
                        "No Charging Station Required EV"
                      </span> <br />
                      First Prototype Verification & Production Launch Project!
                    </>
                  )}
                </h2>
                <p className="text-slate-500 font-bold text-xs sm:text-sm tracking-wide leading-relaxed">
                  {t.welcomeSub}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                <div className="p-5 bg-gradient-to-br from-amber-50/55 to-amber-50 rounded-2xl border border-amber-200/50 shadow-xs">
                  <div className="flex items-center gap-2 mb-2 text-amber-850">
                    <Clock className="w-5 h-5 text-amber-600" />
                    <span className="text-xs font-black uppercase tracking-wider">{t.projectTimeline}</span>
                  </div>
                  <p className="text-2xl font-black text-slate-900">
                    {t.buildPhaseTitle}<span className="text-amber-600">{t.buildPhaseValue}</span>
                  </p>
                  <p className="text-xs text-slate-500 mt-1.5 leading-relaxed font-bold">
                    {t.buildPhaseDesc}
                  </p>
                </div>

                <div className="p-5 bg-gradient-to-br from-red-50/20 to-red-50/50 rounded-2xl border border-red-200/50 shadow-xs">
                  <div className="flex items-center gap-2 mb-2 text-red-800">
                    <Video className="w-5 h-5 text-red-600" />
                    <span className="text-xs font-black uppercase tracking-wider">{t.entireProcess}</span>
                  </div>
                  <p className="text-xl font-black text-slate-900">
                    {t.publicOn} <span className="text-red-600">{t.youtube}</span>
                  </p>
                  <p className="text-xs text-slate-500 mt-1.5 leading-relaxed font-bold">
                    {t.entireProcessDesc}
                  </p>
                </div>

              </div>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-semibold">
                {t.moriIdea}
              </p>

              {/* Subscribing placeholder button */}
              <div className="pt-2">
                <a 
                  href="#contact"
                  className="inline-flex items-center gap-2 px-6 py-3.5 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl text-sm transition shadow-lg shadow-amber-600/5 active:scale-95"
                >
                  <span>{t.subscribeYoutube}</span>
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
                  {t.realizationDraft}
                </div>

                <img 
                  src={regenerativeEvImage} 
                  alt="E-LOOP Concept Electric Vehicle" 
                  className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />

                {/* Aesthetic Caption */}
                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-transparent p-5 text-white">
                  <p className="text-xs font-black text-amber-400">{t.conceptTitle}</p>
                  <p className="text-[10px] text-slate-300 mt-1 font-bold">
                    {t.conceptDesc}
                  </p>
                </div>

              </div>

              <div className="p-3 bg-amber-50/50 rounded-xl border border-amber-200/50 text-center text-[11px] text-amber-800 font-bold">
                {t.conceptDraftLabel}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 🔮 PATENT SCHEMATICS COMPREHENSIVE SECTION */}
      <section id="patent-images" className="py-20 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center space-y-3 max-w-3xl mx-auto mb-16">
            <span className="text-xs font-black uppercase text-blue-600 bg-blue-50 border border-blue-200 px-3 py-1 rounded">
              PATENT BLUEPRINT & SCHEMATICS
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              {t.blueprintTitle}
            </h2>
            <p className="text-slate-500 text-sm font-medium">
              {t.blueprintSub}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Explanation Column */}
            <div className="lg:col-span-5 space-y-6">
              
              <div className="space-y-4">
                <span className="text-xs font-bold uppercase text-slate-400 tracking-wider">
                  {t.schematicTitle}
                </span>
                <p className="text-xs font-extrabold text-emerald-600 bg-emerald-50 px-2 py-1 rounded border border-emerald-200 inline-block">
                  {t.patentPending}
                </p>
                <h3 className="text-xl font-extrabold text-slate-900">
                  {t.coreOperationalLoop}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed font-semibold">
                  {t.coreOperationalDesc}
                </p>
              </div>

              <div className="border-t border-slate-200 pt-6 space-y-4">
                <div className="flex gap-3">
                  <div className="w-5 h-5 rounded-full bg-blue-500 text-white font-bold text-xs flex items-center justify-center flex-shrink-0">
                    1
                  </div>
                  <div>
                    <h4 className="text-sm font-black text-slate-900">{t.multiPoleStatorTitle}</h4>
                    <p className="text-xs text-slate-500 leading-relaxed font-medium">{t.multiPoleStatorDesc}</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="w-5 h-5 rounded-full bg-blue-500 text-white font-bold text-xs flex items-center justify-center flex-shrink-0">
                    2
                  </div>
                  <div>
                    <h4 className="text-sm font-black text-slate-900">{t.stabilizedSwitchTitle}</h4>
                    <p className="text-xs text-slate-500 leading-relaxed font-medium">{t.stabilizedSwitchDesc}</p>
                  </div>
                </div>
              </div>

            </div>

            {/* Patent Dynamo Schematic Visualization Blueprint */}
            <div className="lg:col-span-7">
              <div className="p-6 rounded-2xl bg-white border border-slate-250 shadow-xl space-y-6">
                
                <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                  <div>
                    <span className="text-[10px] font-black uppercase text-blue-600 tracking-wider">{t.corePatentDesignLabel}</span>
                    <h4 className="text-base font-black text-slate-900 mt-0.5">{t.dynamoModelLabel}</h4>
                  </div>
                  <span className="text-[10px] font-mono text-slate-400 bg-slate-50 px-2.5 py-1 rounded border border-slate-200 font-bold">{t.technicalDraftSheet}</span>
                </div>

                {/* SVG Patent Dynamo Rig Schematic */}
                <div className="bg-slate-950 rounded-xl p-5 border border-slate-800 flex items-center justify-center">
                  <svg viewBox="0 0 320 200" className="w-full h-auto text-slate-400">
                    
                    {/* Outer magnetic ring stator representation */}
                    <circle cx="160" cy="100" r="75" fill="none" stroke="#374151" strokeWidth="5" />
                    <circle cx="160" cy="100" r="75" fill="none" stroke="#3b82f6" strokeWidth="2.5" strokeDasharray="5,10" className="animate-spin" style={{ animationDuration: isRunning ? '20s' : '0s' }} />

                    {/* Stator poles markers representing Mori's Patent Stator Core */}
                    <rect x="154" y="15" width="12" height="20" rx="1" fill="#1f2937" stroke="#4b5563" />
                    <text x="160" y="27" textAnchor="middle" fill="#9ca3af" fontSize="5" fontWeight="bold">N1</text>
                    
                    <rect x="154" y="165" width="12" height="20" rx="1" fill="#1f2937" stroke="#4b5563" />
                    <text x="160" y="177" textAnchor="middle" fill="#9ca3af" fontSize="5" fontWeight="bold">S1</text>

                    <rect x="75" y="94" width="20" height="12" rx="1" fill="#1f2937" stroke="#4b5563" />
                    <text x="85" y="101" textAnchor="middle" fill="#9ca3af" fontSize="5" fontWeight="bold">N2</text>

                    <rect x="225" y="94" width="20" height="12" rx="1" fill="#1f2937" stroke="#4b5563" />
                    <text x="235" y="101" textAnchor="middle" fill="#9ca3af" fontSize="5" fontWeight="bold">S2</text>

                    {/* Rotor Center */}
                    <circle cx="160" cy="100" r="42" fill="#111827" stroke="#4b5563" strokeWidth="1.5" />
                    <circle cx="160" cy="100" r="14" fill="#374151" stroke="#10b981" strokeWidth="2" />
                    
                    {/* Spin direction arrows */}
                    <path d="M 160,35 A 65,65 0 0,1 225,100" fill="none" stroke="#ef4444" strokeWidth="2" markerEnd="url(#arr-pink)" strokeDasharray="3,3" />
                    <path d="M 160,165 A 65,65 0 0,1 95,100" fill="none" stroke="#ef4444" strokeWidth="2" markerEnd="url(#arr-pink)" strokeDasharray="3,3" />

                    {/* Rotational spindle center shaft core */}
                    <circle cx="160" cy="100" r="5" fill="#f3f4f6" />
                    
                    {/* Stator Winding Coils indicator */}
                    <path d="M140,82 C145,80 150,78 160,78 C170,78 175,80 180,82" fill="none" stroke="#f59e0b" strokeWidth="3" strokeLinecap="round" />
                    <path d="M140,118 C145,120 150,122 160,122 C170,122 175,120 180,118" fill="none" stroke="#f59e0b" strokeWidth="3" strokeLinecap="round" />

                    {/* Technical text label overlays within blueprint representation */}
                    <text x="160" y="94" textAnchor="middle" fill="#3b82f6" fontSize="5" fontWeight="black">{t.coreRotorLabel}</text>
                    <text x="160" y="112" textAnchor="middle" fill="#f59e0b" fontSize="5.5" fontWeight="black">{t.thinWindingLabel}</text>

                    <text x="50" y="50" textAnchor="middle" fill="#10b981" fontSize="5.5" fontWeight="black">{t.polarPositiveLabel}</text>
                    <text x="270" y="150" textAnchor="middle" fill="#6366f1" fontSize="5.5" fontWeight="black">{t.polarNegativeLabel}</text>

                    <line x1="50" y1="55" x2="115" y2="82" stroke="#10b981" strokeWidth="1" strokeDasharray="2,2" />
                    <line x1="270" y1="142" x2="205" y2="118" stroke="#6366f1" strokeWidth="1" strokeDasharray="2,2" />
                  </svg>
                </div>

                <div className="text-center text-[10px] text-slate-400 font-mono font-bold leading-normal">
                  📌 {t.generatorMinimalFriction}
                </div>

              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 🚀 THE DUAL PATENT PORTFOLIO CORE REGENERATION */}
      <section className="py-20 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center space-y-4 max-w-3xl mx-auto mb-16">
            <span className="inline-flex items-center gap-1 bg-blue-100 text-blue-800 font-black px-3.5 py-1 rounded-full text-[10px] border border-blue-250 tracking-wider">
              {t.globalIP}
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-none">
              {t.dualCorePatentTitle}
            </h2>
            <p className="text-slate-500 text-sm sm:text-base font-medium">
              {t.dualCorePatentHeading} <span className="font-black text-blue-600">{t.theTwoCorePatents}</span>
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Patent 01 Card */}
            <div className="p-8 bg-gradient-to-br from-slate-900 to-slate-950 text-white rounded-2xl border border-slate-800 relative overflow-hidden shadow-2xl flex flex-col justify-between">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
              
              <div className="space-y-6">
                <div className="flex justify-between items-start">
                  <span className="text-[10px] font-mono bg-blue-600/20 text-blue-400 px-3 py-1 rounded-full border border-blue-500/20 font-bold uppercase">
                    {t.patent01Title}
                  </span>
                  <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded border border-emerald-500/20 font-bold">
                    {t.portfolioFiled}
                  </span>
                </div>

                <div className="space-y-2">
                  <h3 className="text-2xl font-black tracking-tight">{t.patent01Heading}</h3>
                  <p className="text-xs text-slate-400 font-bold tracking-wide">{t.patent01Sub}</p>
                  <p className="text-xs text-blue-400 font-mono font-semibold">{t.patentAppNo} {t.portfolioPatent01No}</p>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed font-bold">
                  {t.patent01Desc}
                </p>

                <div className="p-4 bg-white/5 rounded-xl border border-white/5 space-y-1.5">
                  <h4 className="text-xs font-black text-amber-400 uppercase tracking-wider">{t.recirculatingFeedbackTitle}</h4>
                  <p className="text-[11px] text-slate-300 leading-relaxed font-medium">
                    {t.recirculatingFeedbackDesc}
                  </p>
                </div>
              </div>

              <div className="border-t border-white/5 pt-6 mt-6 flex items-center justify-between text-[11px] font-mono text-slate-400 font-semibold whitespace-pre-line">
                {t.patent01Timeline}
              </div>
            </div>

            {/* Patent 02 Card */}
            <div className="p-8 bg-gradient-to-br from-slate-900 to-slate-950 text-white rounded-2xl border border-slate-800 relative overflow-hidden shadow-2xl flex flex-col justify-between">
              <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none" />
              
              <div className="space-y-6">
                <div className="flex justify-between items-start">
                  <span className="text-[10px] font-mono bg-emerald-600/20 text-emerald-400 px-3 py-1 rounded-full border border-emerald-500/20 font-bold uppercase">
                    {t.patent02Title}
                  </span>
                  <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded border border-emerald-500/20 font-bold">
                    {t.portfolioFiled}
                  </span>
                </div>

                <div className="space-y-2">
                  <h3 className="text-2xl font-black tracking-tight">{t.patent02Heading}</h3>
                  <p className="text-xs text-slate-400 font-bold tracking-wide">{t.patent02Sub}</p>
                  <p className="text-xs text-emerald-400 font-mono font-semibold">{t.patentAppNo} {t.portfolioPatent02No}</p>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed font-bold">
                  {t.patent02Desc}
                </p>

                <div className="p-4 bg-white/5 rounded-xl border border-white/5 space-y-1.5">
                  <h4 className="text-xs font-black text-amber-400 uppercase tracking-wider">{t.alternatingSwapTitle}</h4>
                  <p className="text-[11px] text-slate-300 leading-relaxed font-medium">
                    {t.alternatingSwapDesc}
                  </p>
                </div>
              </div>

              <div className="border-t border-white/5 pt-6 mt-6 flex items-center justify-between text-[11px] font-mono text-slate-400 font-semibold whitespace-pre-line">
                {t.patent02Timeline}
              </div>
            </div>

          </div>

          <div className="mt-8 p-6 bg-blue-50/50 rounded-2xl border border-blue-200/40 text-center max-w-4xl mx-auto">
            <p className="text-sm font-extrabold text-blue-900 italic tracking-wide leading-relaxed">
              {t.twoPatentsQuote}
            </p>
            <p className="text-xs text-slate-500 font-medium mt-2 leading-relaxed">
              {t.twoPatentsDesc}
            </p>
          </div>

          <p className="text-center text-[10px] text-slate-400 font-mono font-bold mt-4">
            🔒 {t.dualPatentFooter}
          </p>

        </div>
      </section>

      {/* 🔮 TECHNICAL SPECIFICATIONS & PHYSICAL PROOF */}
      <section id="demokit" className="py-20 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center space-y-3 max-w-3xl mx-auto mb-16">
            <span className="text-xs font-black uppercase text-blue-600 bg-blue-50 border border-blue-200 px-3 py-1 rounded">
              {t.demokitBadge}
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              {t.demokitHeading}
            </h2>
            <p className="text-slate-500 text-sm font-medium">
              {t.demokitDesc}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Interactive Demonstration panel */}
            <div className="lg:col-span-5">
              <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xl relative">
                
                <div className="absolute top-4 right-4 flex items-center gap-1.5 bg-blue-50 text-blue-600 px-2.5 py-0.5 rounded text-[10px] font-bold border border-blue-200">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                  <span>CONNECTED</span>
                </div>

                <div className="border-b border-slate-150 pb-3 mb-5 flex items-center justify-between">
                  <h3 className="text-sm font-black text-slate-900 flex items-center gap-1.5">
                    <Gauge className="w-4.5 h-4.5 text-blue-600" />
                    {lang === 'jp' ? "インタラクティブ動作実証モジュール" : "Interactive Demonstration Module"}
                  </h3>
                </div>

                {/* Oscilloscope Graphic Panel */}
                <div className="space-y-3">
                  <div className="flex justify-between items-center text-xs text-slate-500 font-bold">
                    <span>{lang === 'jp' ? "新世代車載発電機AC出力波形" : "New Generator AC Output Waveform"}</span>
                    <span className="font-mono text-emerald-600 flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                      50.4 Hz - Stabilized
                    </span>
                  </div>
                  
                  {/* Neon Green Oscilloscope Frame */}
                  <div className="h-44 bg-slate-950 rounded-xl p-3 border-2 border-slate-800 flex flex-col justify-between relative overflow-hidden">
                    
                    {/* Background Grid Lines */}
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:16px_16px] opacity-40" />

                    <div className="flex justify-between items-center text-[9px] font-mono text-slate-500 relative z-10">
                      <span>CH1: AC FEEDBACK</span>
                      <span>TIME: 10ms/div</span>
                    </div>

                    {/* Animated Oscilloscope Waveform */}
                    <div className="relative w-full h-24 flex items-center justify-center">
                      <svg viewBox="0 0 300 100" className="w-full h-full">
                        <polyline
                          fill="none"
                          stroke="#10b981"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          points={wavePoints.map((val, idx) => `${(idx / (wavePoints.length - 1)) * 300},${val}`).join(' ')}
                          className="drop-shadow-[0_0_8px_#10b981]"
                        />
                      </svg>
                    </div>

                    <div className="flex justify-between items-center text-[9px] font-mono text-emerald-500 relative z-10 font-bold">
                      <span>Vpp: 324.5V</span>
                      <span>I_avg: 14.8A</span>
                      <span>Eff: 96.4%</span>
                    </div>

                  </div>
                </div>

                {/* Simulated live battery percentage widgets */}
                <div className="grid grid-cols-2 gap-4 mt-5">
                  
                  <div className={`p-4 rounded-xl border transition-all ${activeBattery === 'A' ? 'bg-emerald-50/55 border-emerald-300 shadow-sm' : 'bg-slate-50 border-slate-200'}`}>
                    <div className="flex justify-between items-center mb-1 text-[10px] font-bold text-slate-500">
                      <span>{t.batteryA}</span>
                      {activeBattery === 'A' ? (
                        <span className="text-[9px] text-amber-600 bg-amber-50 px-1.5 py-0.2 rounded border border-amber-200 animate-pulse font-extrabold uppercase">
                          {lang === 'jp' ? "放電中" : "DRIVING"}
                        </span>
                      ) : (
                        <span className="text-[9px] text-emerald-600 bg-emerald-50 px-1.5 py-0.2 rounded border border-emerald-200 font-extrabold uppercase">
                          {lang === 'jp' ? "充電中" : "CHARGING"}
                        </span>
                      )}
                    </div>
                    <p className="text-3xl font-black text-slate-950 tracking-tight">
                      {batteryACharge}%
                    </p>
                    <div className="w-full bg-slate-200 h-2 rounded-full mt-2 overflow-hidden">
                      <div 
                        className={`h-full rounded-full transition-all duration-300 ${activeBattery === 'A' ? 'bg-amber-500' : 'bg-emerald-500'}`}
                        style={{ width: `${batteryACharge}%` }}
                      />
                    </div>
                  </div>

                  <div className={`p-4 rounded-xl border transition-all ${activeBattery === 'B' ? 'bg-emerald-50/55 border-emerald-300 shadow-sm' : 'bg-slate-50 border-slate-200'}`}>
                    <div className="flex justify-between items-center mb-1 text-[10px] font-bold text-slate-500">
                      <span>{t.batteryB}</span>
                      {activeBattery === 'B' ? (
                        <span className="text-[9px] text-amber-600 bg-amber-50 px-1.5 py-0.2 rounded border border-amber-200 animate-pulse font-extrabold uppercase">
                          {lang === 'jp' ? "放電中" : "DRIVING"}
                        </span>
                      ) : (
                        <span className="text-[9px] text-emerald-600 bg-emerald-50 px-1.5 py-0.2 rounded border border-emerald-200 font-extrabold uppercase">
                          {lang === 'jp' ? "充電中" : "CHARGING"}
                        </span>
                      )}
                    </div>
                    <p className="text-3xl font-black text-slate-950 tracking-tight">
                      {batteryBCharge}%
                    </p>
                    <div className="w-full bg-slate-200 h-2 rounded-full mt-2 overflow-hidden">
                      <div 
                        className={`h-full rounded-full transition-all duration-300 ${activeBattery === 'B' ? 'bg-amber-500' : 'bg-emerald-500'}`}
                        style={{ width: `${batteryBCharge}%` }}
                      />
                    </div>
                  </div>

                </div>

              </div>
            </div>

            {/* Numerical metrics description column */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Proof Metric 1 */}
              <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row gap-5 items-start">
                <span className="inline-flex items-center justify-center bg-red-100 text-red-800 border border-red-200 px-3.5 py-1.5 rounded-full font-black text-xs uppercase tracking-wider flex-shrink-0">
                  {t.demokitImpactBadge}
                </span>
                <div className="space-y-1">
                  <h3 className="text-lg font-black text-slate-900 leading-tight">
                    {t.demokitImpactTitle}
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed font-bold">
                    {t.demokitImpactDesc}
                  </p>
                </div>
              </div>

              {/* Proof Metric 2 */}
              <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row gap-5 items-start">
                <span className="inline-flex items-center justify-center bg-blue-100 text-blue-800 border border-blue-200 px-3.5 py-1.5 rounded-full font-black text-xs uppercase tracking-wider flex-shrink-0">
                  {t.demokitMethodBadge}
                </span>
                <div className="space-y-1">
                  <h3 className="text-lg font-black text-slate-900 leading-tight">
                    {t.demokitMethodTitle}
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed font-bold">
                    {t.demokitMethodDesc}
                  </p>
                </div>
              </div>

              {/* Proof Metric 3 */}
              <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row gap-5 items-start">
                <span className="inline-flex items-center justify-center bg-emerald-100 text-emerald-800 border border-emerald-200 px-3.5 py-1.5 rounded-full font-black text-xs uppercase tracking-wider flex-shrink-0">
                  {t.demokitBatteryBadge}
                </span>
                <div className="space-y-1">
                  <h3 className="text-lg font-black text-slate-900 leading-tight">
                    {t.demokitBatteryTitle}
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed font-bold">
                    {t.demokitBatteryDesc}
                  </p>
                </div>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* 🔮 NEW EXTRA SECTION: VIDEO DEMONSTRATION & PROOF */}
      <section id="video-section" className="py-20 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center space-y-3 max-w-3xl mx-auto mb-16">
            <span className="text-xs font-black uppercase text-pink-600 bg-pink-50 border border-pink-200 px-3 py-1 rounded">
              {t.videoBadge}
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              {t.videoTitle}
            </h2>
            <p className="text-slate-500 text-sm font-medium">
              {t.videoDesc}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-6 space-y-6">
              <h3 className="text-2xl font-black text-slate-900 leading-tight">
                {lang === 'jp' ? "森幸信 博士による技術実証" : "Empirical Demonstration Rig (Dr. Yukinobu Mori)"}
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed font-semibold">
                {lang === 'jp' ? (
                  "この動作検証ビデオは、実験用テストベンチに構築された完全な実物デモ装置を捉えたものです。駆動力と自己充電モードのインテリジェントな切り替え（バッテリー切替スイッチによる自動的なスイッチング）のシームレスな実稼働を可視化。クローズドループかつ最も知的で効率的な方法でエネルギーを使用する『新たに発明された発電機』が、連続的に Energy Regenerative & Management System フィードバックを行う様子を示しています。"
                ) : (
                  "This verification video captures the complete tabletop rig. It demonstrates the seamless execution of the dynamic battery swapping mechanism—switching between driving and charging modes—and highlights the newly invented electric generator's ability to maintain a continuous Energy Regenerative & Management System feedback loop."
                )}
              </p>

              <div className="p-5 bg-blue-50/50 rounded-2xl border border-blue-200 flex items-start gap-3.5">
                <Video className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5 animate-pulse" />
                <div>
                  <h4 className="text-xs font-black text-blue-900 uppercase tracking-wider">{lang === 'jp' ? "実証検証データ要約：" : "What the Video Proves:"}</h4>
                  <ul className="space-y-1.5 mt-2 text-xs text-blue-800 list-disc list-inside font-bold">
                    {lang === 'jp' ? (
                      <>
                        <li>3相AC発電機をフィードバックシステムとして使用し、独立した発電機（車内のミニ充電スタンド）を構築。</li>
                        <li>自動切替リレーは駆動を一切途切れさせず、超高速にA/Bバッテリーを瞬断スワップします。</li>
                        <li>昇圧・同期制御された回生電力が, 休止中のバッテリーパックへ直接フィードバック充電されます。</li>
                      </>
                    ) : (
                      <>
                        <li>Utilizing a 3-phase AC generator as a feedback system to form an independent generator (a mini charging station inside the vehicle).</li>
                        <li>The relay executes the swap smoothly without any drop in motor output.</li>
                        <li>The stepped-up feedback voltage successfully charges the secondary battery pack.</li>
                      </>
                    )}
                  </ul>
                </div>
              </div>
            </div>

            {/* YouTube Embed Player & Link Setup */}
            <div className="lg:col-span-6 space-y-4">
              <div className="bg-slate-950 rounded-2xl overflow-hidden border-4 border-slate-800 shadow-2xl relative aspect-video">
                {youtubeVideoId ? (
                  <iframe
                    width="100%"
                    height="100%"
                    src={`https://www.youtube.com/embed/${youtubeVideoId}?autoplay=0&rel=0`}
                    title="E-LOOP YouTube Verification Video"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    className="w-full h-full absolute inset-0"
                  />
                ) : (
                  <div className="absolute inset-0 bg-slate-950 flex flex-col items-center justify-center p-6 text-center text-white">
                    <div className="absolute top-3 left-3 bg-red-600 text-white font-black text-[9px] tracking-widest px-2.5 py-0.5 rounded uppercase">
                      OFFICIAL CHANNEL
                    </div>
                    
                    <div className="w-16 h-16 rounded-full bg-red-600/15 flex items-center justify-center border-2 border-red-500/35 mb-4 animate-pulse">
                      <Youtube className="w-8 h-8 text-red-500" />
                    </div>

                    <h4 className="text-base font-extrabold text-white tracking-tight">
                      Dr. Yukinobu Mori Official YouTube
                    </h4>
                    <p className="text-xs text-slate-400 font-mono mt-1 font-bold">
                      {youtubeChannelUrl.includes('@yukimori2207') ? '@yukimori2207' : youtubeChannelUrl}
                    </p>

                    <p className="text-[11px] text-slate-400 mt-2.5 max-w-sm leading-relaxed font-semibold">
                      {lang === 'jp' 
                        ? 'このチャンネルは、E-LOOP自己回生システムの検証動画を専門に配信する公式YouTubeチャンネルです。下のボタンをクリックして、すべての実証映像をご覧ください！'
                        : 'This channel features full-length verification videos of the E-LOOP system. Click the button below to browse all demonstration videos!'}
                    </p>

                    <a
                      href={youtubeChannelUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 inline-flex items-center gap-2 px-5 py-2.5 bg-red-600 hover:bg-red-700 active:scale-95 transition text-white font-black text-xs rounded-xl shadow-lg shadow-red-600/30 border border-red-500/50"
                    >
                      <Youtube className="w-4 h-4" />
                      <span>{lang === 'jp' ? '公式YouTubeチャンネルを訪問する' : 'Visit Official YouTube Channel'}</span>
                    </a>
                  </div>
                )}
              </div>

              {/* Live Link Panel */}
              <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-lg space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-red-50 text-red-600 flex items-center justify-center border border-red-100 flex-shrink-0">
                    <Youtube className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-black text-slate-900">
                      {lang === 'jp' ? 'リアルタイムYouTubeチャンネル＆動画連携' : 'Live YouTube Channel & Video Integration'}
                    </h4>
                    <p className="text-[11px] text-slate-500 font-bold">
                      {lang === 'jp' 
                        ? '現在運営されているYouTubeチャンネルURLや動画URLを入力すると、ページに即時反映されます。' 
                        : 'Enter your YouTube channel or video URL to immediately sync it with the page.'}
                    </p>
                  </div>
                </div>

                <div className="flex gap-2">
                  <input
                    type="text"
                    value={youtubeInput}
                    onChange={(e) => setYoutubeInput(e.target.value)}
                    placeholder={lang === 'jp' ? "例: https://youtube.com/@yukimori2207" : "e.g., https://youtube.com/@yukimori2207"}
                    className="flex-1 px-3.5 py-2.5 text-xs rounded-lg border border-slate-250 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition font-bold text-slate-800 shadow-inner"
                  />
                  <button
                    onClick={handleConnectYouTube}
                    className="px-5 py-2.5 bg-red-600 hover:bg-red-700 active:bg-red-800 text-white font-bold text-xs rounded-lg transition shadow-md shadow-red-600/15 flex items-center gap-1.5 flex-shrink-0"
                  >
                    <Link className="w-3.5 h-3.5" />
                    <span>{lang === 'jp' ? '連携を適用' : 'Apply Sync'}</span>
                  </button>
                </div>

                {youtubeInputError && (
                  <p className="text-[11px] text-red-600 font-extrabold flex items-center gap-1 bg-red-50 px-2 py-1 rounded border border-red-200">
                    ⚠️ {youtubeInputError}
                  </p>
                )}

                <div className="p-3 bg-slate-50 rounded-xl text-[10px] text-slate-500 font-bold space-y-1 border border-slate-200">
                  <p className="text-slate-800 flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5 text-yellow-500" />
                    <span>{lang === 'jp' ? '入力・連携ガイド:' : 'Input & Integration Guide:'}</span>
                  </p>
                  <p className="pl-4.5">• {lang === 'jp' ? '公式チャンネルのURL（youtube.com/@...）または特定の動画URLを直接入力できます。' : 'You can enter a channel URL (youtube.com/@...) or a specific video URL directly.'}</p>
                  <p className="pl-4.5">• {lang === 'jp' ? 'チャンネルURLを入力した場合、YouTubeのポリシーによりiframe埋め込みがブロックされるため、訪問者がスムーズにチャンネルに移動できる「公式チャンネル専用ゲートウェイ」が安全かつ美しく表示されます。' : 'When entering a channel link, since YouTube blocks embedding channel pages in iframes, a dedicated gateway to navigate to your channel is beautifully shown.'}</p>
                  <p className="pl-4.5">• {lang === 'jp' ? '連携された情報はブラウザのローカルストレージ（localStorage）に安全に保存され、ページを更新しても維持されます。' : 'Linked information is saved securely in your browser\'s localStorage and persists even after refreshing.'}</p>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 🔮 THE INVENTOR / PATENT FACTS SECTION */}
      <section id="patent-facts" className="py-20 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Inventor Avatar Card */}
            <div className="lg:col-span-5">
              <div className="bg-white rounded-2xl border border-slate-200 shadow-xl overflow-hidden p-6 text-center space-y-4">
                <div className="w-28 h-28 rounded-full bg-blue-100 border-4 border-white shadow-lg mx-auto flex items-center justify-center text-blue-600 text-3xl font-black">
                  {lang === 'jp' ? "森" : "Mori"}
                </div>
                <div>
                  <h3 className="text-xl font-black text-slate-900">{t.biographyDrMori}</h3>
                  <p className="text-xs text-blue-600 font-bold tracking-widest mt-0.5">INVENTOR & SYSTEM PATENT OWNER</p>
                </div>
                <div className="p-3 bg-slate-50 rounded-lg text-xs text-slate-500 leading-relaxed font-semibold">
                  {lang === 'jp' 
                    ? "「この技術は電気自動車の中核エネルギーサイクルを根本的に再定義し、外部インフラへの依存から車載自律再生ループへとシフトさせます。」"
                    : "\"This technology completely redefines the core energy cycle of electric vehicles, moving away from grid dependency to clean, on-board energy regeneration.\""
                  }
                </div>
              </div>
            </div>

            {/* Inventor Info & Timeline */}
            <div className="lg:col-span-7 space-y-8">
              <div className="space-y-4">
                <span className="text-xs font-black uppercase text-blue-600 bg-blue-50 border border-blue-200 px-3 py-1 rounded">
                  {t.biographyLabel}
                </span>
                <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight leading-tight">
                  {t.biographyHeading}
                </h2>
                <p className="text-base text-slate-600 leading-relaxed font-medium">
                  {lang === 'jp' ? (
                    "森幸信 博士は、クリーンエネルギー回生と効率的な発電制御技術の研究に長年を捧げてきた著名な日本人技術者・研究者です。外部インフラに縛られないモビリティの絶対的自由を実現するため、独自の車載型高効率自己充電・発電システム「E-LOOP」を構想、実用プロトタイプを完成させました。"
                  ) : (
                    "A distinguished Japanese engineer and researcher dedicated to clean energy harvesting, Dr. Yukinobu Mori designed the E-LOOP system to liberate transport from grid dependency. His work represents a major milestone in electric vehicle energy regeneration."
                  )}
                </p>
              </div>

              {/* Research Milestones */}
              <div className="space-y-4">
                <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-xs flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0 border border-blue-100 font-bold text-xs">
                    2025
                  </div>
                  <div>
                    <h4 className="text-sm font-black text-slate-900">
                      {lang === 'jp' 
                        ? "日本国内特許出願完了 (特許出願番号 2025-160784) ／ PCT国際特許出願中"
                        : "Japanese Patent Filed (Patent Application No. 2025-160784) & PCT International Patent Pending"
                      }
                    </h4>
                    <p className="text-xs text-slate-500 leading-relaxed mt-1 font-semibold">
                      {lang === 'jp'
                        ? "二系統バッテリーを交互にスワップさせ、一方の推進中にもう一方を同期充電可能にする高速切替リレーシステム特許を正式に出願。"
                        : "The core battery drive swap relay mechanism was finalized and filed, paving the way for the continuous dual-battery drive-and-charge cycle (PCT International Patent Pending)."
                      }
                    </p>
                  </div>
                </div>

                <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-xs flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center flex-shrink-0 border border-emerald-100 font-bold text-xs">
                    2026
                  </div>
                  <div>
                    <h4 className="text-sm font-black text-slate-900">
                      {lang === 'jp'
                        ? "日本国内特許出願完了 (特許出願番号 2026-83613) ／ PCT国際特許出願中"
                        : "Japanese Patent Filed (Patent Application No. 2026-83613) & PCT International Patent Pending"
                      }
                    </h4>
                    <p className="text-xs text-slate-500 leading-relaxed mt-1 font-semibold">
                      {lang === 'jp'
                        ? "独自の革新的な Energy Regenerative & Management System により、クローズドループでエネルギー使用を高度に最適化した新たに発明された発電機として特許出願。"
                        : "Dr. Mori finalized and filed the patent for the Newly Invented Electric Generator, featuring an intelligent Energy Regenerative & Management System that maximizes energy feedback (PCT International Patent Pending)."
                      }
                    </p>
                  </div>
                </div>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* 🔮 CONTACT / INVESTMENT PARTNERSHIP FORM SECTION */}
      <section id="contact" className="py-24 bg-gradient-to-b from-white to-slate-50 border-t border-b border-slate-200 text-slate-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none" />
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-600/5 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10">
          
          <div className="text-center space-y-4 mb-16">
            <span className="inline-flex items-center gap-1.5 bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-xs font-bold border border-blue-200">
              <Mail className="w-4 h-4 text-blue-600 animate-pulse" />
              {t.officialInvestmentBadge}
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
              {t.formHeading}
            </h2>
            <p className="text-slate-600 text-sm sm:text-base max-w-2xl mx-auto font-medium leading-relaxed">
              {t.formSub}
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-10 shadow-xl">
            
            {submissionSuccess ? (
              <div className="text-center py-12 space-y-6">
                <div className="w-16 h-16 bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 rounded-full flex items-center justify-center mx-auto text-3xl shadow-lg">
                  ✓
                </div>
                <div className="space-y-2">
                  <h3 className="text-2xl font-black text-slate-900">{t.submittedSuccessTitle}</h3>
                  <p className="text-slate-600 text-sm max-w-md mx-auto leading-relaxed font-semibold">
                    {t.submittedSuccessDesc}
                  </p>
                </div>
                
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 max-w-sm mx-auto">
                  <p className="text-[10px] font-mono text-slate-400 tracking-wider font-bold">{t.submittedSuccessToken}</p>
                  <p className="text-sm font-mono font-black text-blue-600 mt-1">{submissionToken}</p>
                </div>

                <div className="pt-2">
                  <button 
                    onClick={handleResetForm}
                    className="px-6 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-250 font-bold rounded-lg text-xs transition shadow-sm"
                  >
                    {t.createNewInquiry}
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  
                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase text-slate-700 tracking-wider block">
                      {t.fieldNameLabel} <span className="text-red-500 font-extrabold">{t.requiredAsterisk}</span>
                    </label>
                    <div className="relative">
                      <User className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-400" />
                      <input 
                        type="text"
                        required
                        placeholder={t.placeholderName}
                        value={formData.name}
                        onChange={e => setFormData(p => ({ ...p, name: e.target.value }))}
                        className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-900 placeholder-slate-400 focus:outline-hidden focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition font-bold"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase text-slate-700 tracking-wider block">
                      {t.fieldCompanyLabel} <span className="text-red-500 font-extrabold">{t.requiredAsterisk}</span>
                    </label>
                    <div className="relative">
                      <Building className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-400" />
                      <input 
                        type="text"
                        required
                        placeholder={t.placeholderCompany}
                        value={formData.company}
                        onChange={e => setFormData(p => ({ ...p, company: e.target.value }))}
                        className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-900 placeholder-slate-400 focus:outline-hidden focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition font-bold"
                      />
                    </div>
                  </div>

                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  
                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase text-slate-700 tracking-wider block">
                      {t.fieldEmailLabel} <span className="text-red-500 font-extrabold">{t.requiredAsterisk}</span>
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-400" />
                      <input 
                        type="email"
                        required
                        placeholder={t.placeholderEmail}
                        value={formData.email}
                        onChange={e => setFormData(p => ({ ...p, email: e.target.value }))}
                        className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-900 placeholder-slate-400 focus:outline-hidden focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition font-bold"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase text-slate-700 tracking-wider block">
                      {t.fieldCategoryLabel} <span className="text-red-500 font-extrabold">{t.requiredAsterisk}</span>
                    </label>
                    <div className="relative">
                      <Sliders className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-400" />
                      <select 
                        value={formData.inquiryType}
                        onChange={e => setFormData(p => ({ ...p, inquiryType: e.target.value }))}
                        className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-900 focus:outline-hidden focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition appearance-none cursor-pointer font-bold text-slate-900"
                      >
                        {categories.map((c, i) => (
                          <option key={i} value={c.value} className="text-slate-900">{c.label}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                </div>

                <div className="space-y-2">
                  <label className="text-xs font-black uppercase text-slate-700 tracking-wider block">
                    {t.fieldDetailsLabel} <span className="text-red-500 font-extrabold">{t.requiredAsterisk}</span>
                  </label>
                  <textarea 
                    rows={4}
                    required
                    placeholder={t.placeholderDetails}
                    value={formData.message}
                    onChange={e => setFormData(p => ({ ...p, message: e.target.value }))}
                    className="w-full p-4 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-900 placeholder-slate-400 focus:outline-hidden focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition resize-none font-bold"
                  />
                </div>

                {/* Secure Privacy policy agreement strip */}
                <div className="flex items-start gap-2.5 bg-slate-50 p-4 rounded-xl border border-slate-200">
                  <input 
                    type="checkbox"
                    id="privacyAccepted"
                    required
                    checked={formData.privacyAccepted}
                    onChange={e => setFormData(p => ({ ...p, privacyAccepted: e.target.checked }))}
                    className="mt-1 rounded bg-white border-slate-350 text-blue-600 focus:ring-2 focus:ring-blue-500/30"
                  />
                  <label htmlFor="privacyAccepted" className="text-xs text-slate-600 leading-relaxed cursor-pointer select-none font-bold">
                    {t.privacyAgreement}
                  </label>
                </div>

                {/* Submit Feedback Error */}
                {submitError && (
                  <div className="p-4 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-lg flex items-center gap-2 font-bold animate-shake">
                    <span className="font-extrabold">{t.errorLabel}</span> {submitError}
                  </div>
                )}

                {/* Dispatch Button */}
                <div className="flex justify-end pt-2">
                  <button 
                    type="submit"
                    disabled={isSubmitting || !formData.privacyAccepted}
                    className="w-full sm:w-auto px-8 py-4 bg-blue-600 text-white rounded-lg font-bold text-sm hover:bg-blue-700 transition active:scale-[0.98] disabled:opacity-55 disabled:cursor-not-allowed shadow-lg shadow-blue-500/20"
                  >
                    {isSubmitting ? t.submitting : t.btnSubmit}
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
            <span className="text-[10px] bg-slate-800 px-1.5 py-0.5 rounded border border-slate-700 text-slate-300 font-bold">{t.footerProject}</span>
          </div>
          <p className="max-w-md mx-auto text-[11px] text-slate-300 font-medium">
            {t.footerApplicant}
          </p>
          <div className="text-[10px] text-slate-500 space-y-1 font-medium">
            <p>{t.footerCopyright}</p>
            <p>{t.footerDisclaimer}</p>
          </div>
        </div>
      </footer>

      {/* FLOATING LANGUAGE SWITCH SWITCHER FOR EASY TOGGLING ON ALL DEVICES */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={handleSwitchLanguage}
          className="flex items-center gap-2 px-4 py-3 bg-slate-900 hover:bg-slate-850 text-white rounded-full shadow-2xl transition active:scale-[0.95] border border-slate-700 font-bold text-xs"
        >
          <Globe className="w-4 h-4 text-blue-400 animate-spin" style={{ animationDuration: '10s' }} />
          <span>{lang === 'en' ? "日本語" : "English"}</span>
        </button>
      </div>

    </div>
  );
}
