'use client'

import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { experience, seeded } from './store'

const { clamp, smoothstep, lerp } = THREE.MathUtils
const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3)

type Part = {
  geometry: THREE.BufferGeometry
  material: THREE.Material
  base: THREE.Vector3
  dir: THREE.Vector3
  spin: THREE.Vector3
}

/** Pointy-top hexagon vertex, matching the logo's orientation. */
function hexPoint(radius: number, i: number) {
  const a = Math.PI / 2 + (i * Math.PI) / 3
  return new THREE.Vector2(Math.cos(a) * radius, Math.sin(a) * radius)
}

/** One side of a hexagonal ring, built around its own centroid so it can spin in place. */
function ringSegment(outer: number, inner: number, i: number, depth: number, bevel: boolean, gap = 0.02) {
  const pts = [hexPoint(outer, i), hexPoint(outer, i + 1), hexPoint(inner, i + 1), hexPoint(inner, i)]
  const centroid = pts.reduce((acc, p) => acc.add(p), new THREE.Vector2()).multiplyScalar(0.25)
  // Pull each side slightly toward its centroid to leave a faceted seam between segments.
  const local = pts.map((p) => p.clone().sub(centroid).multiplyScalar(1 - gap))
  const geometry = new THREE.ExtrudeGeometry(new THREE.Shape(local), {
    depth,
    bevelEnabled: bevel,
    bevelThickness: 0.05,
    bevelSize: 0.035,
    bevelSegments: 3,
    curveSegments: 1,
  })
  geometry.translate(0, 0, -depth / 2)
  geometry.computeVertexNormals()
  return { geometry, base: new THREE.Vector3(centroid.x, centroid.y, 0) }
}

const NODE_ANGLES = [Math.PI / 2, -Math.PI / 6, (7 * Math.PI) / 6]
const NODE_COLORS = ['#67e8f9', '#a78bfa', '#22d3ee']

function buildParts(): Part[] {
  const rand = seeded(7)
  // Reflective iridescent chrome reads far better than clear glass against a dark scene.
  const chrome = new THREE.MeshPhysicalMaterial({
    color: '#9be7f5',
    metalness: 1,
    roughness: 0.16,
    iridescence: 1,
    iridescenceIOR: 1.6,
    iridescenceThicknessRange: [200, 900],
    clearcoat: 1,
    clearcoatRoughness: 0.1,
    envMapIntensity: 2.2,
    emissive: new THREE.Color('#1e1b4b'),
    emissiveIntensity: 0.35,
  })
  const outline = new THREE.MeshBasicMaterial({ color: '#22d3ee', toneMapped: false })

  const parts: Part[] = []
  const randomSpin = () => new THREE.Vector3(rand() - 0.5, rand() - 0.5, rand() - 0.5).multiplyScalar(2.4)
  const outward = (base: THREE.Vector3) =>
    base.clone().setZ(0).normalize().multiplyScalar(0.8).add(new THREE.Vector3((rand() - 0.5) * 0.6, (rand() - 0.5) * 0.6, (rand() - 0.2) * 1.4))

  for (let i = 0; i < 6; i++) {
    const thick = ringSegment(1.62, 1.28, i, 0.36, true)
    parts.push({ ...thick, material: chrome, dir: outward(thick.base), spin: randomSpin() })
    const thin = ringSegment(1.86, 1.82, i, 0.03, false, 0.01)
    parts.push({ ...thin, material: outline, dir: outward(thin.base).multiplyScalar(1.4), spin: randomSpin() })
  }

  NODE_ANGLES.forEach((angle, i) => {
    const dir2 = new THREE.Vector3(Math.cos(angle), Math.sin(angle), 0)
    const arm = new THREE.CapsuleGeometry(0.11, 0.78, 6, 16)
    arm.rotateZ(angle - Math.PI / 2)
    const armBase = dir2.clone().multiplyScalar(0.5)
    parts.push({ geometry: arm, material: chrome, base: armBase, dir: outward(armBase), spin: randomSpin() })

    const node = new THREE.SphereGeometry(0.17, 32, 16)
    const nodeBase = dir2.clone().multiplyScalar(1.0)
    parts.push({
      geometry: node,
      material: new THREE.MeshBasicMaterial({ color: NODE_COLORS[i], toneMapped: false }),
      base: nodeBase,
      dir: outward(nodeBase).multiplyScalar(1.2),
      spin: randomSpin(),
    })
  })

  parts.push({
    geometry: new THREE.SphereGeometry(0.3, 48, 24),
    material: chrome,
    base: new THREE.Vector3(),
    dir: new THREE.Vector3(0.1, 0.25, 1.6),
    spin: randomSpin(),
  })
  parts.push({
    geometry: new THREE.SphereGeometry(0.14, 24, 12),
    material: new THREE.MeshBasicMaterial({ color: '#cffafe', toneMapped: false }),
    base: new THREE.Vector3(),
    dir: new THREE.Vector3(-0.1, -0.2, 1.4),
    spin: randomSpin(),
  })
  return parts
}


const haloMaterial = () =>
  new THREE.ShaderMaterial({
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    uniforms: { uOpacity: { value: 1 } },
    vertexShader: /* glsl */ `varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.); }`,
    fragmentShader: /* glsl */ `
      varying vec2 vUv; uniform float uOpacity;
      void main(){
        float d = length(vUv - .5) * 2.;
        float g = pow(max(0., 1. - d), 2.2);
        vec3 col = mix(vec3(.55,.36,.96), vec3(.02,.71,.83), smoothstep(.0,.7,d));
        gl_FragColor = vec4(col * g * .55 * uOpacity, 1.);
      }`,
  })

export type CrystalMode = 'intro' | 'finale'

export default function Crystal({
  mode,
  position,
  scale = 1,
}: {
  mode: CrystalMode
  position: [number, number, number]
  scale?: number
}) {
  const group = useRef<THREE.Group>(null)
  const halo = useRef<THREE.Mesh>(null)
  const meshes = useRef<(THREE.Mesh | null)[]>([])
  const parts = useMemo(() => buildParts(), [])
  const halo$ = useMemo(() => haloMaterial(), [])
  const startedAt = useRef<number | null>(null)

  useFrame((state) => {
    const g = group.current
    if (!g) return
    const t = state.clock.elapsedTime
    if (startedAt.current === null) startedAt.current = t
    const c = experience.chapter

    let spread: number
    let shift = 1
    if (mode === 'intro') {
      const assemble = easeOutCubic(clamp((t - startedAt.current - 0.25) / 2.2, 0, 1))
      const explode = smoothstep(c, 0.04, 0.6)
      spread = (1 - assemble) * 6 + explode * 10
      // Glide toward the centre of the corridor so the camera flies through it.
      shift = 1 - smoothstep(c, 0.05, 0.55)
    } else {
      spread = (1 - easeOutCubic(smoothstep(c, 6.25, 7.05))) * 7
    }

    parts.forEach((part, i) => {
      const m = meshes.current[i]
      if (!m) return
      m.position.copy(part.base).addScaledVector(part.dir, spread)
      if (mode === 'finale') m.position.z -= spread * 2.5
      m.rotation.set(part.spin.x * spread * 0.35, part.spin.y * spread * 0.35, part.spin.z * spread * 0.35)
    })

    const { x: px, y: py } = experience.pointer
    g.visible = spread < 8.5
    g.position.set(position[0] * shift, position[1] * shift + Math.sin(t * 0.8) * 0.08, position[2])
    g.rotation.y = lerp(g.rotation.y, Math.sin(t * 0.35) * 0.35 + px * 0.45, 0.06)
    g.rotation.x = lerp(g.rotation.x, -py * 0.3 + Math.sin(t * 0.5) * 0.06, 0.06)
    g.rotation.z = mode === 'intro' ? -0.12 + c * 0.6 : Math.sin(t * 0.3) * 0.05

    const h = halo.current
    if (h) (h.material as THREE.ShaderMaterial).uniforms.uOpacity.value = clamp(1 - spread / 4, 0, 1)
    if (h) h.quaternion.copy(state.camera.quaternion).premultiply(g.quaternion.clone().invert())
  })

  return (
    <group ref={group} scale={scale}>
      <mesh ref={halo} material={halo$} position={[0, 0, -0.6]} renderOrder={-1}>
        <planeGeometry args={[7.5, 7.5]} />
      </mesh>
      {parts.map((part, i) => (
        <mesh
          key={i}
          ref={(el) => {
            meshes.current[i] = el
          }}
          geometry={part.geometry}
          material={part.material}
        />
      ))}
      <pointLight color="#22d3ee" intensity={6} distance={6} position={[-1.5, 1.2, 1.5]} />
      <pointLight color="#8b5cf6" intensity={8} distance={6} position={[1.6, -1.2, 1.2]} />
    </group>
  )
}
