import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'

const DIAL_UP_STEPS = [
  { msg: 'ATDT1-800-DATA-NET', pct: 5 },
  { msg: 'CONNECT 56000', pct: 12 },
  { msg: 'Initializing PPP layer...', pct: 22 },
  { msg: 'Negotiating protocols...', pct: 35 },
  { msg: 'Authenticating credentials...', pct: 48 },
  { msg: 'Loading digital universe...', pct: 61 },
  { msg: 'Mapping historical nodes...', pct: 74 },
  { msg: 'Compiling narratives...', pct: 86 },
  { msg: 'Ready.', pct: 100 },
]

export default function LoadingOverlay({ onComplete }) {
  const overlayRef = useRef(null)
  const fillRef = useRef(null)
  const [stepIndex, setStepIndex] = useState(0)
  const [pct, setPct] = useState(0)
  const [logs, setLogs] = useState([])

  useEffect(() => {
    let idx = 0
    const interval = setInterval(() => {
      if (idx >= DIAL_UP_STEPS.length) {
        clearInterval(interval)
        // Fade out
        gsap.to(overlayRef.current, {
          opacity: 0,
          duration: 0.8,
          ease: 'power2.inOut',
          onComplete,
        })
        return
      }
      const step = DIAL_UP_STEPS[idx]
      setLogs(prev => [...prev, step.msg])
      setPct(step.pct)
      idx++
    }, 380)
    return () => clearInterval(interval)
  }, [onComplete])

  useEffect(() => {
    if (fillRef.current) {
      gsap.to(fillRef.current, { width: `${pct}%`, duration: 0.35, ease: 'power1.out' })
    }
  }, [pct])

  return (
    <div ref={overlayRef} className="loader-overlay">
      <div className="mb-8 text-center">
        <p className="text-[#00ff41] text-xs tracking-[6px] uppercase mb-2 opacity-70">
          Connecting to
        </p>
        <h1 className="text-[#00ff41] font-['Share_Tech_Mono'] text-xl md:text-2xl tracking-wider">
          THE DIGITAL ODYSSEY
        </h1>
      </div>

      {/* Dial-up progress bar */}
      <div className="loader-bar-track mb-6">
        <div ref={fillRef} className="loader-bar-fill" />
        <div className="loader-scanline" />
      </div>

      {/* Log output */}
      <div className="w-[min(440px,85vw)] bg-[#001a06] border border-[#00ff41]/30 rounded p-4 h-52 overflow-hidden">
        {logs.map((log, i) => (
          <div
            key={i}
            className="text-[#00ff41] font-['Share_Tech_Mono'] text-xs leading-7 flex items-center gap-2"
          >
            <span className="text-[#00ff41]/40">{'>'}</span>
            <span>{log}</span>
          </div>
        ))}
        <div className="flex items-center gap-2 text-[#00ff41] font-['Share_Tech_Mono'] text-xs">
          <span className="text-[#00ff41]/40">{'>'}</span>
          <span className="terminal-cursor" />
        </div>
      </div>

      <p className="mt-6 text-[#00ff41]/50 font-['Share_Tech_Mono'] text-xs tracking-widest">
        {pct}% LOADED
      </p>
    </div>
  )
}
