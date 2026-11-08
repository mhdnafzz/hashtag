import React, { useEffect } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import PinnedScrollSection from './components/PinnedScrollSection'
import Services from './components/Services'
import ChairShowcase from './components/ChairShowcase'
import Barbers from './components/Barbers'
import Testimonial from './components/Testimonial'
import BookingForm from './components/BookingForm'
import Footer from './components/Footer'

export default function App() {
  return (
    <div className="min-h-screen w-full max-w-[100vw] overflow-x-hidden bg-[#05070B] text-[#F5F1EB] selection:bg-[#0077FF] selection:text-white">
      {/* Fixed Luxury Navigation */}
      <Navbar />

      {/* Hero Section */}
      <Hero />

      {/* 
        Centerpiece: Pinned GSAP ScrollTrigger + React Three Fiber 3D Canvas
        - Mobile: Fullscreen Layered Stack with responsive 3D model framing
        - Desktop: Split 2-column layout (Left: Text, Right: 3D Canvas)
      */}
      <PinnedScrollSection />

      {/* Services Showcase Cards */}
      <Services />

      {/* Vintage Leather Barber Chair & Treatment Pricing Menu */}
      <ChairShowcase />

      {/* Meet Our Master Barbers */}
      <Barbers />

      {/* Testimonial & Walnut Tray Feature */}
      <Testimonial />

      {/* Online Reservation Form with 3D Mobile Mockups */}
      <BookingForm />

      {/* Luxury Footer */}
      <Footer />

      {/* Floating Direct WhatsApp Concierge Button (compact & safe on mobile) */}
      <a
        href="https://wa.me/918078558027?text=Hello%20my%20%23ashtag%2C%20I%20would%20like%20to%20book%20an%20appointment."
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-4 right-4 z-50 flex items-center gap-2 px-3 py-2 sm:px-4 sm:py-2.5 rounded-full bg-emerald-600/90 hover:bg-emerald-500 text-white shadow-[0_8px_25px_rgba(16,185,129,0.35)] backdrop-blur-md transition-all duration-300 hover:scale-105 group border border-emerald-400/20"
        aria-label="Direct WhatsApp Concierge"
      >
        <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
        <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider font-sans">
          <span className="sm:hidden">VIP WhatsApp</span>
          <span className="hidden sm:inline">WhatsApp Concierge</span>
        </span>
      </a>
    </div>
  )
}

