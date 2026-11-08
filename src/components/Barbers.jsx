import React, { useState } from 'react'
import { ChevronRight, Award, Star } from 'lucide-react'
import Floating3DElement from './3d/Floating3DElement'

const barbers = [
  {
    name: 'Marco',
    title: 'Master Barber',
    experience: '14 Years Experience',
    specialty: 'Signature Scissor Fades & Straight Razor Detailing',
    rating: '5.0',
    img: '/images/theshave/card_marco.jpg'
  },
  {
    name: 'Andre',
    title: 'Senior Stylist',
    experience: '10 Years Experience',
    specialty: 'Modern Bespoke Texturing & Executive Styling',
    rating: '4.9',
    img: '/images/theshave/card_andre.jpg'
  },
  {
    name: 'Leo',
    title: 'Beard Specialist',
    experience: '8 Years Experience',
    specialty: 'Beard Architecture, Hot Towel Oils & Sculpting',
    rating: '4.9',
    img: '/images/theshave/card_leo.jpg'
  }
]

export default function Barbers() {
  const [highlightIdx, setHighlightIdx] = useState(0)

  const handleNext = () => {
    setHighlightIdx((prev) => (prev + 1) % barbers.length)
  }

  return (
    <section id="barbers" className="relative py-28 px-6 md:px-16 lg:px-24 bg-[#05070B] overflow-hidden">
      {/* 3D Floating Comb & Barber Pole (Video 00:04 - 00:05 Parallax) */}
      <Floating3DElement
        src="/images/theshave/comb.png"
        alt="3D Floating Salon Comb"
        className="absolute left-2 md:left-8 top-1/3 w-24 md:w-36 z-20 opacity-80 md:opacity-100"
        scrollSpeed={-110}
        rotateRange={[-25, 10]}
        tilt3D={{ rotateX: [-8, 12], rotateY: [-10, 18] }}
        scaleRange={[0.92, 1.08]}
        blendMode="screen"
        useRadialMask={true}
      />

      <Floating3DElement
        src="/images/theshave/barber_pole.png"
        alt="3D Floating Barber Pole"
        className="absolute right-2 md:right-10 bottom-6 w-24 md:w-40 z-20 opacity-80 md:opacity-100"
        scrollSpeed={140}
        rotateRange={[-15, 20]}
        tilt3D={{ rotateX: [12, -8], rotateY: [15, -15] }}
        scaleRange={[0.9, 1.1]}
        blendMode="screen"
        useRadialMask={true}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-xs uppercase tracking-[0.28em] text-[#00A8E8] font-bold mb-3 font-sans">
            OUR ARTISANS
          </p>
          <h2 className="text-3xl md:text-5xl font-bold font-serif uppercase tracking-tight text-white mb-4">
            MEET OUR ARTISANS
          </h2>
          <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-[#00A8E8] to-transparent mx-auto" />
        </div>

        {/* Barbers Row */}
        <div className="flex flex-col lg:flex-row items-center justify-center gap-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 flex-grow">
            {barbers.map((barber, idx) => (
              <div
                key={idx}
                className={`relative bg-[#070B14]/85 rounded-3xl overflow-hidden border transition-all duration-400 flex flex-col group ${
                  idx === highlightIdx
                    ? 'border-[#00B4DB] shadow-[0_20px_50px_rgba(0,140,255,0.3)] -translate-y-2'
                    : 'border-[#0088FF]/30 hover:border-[#00B4DB]/60'
                }`}
              >
                {/* Photo */}
                <div className="h-80 w-full overflow-hidden relative">
                  <img
                    src={barber.img}
                    alt={`${barber.name} - ${barber.title}`}
                    className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#070B14] via-transparent to-transparent opacity-80" />

                  {/* Rating Tag */}
                  <div className="absolute top-4 right-4 flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#05070B]/85 backdrop-blur-md border border-[#0088FF]/30 text-xs font-semibold text-sky-300">
                    <Star className="w-3.5 h-3.5 fill-[#00A8E8] text-[#00A8E8]" />
                    <span>{barber.rating}</span>
                  </div>
                </div>

                {/* Info */}
                <div className="p-6 text-center bg-[#070B14]/95 flex flex-col flex-grow">
                  <h4 className="text-2xl font-bold font-serif text-white tracking-wide mb-1">
                    {barber.name}
                  </h4>
                  <p className="text-[#00A8E8] font-serif italic text-sm mb-3">
                    {barber.title}
                  </p>
                  <p className="text-white/60 text-xs leading-relaxed mb-4 flex-grow font-light">
                    {barber.specialty}
                  </p>

                  <a
                    href={`https://wa.me/918078558027?text=Hello%20my%20%23ashtag%2C%20I%20would%20like%20to%20book%20with%20${encodeURIComponent(
                      barber.name
                    )}.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block py-2.5 px-4 rounded-full border border-[#0088FF]/50 text-sky-300 hover:bg-[#0088FF] hover:text-white transition-all text-xs uppercase tracking-widest font-serif font-bold shadow-sm"
                  >
                    Select Stylist
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* Next Carousel Trigger */}
          <button
            onClick={handleNext}
            className="w-12 h-12 rounded-full border border-[#0088FF]/50 flex items-center justify-center text-[#00A8E8] hover:border-white hover:text-white transition-all duration-300 hover:bg-[#0088FF]/20 flex-shrink-0"
            aria-label="Next Barber"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </div>
    </section>
  )
}

