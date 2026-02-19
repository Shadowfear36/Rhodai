'use client'

import { useRef, useEffect, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const NODE_COUNT = 150
const CONNECTION_THRESHOLD = 2.8
const MAX_LINE_PAIRS = 2000

function NetworkScene() {
  const groupRef = useRef<THREE.Group>(null)
  const mouse = useRef({ x: 0, y: 0 })
  const targetRotation = useRef({ x: 0, y: 0 })
  const reducedMotion = useRef(false)

  // Create all data buffers and geometries imperatively (no JSX bufferAttribute)
  const { positions, velocities, pointsGeo, linesGeo, linePositions } = useMemo(() => {
    const positions = new Float32Array(NODE_COUNT * 3)
    const velocities = new Float32Array(NODE_COUNT * 3)

    for (let i = 0; i < NODE_COUNT; i++) {
      positions[i * 3 + 0] = (Math.random() - 0.5) * 30
      positions[i * 3 + 1] = (Math.random() - 0.5) * 16
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10
      velocities[i * 3 + 0] = (Math.random() - 0.5) * 0.004
      velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.004
      velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.002
    }

    // Points geometry
    const pointsGeo = new THREE.BufferGeometry()
    pointsGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3))

    // Lines geometry — pre-allocated buffer for up to MAX_LINE_PAIRS line segments
    const linePositions = new Float32Array(MAX_LINE_PAIRS * 2 * 3) // 2 verts per pair, 3 floats each
    const linesGeo = new THREE.BufferGeometry()
    linesGeo.setAttribute('position', new THREE.BufferAttribute(linePositions, 3))
    linesGeo.setDrawRange(0, 0)

    return { positions, velocities, pointsGeo, linesGeo, linePositions }
  }, [])

  useEffect(() => {
    reducedMotion.current =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const handleMouseMove = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth - 0.5) * 2
      mouse.current.y = (e.clientY / window.innerHeight - 0.5) * 2
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  useFrame(() => {
    if (!groupRef.current) return
    if (reducedMotion.current) return

    // Lerp rotation toward mouse
    targetRotation.current.y += (mouse.current.x * 0.08 - targetRotation.current.y) * 0.04
    targetRotation.current.x += (-mouse.current.y * 0.05 - targetRotation.current.x) * 0.04
    groupRef.current.rotation.y = targetRotation.current.y + 0.0003
    groupRef.current.rotation.x = targetRotation.current.x

    // Slow auto-rotation accumulates via lerp target above
    // Update node positions (drift + wrap)
    for (let i = 0; i < NODE_COUNT; i++) {
      positions[i * 3 + 0] += velocities[i * 3 + 0]
      positions[i * 3 + 1] += velocities[i * 3 + 1]
      positions[i * 3 + 2] += velocities[i * 3 + 2]

      if (positions[i * 3 + 0] > 15) positions[i * 3 + 0] = -15
      if (positions[i * 3 + 0] < -15) positions[i * 3 + 0] = 15
      if (positions[i * 3 + 1] > 8) positions[i * 3 + 1] = -8
      if (positions[i * 3 + 1] < -8) positions[i * 3 + 1] = 8
      if (positions[i * 3 + 2] > 5) positions[i * 3 + 2] = -5
      if (positions[i * 3 + 2] < -5) positions[i * 3 + 2] = 5
    }

    const pointsPosAttr = pointsGeo.getAttribute('position') as THREE.BufferAttribute
    pointsPosAttr.needsUpdate = true

    // Rebuild line segments
    let lineVertCount = 0
    for (let i = 0; i < NODE_COUNT && lineVertCount < MAX_LINE_PAIRS * 2 - 1; i++) {
      for (let j = i + 1; j < NODE_COUNT && lineVertCount < MAX_LINE_PAIRS * 2 - 1; j++) {
        const dx = positions[i * 3] - positions[j * 3]
        const dy = positions[i * 3 + 1] - positions[j * 3 + 1]
        const dz = positions[i * 3 + 2] - positions[j * 3 + 2]
        if (dx * dx + dy * dy + dz * dz < CONNECTION_THRESHOLD * CONNECTION_THRESHOLD) {
          const b = lineVertCount * 3
          linePositions[b + 0] = positions[i * 3]
          linePositions[b + 1] = positions[i * 3 + 1]
          linePositions[b + 2] = positions[i * 3 + 2]
          linePositions[b + 3] = positions[j * 3]
          linePositions[b + 4] = positions[j * 3 + 1]
          linePositions[b + 5] = positions[j * 3 + 2]
          lineVertCount += 2
        }
      }
    }

    const linesPosAttr = linesGeo.getAttribute('position') as THREE.BufferAttribute
    linesPosAttr.needsUpdate = true
    linesGeo.setDrawRange(0, lineVertCount)
  })

  const pointsMaterial = useMemo(
    () => new THREE.PointsMaterial({ size: 0.08, color: '#06b6d4', transparent: true, opacity: 0.65, depthWrite: false, sizeAttenuation: true }),
    []
  )

  const linesMaterial = useMemo(
    () => new THREE.LineBasicMaterial({ color: '#06b6d4', transparent: true, opacity: 0.12, depthWrite: false }),
    []
  )

  return (
    <group ref={groupRef}>
      <points geometry={pointsGeo} material={pointsMaterial} />
      <lineSegments geometry={linesGeo} material={linesMaterial} />
    </group>
  )
}

export default function NeuralNetwork() {
  return (
    <Canvas
      camera={{ position: [0, 0, 12], fov: 60 }}
      gl={{ alpha: true, antialias: false }}
      dpr={[1, 1.5]}
      style={{ position: 'absolute', inset: 0 }}
    >
      <NetworkScene />
    </Canvas>
  )
}
