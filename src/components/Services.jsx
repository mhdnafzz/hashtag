import React from 'react'
import { ArrowUpRight } from 'lucide-react'
import Real3DFloatingShear from './3d/Real3DFloatingShear'

const serviceCards = [
  {
    title: 'CLASSIC HAIRCUT',
    desc: 'Precision scissor craft, hot lather neck shave, scalp massage, and bespoke finishing pomade styling.',
    img: '/images/theshave/card_haircut_clean.jpg',
    price: '$45',
    duration: '45 MIN'
  },
  {
    title: 'BEARD TRIM',
    desc: 'Architectural sculpting, hot botanical towels, straight-razor edge lining, and conditioning organic oils.',
    img: '/images/theshave/card_beard_clean.jpg',
    price: '$35',
    duration: '35 MIN'
  },
  {
    title: 'HOT TOWEL SHAVE',
    desc: 'Traditional straight-razor shave ritual with pre-shave hydration oils, warm lather, and chilled calming balm.',
    img: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=800&q=80',
    price: '$50',
    duration: '40 MIN'
  }
]

export default function Services() {
  return (
    <section id="services" className="relative py-28 px-6 md:px-16 lg:px-24 bg-[#05070B] overflow-hidden">
      {/* Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-[#0077FF]/10 blur-[180px] pointer-events-none" />

      {/* Real 3D WebGL Scissors floating with ScrollTrigger parallax (Zero rectangular background) */}
      <div className="absolute -right-6 sm:right-0 md:right-6 top-8 md:top-12 z-20 pointer-events-none">
        <Real3DFloatingShear
          className="w-44 h-44 sm:w-56 sm:h-56 md:w-64 md:h-64 pointer-events-none"
          scale={0.75}
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-xs uppercase tracking-[0.28em] text-[#00A8E8] font-bold mb-3 font-sans">
            UNISEX LUXURY SUITE
          </p>
          <h2 className="text-3xl md:text-5xl font-bold font-serif uppercase tracking-tight text-white mb-4">
            OUR SERVICES
          </h2>
          <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-[#00A8E8] to-transparent mx-auto" />
        </div>

        {/* 3-Column Card Grid matching video cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {serviceCards.map((service, idx) => (
            <div
              key={idx}
              className="group relative bg-[#070B14]/85 border border-[#0088FF]/30 hover:border-[#00B4DB]/80 rounded-3xl overflow-hidden transition-all duration-400 hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(0,119,255,0.22)] flex flex-col"
            >
              {/* Card Photo Media */}
              <div
                className="h-56 w-full bg-cover bg-center relative transition-transform duration-600 group-hover:scale-105"
                style={{ backgroundImage: `url('${service.img}')` }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-[#070B14] via-[#070B14]/30 to-transparent" />
                <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-[#05070B]/90 backdrop-blur-md border border-[#0088FF]/30 text-xs font-mono text-sky-300">
                  {service.duration} · {service.price}
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 md:p-8 flex flex-col flex-grow">
                <h3 className="text-xl font-bold font-serif tracking-wider text-white uppercase mb-3">
                  {service.title}
                </h3>
                <p className="text-white/70 text-xs md:text-sm leading-relaxed mb-6 flex-grow font-light">
                  {service.desc}
                </p>

                {/* Card Actions */}
                <div className="flex items-center gap-3 pt-4 border-t border-white/10">
                  <a
                    href={`https://wa.me/918078558027?text=Hello%20my%20%23ashtag%2C%20I%20would%20like%20to%20book%20a%20${encodeURIComponent(
                      service.title
                    )}.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-grow py-3 px-5 rounded-full bg-gradient-to-r from-[#0052D4] via-[#0077FF] to-[#00B4DB] text-white text-center font-serif font-bold text-xs uppercase tracking-widest transition-all duration-300 shadow-[0_0_18px_rgba(0,140,255,0.35)] hover:shadow-[0_0_28px_rgba(0,180,219,0.6)] hover:scale-[1.02]"
                  >
                    BOOK NOW
                  </a>

                  <a
                    href="#booking"
                    className="w-10 h-10 rounded-full border border-[#0088FF]/40 flex items-center justify-center text-[#00A8E8] hover:border-white hover:text-white transition-all duration-300 hover:bg-[#0088FF]/20 flex-shrink-0"
                    aria-label={`Reserve ${service.title}`}
                  >
                    <ArrowUpRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

