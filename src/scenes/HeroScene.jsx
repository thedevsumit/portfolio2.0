import { useRef, useMemo, useEffect, Suspense } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import {
  Sphere,
  MeshDistortMaterial,
  Text,
  Line,
} from '@react-three/drei'
import * as THREE from 'three'
import { useReducedMotion } from '../hooks/useReducedMotion'
import { useIsCoarsePointer } from '../hooks/useIsCoarsePointer'
import { useUIStore } from '../store/useUIStore'

const techTokens = [
  { name: 'React', radius: 2.4, speed: 0.32, y: 0.6, color: '#61dafb' },
  { name: 'Node', radius: 2.6, speed: -0.24, y: -0.4, color: '#3c873a' },
  { name: 'C++', radius: 2.2, speed: 0.4, y: 0.9, color: '#00599c' },
  { name: 'Mongo', radius: 2.8, speed: -0.2, y: -0.8, color: '#10aa50' },
  { name: 'Socket', radius: 2.5, speed: 0.28, y: 0.2, color: '#ffffff' },
  { name: 'Three', radius: 2.3, speed: -0.36, y: -0.6, color: '#a6fff3' },
]

function useGraphNodes(count = 18) {
  return useMemo(() => {
    const nodes = []
    for (let i = 0; i < count; i++) {
      const theta = (i / count) * Math.PI * 2
      const r = 3 + Math.sin(i * 0.7) * 0.6
      nodes.push({
        id: i,
        position: [Math.cos(theta) * r, Math.sin(i * 0.5) * 0.6, Math.sin(theta) * r],
      })
    }
    return nodes
  }, [count])
}

function CoreSphere({ pointer }) {
  const ref = useRef()
  useFrame((state, dt) => {
    if (!ref.current) return
    ref.current.rotation.y += dt * 0.15
    ref.current.rotation.x += dt * 0.05
    ref.current.position.x = THREE.MathUtils.lerp(
      ref.current.position.x,
      pointer.nx * 0.3,
      0.04,
    )
    ref.current.position.y = THREE.MathUtils.lerp(
      ref.current.position.y,
      pointer.ny * 0.2,
      0.04,
    )
  })

  return (
    <group ref={ref}>
      <mesh>
        <icosahedronGeometry args={[1.5, 4]} />
        <meshBasicMaterial color="#00a8e8" wireframe transparent opacity={0.32} />
      </mesh>
      <Sphere args={[0.9, 64, 64]}>
        <MeshDistortMaterial
          color="#0a0d14"
          emissive="#00a8e8"
          emissiveIntensity={0.6}
          distort={0.32}
          speed={1.4}
          roughness={0.1}
          metalness={0.4}
        />
      </Sphere>
      <Sphere args={[1.55, 32, 32]}>
        <meshBasicMaterial color="#a6fff3" transparent opacity={0.04} side={THREE.BackSide} />
      </Sphere>
    </group>
  )
}

function OrbitingToken({ name, radius, speed, y, color }) {
  const groupRef = useRef()
  const angle = useRef(Math.random() * Math.PI * 2)

  useFrame((state, dt) => {
    if (!groupRef.current) return
    angle.current += dt * speed
    const a = angle.current
    groupRef.current.position.set(Math.cos(a) * radius, y, Math.sin(a) * radius)
    groupRef.current.lookAt(state.camera.position)
  })

  return (
    <group ref={groupRef}>
      <mesh>
        <sphereGeometry args={[0.07, 16, 16]} />
        <meshBasicMaterial color={color} />
      </mesh>
      <Text
        position={[0, 0.22, 0]}
        fontSize={0.18}
        color={color}
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.005}
        outlineColor="#0a0d14"
      >
        {name}
      </Text>
    </group>
  )
}

function GraphNode({ position }) {
  const ref = useRef()
  useFrame((state) => {
    if (!ref.current) return
    const s = 1 + Math.sin(state.clock.elapsedTime * 1.4 + position[0]) * 0.15
    ref.current.scale.set(s, s, s)
  })
  return (
    <mesh ref={ref} position={position}>
      <sphereGeometry args={[0.05, 12, 12]} />
      <meshBasicMaterial color="#a6fff3" />
    </mesh>
  )
}

function DatabaseRing() {
  const ref = useRef()
  useFrame((state, dt) => {
    if (!ref.current) return
    ref.current.rotation.z += dt * 0.18
  })
  return (
    <group ref={ref} rotation={[Math.PI / 2.4, 0, 0]}>
      <mesh>
        <torusGeometry args={[2.05, 0.008, 12, 96]} />
        <meshBasicMaterial color="#20cfc8" transparent opacity={0.5} />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[2.1, 0.005, 12, 96]} />
        <meshBasicMaterial color="#00a8e8" transparent opacity={0.3} />
      </mesh>
    </group>
  )
}

function ParticleField({ count = 300 }) {
  const ref = useRef()
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      arr[i * 3 + 0] = (Math.random() - 0.5) * 18
      arr[i * 3 + 1] = (Math.random() - 0.5) * 12
      arr[i * 3 + 2] = (Math.random() - 0.5) * 18
    }
    return arr
  }, [count])

  useFrame((state, dt) => {
    if (!ref.current) return
    ref.current.rotation.y += dt * 0.02
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          array={positions}
          count={positions.length / 3}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.025}
        color="#a6fff3"
        transparent
        opacity={0.7}
        sizeAttenuation
      />
    </points>
  )
}

function TerminalPlane() {
  const ref = useRef()
  useFrame((state) => {
    if (!ref.current) return
    ref.current.position.y = -1.4 + Math.sin(state.clock.elapsedTime * 0.8) * 0.05
  })
  return (
    <group ref={ref} position={[0, -1.4, 0]} rotation={[-0.3, 0, 0]}>
      <mesh>
        <planeGeometry args={[1.6, 0.9]} />
        <meshBasicMaterial color="#0a0d14" transparent opacity={0.85} />
      </mesh>
      <lineSegments>
        <edgesGeometry args={[new THREE.PlaneGeometry(1.6, 0.9)]} />
        <lineBasicMaterial color="#00a8e8" transparent opacity={0.8} />
      </lineSegments>
      <Text position={[-0.7, 0.32, 0.01]} fontSize={0.08} color="#a6fff3" anchorX="left" anchorY="middle">
        {'> sumit.run()'}
      </Text>
      <Text position={[-0.7, 0.18, 0.01]} fontSize={0.08} color="#00a8e8" anchorX="left" anchorY="middle">
        {'$ building...'}
      </Text>
      <Text position={[-0.7, 0.04, 0.01]} fontSize={0.08} color="#20cfc8" anchorX="left" anchorY="middle">
        {'✓ online'}
      </Text>
    </group>
  )
}

function Scene({ pointer, compact = false }) {
  const { camera } = useThree()
  const groupRef = useRef()
  const nodeCount = compact ? 10 : 18
  const particleCount = compact ? 140 : 280
  const graphNodes = useGraphNodes(nodeCount)
  const graphEdges = useMemo(() => {
    const edges = []
    for (let i = 0; i < graphNodes.length; i++) {
      const a = graphNodes[i].position
      const b = graphNodes[(i + 1) % graphNodes.length].position
      edges.push([a, b])
      if (i % 3 === 0) {
        const c = graphNodes[(i + 5) % graphNodes.length].position
        edges.push([a, c])
      }
    }
    return edges
  }, [graphNodes])

  useFrame((state) => {
    if (!groupRef.current) return
    groupRef.current.rotation.y = state.clock.elapsedTime * 0.05
    const targetZ = (compact ? 9 : 8) + Math.sin(state.clock.elapsedTime * 0.4) * 0.2
    camera.position.z += (targetZ - camera.position.z) * 0.02
  })

  return (
    
    
    <group ref={groupRef} scale={compact ? 0.45 : 0.65}>
      <ambientLight intensity={0.4} color="#00a8e8" />
      <pointLight position={[5, 5, 5]} color="#00a8e8" intensity={1.4} distance={20} />
      <pointLight position={[-5, -3, -2]} color="#a6fff3" intensity={1.0} distance={20} />
      <pointLight position={[0, 0, 5]} color="#ffffff" intensity={0.5} distance={10} />

      <CoreSphere pointer={pointer} />
      <DatabaseRing />

      {techTokens.map((t) => (
        <OrbitingToken key={t.name} {...t} />
      ))}

      {graphNodes.map((n) => (
        <GraphNode key={n.id} position={n.position} />
      ))}
      {graphEdges.map((e, i) => (
        <Line key={i} points={e} color="#00a8e8" lineWidth={0.5} transparent opacity={0.2} />
      ))}

      <TerminalPlane />
      <ParticleField count={particleCount} />
    </group>
  )
}

function PointerBridge({ compact = false }) {
  const pointer = useRef({ nx: 0, ny: 0 })
  useEffect(() => {
    const onMove = (e) => {
      pointer.current.nx = (e.clientX / window.innerWidth) * 2 - 1
      pointer.current.ny = -((e.clientY / window.innerHeight) * 2 - 1)
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    return () => window.removeEventListener('pointermove', onMove)
  }, [])
  return <Scene pointer={pointer.current} compact={compact} />
}

export const HeroScene = ({ compact = false }) => {
  const isCoarse = useIsCoarsePointer()
  const reduced = useReducedMotion()
  const setCursorVariant = useUIStore((s) => s.setCursorVariant)

  if (isCoarse || reduced) {
    return (
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[280px] h-[280px] md:w-[420px] md:h-[420px] rounded-full bg-radial-fade" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-44 h-44 md:w-72 md:h-72 rounded-full border border-cyan-500/20 animate-pulse-slow" />
      </div>
    )
  }

  return (
    <div
      className="absolute inset-0"
      onMouseEnter={() => setCursorVariant('drag')}
      onMouseLeave={() => setCursorVariant('default')}
      aria-label="Interactive 3D developer universe"
    >
      <Canvas
        dpr={[1, compact ? 1.2 : 1.5]}
        camera={{ position: [0, 0, compact ? 9 : 8], fov: compact ? 38 : 45 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        style={{ background: 'transparent' }}
      >
        <Suspense fallback={null}>
          <PointerBridge compact={compact} />
        </Suspense>
      </Canvas>
    </div>
  )
}
