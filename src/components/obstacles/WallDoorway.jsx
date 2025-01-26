import { useGLTF } from '@react-three/drei'
import React, { useRef } from 'react'

useGLTF.preload('/assets/obstacles/wall_doorway.gltf')

export function WallDoorway({ positionMesh, rotationMesh, scaleMesh }) {
  const { scene, materials } = useGLTF('/assets/obstacles/wall_doorway.gltf', true)
  const WallDoorwayRef = useRef()

  return (
    <group
      ref={WallDoorwayRef}
      position={positionMesh}
      rotation={rotationMesh}
      dispose={null}
      scale={scaleMesh}
    >
      <primitive object={scene.clone()} />
      {scene.traverse(child => {
        if (child.isMesh) {
          if (child.name === 'wall_doorway_door') {
            child.parent.remove(child); // Remove the child mesh named 'wall_doorway_door'
          } else {
            child.material = materials.texture
          }
        }
      })}
    </group>
  )
}
