import { useRef, useEffect, Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Text } from '@react-three/drei'
import * as THREE from 'three'
import { useReducedMotion } from '../hooks/useReducedMotion'
import { useIsCoarsePointer } from '../hooks/useIsCoarsePointer'

function FloatingPacket({ sent }) {
  const ref = useRef()
  useFrame((state) => {
    if (!ref.current) return
    const t = state.clock.elapsedTime
    ref.current.position.x = Math.cos(t * 0.5) * 1.2
    ref.current.position.y = Math.sin(t * 0.8) * 0.5
    ref.current.position.z = Math.sin(t * 0.5) * 0.5
  })
  return (
    <group ref={ref}>
      <mesh>
        <boxGeometry args={[0.08, 0.08, 0.08]} />
        <meshBasicMaterial color={sent ? '#22c55e' : '#a6fff3'} />
      </mesh>
      <pointLight color={sent ? '#22c55e' : '#a6fff3'} intensity={0.4} distance={2} />
    </group>
  )
}

function NetworkNodes({ sent }) {
  const groupRef = useRef()
  const nodes = useRef(
    Array.from({ length: 6 }, (_, i) => ({
      id: i,
      angle: (i / 6) * Math.PI * 2,
      y: (i % 2 === 0 ? 0.4 : -0.4),
    })),
  )
  useFrame((state, dt) => {
    if (!groupRef.current) return
    groupRef.current.rotation.y += dt * 0.3
  })
  return (
    <group ref={groupRef}>
      {nodes.current.map((n, i) => {
        const x = Math.cos(n.angle) * 0.8
        const z = Math.sin(n.angle) * 0.8
        return (
          <group key={n.id} position={[x, n.y, z]}>
            <mesh>
              <sphereGeometry args={[0.04, 12, 12]} />
              <meshBasicMaterial color={sent ? '#22c55e' : '#00a8e8'} />
            </mesh>
            {i < nodes.current.length - 1 && (
              <line>
                <bufferGeometry
                  attach="geometry"
                  onUpdate={(g) => {
                    const next = nodes.current[i + 1]
                    g.setFromPoints([
                      new THREE.Vector3(0, 0, 0),
                      new THREE.Vector3(
                        Math.cos(next.angle) * 0.8 - x,
                        next.y - n.y,
                        Math.sin(next.angle) * 0.8 - z,
                      ),
                    ])
                  }}
                />
                <lineBasicMaterial color={sent ? '#22c55e' : '#00a8e8'} transparent opacity={0.4} />
              </line>
            )}
          </group>
        )
      })}
    </group>
  )
}

function PromptCursor() {
  const ref = useRef()
  useFrame((state) => {
    if (!ref.current) return
    ref.current.position.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.5
  })
  return (
    <group ref={ref} position={[0, 0, 0]}>
      <mesh>
        <planeGeometry args={[0.4, 0.15]} />
        <meshBasicMaterial color="#0a0d14" transparent opacity={0.9} />
      </mesh>
      <Text
        position={[0, 0, 0.01]}
        fontSize={0.06}
        color="#a6fff3"
        anchorX="center"
        anchorY="middle"
      >
        {'> _'}
      </Text>
    </group>
  )
}

function Scene({ sent }) {
  return (
    <>
      <ambientLight intensity={0.5} color="#00a8e8" />
      <pointLight position={[2, 2, 2]} color="#00a8e8" intensity={1.2} distance={6} />
      <pointLight position={[-2, -1, 1]} color="#a6fff3" intensity={0.8} distance={6} />

      <FloatingPacket sent={sent} />
      <NetworkNodes sent={sent} />
      <PromptCursor />
    </>
  )
}

export const ContactTerminalScene = ({ sent }) => {
  const isCoarse = useIsCoarsePointer()
  const reduced = useReducedMotion()

  if (isCoarse || reduced) {
    return (
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        <div className="absolute inset-0 grid-backdrop opacity-30" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full bg-radial-fade" />
      </div>
    )
  }

  return (
    <Canvas
      dpr={[1, 1.4]}
      camera={{ position: [0, 0, 2.4], fov: 50 }}
      gl={{ antialias: true, alpha: true, powerPreference: 'low-power' }}
      style={{ background: 'transparent' }}
    >
      <Suspense fallback={null}>
        <Scene sent={sent} />
      </Suspense>
    </Canvas>
  )
}
