'use client'

import { useEffect, useState } from 'react'
import { Canvas, useThree } from '@react-three/fiber'
import { Environment, Lightformer } from '@react-three/drei'
import Crystal from './Crystal'
import { HexFloor, Particles, Portals, Rig, Shards, chapterZ } from './Scenery'
import { LAST_CHAPTER, experience, readChapter } from './store'

function Scene({ lowPower }: { lowPower: boolean }) {
  const aspect = useThree((s) => s.size.width / s.size.height)
  const narrow = aspect < 0.9
  return (
    <>
      <fog attach="fog" args={['#050508', 14, 52]} />
      <Environment resolution={128} frames={1}>
        <Lightformer form="rect" intensity={5} color="#67e8f9" position={[-5, 3, 3]} scale={[6, 2, 1]} target={[0, 0, 0]} />
        <Lightformer form="ring" intensity={4} color="#a78bfa" position={[5, -1, 3]} scale={4} target={[0, 0, 0]} />
        <Lightformer form="rect" intensity={2.5} color="#ffffff" position={[0, 6, -3]} scale={[10, 1, 1]} target={[0, 0, 0]} />
        <Lightformer form="circle" intensity={1.5} color="#06b6d4" position={[0, -5, 1]} scale={6} rotation-x={Math.PI / 2} />
      </Environment>
      <ambientLight intensity={0.15} />

      <Rig read={readChapter} />
      <Crystal mode="intro" position={narrow ? [0, -1.7, 0] : [3.1, 0.15, 0]} scale={narrow ? 0.72 : 1} />
      <Crystal mode="finale" position={[narrow ? 0 : -0.3, narrow ? -1.45 : 0.2, chapterZ(LAST_CHAPTER) - 18]} scale={narrow ? 0.45 : 0.5} />
      <HexFloor />
      <Particles count={lowPower ? 800 : 1600} />
      <Portals />
      <Shards count={lowPower ? 24 : 48} />
    </>
  )
}

export default function World({ onFail }: { onFail: () => void }) {
  const [ready, setReady] = useState(false)
  const [lowPower] = useState(
    () => window.matchMedia('(max-width: 760px), (pointer: coarse)').matches || (navigator.hardwareConcurrency ?? 8) <= 4,
  )

  useEffect(() => {
    experience.chapter = readChapter()
    const onPointer = (e: PointerEvent) => {
      if (e.pointerType === 'touch') return
      experience.pointer.x = (e.clientX / window.innerWidth) * 2 - 1
      experience.pointer.y = (e.clientY / window.innerHeight) * 2 - 1
    }
    window.addEventListener('pointermove', onPointer, { passive: true })
    return () => {
      window.removeEventListener('pointermove', onPointer)
      document.documentElement.classList.remove('has-3d')
    }
  }, [])

  return (
    <div className="experience" data-ready={ready} aria-hidden="true">
      <Canvas
        dpr={[1, lowPower ? 1 : 1.25]}
        // 'default' avoids forcing a discrete-GPU switch, which can black out screens on hybrid-graphics laptops.
        gl={{ antialias: !lowPower, alpha: false, powerPreference: 'default' }}
        camera={{ fov: 40, position: [0, 0, 10], near: 0.1, far: 140 }}
        onCreated={({ gl }) => {
          gl.setClearColor('#050508')
          // If the GPU drops the context, give up on 3D and keep the static site.
          gl.domElement.addEventListener('webglcontextlost', (e) => {
            e.preventDefault()
            onFail()
          })
          document.documentElement.classList.add('has-3d')
          setReady(true)
        }}
      >
        <Scene lowPower={lowPower} />
      </Canvas>
    </div>
  )
}
