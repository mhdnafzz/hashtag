import React, { useRef, useMemo, useEffect, Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { useGLTF, Environment, Center } from '@react-three/drei'
import * as THREE from 'three'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * Photorealistic 3D Barber Shears Model Instance
 */
function ScissorMesh({ progressRef, reverse = false, scale = 0.75 }) {
  const groupRef = useRef(null)
  const { scene } = useGLTF('/scissors.glb')

  // Clone scene so every floating shear instance has isolated materials & transforms
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

  // Matte Black Silicone Rubber Grip Inserts
  const rubberMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color('#14161a'),
        roughness: 0.65,
        metalness: 0.1
      }),
    []
  )

  // Obsidian Onyx Jewel Inlay
  const jewelMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color('#0a0c10'),
        roughness: 0.08,
        metalness: 0.95
      }),
    []
  )

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
      }
    })
  }, [clonedScene, steelMaterial, blueTensionMaterial, rubberMaterial, jewelMaterial])

  useFrame((state, delta) => {
    const group = groupRef.current
    if (!group) return
    const t = state.clock.getElapsedTime()
    const p = progressRef.current ?? 0

    // Smooth frame-rate independent rotation tied to scroll progress
    const direction = reverse ? -1 : 1
    const targetRotY = direction * (p * Math.PI * 1.8 + Math.sin(t * 0.7) * 0.1)
    const targetRotX = 0.25 + p * 0.5 + Math.cos(t * 0.5) * 0.06
    const targetRotZ = -0.25 + direction * (p * 0.45) + Math.sin(t * 0.6) * 0.05
    const targetPosY = Math.sin(t * 1.4) * 0.06

    const lerpRate = Math.min(1, delta * 5.5)
    group.rotation.y = THREE.MathUtils.lerp(group.rotation.y, targetRotY, lerpRate)
    group.rotation.x = THREE.MathUtils.lerp(group.rotation.x, targetRotX, lerpRate)
    group.rotation.z = THREE.MathUtils.lerp(group.rotation.z, targetRotZ, lerpRate)
    group.position.y = THREE.MathUtils.lerp(group.position.y, targetPosY, lerpRate)

    // Dynamic scissor shearing snip on scroll
    const half1 = clonedScene.getObjectByName('ShearHalf_FingerLoop')
    const half2 = clonedScene.getObjectByName('ShearHalf_ThumbLoop')
    if (half1 && half2) {
      const snip = 0.05 + Math.abs(Math.sin(p * Math.PI * 2.5)) * 0.22
      half1.rotation.z = THREE.MathUtils.lerp(half1.rotation.z, snip, lerpRate)
      half2.rotation.z = THREE.MathUtils.lerp(half2.rotation.z, -snip, lerpRate)
    }
  })

  return (
    <Center>
      <group ref={groupRef} scale={scale}>
        <primitive object={clonedScene} />
      </group>
    </Center>
  )
}

useGLTF.preload('/scissors.glb')

/**
 * Reusable Real WebGL 3D Floating Scissor Component
 * - 100% Transparent WebGL Canvas (alpha: true, no rectangular edges or backgrounds)
 * - Real 3D PBR Chrome & Electric Blue Materials
 * - GSAP ScrollTrigger 3D Rotation with scrub: 1
 */
export default function Real3DFloatingShear({
  className = 'w-48 h-48 md:w-64 md:h-64 pointer-events-none',
  scale = 0.75,
  reverse = false,
  style = {}
}) {
  const containerRef = useRef(null)
  const progressRef = useRef(0)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    const st = ScrollTrigger.create({
      trigger: el,
      start: 'top bottom',
      end: 'bottom top',
      scrub: 1,
      onUpdate: (self) => {
        progressRef.current = self.progress
      }
    })

    return () => st.kill()
  }, [])

  return (
    <div
      ref={containerRef}
      className={`pointer-events-none select-none ${className}`}
      style={style}
    >
      <Canvas
        gl={{
          alpha: true,
          antialias: true,
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.25
        }}
        camera={{ position: [0, 0, 7.5], fov: 45 }}
        style={{ background: 'transparent' }}
      >
        {/* Crisp studio key light */}
        <ambientLight intensity={0.65} color="#94b8db" />
        <directionalLight position={[4, 5, 4]} intensity={4.5} color="#ffffff" />

        {/* Electric blue rim light matching #00A8E8 */}
        <directionalLight position={[-4, -4, -2]} intensity={3.8} color="#00A8E8" />
        <pointLight position={[0, 3, 2]} intensity={2.2} color="#e0f2fe" distance={8} />

        <Suspense fallback={null}>
          <Environment preset="studio" />
        </Suspense>

        <Suspense fallback={null}>
          <ScissorMesh progressRef={progressRef} reverse={reverse} scale={scale} />
        </Suspense>
      </Canvas>
    </div>
  )
}
