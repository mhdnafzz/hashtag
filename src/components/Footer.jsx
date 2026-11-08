import React from 'react'
import BrandLogo from './BrandLogo'

export default function Footer() {
  return (
    <footer className="relative bg-[#05070B] border-t border-[#0088FF]/20 pt-16 pb-12 px-6 md:px-16 lg:px-24">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-white/10">
          {/* Brand Col */}
          <div className="lg:col-span-5">
            <div className="mb-4">
              <BrandLogo size="lg" />
            </div>
            <p className="text-white/60 text-xs md:text-sm leading-relaxed max-w-sm mb-6 font-light">
              An avant-garde sanctuary dedicated to bespoke hairstyling, precision grooming, and unhurried unisex self-care rituals crafted for the distinguished presence.
            </p>
            <div className="flex items-center gap-3 text-xs text-cyan-400">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_10px_#00A8E8]" />
              <span className="tracking-widest uppercase font-semibold text-[11px]">
                Now Welcoming Online Appointments
              </span>
            </div>
          </div>

          {/* Location Col */}
          <div className="lg:col-span-3">
            <h5 className="font-serif font-bold text-xs uppercase tracking-[0.22em] text-white mb-4">
              LOCATION
            </h5>
            <p className="text-white/70 text-xs md:text-sm leading-relaxed font-light">
              My Hashtag Unisex Salon<br />
              Chirakkakam, Near IOC Petrol Pump<br />
              Varappuzha, Kerala<br />
              Tel: +91 8078558027
            </p>
          </div>

          {/* Hours Col */}
          <div className="lg:col-span-2">
            <h5 className="font-serif font-bold text-xs uppercase tracking-[0.22em] text-white mb-4">
              HOURS
            </h5>
            <p className="text-white/70 text-xs leading-relaxed font-light">
              Mon – Fri: 9:00 AM – 8:00 PM<br />
              Saturday: 9:00 AM – 8:00 PM<br />
              Sunday: 9:30 AM – 7:00 PM
            </p>
          </div>

          {/* Connect Col */}
          <div className="lg:col-span-2">
            <h5 className="font-serif font-bold text-xs uppercase tracking-[0.22em] text-white mb-4">
              CONNECT
            </h5>
            <ul className="space-y-2 text-xs text-white/70">
              <li>
                <a
                  href="https://wa.me/918078558027"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-cyan-400 transition-colors"
                >
                  WhatsApp Concierge
                </a>
              </li>
              <li>
                <a
                  href="https://instagram.com/myhashtag_varappuzha"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-cyan-400 transition-colors"
                >
                  Instagram (@myhashtag_varappuzha)
                </a>
              </li>
              <li>
                <a
                  href="tel:+918078558027"
                  className="hover:text-cyan-400 transition-colors"
                >
                  Direct: +91 8078558027
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Line */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] text-white/40">
          <p>© {new Date().getFullYear()} my #ashtag (The Ultimate Unisex Salon). ALL RIGHTS RESERVED.</p>
          <div className="flex items-center gap-6">
            <a href="#privacy" className="hover:text-cyan-400 transition-colors">PRIVACY POLICY</a>
            <span>·</span>
            <a href="#terms" className="hover:text-cyan-400 transition-colors">TERMS OF SERVICE</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
