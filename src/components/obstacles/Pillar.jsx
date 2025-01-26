import { useGLTF } from '@react-three/drei'
import React, { useRef } from 'react'

export function Pillar({ positionMesh, rotationMesh, scaleMesh = [3, 3, 3] }) {
  const { scene, materials } = useGLTF('/assets/obstacles/pillar.gltf', true)
  const pillarRef = useRef()

  return (
    <group
      ref={pillarRef}
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
