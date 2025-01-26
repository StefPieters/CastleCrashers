import { useGLTF } from '@react-three/drei'
import React, { useRef, useState } from 'react'

export function Boxes({ positionMesh, rotationMesh, scaleMesh = [2, 2, 2], type }) {
  const gltfFiles = {
    box_stacked: '/assets/obstacles/box_stacked.gltf',
    box_crates: '/assets/obstacles/crates_stacked.gltf',
    box_bed: '/assets/obstacles/bed_decorated.gltf',
  }
  const [randomGltf] = useState(type ? gltfFiles[type] : gltfFiles[Object.keys(gltfFiles)[Math.floor(Math.random() * Object.keys(gltfFiles).length)]])
  const { scene, materials } = useGLTF(randomGltf, true)
  const boxesRef = useRef()

  return (
    <group
      ref={boxesRef}
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
