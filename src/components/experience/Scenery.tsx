'use client'

import { useMemo, useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { CHAPTER_DEPTH, LAST_CHAPTER, experience, seeded } from './store'

const { smoothstep } = THREE.MathUtils

/** Z position the camera reaches at a given chapter. */
export const chapterZ = (chapter: number) => 10 - chapter * CHAPTER_DEPTH
const WORLD_END = chapterZ(LAST_CHAPTER) - 30

/* ------------------------------------------------------------------ */
/* Hex-grid floor: a single shader plane, so it costs almost nothing.  */
/* ------------------------------------------------------------------ */

export function HexFloor() {
  const material = useMemo(
    () =>
      new THREE.ShaderMaterial({
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        uniforms: { uTime: { value: 0 }, uCam: { value: new THREE.Vector3() }, uPulse: { value: 0 } },
        vertexShader: /* glsl */ `
          varying vec3 vWorld;
          void main(){
            vec4 w = modelMatrix * vec4(position, 1.);
            vWorld = w.xyz;
            gl_Position = projectionMatrix * viewMatrix * w;
          }`,
        fragmentShader: /* glsl */ `
          varying vec3 vWorld;
          uniform float uTime; uniform vec3 uCam; uniform float uPulse;
          float hexDist(vec2 p){ p = abs(p); return max(dot(p, normalize(vec2(1., 1.7320508))), p.x); }
          vec4 hexCoords(vec2 uv){
            vec2 r = vec2(1., 1.7320508); vec2 h = r * .5;
            vec2 a = mod(uv, r) - h; vec2 b = mod(uv - h, r) - h;
            vec2 gv = dot(a, a) < dot(b, b) ? a : b;
            return vec4(gv, uv - gv);
          }
          float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
          void main(){
            vec2 uv = vWorld.xz * .55;
            vec4 hc = hexCoords(uv);
            float edge = .5 - hexDist(hc.xy);
            float line = smoothstep(.045, .0, edge);
            float rnd = hash(hc.zw);

            // Ripple radiating from the point beneath the camera.
            float d = length(hc.zw / .55 - uCam.xz);
            float ripple = smoothstep(1.2, 0., abs(fract(d * .06 - uTime * .18) - .5) * 14.);
            float flicker = step(.94, rnd) * (.5 + .5 * sin(uTime * (1. + rnd * 3.) + rnd * 50.));

            float camDist = length(vWorld.xz - uCam.xz);
            float fade = smoothstep(46., 6., camDist) * smoothstep(26., 4., abs(vWorld.x));

            vec3 cyan = vec3(.02, .71, .83); vec3 violet = vec3(.55, .36, .96);
            vec3 col = mix(cyan, violet, .5 + .5 * sin(vWorld.z * .045 + rnd));
            float glow = line * (.32 + ripple * .9 + uPulse * .6) + flicker * .18 * smoothstep(.2, .5, edge + .3);
            gl_FragColor = vec4(col * glow * fade, 1.);
          }`,
      }),
    [],
  )

  const floor = useRef<THREE.Mesh>(null)
  useFrame((state) => {
    const u = (floor.current?.material as THREE.ShaderMaterial | undefined)?.uniforms
    if (!u) return
    u.uTime.value = state.clock.elapsedTime
    u.uCam.value.copy(state.camera.position)
  })

  const length = 10 - WORLD_END + 40
  return (
    <mesh ref={floor} material={material} rotation-x={-Math.PI / 2} position={[0, -3.6, (10 + 20 + WORLD_END) / 2]}>
      <planeGeometry args={[90, length]} />
    </mesh>
  )
}

/* ------------------------------------------------------------------ */
/* Starfield / dust that fills the corridor.                           */
/* ------------------------------------------------------------------ */

export function Particles({ count }: { count: number }) {
  const { gl } = useThree()
  const { geometry, material } = useMemo(() => {
    const rand = seeded(11)
    const positions = new Float32Array(count * 3)
    const seeds = new Float32Array(count)
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (rand() - 0.5) * 50
      positions[i * 3 + 1] = -3 + Math.pow(rand(), 1.4) * 20
      positions[i * 3 + 2] = 20 + rand() * (WORLD_END - 20)
      seeds[i] = rand()
    }
    const geometry = new THREE.BufferGeometry()
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    geometry.setAttribute('aSeed', new THREE.BufferAttribute(seeds, 1))
    const material = new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      uniforms: { uTime: { value: 0 }, uPixelRatio: { value: 1 } },
      vertexShader: /* glsl */ `
        attribute float aSeed; uniform float uTime; uniform float uPixelRatio;
        varying float vAlpha; varying vec3 vColor;
        void main(){
          vec3 p = position;
          p.y += sin(uTime * .25 + aSeed * 6.283) * .35;
          p.x += cos(uTime * .18 + aSeed * 12.) * .25;
          vec4 mv = modelViewMatrix * vec4(p, 1.);
          gl_Position = projectionMatrix * mv;
          float depth = -mv.z;
          gl_PointSize = clamp((1.4 + aSeed * 2.8) * uPixelRatio * (14. / depth), 0., 9. * uPixelRatio);
          float twinkle = .55 + .45 * sin(uTime * (.7 + aSeed * 1.6) + aSeed * 40.);
          vAlpha = twinkle * smoothstep(55., 10., depth) * smoothstep(.5, 2.5, depth);
          vColor = mix(vec3(.4, .91, .98), vec3(.65, .55, .98), step(.62, aSeed));
        }`,
      fragmentShader: /* glsl */ `
        varying float vAlpha; varying vec3 vColor;
        void main(){
          float d = length(gl_PointCoord - .5);
          float a = smoothstep(.5, .0, d);
          gl_FragColor = vec4(vColor * a * a * vAlpha, 1.);
        }`,
    })
    return { geometry, material }
  }, [count])

  const points = useRef<THREE.Points>(null)
  useFrame((state) => {
    const u = (points.current?.material as THREE.ShaderMaterial | undefined)?.uniforms
    if (!u) return
    u.uTime.value = state.clock.elapsedTime
    u.uPixelRatio.value = gl.getPixelRatio()
  })

  return <points ref={points} geometry={geometry} material={material} frustumCulled={false} />
}

/* ------------------------------------------------------------------ */
/* Hex portals, one at every chapter boundary.                         */
/* ------------------------------------------------------------------ */

const PORTAL_COLORS = ['#22d3ee', '#a78bfa', '#67e8f9', '#8b5cf6', '#2dd4bf', '#c4b5fd']

function hexRing(outer: number, inner: number) {
  const shape = new THREE.Shape()
  const hole = new THREE.Path()
  for (let i = 0; i <= 6; i++) {
    const a = Math.PI / 2 + (i * Math.PI) / 3
    const op = [Math.cos(a) * outer, Math.sin(a) * outer] as const
    const ip = [Math.cos(a) * inner, Math.sin(a) * inner] as const
    if (i === 0) {
      shape.moveTo(...op)
      hole.moveTo(...ip)
    } else {
      shape.lineTo(...op)
      hole.lineTo(...ip)
    }
  }
  shape.holes.push(hole)
  return new THREE.ShapeGeometry(shape)
}

export function Portals() {
  const ring = useMemo(() => hexRing(4.6, 4.54), [])
  const innerRing = useMemo(() => hexRing(4.2, 4.18), [])
  const portals = useMemo(
    () =>
      Array.from({ length: LAST_CHAPTER }, (_, i) => ({
        z: chapterZ(i + 0.62),
        color: PORTAL_COLORS[i % PORTAL_COLORS.length],
        spin: (i % 2 ? -1 : 1) * 0.08,
        outer: new THREE.MeshBasicMaterial({ color: PORTAL_COLORS[i % PORTAL_COLORS.length], transparent: true, toneMapped: false, depthWrite: false, side: THREE.DoubleSide }),
        inner: new THREE.MeshBasicMaterial({ color: '#ffffff', transparent: true, toneMapped: false, depthWrite: false, side: THREE.DoubleSide }),
      })),
    [],
  )
  const refs = useRef<(THREE.Group | null)[]>([])

  useFrame((state) => {
    const t = state.clock.elapsedTime
    const camZ = state.camera.position.z
    portals.forEach((p, i) => {
      const g = refs.current[i]
      if (!g) return
      const dist = camZ - p.z
      // Visible as it approaches, gone once it is behind the camera.
      const vis = smoothstep(dist, 0.6, 5) * smoothstep(dist, 36, 16)
      p.outer.opacity = vis * 0.9
      p.inner.opacity = vis * 0.25
      g.visible = vis > 0.001
      g.rotation.z = t * p.spin + i
      const s = 1 + smoothstep(dist, 6, 0) * 0.25
      g.scale.setScalar(s)
    })
  })

  return (
    <>
      {portals.map((p, i) => (
        <group key={i} position={[0, 0.2, p.z]} ref={(el) => { refs.current[i] = el }}>
          <mesh geometry={ring} material={p.outer} />
          <mesh geometry={innerRing} material={p.inner} />
        </group>
      ))}
    </>
  )
}

/* ------------------------------------------------------------------ */
/* Floating glass shards along the corridor walls.                     */
/* ------------------------------------------------------------------ */

export function Shards({ count }: { count: number }) {
  const mesh = useRef<THREE.InstancedMesh>(null)
  const data = useMemo(() => {
    const rand = seeded(23)
    return Array.from({ length: count }, () => {
        const side = rand() < 0.5 ? -1 : 1
        return {
          pos: new THREE.Vector3(side * (6 + rand() * 10), -2.5 + rand() * 9, 8 + rand() * (WORLD_END + 10 - 8)),
          rot: new THREE.Euler(rand() * 6, rand() * 6, rand() * 6),
          speed: new THREE.Vector3(rand() - 0.5, rand() - 0.5, rand() - 0.5).multiplyScalar(0.5),
          scale: 0.15 + Math.pow(rand(), 2) * 0.55,
          phase: rand() * 10,
        }
      })
  }, [count])
  const material = useMemo(
    () => new THREE.MeshPhysicalMaterial({ color: '#a5f3fc', metalness: 0.7, roughness: 0.15, iridescence: 1, iridescenceIOR: 1.4, clearcoat: 1, envMapIntensity: 1.4, flatShading: true }),
    [],
  )
  const dummy = useMemo(() => new THREE.Object3D(), [])

  useFrame((state) => {
    const m = mesh.current
    if (!m) return
    const t = state.clock.elapsedTime
    data.forEach((d, i) => {
      dummy.position.set(d.pos.x, d.pos.y + Math.sin(t * 0.4 + d.phase) * 0.3, d.pos.z)
      dummy.rotation.set(d.rot.x + t * d.speed.x, d.rot.y + t * d.speed.y, d.rot.z + t * d.speed.z)
      dummy.scale.set(d.scale, d.scale * 1.8, d.scale)
      dummy.updateMatrix()
      m.setMatrixAt(i, dummy.matrix)
    })
    m.instanceMatrix.needsUpdate = true
  })

  return (
    <instancedMesh ref={mesh} args={[undefined, undefined, count]} material={material} frustumCulled={false}>
      <octahedronGeometry args={[1, 0]} />
    </instancedMesh>
  )
}

/* ------------------------------------------------------------------ */
/* Camera rig: scroll drives depth, pointer adds parallax.             */
/* ------------------------------------------------------------------ */

export function Rig({ read }: { read: () => number }) {
  const look = useMemo(() => new THREE.Vector3(), [])
  useFrame((state, delta) => {
    const dt = Math.min(delta, 0.1)
    const target = Math.min(read(), LAST_CHAPTER + 0.6)
    experience.chapter = THREE.MathUtils.damp(experience.chapter, target, 3.2, dt)
    const c = experience.chapter
    const { x: px, y: py } = experience.pointer

    const cam = state.camera
    const tx = Math.sin(c * 0.9) * 0.7 + px * 0.45
    const ty = Math.sin(c * 1.3) * 0.35 + 0.15 - py * 0.3
    cam.position.x = THREE.MathUtils.damp(cam.position.x, tx, 3, dt)
    cam.position.y = THREE.MathUtils.damp(cam.position.y, ty, 3, dt)
    cam.position.z = chapterZ(c)
    look.set(cam.position.x * 0.4, ty * 0.5, cam.position.z - 12)
    cam.lookAt(look)
    cam.rotateZ(Math.sin(c * 0.7) * 0.03)
  })
  return null
}
