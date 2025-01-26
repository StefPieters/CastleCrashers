import { useGLTF } from '@react-three/drei'
import React, { useRef } from 'react'

useGLTF.preload('/assets/obstacles/box_large.gltf')

export function BoxLarge({ positionMesh, rotationMesh, scaleMesh = [3, 3, 3] }) {
  const { scene, materials } = useGLTF('/assets/obstacles/box_large.gltf', true)
  const boxLargeRef = useRef()

  return (
    <group
      ref={boxLargeRef}
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
