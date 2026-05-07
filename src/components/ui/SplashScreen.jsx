import { useEffect, useState } from "react";
import Logo from "./Logo";

/**
 * SplashScreen
 * – Shows for 4 seconds then calls onComplete()
 * – Animated background: drifting orbs + subtle grid
 * – Logo fades + scales in, loading bar sweeps across
 */
export default function SplashScreen({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    // Tick progress from 0 → 100 over ~3.6 s (eased at end)
    const startTime = performance.now();
    const duration = 3600;

    const tick = (now) => {
      const elapsed = now - startTime;
      const raw = Math.min(elapsed / duration, 1);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - raw, 3);
      setProgress(Math.round(eased * 100));

      if (raw < 1) {
        requestAnimationFrame(tick);
      } else {
        // Brief pause then fade out
        setTimeout(() => {
          setLeaving(true);
          setTimeout(() => onComplete?.(), 600);
        }, 300);
      }
    };

    const raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [onComplete]);

  return (
    <div
      className={`splash-root ${leaving ? "splash-leaving" : ""}`}
      aria-live="polite"
      aria-label="Loading application"
    >
      {/* ── Animated background ── */}
      <div className="splash-bg-grid" />
      <div className="splash-orb splash-orb-1" />
      <div className="splash-orb splash-orb-2" />
      <div className="splash-orb splash-orb-3" />
      <div className="splash-orb splash-orb-4" />
      <div className="splash-particles">
        {Array.from({ length: 18 }).map((_, i) => (
          <span key={i} className="splash-particle" style={{ "--i": i }} />
        ))}
      </div>

      {/* ── Centre content ── */}
      <div className="splash-content">
        {/* Logo */}
        <div className="splash-logo">
          {/* <span className="splash-logo-text">YourApp</span> */}
          <Logo logoSize="200" />
        </div>

        {/* Tagline */}
        <p className="splash-tagline">Initialising your experience</p>

        {/* Loading bar */}
        <div className="splash-bar-track" role="progressbar" aria-valuenow={progress} aria-valuemin={0} aria-valuemax={100}>
          <div className="splash-bar-fill" style={{ width: `${progress}%` }}>
            <span className="splash-bar-glow" />
          </div>
        </div>

        {/* Percentage */}
        <span className="splash-percent">{progress}%</span>
      </div>

      <style>{`
        /* ── Reset & root ── */
        .splash-root {
          position: fixed;
          inset: 0;
          z-index: 9999;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          background: #080c14;
          animation: splashFadeIn 0.5s ease forwards;
        }
        .splash-leaving {
          animation: splashFadeOut 0.6s ease forwards !important;
        }

        @keyframes splashFadeIn  { from { opacity: 0 } to { opacity: 1 } }
        @keyframes splashFadeOut { from { opacity: 1 } to { opacity: 0 } }

        /* ── Grid overlay ── */
        .splash-bg-grid {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(99,179,237,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(99,179,237,0.04) 1px, transparent 1px);
          background-size: 48px 48px;
          animation: gridPan 20s linear infinite;
        }
        @keyframes gridPan {
          from { background-position: 0 0; }
          to   { background-position: 48px 48px; }
        }

        /* ── Orbs ── */
        .splash-orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(80px);
          opacity: 0.55;
          will-change: transform;
        }
        .splash-orb-1 {
          width: 480px; height: 480px;
          background: radial-gradient(circle, #1a56db 0%, transparent 70%);
          top: -180px; left: -120px;
          animation: orbFloat1 14s ease-in-out infinite;
        }
        .splash-orb-2 {
          width: 380px; height: 380px;
          background: radial-gradient(circle, #0891b2 0%, transparent 70%);
          bottom: -140px; right: -80px;
          animation: orbFloat2 17s ease-in-out infinite;
        }
        .splash-orb-3 {
          width: 260px; height: 260px;
          background: radial-gradient(circle, #6d28d9 0%, transparent 70%);
          top: 55%; left: 65%;
          animation: orbFloat3 11s ease-in-out infinite;
        }
        .splash-orb-4 {
          width: 200px; height: 200px;
          background: radial-gradient(circle, #0e7490 0%, transparent 70%);
          top: 20%; left: 55%;
          animation: orbFloat4 15s ease-in-out infinite;
          opacity: 0.35;
        }

        @keyframes orbFloat1 {
          0%,100% { transform: translate(0, 0) scale(1); }
          50%      { transform: translate(60px, 80px) scale(1.08); }
        }
        @keyframes orbFloat2 {
          0%,100% { transform: translate(0, 0) scale(1); }
          50%      { transform: translate(-50px, -60px) scale(1.1); }
        }
        @keyframes orbFloat3 {
          0%,100% { transform: translate(0, 0) scale(1); }
          33%      { transform: translate(-40px, 30px) scale(1.05); }
          66%      { transform: translate(30px, -20px) scale(0.95); }
        }
        @keyframes orbFloat4 {
          0%,100% { transform: translate(0, 0); }
          50%      { transform: translate(-30px, 40px); }
        }

        /* ── Floating particles ── */
        .splash-particles {
          position: absolute;
          inset: 0;
          pointer-events: none;
        }
        .splash-particle {
          position: absolute;
          width: 2px; height: 2px;
          border-radius: 50%;
          background: rgba(147,210,255,0.6);
          left:  calc(5% + var(--i) * 5.5%);
          bottom: -10px;
          animation: particleRise calc(6s + var(--i) * 0.4s) calc(var(--i) * 0.3s) ease-in infinite;
        }
        @keyframes particleRise {
          0%   { transform: translateY(0) translateX(0) scale(1); opacity: 0; }
          10%  { opacity: 1; }
          90%  { opacity: 0.4; }
          100% { transform: translateY(-110vh) translateX(calc(sin(var(--i)) * 60px)) scale(0.4); opacity: 0; }
        }

        /* ── Centre content ── */
        .splash-content {
          position: relative;
          z-index: 10;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 20px;
          animation: contentReveal 0.8s 0.2s cubic-bezier(0.16,1,0.3,1) both;
        }
        @keyframes contentReveal {
          from { opacity: 0; transform: translateY(24px) scale(0.96); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }

        /* ── Logo text placeholder ── */
        .splash-logo-text {
          font-family: 'DM Mono', 'Courier New', monospace;
          font-size: 2.8rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          background: linear-gradient(135deg, #93c5fd, #38bdf8, #e0f2fe);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        /* ── Logo wrapper ── */
        .splash-logo {
          filter: drop-shadow(0 0 32px rgba(59,130,246,0.5));
          animation: logoPulse 3s ease-in-out infinite;
        }
        @keyframes logoPulse {
          0%,100% { filter: drop-shadow(0 0 28px rgba(59,130,246,0.45)); }
          50%      { filter: drop-shadow(0 0 48px rgba(99,179,237,0.7)); }
        }

        /* ── Tagline ── */
        .splash-tagline {
          font-family: 'DM Mono', 'Courier New', monospace;
          font-size: 0.7rem;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: rgba(147,210,255,0.5);
          margin: 0;
          animation: taglineBlink 1.8s 0.8s ease-in-out both;
        }
        @keyframes taglineBlink {
          from { opacity: 0; letter-spacing: 0.4em; }
          to   { opacity: 1; letter-spacing: 0.22em; }
        }

        /* ── Loading bar ── */
        .splash-bar-track {
          width: min(340px, 72vw);
          height: 3px;
          border-radius: 99px;
          background: rgba(255,255,255,0.07);
          overflow: hidden;
          position: relative;
        }
        .splash-bar-fill {
          height: 100%;
          border-radius: 99px;
          background: linear-gradient(90deg, #1d4ed8, #38bdf8, #67e8f9);
          transition: width 0.12s linear;
          position: relative;
          overflow: visible;
        }
        .splash-bar-glow {
          position: absolute;
          right: -4px;
          top: 50%;
          transform: translateY(-50%);
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: #93c5fd;
          filter: blur(4px);
          opacity: 0.9;
        }

        /* ── Percentage ── */
        .splash-percent {
          font-family: 'DM Mono', 'Courier New', monospace;
          font-size: 0.65rem;
          letter-spacing: 0.1em;
          color: rgba(147,210,255,0.35);
          min-width: 3ch;
          text-align: right;
          align-self: flex-end;
          margin-top: -12px;
          margin-right: calc((100% - min(340px, 72vw)) / 2);
        }
      `}</style>
    </div>
  );
}