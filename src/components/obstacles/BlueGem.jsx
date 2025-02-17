import { useGLTF } from '@react-three/drei'
import React, { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Glow } from './Glow'

useGLTF.preload('/assets/obstacles/BlueGem.glb')

export function BlueGem({ positionMesh, scaleMesh }) {
  const { scene } = useGLTF('/assets/obstacles/BlueGem.glb', true)
  const blueGemRef = useRef()

  useFrame(() => {
    if (blueGemRef.current) {
      blueGemRef.current.rotation.y += 0.01
    }
  })

  return (
    <group position={positionMesh} scale={scaleMesh}>
      <group
        ref={blueGemRef}
        position={positionMesh}
        dispose={null}
        rotation={[0, Math.PI / 2, 0]} // Rotate 90 degrees around the X-axis
      >
        <primitive object={scene.clone()} />
      </group>
      <Glow
        position={[0, -0.1, -0.2]}
        scale={[scaleMesh[0] / 5, scaleMesh[1] / 5, scaleMesh[2] / 5]}
        color={0x0060e3}
      />
      <Glow
        position={[0, -0.1, -0.1]}
        scale={[scaleMesh[0] / 4, scaleMesh[1] / 4, scaleMesh[2] / 4]}
        color={0xffffff}
        mirrorSpin={true}
      />
    </group>
  )
}
