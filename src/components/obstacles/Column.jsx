import { useGLTF } from '@react-three/drei'
import React, { useRef } from 'react'

useGLTF.preload('/assets/obstacles/column.gltf')

export function Column({ positionMesh, rotationMesh, scaleMesh = [2, 4, 2] }) {
  const { scene, materials } = useGLTF('/assets/obstacles/column.gltf', true)
  const columnRef = useRef()

  return (
    <group
      ref={columnRef}
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
