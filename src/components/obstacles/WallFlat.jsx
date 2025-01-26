import { useGLTF } from '@react-three/drei'
import React, { useRef } from 'react'

export function WallFlat({ positionMesh, rotationMesh, scaleMesh }) {
  const { scene, materials } = useGLTF('/assets/obstacles/wall.gltf', true)
  const WallRef = useRef()

  return (
    <group
      ref={WallRef}
      position={positionMesh}
      rotation={rotationMesh}
      dispose={null}
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
