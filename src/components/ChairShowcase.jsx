import React from 'react'
import Floating3DElement from './3d/Floating3DElement'

const menuItems = [
  { name: 'Haircut', price: '$45', time: '45 mins' },
  { name: 'Beard Grooming', price: '$35', time: '35 mins' },
  { name: 'Hot Towel Shave', price: '$50', time: '40 mins' },
  { name: 'Full Service Treatment', price: '$80', time: '75 mins' },
  { name: 'Scalp & Facial Ritual', price: '$65', time: '50 mins' }
]

export default function ChairShowcase() {
  return (
    <section id="menu" className="relative py-28 px-6 md:px-16 lg:px-24 bg-[#060912] border-t border-b border-[#0088FF]/20 overflow-hidden">
      {/* 3D Floating Shears along Chair Showcase margins */}
      <Floating3DElement
        src="/images/theshave/shears_right.png"
        alt="3D Floating Shears"
        className="absolute -right-8 md:right-8 top-16 w-32 md:w-52 z-20 opacity-70 md:opacity-95"
        scrollSpeed={140}
        rotateRange={[12, -22]}
        tilt3D={{ rotateX: [15, -10], rotateY: [-22, 12] }}
        scaleRange={[0.92, 1.08]}
        blendMode="screen"
        useRadialMask={true}
      />

      <Floating3DElement
        src="/images/theshave/shears_left.png"
        alt="3D Floating Shears Left"
        className="absolute -left-6 md:left-6 bottom-16 w-24 md:w-40 z-20 opacity-70 md:opacity-90"
        scrollSpeed={-120}
        rotateRange={[-20, 15]}
        tilt3D={{ rotateX: [-12, 10], rotateY: [18, -12] }}
        scaleRange={[0.9, 1.05]}
        blendMode="screen"
        useRadialMask={true}
      />

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center relative z-10">
        {/* Left Photo: Spotlighted Vintage Leather Barber Chair */}
        <div className="lg:col-span-6 relative">
          <div className="relative rounded-3xl overflow-hidden border border-[#0088FF]/30 shadow-[0_30px_70px_rgba(0,0,0,0.9)] group">
            <img
              src="/images/theshave/barber_chair.jpg"
              alt="Vintage Handcrafted Leather Barber Chair Under Studio Spotlight"
              className="w-full h-[420px] md:h-[480px] object-cover object-center transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#060912] via-transparent to-transparent opacity-60" />

            <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-[#070B14]/90 backdrop-blur-md border border-[#0088FF]/30 flex items-center justify-between shadow-lg">
              <div>
                <p className="text-xs uppercase tracking-widest text-[#00A8E8] font-bold">The Belmont Chair</p>
                <p className="text-[11px] text-white/60">Hand-stitched full-grain saddle leather</p>
              </div>
              <span className="w-2.5 h-2.5 rounded-full bg-[#00A8E8] shadow-[0_0_8px_#00A8E8] animate-ping" />
            </div>
          </div>
        </div>

        {/* Right Menu List */}
        <div className="lg:col-span-6 flex flex-col justify-center">
          <p className="text-xs uppercase tracking-[0.28em] text-[#00A8E8] font-bold mb-3 font-sans">
            HERITAGE TREATMENT MENU
          </p>
          <h2 className="text-3xl md:text-5xl font-bold font-serif uppercase tracking-tight text-white mb-6">
            OUR SERVICES
          </h2>
          <p className="text-white/70 text-sm md:text-base leading-relaxed mb-8 font-light">
            Every ritual includes tailored consultation, precision cutting diagnostics, and luxury scalp treatments before styling.
          </p>

          {/* Price List */}
          <ul className="space-y-4 mb-8">
            {menuItems.map((item, idx) => (
              <li
                key={idx}
                className="flex items-center justify-between py-3 border-b border-white/10 hover:border-[#0088FF]/40 transition-colors group"
              >
                <div>
                  <span className="font-serif text-base md:text-lg text-white group-hover:text-sky-300 transition-colors font-medium">
                    {item.name}
                  </span>
                  <span className="block text-[11px] text-white/40 tracking-wider font-mono">
                    {item.time}
                  </span>
                </div>
                <span className="font-sans font-bold text-lg md:text-xl text-sky-300 group-hover:scale-110 transition-transform">
                  {item.price}
                </span>
              </li>
            ))}
          </ul>

          <div>
            <a
              href="https://wa.me/918078558027?text=Hello%20my%20%23ashtag%2C%20I%20would%20like%20to%20learn%20more%20about%20the%20Full%20Service%20Treatment."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-7 py-3 rounded-full border border-[#0088FF]/60 text-sky-300 hover:bg-[#0088FF] hover:text-white transition-all duration-300 font-serif italic text-sm tracking-wide shadow-md"
            >
              Learn More & Inquire
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

