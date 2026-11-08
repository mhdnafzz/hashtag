import React, { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import RealScissorsScene from './3d/RealScissorsScene'
import { ArrowUpRight, Sparkles } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const textSteps = [
  {
    step: '01',
    category: 'LUXURY SANCTUARY',
    eyebrow: 'THE ULTIMATE UNISEX SALON',
    title: 'HAIR, BEARD & BEAUTY SUITE',
    description:
      'Precision haircuts, bespoke styling, advanced keratin rituals, and signature grooming experiences crafted with master artistry for men and women.',
    highlight: 'Designer Cuts · Hair Botox & Spa · Straight-Razor Detailing',
    cta: 'Explore Services',
    link: '#services'
  },
  {
    step: '02',
    category: 'SEAMLESS RESERVATIONS',
    eyebrow: 'BESPOKE DIGITAL SUITE',
    title: 'BOOK YOUR EXPERIENCE',
    description:
      'Experience real-time chair availability, custom service sequencing, and direct stylist bookings on our proprietary digital salon suite.',
    highlight: 'Instant Confirmation · VIP Priority Chairs',
    cta: 'Reserve Online',
    link: '#booking'
  },
  {
    step: '03',
    category: 'MASTER ARTISANS',
    eyebrow: 'PRECISION STYLISTS',
    title: 'UNRIVALED SALON MASTERY',
    description:
      'Our world-class stylists and colorists bring years of international trendcraft, botanical scalp treatments, and meticulous hair artistry to every chair.',
    highlight: 'Master Stylists · Certified Colorists · Skin Specialists',
    cta: 'Meet Our Team',
    link: '#barbers'
  },
  {
    step: '04',
    category: 'UNRIVALED EXPERIENCE',
    eyebrow: 'MY #ASHTAG VIP',
    title: 'ELEVATE YOUR DAILY PRESENCE',
    description:
      'Step into a sleek, midnight-blue sanctuary where modern unisex aesthetics meet tailored hospitality and high-end luxury styling.',
    highlight: 'Full Unisex Suite · Complimentary Refreshments',
    cta: 'Book VIP Concierge',
    link: '#booking'
  }
]

export default function PinnedScrollSection() {
  const containerRef = useRef(null)
  const pinRef = useRef(null)
  const textItemsRef = useRef([])
  const [scrollProgress, setScrollProgress] = useState(0)
  const [activeStep, setActiveStep] = useState(0)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const items = textItemsRef.current.filter(Boolean)
      if (items.length === 0) return

      // ─────────────────────────────────────────────────────────────
      // 1. DEFAULT INITIAL STATE:
      // First block is visible; all subsequent blocks are hidden,
      // moved slightly down, and non-interactive.
      // ─────────────────────────────────────────────────────────────
      items.forEach((item, i) => {
        if (i === 0) {
          gsap.set(item, {
            autoAlpha: 1,
            y: 0,
            pointerEvents: 'auto'
          })
        } else {
          gsap.set(item, {
            autoAlpha: 0,
            y: 35,
            pointerEvents: 'none'
          })
        }
      })

      // ─────────────────────────────────────────────────────────────
      // 2. SCRUBBED GSAP TIMELINE (PINNED SCROLLTRIGGER)
      // Strictly sequential: Current text completely fades out and moves
      // up before the next text begins fading in. ZERO overlap.
      // ─────────────────────────────────────────────────────────────
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom bottom',
          pin: pinRef.current,
          scrub: 0.6,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const p = self.progress
            setScrollProgress(p)
            const stepIdx = Math.min(
              Math.floor(p * textSteps.length),
              textSteps.length - 1
            )
            setActiveStep(stepIdx)
          }
        }
      })

      // Initial reading pause on Step 0
      tl.to({}, { duration: 1.0 })

      // Build sequential steps with strict zero overlap
      for (let i = 0; i < items.length - 1; i++) {
        const currentItem = items[i]
        const nextItem = items[i + 1]

        // A) Current block animates opacity to 0 and moves slightly UP (Y-axis)
        tl.to(currentItem, {
          autoAlpha: 0,
          y: -35,
          pointerEvents: 'none',
          duration: 0.85,
          ease: 'power2.in'
        })

        // B) Buffer gap: Ensures current block has completely disappeared before next appears
        tl.to({}, { duration: 0.25 })

        // C) Next block animates opacity from 0 to 1 and settles to y: 0
        tl.fromTo(
          nextItem,
          { autoAlpha: 0, y: 35, pointerEvents: 'none' },
          {
            autoAlpha: 1,
            y: 0,
            pointerEvents: 'auto',
            duration: 0.85,
            ease: 'power2.out'
          }
        )

        // D) Hold on next block so the user can read it as they scroll
        tl.to({}, { duration: 1.2 })
      }
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={containerRef}
      id="experience"
      className="relative min-h-[400vh] bg-charcoal-900 overflow-x-hidden"
    >
      {/* ─────────────────────────────────────────────────────────────
          PINNED VIEWPORT (100dvh STICKY CONTAINER)
          - Mobile (< 768px): Layered stack (Canvas absolute inset-0,
            text pinned over lower half with smooth gradient)
          - Desktop (md:): Split 2-column layout (Left text, Right 3D canvas)
      ───────────────────────────────────────────────────────────── */}
      <div
        ref={pinRef}
        className="sticky top-0 h-[100dvh] w-full flex flex-col justify-between overflow-hidden px-4 sm:px-6 md:px-16 lg:px-24 bg-gradient-to-b from-[#05070B] via-[#080D1A] to-[#05070B]"
      >
        {/* Subtle Ambient Background Gradients */}
        <div className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full bg-[#0052D4]/10 blur-[150px] pointer-events-none" />
        <div className="absolute -bottom-40 right-0 w-[700px] h-[700px] rounded-full bg-[#00A8E8]/10 blur-[170px] pointer-events-none" />

        {/* Top Progress & Step Header */}
        <div className="relative z-20 flex items-center justify-between pt-4 sm:pt-6 pb-3 border-b border-white/10 shrink-0">
          <div className="flex items-center gap-2.5 sm:gap-3">
            <span className="flex items-center justify-center w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-[#0077FF]/20 border border-[#00A8E8]/40 text-[#00A8E8] text-xs font-semibold shadow-[0_0_12px_rgba(0,168,232,0.3)]">
              <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
            </span>
            <span className="text-[10px] sm:text-xs uppercase tracking-[0.2em] sm:tracking-[0.25em] text-[#00A8E8] font-bold">
              3D Interactive Experience
            </span>
          </div>

          {/* Stepper Dots & Numbers */}
          <div className="flex items-center gap-2 sm:gap-4">
            {textSteps.map((s, idx) => (
              <div key={idx} className="flex items-center gap-1.5 sm:gap-2">
                <span
                  className={`text-[11px] sm:text-xs font-mono transition-all duration-300 ${
                    idx === activeStep ? 'text-[#00A8E8] font-bold scale-110 drop-shadow-[0_0_8px_rgba(0,168,232,0.6)]' : 'text-white/30'
                  }`}
                >
                  {s.step}
                </span>
                {idx < textSteps.length - 1 && (
                  <div
                    className={`w-3 sm:w-6 h-[1.5px] transition-all duration-300 ${
                      idx < activeStep ? 'bg-[#00A8E8]' : 'bg-white/10'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* 
          Main Grid & Layered Stack:
          - Mobile: 3D canvas is absolute inset-0 z-0, text is relative z-20 anchored at bottom
          - Desktop (md:): Side-by-side 2-column grid
        */}
        <div className="relative flex-grow w-full md:grid md:grid-cols-12 md:gap-8 lg:gap-12 md:items-center min-h-0 py-2 sm:py-4">
          {/* 3D CANVAS: Full-screen background on mobile, right column on desktop */}
          <div className="absolute inset-0 w-full h-full z-0 md:relative md:inset-auto md:z-10 md:col-span-6 md:h-[520px] lg:h-[600px] flex items-center justify-center">
            <RealScissorsScene scrollProgress={scrollProgress} />
          </div>

          {/* Smooth bottom-to-top dark gradient on mobile so text is ultra-crisp over lower half of 3D scissors */}
          <div className="absolute inset-x-0 bottom-0 h-[68%] bg-gradient-to-t from-charcoal-950 via-charcoal-950/90 to-transparent pointer-events-none md:hidden z-10" />

          {/* TEXT BLOCKS: Anchored at the bottom on mobile, left column on desktop */}
          <div className="relative z-20 w-full h-full flex flex-col justify-end pb-6 sm:pb-10 md:pb-0 md:justify-center md:col-span-6 pointer-events-none md:pointer-events-auto">
            <div className="relative w-full h-[270px] sm:h-[300px] md:h-[460px]">
              {textSteps.map((step, idx) => (
                <div
                  key={idx}
                  ref={(el) => (textItemsRef.current[idx] = el)}
                  className="absolute inset-0 flex flex-col justify-end md:justify-center pointer-events-none"
                  style={{
                    opacity: idx === 0 ? 1 : 0,
                    pointerEvents: idx === 0 ? 'auto' : 'none',
                    visibility: idx === 0 ? 'visible' : 'hidden'
                  }}
                >
                  {/* Eyebrow & Category */}
                  <div className="flex items-center gap-2 sm:gap-2.5 mb-1.5 sm:mb-3">
                    <span className="text-[#00A8E8] text-[10px] sm:text-xs tracking-[0.25em] font-semibold uppercase">
                      {step.eyebrow}
                    </span>
                    <span className="w-1.5 h-1.5 rounded-full bg-[#00A8E8]/60 shadow-[0_0_6px_#00A8E8]" />
                    <span className="text-white/40 text-[10px] sm:text-xs tracking-[0.15em] uppercase">
                      {step.category}
                    </span>
                  </div>

                  {/* Large Clean Sans-Serif Headline with responsive sizing */}
                  <h2 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold font-sans text-white tracking-tight leading-[1.08] uppercase mb-2 sm:mb-4 drop-shadow-xl">
                    {step.title}
                  </h2>

                  {/* Subtitle / Description */}
                  <p className="text-white/70 text-xs sm:text-sm md:text-base leading-relaxed max-w-xl mb-2.5 sm:mb-5 font-sans font-light line-clamp-3 sm:line-clamp-none">
                    {step.description}
                  </p>

                  {/* Highlight Badge Pill */}
                  <div className="inline-flex items-center gap-2 self-start px-2.5 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-[#070B14]/80 border border-[#0088FF]/30 mb-3 sm:mb-6 shadow-md shadow-sky-950/20">
                    <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[#00A8E8] shadow-[0_0_8px_#00A8E8] animate-pulse" />
                    <span className="text-[10px] sm:text-xs text-sky-200/90 font-medium tracking-wide">
                      {step.highlight}
                    </span>
                  </div>

                  {/* Action CTA Buttons */}
                  <div className="flex items-center gap-2.5 sm:gap-4 pointer-events-auto">
                    <a
                      href={step.link}
                      className="group inline-flex items-center gap-2 sm:gap-3 px-5 sm:px-7 py-2.5 sm:py-3.5 rounded-full bg-gradient-to-r from-[#0052D4] via-[#0077FF] to-[#00B4DB] text-white font-serif font-bold text-[11px] sm:text-xs uppercase tracking-[0.14em] transition-all duration-300 shadow-[0_0_20px_rgba(0,140,255,0.4)] hover:shadow-[0_0_30px_rgba(0,180,219,0.65)] hover:scale-105"
                    >
                      <span>{step.cta}</span>
                      <ArrowUpRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </a>

                    <a
                      href="https://wa.me/918078558027?text=Hello+my+%23ashtag%2C+I+would+like+to+reserve+a+VIP+session."
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-3.5 sm:px-5 py-2.5 sm:py-3.5 rounded-full border border-[#0088FF]/40 text-sky-300 hover:border-[#00A8E8] hover:text-white transition-all text-[11px] sm:text-xs font-serif font-semibold tracking-wider uppercase backdrop-blur-md bg-black/40"
                    >
                      VIP WhatsApp
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Progress Bar tied directly to ScrollTrigger */}
        <div className="relative z-20 py-2.5 sm:py-4 flex items-center justify-between text-[10px] sm:text-xs text-white/40 shrink-0 border-t border-white/5 md:border-none">
          <span className="uppercase tracking-widest text-[9px] sm:text-[11px]">
            Scroll to animate 3D shears
          </span>
          <div className="w-24 sm:w-48 h-1 bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#0052D4] to-[#00A8E8] transition-all duration-75 shadow-[0_0_8px_#00A8E8]"
              style={{ width: `${Math.round(scrollProgress * 100)}%` }}
            />
          </div>
          <span className="font-mono text-[#00A8E8] text-[10px] sm:text-xs font-bold">
            {Math.round(scrollProgress * 100)}%
          </span>
        </div>
      </div>
    </section>
  )
}
