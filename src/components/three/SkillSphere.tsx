'use client'

import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const SKILLS = [
  'Next.js', 'Python', 'FastAPI', 'LLMs', 'React',
  'TypeScript', 'SEO', 'Postgres', 'Redis', 'Celery',
  'Docker', 'Tailwind',
]

function makeSkillTexture(label: string): THREE.CanvasTexture {
  const size = 256
  const canvas = document.createElement('canvas')
  canvas.width = size
  canvas.height = size / 2.5
  const ctx = canvas.getContext('2d')!

  // Background pill
  const w = canvas.width
  const h = canvas.height
  const r = h / 2
  ctx.beginPath()
  ctx.moveTo(r, 0)
  ctx.lineTo(w - r, 0)
  ctx.arcTo(w, 0, w, h, r)
  ctx.lineTo(w, h)
  ctx.arcTo(w, h, 0, h, r)
  ctx.lineTo(r, h)
  ctx.arcTo(0, h, 0, 0, r)
  ctx.closePath()
  ctx.fillStyle = 'rgba(6, 182, 212, 0.10)'
  ctx.fill()
  ctx.strokeStyle = 'rgba(6, 182, 212, 0.35)'
  ctx.lineWidth = 2
  ctx.stroke()

  // Text
  ctx.fillStyle = '#e2e8f0'
  ctx.font = `bold ${Math.round(h * 0.52)}px "Inter", sans-serif`
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.fillText(label, w / 2, h / 2)

  return new THREE.CanvasTexture(canvas)
}

function fibonacci(n: number, scale: number): THREE.Vector3[] {
  const points: THREE.Vector3[] = []
  const goldenAngle = 2.399786
  for (let i = 0; i < n; i++) {
    const y = 1 - (i / (n - 1)) * 2
    const radius = Math.sqrt(1 - y * y)
    const theta = i * goldenAngle
    points.push(new THREE.Vector3(
      Math.cos(theta) * radius * scale,
      y * scale,
      Math.sin(theta) * radius * scale,
    ))
  }
  return points
}

function SphereScene() {
  const groupRef = useRef<THREE.Group>(null)
  const speedRef = useRef(0.003)
  const spritesRef = useRef<THREE.Sprite[]>([])

  const { positions, textures } = useMemo(() => {
    const positions = fibonacci(SKILLS.length, 2.4)
    const textures = SKILLS.map(makeSkillTexture)
    return { positions, textures }
  }, [])

  useFrame(() => {
    if (!groupRef.current) return
    groupRef.current.rotation.y += speedRef.current

    // Update sprite opacity based on Z position (facing vs behind)
    spritesRef.current.forEach((sprite, i) => {
      if (!sprite) return
      const worldZ = sprite.position.z * Math.cos(groupRef.current!.rotation.y) -
                     sprite.position.x * Math.sin(groupRef.current!.rotation.y)
      const t = (worldZ + 2.4) / 4.8
      ;(sprite.material as THREE.SpriteMaterial).opacity = 0.3 + 0.7 * Math.max(0, Math.min(1, t))
    })
  })

  return (
    <group
      ref={groupRef}
      onPointerEnter={() => { speedRef.current = 0.015 }}
      onPointerLeave={() => { speedRef.current = 0.003 }}
    >
      {/* Wireframe sphere backdrop */}
      <mesh>
        <sphereGeometry args={[2.55, 16, 12]} />
        <meshBasicMaterial color="#06b6d4" wireframe transparent opacity={0.05} />
      </mesh>

      {/* Skill sprites */}
      {SKILLS.map((skill, i) => (
        <sprite
          key={skill}
          ref={el => { if (el) spritesRef.current[i] = el }}
          position={positions[i]}
          scale={[1.1, 0.44, 1]}
        >
          <spriteMaterial
            map={textures[i]}
            transparent
            depthWrite={false}
            sizeAttenuation
          />
        </sprite>
      ))}
    </group>
  )
}

export default function SkillSphere() {
  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 50 }}
      gl={{ alpha: true, antialias: true }}
      dpr={[1, 1.5]}
      style={{ width: '100%', height: '100%' }}
    >
      <SphereScene />
    </Canvas>
  )
}
