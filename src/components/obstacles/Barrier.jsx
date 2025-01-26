import { useGLTF } from '@react-three/drei'
import React, { useRef } from 'react'

useGLTF.preload('/assets/obstacles/barrier.gltf')

export function Barrier({ positionMesh, rotationMesh, scaleMesh = [1.4, 2, 2] }) {
  const { scene, materials } = useGLTF('/assets/obstacles/barrier.gltf', true)
  const barrierRef = useRef()

  return (
    <group
      ref={barrierRef}
      position={positionMesh}
      dispose={null}
      rotation={rotationMesh}
      scale={scaleMesh}
    >
      <primitive object={scene.clone()} />
      {scene.traverse(child => {
        if (child.isMesh) {
          child.material = materials.texture
        }
      })}
    </group>
  )
}
