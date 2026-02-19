'use client'

import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

// Fixed prospect dot positions
const PROSPECT_DOTS = [
  { angle: 0.4, radius: 0.75, color: '#06b6d4' },
  { angle: 1.2, radius: 1.3, color: '#8b5cf6' },
  { angle: 2.1, radius: 0.9, color: '#06b6d4' },
  { angle: 3.5, radius: 1.55, color: '#8b5cf6' },
  { angle: 4.2, radius: 0.6, color: '#06b6d4' },
  { angle: 5.0, radius: 1.2, color: '#8b5cf6' },
  { angle: 5.7, radius: 1.75, color: '#06b6d4' },
  { angle: 0.9, radius: 1.85, color: '#8b5cf6' },
]

function buildRingLine(radius: number, segments = 64): THREE.Line {
  const points: THREE.Vector3[] = []
  for (let i = 0; i <= segments; i++) {
    const angle = (i / segments) * Math.PI * 2
    points.push(new THREE.Vector3(Math.cos(angle) * radius, Math.sin(angle) * radius, 0))
  }
  const geo = new THREE.BufferGeometry().setFromPoints(points)
  const mat = new THREE.LineBasicMaterial({ color: '#06b6d4', transparent: true, opacity: 0.2, depthWrite: false })
  return new THREE.Line(geo, mat)
}

function buildSegmentLine(x1: number, y1: number, x2: number, y2: number, opacity: number): THREE.Line {
  const geo = new THREE.BufferGeometry().setFromPoints([
    new THREE.Vector3(x1, y1, 0),
    new THREE.Vector3(x2, y2, 0),
  ])
  const mat = new THREE.LineBasicMaterial({ color: '#06b6d4', transparent: true, opacity, depthWrite: false })
  return new THREE.Line(geo, mat)
}

function RadarScene() {
  const sweepRef = useRef<THREE.Group>(null)
  const dotOpacity = useRef(PROSPECT_DOTS.map(() => 0.15))

  // Build all static geometry imperatively
  const { rings, crossH, crossV, sweepLines, dotObjects, centerDot } = useMemo(() => {
    const rings = [0.55, 1.0, 1.5, 1.9].map(r => buildRingLine(r))
    const crossH = buildSegmentLine(-2.1, 0, 2.1, 0, 0.15)
    const crossV = buildSegmentLine(0, -2.1, 0, 2.1, 0.15)
    const sweepLines = Array.from({ length: 12 }, (_, i) => {
      const angleOffset = -(i / 11) * (Math.PI / 2.8)
      const opacity = 0.5 * (1 - i / 11) ** 1.5
      return buildSegmentLine(0, 0, Math.cos(angleOffset) * 1.95, Math.sin(angleOffset) * 1.95, opacity)
    })
    const dotObjects = PROSPECT_DOTS.map((dot) => {
      const x = Math.cos(dot.angle) * dot.radius
      const y = Math.sin(dot.angle) * dot.radius
      const geo = new THREE.CircleGeometry(0.055, 8)
      const mat = new THREE.MeshBasicMaterial({ color: dot.color, transparent: true, opacity: 0.15, depthWrite: false })
      const mesh = new THREE.Mesh(geo, mat)
      mesh.position.set(x, y, 0)
      return mesh
    })
    const centerGeo = new THREE.CircleGeometry(0.05, 12)
    const centerMat = new THREE.MeshBasicMaterial({ color: '#06b6d4', transparent: true, opacity: 0.9 })
    const centerDot = new THREE.Mesh(centerGeo, centerMat)
    return { rings, crossH, crossV, sweepLines, dotObjects, centerDot }
  }, [])

  useFrame(() => {
    if (!sweepRef.current) return
    sweepRef.current.rotation.z -= 0.022

    const sweepAngle = sweepRef.current.rotation.z % (Math.PI * 2)

    PROSPECT_DOTS.forEach((dot, idx) => {
      const dotAngle = -(dot.angle % (Math.PI * 2))
      let diff = ((sweepAngle - dotAngle) % (Math.PI * 2) + Math.PI * 2) % (Math.PI * 2)
      if (diff > Math.PI) diff -= Math.PI * 2

      const mesh = dotObjects[idx]
      const mat = mesh.material as THREE.MeshBasicMaterial

      if (diff >= -0.05 && diff <= 0.1) {
        dotOpacity.current[idx] = 1.0
      } else {
        dotOpacity.current[idx] = Math.max(0.15, dotOpacity.current[idx] - 0.015)
      }
      mat.opacity = dotOpacity.current[idx]
    })
  })

  return (
    <>
      {rings.map((ring, i) => <primitive key={`ring-${i}`} object={ring} />)}
      <primitive object={crossH} />
      <primitive object={crossV} />
      <group ref={sweepRef}>
        {sweepLines.map((ln, i) => <primitive key={`sweep-${i}`} object={ln} />)}
      </group>
      {dotObjects.map((dot, i) => <primitive key={`dot-${i}`} object={dot} />)}
      <primitive object={centerDot} />
    </>
  )
}

export default function RadarScan() {
  return (
    <Canvas
      camera={{ position: [0, 0, 4], fov: 50 }}
      gl={{ alpha: true, antialias: true }}
      dpr={[1, 1.5]}
      style={{ width: '100%', height: '100%' }}
    >
      <RadarScene />
    </Canvas>
  )
}
