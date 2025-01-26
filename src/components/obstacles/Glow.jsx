import { useGLTF } from '@react-three/drei'
import React, { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { MeshBasicMaterial } from 'three'

export function Glow({ position, scale, color, mirrorSpin }) {
  const { scene } = useGLTF('/assets/obstacles/Glow.glb', true)
  const glowRef = useRef()

  useFrame(() => {
    if (glowRef.current) {
      glowRef.current.rotation.y += mirrorSpin ? -0.01 : 0.01
    }
  })

  scene.traverse((child) => {
    if (child.isMesh) {
      child.material = new MeshBasicMaterial({
        transparent: true,
        opacity: 0.4,
        color: color,
      })
    }
  })

  return (
    <group
      ref={glowRef}
      position={position}
      scale={scale}
      rotation={[Math.PI / 2, 0, 0]}
    >
      <primitive object={scene.clone()} />
    </group>
  )
}
