import React from 'react'

export default function BrandLogo({ size = 'md', className = '' }) {
  const isLg = size === 'lg'

  return (
    <div className={`flex flex-col leading-none select-none group cursor-pointer ${className}`}>
      {/* Brand Name Lockup: my # ashtag */}
      <div className="flex items-baseline">
        <span
          className={`font-serif italic text-sky-400 font-bold -mr-0.5 tracking-tight transition-transform duration-300 group-hover:scale-105 ${
            isLg ? 'text-sm sm:text-base -translate-y-1.5' : 'text-[11px] sm:text-xs -translate-y-1'
          }`}
        >
          my
        </span>
        <span
          className={`font-sans font-black text-[#00A8E8] tracking-tight transition-colors duration-300 group-hover:text-cyan-300 ${
            isLg ? 'text-3xl sm:text-4xl' : 'text-2xl sm:text-3xl'
          }`}
        >
          #
        </span>
        <span
          className={`font-sans font-black text-white tracking-tight uppercase ${
            isLg ? 'text-2xl sm:text-3xl' : 'text-xl sm:text-2xl'
          }`}
        >
          ashtag
        </span>
      </div>

      {/* Micro Subtitle: The Ultimate Unisex Salon */}
      <span
        className={`uppercase tracking-[0.22em] text-sky-400/85 font-medium -mt-0.5 transition-colors duration-300 group-hover:text-sky-300 ${
          isLg ? 'text-[10px] sm:text-xs' : 'text-[8.5px] sm:text-[9.5px]'
        }`}
      >
        The Ultimate Unisex Salon
      </span>
    </div>
  )
}

