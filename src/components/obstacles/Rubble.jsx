import { useGLTF } from '@react-three/drei'
import React, { useRef } from 'react'

export function Rubble({ positionMesh, rotationMesh, scaleMesh = [2, 2, 2] }) {
  const { scene, materials } = useGLTF('/assets/obstacles/rubble_large.gltf', true)
  const rubbleRef = useRef()

  return (
    <group
      ref={rubbleRef}
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
