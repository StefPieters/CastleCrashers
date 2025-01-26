import { useGLTF } from '@react-three/drei'
import React, { useRef } from 'react'

useGLTF.preload('/assets/obstacles/wall_sloped.gltf')

export function WallSloped({ positionMesh, rotationMesh, scaleMesh }) {
  const { scene, materials } = useGLTF('/assets/obstacles/wall_sloped.gltf', true)
  const WallSlopedRef = useRef()

  return (
    <group
      ref={WallSlopedRef}
      position={positionMesh}
      rotation={rotationMesh}
      dispose={null}
      scale={scaleMesh}
      args={[1, 1, 1]}
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
