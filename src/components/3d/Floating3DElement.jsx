import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * Reusable 3D Floating Element with GSAP ScrollTrigger Parallax & Continuous Idle Levitation
 *
 * @param {string} src - Image asset path (e.g., '/images/theshave/shears_left.png')
 * @param {string} alt - Alt description
 * @param {string} className - Absolute/relative positioning, responsive sizing, and z-index
 * @param {string} imgClassName - Additional styles on the <img> tag
 * @param {number} scrollSpeed - Vertical translation range during scroll (e.g., -120 to 150)
 * @param {[number, number]} rotateRange - Z-axis rotation range [fromDeg, toDeg] (e.g., [-18, 12])
 * @param {{ rotateX?: [number, number], rotateY?: [number, number] }} tilt3D - 3D pitch/yaw ranges
 * @param {[number, number]} scaleRange - Scale range during scroll [fromScale, toScale]
 * @param {number} idleY - Sine wave levitation amplitude in pixels (default: 8)
 * @param {number} idleRot - Sine wave tilt amplitude in degrees (default: 1.5)
 * @param {number} idleDuration - Levitation cycle duration in seconds (default: 3.2)
 * @param {'screen' | 'lighten' | 'normal'} blendMode - CSS mix-blend-mode (default: 'screen')
 * @param {boolean} useRadialMask - Soft radial edge fade to blend dark backgrounds cleanly (default: true)
 * @param {React.RefObject} triggerRef - Optional custom trigger element for ScrollTrigger
 */
export default function Floating3DElement({
  src,
  alt = '3D Salon Artifact',
  className = '',
  imgClassName = '',
  scrollSpeed = 100,
  rotateRange = [-15, 15],
  tilt3D = { rotateX: [-8, 8], rotateY: [-15, 15] },
  scaleRange = [0.95, 1.05],
  idleY = 8,
  idleRot = 1.5,
  idleDuration = 3.2,
  blendMode = 'screen',
  useRadialMask = true,
  triggerRef = null,
  style = {}
}) {
  const containerRef = useRef(null)
  const parallaxRef = useRef(null)
  const idleRef = useRef(null)

  useEffect(() => {
    const el = containerRef.current
    const parallax = parallaxRef.current
    const idle = idleRef.current
    if (!el || !parallax || !idle) return

    const ctx = gsap.context(() => {
      // 1. Continuous Subtle Idle Levitation (isolated in idleRef)
      gsap.to(idle, {
        y: `+=${idleY}`,
        rotationZ: `+=${idleRot}`,
        duration: idleDuration,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      })

      // 2. ScrollTrigger 3D Parallax & Rotation (isolated in parallaxRef)
      const rotZStart = rotateRange?.[0] ?? -10
      const rotZEnd = rotateRange?.[1] ?? 10
      const rotXStart = tilt3D?.rotateX?.[0] ?? -5
      const rotXEnd = tilt3D?.rotateX?.[1] ?? 5
      const rotYStart = tilt3D?.rotateY?.[0] ?? -12
      const rotYEnd = tilt3D?.rotateY?.[1] ?? 12
      const scaleStart = scaleRange?.[0] ?? 0.95
      const scaleEnd = scaleRange?.[1] ?? 1.05

      gsap.fromTo(
        parallax,
        {
          y: -scrollSpeed * 0.5,
          rotationZ: rotZStart,
          rotationX: rotXStart,
          rotationY: rotYStart,
          scale: scaleStart,
          transformPerspective: 1200
        },
        {
          y: scrollSpeed * 0.5,
          rotationZ: rotZEnd,
          rotationX: rotXEnd,
          rotationY: rotYEnd,
          scale: scaleEnd,
          ease: 'none',
          scrollTrigger: {
            trigger: triggerRef?.current || el,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.2
          }
        }
      )
    }, el)

    return () => ctx.revert()
  }, [
    scrollSpeed,
    rotateRange,
    tilt3D,
    scaleRange,
    idleY,
    idleRot,
    idleDuration,
    triggerRef
  ])

  return (
    <div
      ref={containerRef}
      className={`pointer-events-none select-none [perspective:1200px] ${className}`}
      style={{
        transformStyle: 'preserve-3d',
        ...style
      }}
    >
      <div
        ref={parallaxRef}
        className="w-full h-full transform-gpu"
        style={{ transformStyle: 'preserve-3d' }}
      >
        <div ref={idleRef} className="relative w-full h-full transform-gpu">
          {/* Subtle Ambient Electric Blue Studio Glow behind the 3D element */}
          <div className="absolute inset-0 bg-[#0088FF]/15 blur-[35px] rounded-full pointer-events-none scale-75 opacity-70" />

          {/* The Cutout 3D Element Image */}
          <img
            src={src}
            alt={alt}
            className={`w-full h-auto object-contain block transform-gpu ${imgClassName}`}
            style={{
              filter:
                'drop-shadow(0 25px 35px rgba(0,0,0,0.85)) drop-shadow(0 8px 18px rgba(0,140,255,0.25))',
              mixBlendMode: blendMode,
              maskImage: useRadialMask
                ? 'radial-gradient(ellipse 90% 90% at center, black 75%, rgba(0,0,0,0.8) 90%, transparent 100%)'
                : undefined,
              WebkitMaskImage: useRadialMask
                ? 'radial-gradient(ellipse 90% 90% at center, black 75%, rgba(0,0,0,0.8) 90%, transparent 100%)'
                : undefined
            }}
            loading="lazy"
          />
        </div>
      </div>
    </div>
  )
}
