import { useGLTF } from '@react-three/drei'
import React, { useRef } from 'react'

export function FloorFoundation({ positionMesh, rotationMesh, scaleMesh = [2, 2, 2] }) {
  const { scene, materials } = useGLTF(
    '/assets/obstacles/floor_foundation_front.gltf',
    true,
  )
  const floorFoundationRef = useRef()

  return (
    <group
      ref={floorFoundationRef}
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
