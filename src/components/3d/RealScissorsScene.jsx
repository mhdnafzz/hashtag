import React, { useRef, useMemo, Suspense } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useGLTF, Environment, Center } from '@react-three/drei'
import * as THREE from 'three'

/**
 * Photorealistic Barber Shears 3D Model with PBR Material Overrides & Centered Framing
 * - Camera: position [0, 0, 8.5], fov: 45
 * - Position: [0, -0.3, 0]
 * - Scale: isMobile ? 0.55 : 0.75 (entire scissor from finger rings to tips stays 100% visible)
 * - Ultra-high metallic chrome surgical steel (metalness: 0.98, roughness: 0.12, clearcoat: 1.0)
 * - Anodized Electric Blue Tension Pivot Screw (color: #0088FF, metalness: 0.95, roughness: 0.15)
 * - Frame-rate independent lerped scroll rotation & dynamic scissor cutting snip
 */
function ScissorModel({ scrollProgress = 0 }) {
  const groupRef = useRef(null)
  const { scene } = useGLTF('/scissors.glb')
  const { size } = useThree()
  const isMobile = size.width < 768

  // Scale: 0.55 on mobile, 0.75 on desktop so blades & rings never clip
  const modelScale = isMobile ? 0.55 : 0.75
  const basePosY = -0.3

  // Clone scene so materials and transformations are isolated and clean
  const clonedScene = useMemo(() => scene.clone(true), [scene])

  // PBR Ultra-High Metallic Chrome Surgical Steel Material
  const steelMaterial = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: new THREE.Color('#ffffff'),
        metalness: 0.95,
        roughness: 0.12,
        clearcoat: 1.0,
        clearcoatRoughness: 0.1,
        reflectivity: 1.0,
        envMapIntensity: 3.0
      }),
    []
  )

  // Contrasting Luxury Anodized Electric Blue Tension Pivot Screw Material
  const blueTensionMaterial = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: new THREE.Color('#0088FF'),
        metalness: 0.95,
        roughness: 0.15,
        clearcoat: 1.0,
        clearcoatRoughness: 0.1,
        reflectivity: 0.9,
        envMapIntensity: 2.5
      }),
    []
  )

  // Matte Black Silicone Rubber Grip Inserts & Silencer Bumper
  const rubberMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color('#14161a'),
        roughness: 0.65,
        metalness: 0.1
      }),
    []
  )

  // Deep Obsidian Onyx Jewel Inlay
  const jewelMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color('#0a0c10'),
        roughness: 0.08,
        metalness: 0.95
      }),
    []
  )

  // Traverse the model and override all meshes with professional PBR materials
  useMemo(() => {
    clonedScene.traverse((child) => {
      if (child.isMesh) {
        const name = (child.name || '').toLowerCase()
        const parentName = (child.parent?.name || '').toLowerCase()

        if (
          name.includes('pivot') ||
          name.includes('screw') ||
          name.includes('dial') ||
          name.includes('collar') ||
          name.includes('nut') ||
          name.includes('ridge') ||
          parentName.includes('pivot')
        ) {
          child.material = blueTensionMaterial
        } else if (
          name.includes('rubber') ||
          name.includes('insert') ||
          name.includes('bumper')
        ) {
          child.material = rubberMaterial
        } else if (name.includes('jewel')) {
          child.material = jewelMaterial
        } else {
          child.material = steelMaterial
        }

        child.castShadow = true
        child.receiveShadow = true
      }
    })
  }, [clonedScene, steelMaterial, blueTensionMaterial, rubberMaterial, jewelMaterial])

  // Smooth frame-rate independent lerping physics in useFrame
  useFrame((state, delta) => {
    const group = groupRef.current
    if (!group) return
    const t = state.clock.getElapsedTime()

    // 1. Calculate Target Rotations tied to GSAP scrollProgress
    const targetRotY = scrollProgress * Math.PI * 2.2 + Math.sin(t * 0.45) * 0.12
    const targetRotX = 0.22 + scrollProgress * 0.52 + Math.cos(t * 0.55) * 0.06
    const targetRotZ = -0.32 + scrollProgress * 0.58 + Math.sin(t * 0.35) * 0.05
    // Subtle floating idle levitation
    const targetPosY = basePosY + Math.sin(t * 1.5) * 0.04

    // 2. Smooth Lerp Interpolation (damping factor)
    const lerpRate = Math.min(1, delta * 6.5)
    group.rotation.y = THREE.MathUtils.lerp(group.rotation.y, targetRotY, lerpRate)
    group.rotation.x = THREE.MathUtils.lerp(group.rotation.x, targetRotX, lerpRate)
    group.rotation.z = THREE.MathUtils.lerp(group.rotation.z, targetRotZ, lerpRate)
    group.position.y = THREE.MathUtils.lerp(group.position.y, targetPosY, lerpRate)

    // 3. Dynamic Shearing Snip Animation (blades open & close dynamically on scroll)
    const half1 = clonedScene.getObjectByName('ShearHalf_FingerLoop')
    const half2 = clonedScene.getObjectByName('ShearHalf_ThumbLoop')
    if (half1 && half2) {
      const targetSnip = 0.06 + Math.abs(Math.sin(scrollProgress * Math.PI * 3.5)) * 0.28
      half1.rotation.z = THREE.MathUtils.lerp(half1.rotation.z, targetSnip, lerpRate)
      half2.rotation.z = THREE.MathUtils.lerp(half2.rotation.z, -targetSnip, lerpRate)
    }
  })

  return (
    <Center position={[0, basePosY, 0]}>
      <group ref={groupRef} scale={modelScale}>
        <primitive object={clonedScene} />
      </group>
    </Center>
  )
}

useGLTF.preload('/scissors.glb')

/**
 * Complete 3D Canvas Scene with Hero Product Lighting & Studio HDRI Environment
 */
export default function RealScissorsScene({ scrollProgress = 0, className = '' }) {
  return (
    <div
      className={`relative w-full h-full flex items-center justify-center pointer-events-auto select-none overflow-hidden ${className}`}
    >
      {/* Background Subtle Radial Spotlight & Electric Blue / Cyan Glow */}
      <div className="absolute inset-0 bg-radial-spot pointer-events-none opacity-80" />
      <div className="absolute w-[360px] sm:w-[500px] h-[360px] sm:h-[500px] rounded-full bg-[#0052D4]/20 blur-[140px] pointer-events-none" />
      <div className="absolute w-[260px] sm:w-[360px] h-[260px] sm:h-[360px] rounded-full bg-[#00A8E8]/20 blur-[100px] pointer-events-none" />

      {/* React Three Fiber Canvas with zoomed-out camera */}
      <Canvas
        camera={{ position: [0, 0, 8.5], fov: 45 }}
        gl={{
          antialias: true,
          alpha: true,
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.3
        }}
        className="w-full h-full cursor-grab active:cursor-grabbing"
      >
        {/* HERO PRODUCT LIGHTING SETUP */}
        {/* Subtle cyan-slate AmbientLight (intensity: 0.65) */}
        <ambientLight intensity={0.65} color="#94b8db" />

        {/* Sharp Key DirectionalLight (intensity: 4.5, position: [5, 5, 4], crisp cool daylight: #f4f8ff) */}
        <directionalLight
          position={[5, 5, 4]}
          intensity={4.5}
          color="#f4f8ff"
          castShadow
        />

        {/* Electric Blue Rim / Accent Light (intensity: 4.0, position: [-5, -5, -2], color: #00A8E8) */}
        <directionalLight
          position={[-5, -5, -2]}
          intensity={4.0}
          color="#00A8E8"
        />

        {/* Top Specular Accent Light with subtle cyan sheen */}
        <pointLight position={[0, 4, 3]} intensity={2.8} color="#e0f2fe" distance={10} />

        {/* Studio Reflection Environment Map */}
        <Suspense fallback={null}>
          <Environment preset="studio" />
        </Suspense>

        {/* The Photorealistic PBR Scissors Model */}
        <Suspense fallback={null}>
          <ScissorModel scrollProgress={scrollProgress} />
        </Suspense>
      </Canvas>

      {/* Floating 3D Interaction Pill Badge (positioned safely within bounds on all screen sizes) */}
      <div className="absolute top-4 left-4 right-4 sm:left-auto sm:right-4 max-w-[calc(100%-2rem)] truncate text-xs px-3.5 py-1.5 z-20 flex items-center justify-center sm:justify-start gap-2 rounded-full bg-[#070B14]/90 backdrop-blur-md border border-[#0088FF]/30 uppercase tracking-widest text-sky-200/80 pointer-events-none shadow-lg shadow-sky-950/40">
        <span className="w-1.5 h-1.5 rounded-full bg-[#00A8E8] shadow-[0_0_8px_#00A8E8] animate-ping shrink-0" />
        <span className="truncate">PBR 3D Barber Shears · Studio Light</span>
      </div>
    </div>
  )
}
