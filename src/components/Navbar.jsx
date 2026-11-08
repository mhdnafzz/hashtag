import React, { useState, useEffect } from 'react'
import { Menu, X, Calendar } from 'lucide-react'
import BrandLogo from './BrandLogo'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-400 ${
        scrolled
          ? 'bg-charcoal-950/90 backdrop-blur-md border-b border-[#0088FF]/20 py-3 sm:py-3.5 shadow-2xl'
          : 'bg-transparent py-4 sm:py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 flex items-center justify-between">
        {/* Brand Logo: my #ashtag */}
        <a href="#hero" className="flex items-center">
          <BrandLogo />
        </a>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-8">
          <a
            href="#experience"
            className="text-xs uppercase tracking-[0.2em] font-medium text-white/70 hover:text-cyan-400 transition-colors"
          >
            3D Experience
          </a>
          <a
            href="#services"
            className="text-xs uppercase tracking-[0.2em] font-medium text-white/70 hover:text-cyan-400 transition-colors"
          >
            Services
          </a>
          <a
            href="#menu"
            className="text-xs uppercase tracking-[0.2em] font-medium text-white/70 hover:text-cyan-400 transition-colors"
          >
            Menu
          </a>
          <a
            href="#barbers"
            className="text-xs uppercase tracking-[0.2em] font-medium text-white/70 hover:text-cyan-400 transition-colors"
          >
            Stylists
          </a>
          <a
            href="#testimonial"
            className="text-xs uppercase tracking-[0.2em] font-medium text-white/70 hover:text-cyan-400 transition-colors"
          >
            Testimonial
          </a>
          <a
            href="#booking"
            className="text-xs uppercase tracking-[0.2em] font-medium text-white/70 hover:text-cyan-400 transition-colors"
          >
            Reservation
          </a>
        </nav>

        {/* Right CTA */}
        <div className="hidden md:flex items-center gap-4">
          <a
            href="#booking"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-[#0052D4] via-[#0077FF] to-[#00B4DB] text-white font-serif font-bold text-xs uppercase tracking-[0.14em] transition-all duration-300 shadow-[0_0_25px_rgba(0,140,255,0.4)] hover:shadow-[0_0_35px_rgba(0,180,219,0.6)] hover:scale-105"
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Book Now</span>
          </a>
        </div>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden text-white/80 hover:text-cyan-400 p-2 transition-colors"
          aria-label="Toggle Navigation"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#070B14]/98 backdrop-blur-xl border-b border-[#0088FF]/20 px-6 py-8 flex flex-col gap-6 animate-fadeIn">
          <a
            href="#experience"
            onClick={() => setMobileMenuOpen(false)}
            className="text-sm uppercase tracking-widest text-white/80 hover:text-cyan-400"
          >
            3D Experience
          </a>
          <a
            href="#services"
            onClick={() => setMobileMenuOpen(false)}
            className="text-sm uppercase tracking-widest text-white/80 hover:text-cyan-400"
          >
            Services
          </a>
          <a
            href="#menu"
            onClick={() => setMobileMenuOpen(false)}
            className="text-sm uppercase tracking-widest text-white/80 hover:text-cyan-400"
          >
            Menu & Salon
          </a>
          <a
            href="#barbers"
            onClick={() => setMobileMenuOpen(false)}
            className="text-sm uppercase tracking-widest text-white/80 hover:text-cyan-400"
          >
            Stylists
          </a>
          <a
            href="#booking"
            onClick={() => setMobileMenuOpen(false)}
            className="inline-flex justify-center items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-[#0052D4] via-[#0077FF] to-[#00B4DB] text-white font-serif font-bold text-xs uppercase tracking-[0.15em] shadow-[0_0_25px_rgba(0,140,255,0.4)]"
          >
            Book Appointment
          </a>
        </div>
      )}
    </header>
  )
}

