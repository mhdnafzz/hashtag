import React from 'react'

export default function Testimonial() {
  return (
    <section id="testimonial" className="relative py-28 px-6 md:px-16 lg:px-24 bg-[#060912] overflow-hidden border-t border-b border-[#0088FF]/15">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        {/* Left Photo: Walnut Grooming Tray */}
        <div className="lg:col-span-5 relative">
          <div className="rounded-3xl overflow-hidden border border-[#0088FF]/30 shadow-[0_30px_70px_rgba(0,0,0,0.9)] group">
            <img
              src="/images/theshave/tray_clean.jpg"
              alt="Artisan Walnut Grooming Tray with Straight Razor and Badger Brush"
              className="w-full h-[360px] md:h-[420px] object-cover transition-transform duration-700 group-hover:scale-105"
            />
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

