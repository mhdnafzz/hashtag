import React, { useEffect, useRef } from 'react'
import { Sparkles } from 'lucide-react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function Testimonial() {
  const sectionRef = useRef(null)
  const trayRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (trayRef.current && sectionRef.current) {
        gsap.fromTo(
          trayRef.current,
          {
            rotateX: 8,
            rotateY: -12,
            y: 35,
            transformPerspective: 1200
          },
          {
            rotateX: -4,
            rotateY: 8,
            y: -35,
            ease: 'none',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1.2
            }
          }
        )
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="testimonial"
      className="relative py-28 px-6 md:px-16 lg:px-24 bg-[#060912] overflow-hidden border-t border-b border-[#0088FF]/15"
    >
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center relative z-10">
        {/* Left Photo: Walnut Grooming Tray with 3D Perspective Tilt Parallax */}
        <div className="lg:col-span-5 relative [perspective:1200px]">
          {/* Ambient Bokeh and Sparkles around the 3D Tray */}
          <div className="absolute -top-6 -right-6 w-8 h-8 text-sky-400/80 animate-pulse pointer-events-none z-20">
            <Sparkles className="w-full h-full" />
          </div>
          <div className="absolute -bottom-6 -left-6 w-6 h-6 text-[#00A8E8]/70 pointer-events-none z-20 animate-float-dust">
            <Sparkles className="w-full h-full" />
          </div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 rounded-full bg-[#0088FF]/20 blur-[70px] pointer-events-none" />

          <div
            ref={trayRef}
            className="rounded-2xl overflow-hidden border border-[#0088FF]/30 shadow-[0_0_40px_rgba(0,136,255,0.15)] group transform-gpu transition-shadow duration-500 hover:shadow-[0_0_50px_rgba(0,168,232,0.3)]"
            style={{ transformStyle: 'preserve-3d' }}
          >
            <img
              src="https://images.unsplash.com/photo-1621607512214-68297480165e?auto=format&fit=crop&w=1000&q=85"
              alt="Professional Luxury Salon & Barber Tools Flatlay"
              className="w-full h-[360px] md:h-[420px] object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#060912]/80 via-transparent to-transparent pointer-events-none" />
          </div>
        </div>

        {/* Right Quote Block */}
        <div className="lg:col-span-7 flex flex-col justify-center">
          <span className="font-playfair text-6xl md:text-8xl text-[#00A8E8]/40 leading-none select-none">
            “
          </span>
          <blockquote className="font-playfair italic text-2xl sm:text-3xl md:text-4xl text-white leading-relaxed -mt-6 mb-8 font-normal">
            The best haircut and styling experience I have ever had. Truly unmatched artistry and care.
          </blockquote>

          <div className="flex items-center gap-4">
            <div className="w-10 h-0.5 bg-[#00A8E8]" />
            <div>
              <p className="font-serif font-bold text-base md:text-lg tracking-widest text-sky-300 uppercase">
                RAHUL M.
              </p>
              <p className="text-white/40 text-xs tracking-wider uppercase font-sans">
                VIP Member · Client since 2022
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

