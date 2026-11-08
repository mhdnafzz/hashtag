import React, { useState } from 'react'
import { Calendar, User, Scissors, ShieldCheck, Sparkles, Coffee } from 'lucide-react'
import Floating3DElement from './3d/Floating3DElement'

export default function BookingForm() {
  const [service, setService] = useState('')
  const [date, setDate] = useState('')
  const [barber, setBarber] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)

    const text = `Hello my #ashtag! I would like to reserve a VIP salon appointment:
- Service: ${service || 'Classic Haircut ($45)'}
- Date: ${date || 'Earliest available'}
- Stylist: ${barber || 'First Available Stylist'}

Please confirm my reservation time. Thank you!`

    const waUrl = `https://wa.me/918078558027?text=${encodeURIComponent(text)}`
    setTimeout(() => {
      window.open(waUrl, '_blank')
    }, 350)
  }

  return (
    <section id="booking" className="relative py-28 px-6 md:px-16 lg:px-24 bg-[#05070B] overflow-hidden">
      {/* Background radial spotlight glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,119,255,0.1)_0%,transparent_70%)] pointer-events-none" />

      {/* Floating 3D Comb & Shears along the outer margins */}
      <Floating3DElement
        src="/images/theshave/comb.png"
        alt="3D Floating Comb"
        className="absolute -left-6 md:left-6 top-1/4 w-28 md:w-44 z-10 opacity-75 md:opacity-95"
        scrollSpeed={-130}
        rotateRange={[-28, 14]}
        tilt3D={{ rotateX: [-12, 10], rotateY: [15, -15] }}
        scaleRange={[0.9, 1.05]}
        blendMode="screen"
        useRadialMask={true}
      />

      <Floating3DElement
        src="/images/theshave/shears_right.png"
        alt="3D Floating Shears Right"
        className="absolute -right-8 md:right-8 bottom-6 w-36 md:w-52 z-10 opacity-75 md:opacity-95"
        scrollSpeed={160}
        rotateRange={[18, -22]}
        tilt3D={{ rotateX: [14, -10], rotateY: [-22, 16] }}
        scaleRange={[0.92, 1.1]}
        blendMode="screen"
        useRadialMask={true}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center max-w-xl mx-auto mb-16">
          <p className="text-xs uppercase tracking-[0.28em] text-[#00A8E8] font-bold mb-3 font-sans">
            VIP PRIORITY RESERVATION
          </p>
          <h2 className="text-3xl md:text-5xl font-bold font-serif uppercase tracking-tight text-white mb-4">
            BOOK AN APPOINTMENT
          </h2>
          <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-[#00A8E8] to-transparent mx-auto" />
        </div>

        {/* 3-Column Showcase: Left Glass Card, Center Form Card, Right Glass Card */}
        <div className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-12">
          {/* ─────────────────────────────────────────────────────────────
              LEFT FLOATING CARD: VINTAGE LEATHER BARBER CHAIR & PRIVATE SUITE
          ───────────────────────────────────────────────────────────── */}
          <div className="hidden lg:flex w-64 xl:w-72 -rotate-6 transform transition-all duration-500 hover:rotate-0 hover:scale-105 rounded-3xl p-3.5 backdrop-blur-md bg-white/5 border border-[#0088FF]/30 shadow-[0_25px_60px_rgba(0,0,0,0.85)] flex-col gap-3 group">
            <div className="h-44 w-full rounded-2xl overflow-hidden relative">
              <img
                src="/images/theshave/barber_chair.jpg"
                alt="Vintage Handcrafted Leather Barber Chair"
                className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#05070B]/80 via-transparent to-transparent" />
              <div className="absolute top-3 left-3">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#05070B]/90 backdrop-blur-md border border-[#0088FF]/30 text-[9px] font-bold text-sky-300 uppercase tracking-wider">
                  <Coffee className="w-3 h-3 text-sky-400" />
                  VIP Amenity
                </span>
              </div>
            </div>

            <div className="p-1">
              <div className="mb-2">
                <span className="inline-block px-2.5 py-1 rounded-full bg-[#0077FF]/15 border border-[#0088FF]/30 text-[9px] font-bold text-sky-300 uppercase tracking-widest leading-none mb-1.5">
                  PRIVATE SUITE • BESPOKE HOSPITALITY
                </span>
                <h4 className="font-serif font-bold text-white text-base tracking-wide">
                  The Belmont Suite
                </h4>
              </div>
              <p className="text-white/60 text-xs leading-relaxed font-light">
                Hand-stitched leather reclining chair, private acoustic partitioning, and tailored hair consultation.
              </p>
            </div>
          </div>

          {/* ─────────────────────────────────────────────────────────────
              CENTER: DIRECT RESERVATION FORM CARD
          ───────────────────────────────────────────────────────────── */}
          <div className="w-full max-w-md bg-[#070B14]/90 backdrop-blur-xl border border-[#0088FF]/40 rounded-3xl p-8 md:p-10 shadow-[0_30px_80px_rgba(0,119,255,0.22)] relative z-20">
            <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/10">
              <div>
                <h3 className="text-xl font-bold font-serif text-white uppercase tracking-wider">
                  Direct Reservation
                </h3>
                <p className="text-xs text-white/50">Instant WhatsApp Concierge Confirmation</p>
              </div>
              <ShieldCheck className="w-6 h-6 text-[#00A8E8]" />
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Service Select */}
              <div>
                <label className="block text-[11px] uppercase tracking-widest text-[#00A8E8] font-bold mb-2">
                  Select Service
                </label>
                <div className="relative">
                  <select
                    value={service}
                    onChange={(e) => setService(e.target.value)}
                    required
                    className="w-full bg-[#05070B] border border-white/20 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#00A8E8] transition-colors appearance-none cursor-pointer"
                  >
                    <option value="" disabled>Choose your ritual...</option>
                    <option value="Classic Haircut ($45)">Classic Haircut — $45</option>
                    <option value="Beard Grooming ($35)">Beard Grooming — $35</option>
                    <option value="Hot Towel Shave ($50)">Hot Towel Shave — $50</option>
                    <option value="Full Service Treatment ($80)">Full Service Treatment — $80</option>
                  </select>
                  <Scissors className="w-4 h-4 text-white/40 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>

              {/* Date Select */}
              <div>
                <label className="block text-[11px] uppercase tracking-widest text-[#00A8E8] font-bold mb-2">
                  Select Preferred Date
                </label>
                <div className="relative">
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    required
                    className="w-full bg-[#05070B] border border-white/20 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#00A8E8] transition-colors cursor-pointer"
                  />
                </div>
              </div>

              {/* Barber Select */}
              <div>
                <label className="block text-[11px] uppercase tracking-widest text-[#00A8E8] font-bold mb-2">
                  Select Stylist
                </label>
                <div className="relative">
                  <select
                    value={barber}
                    onChange={(e) => setBarber(e.target.value)}
                    required
                    className="w-full bg-[#05070B] border border-white/20 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#00A8E8] transition-colors appearance-none cursor-pointer"
                  >
                    <option value="" disabled>Select your specialist...</option>
                    <option value="Marco (Master Barber)">Marco — Master Barber</option>
                    <option value="Andre (Senior Stylist)">Andre — Senior Stylist</option>
                    <option value="Leo (Beard Specialist)">Leo — Beard Specialist</option>
                    <option value="First Available Master Barber">First Available Stylist</option>
                  </select>
                  <User className="w-4 h-4 text-white/40 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                className="w-full py-4 rounded-full bg-gradient-to-r from-[#0052D4] via-[#0077FF] to-[#00B4DB] text-white font-serif font-bold text-xs uppercase tracking-[0.18em] transition-all duration-300 shadow-[0_0_25px_rgba(0,140,255,0.4)] hover:shadow-[0_0_35px_rgba(0,180,219,0.7)] hover:scale-[1.02] flex items-center justify-center gap-2 mt-4"
              >
                <span>RESERVE NOW</span>
              </button>

              <p className="text-[10px] text-center text-white/40 uppercase tracking-widest pt-2">
                Complimentary cancellation up to 2 hours prior
              </p>
            </form>
          </div>

          {/* ─────────────────────────────────────────────────────────────
              RIGHT FLOATING CARD: STERILIZED TOOLS & HOT TOWEL RITUAL
          ───────────────────────────────────────────────────────────── */}
          <div className="hidden lg:flex w-64 xl:w-72 rotate-6 transform transition-all duration-500 hover:rotate-0 hover:scale-105 rounded-3xl p-3.5 backdrop-blur-md bg-white/5 border border-[#0088FF]/30 shadow-[0_25px_60px_rgba(0,0,0,0.85)] flex-col gap-3 group">
            <div className="h-44 w-full rounded-2xl overflow-hidden relative">
              <img
                src="/images/theshave/tray_clean.jpg"
                alt="Sterilized Straight Razors and Artisan Tools"
                className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#05070B]/80 via-transparent to-transparent" />
              <div className="absolute top-3 left-3">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#05070B]/90 backdrop-blur-md border border-[#0088FF]/30 text-[9px] font-bold text-sky-300 uppercase tracking-wider">
                  <Sparkles className="w-3 h-3 text-sky-400" />
                  Gold Standard
                </span>
              </div>
            </div>

            <div className="p-1">
              <div className="mb-2">
                <span className="inline-block px-2.5 py-1 rounded-full bg-[#0077FF]/15 border border-[#0088FF]/30 text-[9px] font-bold text-sky-300 uppercase tracking-widest leading-none mb-1.5">
                  100% STERILIZED TOOLS • MASTER ARTISANS
                </span>
                <h4 className="font-serif font-bold text-white text-base tracking-wide">
                  Sanitary Excellence
                </h4>
              </div>
              <p className="text-white/60 text-xs leading-relaxed font-light">
                Medical-grade UV autoclave sterilization, single-use Japanese blades, and botanical eucalyptus hot towels.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
