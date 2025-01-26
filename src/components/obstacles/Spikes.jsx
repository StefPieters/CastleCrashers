import { useGLTF } from '@react-three/drei'
import React, { useRef } from 'react'

export function Spikes({ positionMesh, rotationMesh, scaleMesh = [1.7, 1.7, 1.7] }) {
  const { scene, materials } = useGLTF(
    '/assets/obstacles/floor_tile_big_spikes.gltf',
    true,
  )
  const spikesRef = useRef()

  return (
    <group
      ref={spikesRef}
      position={positionMesh}
      dispose={null}
      rotation={rotationMesh}
      scale={scaleMesh}
    >
      <primitive object={scene.clone()} />
      {scene.traverse(child => {
        if (child.name === 'floor_tile') {
          child.parent.remove(child) // Remove the child mesh named 'wall_doorway_door'
        } else {
          child.material = materials.texture
        }
      })}
    </group>
  )
}
