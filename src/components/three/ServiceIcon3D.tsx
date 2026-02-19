'use client'

import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

type Shape = 'sphere' | 'icosahedron' | 'torus' | 'octahedron'

interface Props {
  shape: Shape
  color: string
}

function WireframeShape({ shape, color }: Props) {
  const meshRef = useRef<THREE.LineSegments>(null)

  const edges = useMemo(() => {
    let geometry: THREE.BufferGeometry
    switch (shape) {
      case 'sphere':
        geometry = new THREE.SphereGeometry(1, 8, 6)
        break
      case 'icosahedron':
        geometry = new THREE.IcosahedronGeometry(1, 1)
        break
      case 'torus':
        geometry = new THREE.TorusGeometry(0.7, 0.3, 8, 12)
        break
      case 'octahedron':
        geometry = new THREE.OctahedronGeometry(1)
        break
      default:
        geometry = new THREE.SphereGeometry(1, 8, 6)
    }
    return new THREE.EdgesGeometry(geometry)
  }, [shape])

  useFrame(() => {
    if (!meshRef.current) return
    meshRef.current.rotation.x += 0.008
    meshRef.current.rotation.y += 0.012
  })

  return (
    <lineSegments ref={meshRef} geometry={edges}>
      <lineBasicMaterial color={color} transparent opacity={0.9} />
    </lineSegments>
  )
}

export default function ServiceIcon3D({ shape, color }: Props) {
  return (
    <Canvas
      camera={{ position: [0, 0, 3], fov: 45 }}
      gl={{ alpha: true, antialias: true }}
      style={{ width: 64, height: 64 }}
      dpr={[1, 2]}
    >
      <WireframeShape shape={shape} color={color} />
    </Canvas>
  )
}
