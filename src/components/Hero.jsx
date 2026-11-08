import React from 'react'
import { ChevronDown, Sparkles } from 'lucide-react'

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen w-full flex items-center justify-end px-4 sm:px-6 md:px-16 lg:px-24 overflow-hidden pt-24 pb-16"
      style={{
        backgroundImage: `url('https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=2000&q=85')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center 40%'
      }}
    >
      {/* 
        Directional left-to-right gradient overlay:
        Left side is well-lit (black/30) displaying the master barber & client,
        Transitioning to black/60 and deep #0a0a0a on the right for crisp text contrast.
      */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-black/70 to-[#08090C]" />
      
      {/* Seamless bottom fade into the next section */}
      <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950 via-transparent to-black/30 pointer-events-none" />

      {/* Floating Sparkle Stars */}
      <div className="absolute top-28 right-8 sm:right-16 w-6 h-6 sm:w-8 sm:h-8 pointer-events-none opacity-80 animate-pulse">
        <svg viewBox="0 0 24 24" fill="none">
          <path d="M12 0L14.5 9.5L24 12L14.5 14.5L12 24L9.5 14.5L0 12L9.5 9.5L12 0Z" fill="#38BDF8" />
        </svg>
      </div>

      <div className="absolute bottom-24 left-6 sm:left-12 w-5 h-5 sm:w-6 sm:h-6 pointer-events-none opacity-60">
        <svg viewBox="0 0 24 24" fill="none">
          <path d="M12 0L14.5 9.5L24 12L14.5 14.5L12 24L9.5 14.5L0 12L9.5 9.5L12 0Z" fill="#00A8E8" />
        </svg>
      </div>

      {/* Hero Content positioned right-center with crisp contrast */}
      <div className="relative z-10 max-w-2xl text-left md:text-right w-full">
        {/* Eyebrow */}
        <div className="inline-flex items-center gap-2 px-3 sm:px-3.5 py-1 sm:py-1.5 rounded-full bg-[#070B14]/80 border border-[#0088FF]/40 backdrop-blur-md mb-3 sm:mb-4 shadow-lg shadow-sky-950/30">
          <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#00A8E8]" />
          <span className="text-[#00A8E8] text-[10px] sm:text-xs font-bold tracking-[0.25em] uppercase font-sans">
            THE ULTIMATE UNISEX SALON
          </span>
        </div>

        {/* Big Bold Headline with responsive scaling */}
        <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold font-serif uppercase tracking-tight text-white leading-[1.05] mb-4 sm:mb-6 drop-shadow-2xl">
          THE ART OF<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-cyan-400 to-blue-500">
            GROOMING
          </span>
        </h1>

        <p className="text-white/80 text-sm sm:text-base md:text-lg max-w-lg md:ml-auto leading-relaxed font-sans mb-6 sm:mb-8 font-light drop-shadow-md">
          Where precision hair styling, bespoke grooming, and luxury salon treatments meet modern aesthetics. Step into an unhurried, private sanctuary crafted for everyone.
        </p>

        {/* CTA Buttons (stacked full-width on mobile, inline on desktop) */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 md:justify-end">
          <a
            href="#experience"
            className="inline-flex items-center justify-center gap-3 px-7 sm:px-8 py-3.5 sm:py-4 rounded-full bg-gradient-to-r from-[#0052D4] via-[#0077FF] to-[#00B4DB] text-white font-serif font-bold text-xs uppercase tracking-[0.16em] transition-all duration-300 shadow-[0_0_25px_rgba(0,140,255,0.45)] hover:shadow-[0_0_35px_rgba(0,180,219,0.7)] hover:scale-105 text-center"
          >
            <span>Experience 3D</span>
          </a>

          <a
            href="#services"
            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 sm:py-4 rounded-full border border-white/20 text-white/90 hover:border-[#00A8E8] hover:text-[#00A8E8] transition-all text-xs font-serif font-semibold tracking-wider uppercase backdrop-blur-md bg-black/40 text-center"
          >
            View Services
          </a>
        </div>
      </div>

      {/* Down Scroll Circle Button */}
      <a
        href="#experience"
        className="absolute bottom-6 right-6 md:bottom-10 md:right-24 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-[#00A8E8]/60 flex items-center justify-center text-sky-400 hover:border-white hover:text-white transition-all duration-300 hover:scale-110 shadow-[0_0_20px_rgba(0,168,232,0.35)] animate-bounce backdrop-blur-sm bg-black/30"
        aria-label="Scroll Down to 3D Experience"
      >
        <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5" />
      </a>
    </section>
  )
}
