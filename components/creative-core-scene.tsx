'use client'

import { Html, Line } from '@react-three/drei'
import { Canvas, useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import type { Group } from 'three'
import { entryCards } from '@/lib/site'

const positions: [number, number, number][] = [
  [-3.3, 1.8, 0.2],
  [0, 2.55, -0.4],
  [3.3, 1.8, 0.2],
  [-3.65, -0.45, -0.2],
  [3.65, -0.45, -0.2],
  [-2.25, -2.2, 0.15],
  [2.25, -2.2, 0.15],
]

function Network({ reducedMotion }: { reducedMotion: boolean }) {
  const group = useRef<Group>(null)

  useFrame((state, delta) => {
    if (!group.current || reducedMotion) return
    group.current.rotation.y += delta * 0.025
    group.current.position.y = Math.sin(state.clock.elapsedTime * 0.45) * 0.06
  })

  return (
    <group ref={group}>
      <mesh>
        <sphereGeometry args={[1.08, 40, 40]} />
        <meshPhysicalMaterial
          color="#67e2f5"
          emissive="#67e2f5"
          emissiveIntensity={0.18}
          roughness={0.28}
          metalness={0.08}
          transmission={0.25}
          transparent
          opacity={0.72}
        />
      </mesh>
      <mesh rotation={[Math.PI / 2.6, 0.15, 0]}>
        <torusGeometry args={[1.48, 0.008, 8, 96]} />
        <meshBasicMaterial color="#c8f065" transparent opacity={0.55} />
      </mesh>
      <mesh rotation={[Math.PI / 1.8, 0.65, 0.4]}>
        <torusGeometry args={[1.76, 0.006, 8, 96]} />
        <meshBasicMaterial color="#67e2f5" transparent opacity={0.3} />
      </mesh>

      <Html center transform distanceFactor={8.5} position={[0, 0, 1.12]}>
        <div className="core-label pointer-events-none select-none text-center">
          <span className="block font-mono text-[8px] tracking-[0.26em] text-primary-foreground">UNITED STUDIO</span>
          <strong className="mt-1 block whitespace-nowrap text-sm text-primary-foreground">Creative Core</strong>
        </div>
      </Html>

      {entryCards.map((entry, index) => {
        const point = positions[index]
        return (
          <group key={entry.code}>
            <Line points={[[0, 0, 0], point]} color={index % 3 === 1 ? '#c8f065' : '#67e2f5'} lineWidth={0.55} transparent opacity={0.38} />
            <mesh position={point}>
              <sphereGeometry args={[0.085, 16, 16]} />
              <meshBasicMaterial color={index % 3 === 1 ? '#c8f065' : '#67e2f5'} />
            </mesh>
            <Html center position={point} zIndexRange={[20, 0]}>
              <a
                href={entry.href}
                target={entry.external ? '_blank' : undefined}
                rel={entry.external ? 'noopener noreferrer' : undefined}
                className="core-node group"
                aria-label={`${entry.title}${entry.external ? '（新しいタブで開く）' : ''}`}
              >
                <span className="font-mono text-[9px] tracking-[0.16em] text-accent">{entry.code}</span>
                <strong>{entry.title}</strong>
                <span className="core-node-arrow" aria-hidden="true">↗</span>
              </a>
            </Html>
          </group>
        )
      })}
    </group>
  )
}

export default function CreativeCoreScene({ reducedMotion = false }: { reducedMotion?: boolean }) {
  return (
    <Canvas
      camera={{ position: [0, 0, 8.4], fov: 44 }}
      dpr={[1, 1.5]}
      gl={{ alpha: true, antialias: true, powerPreference: 'high-performance' }}
      aria-label="United Studioの創作システム。中央のCreative Coreから7つの入口へつながります。"
    >
      <ambientLight intensity={0.7} />
      <pointLight position={[2, 3, 5]} color="#67e2f5" intensity={20} />
      <Network reducedMotion={reducedMotion} />
    </Canvas>
  )
}
