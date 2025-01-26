import { useGLTF } from '@react-three/drei'
import React, { useRef } from 'react'

useGLTF.preload('/assets/obstacles/wall_gated.gltf')

export function WallGated({ positionMesh, rotationMesh, scaleMesh }) {
  const { scene, materials } = useGLTF('/assets/obstacles/wall_gated.gltf', true)
  const WallGatedRef = useRef()

  return (
    <group
      ref={WallGatedRef}
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
