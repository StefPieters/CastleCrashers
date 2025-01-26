import { useGLTF } from '@react-three/drei'
import React, { useRef, useState } from 'react'

export function Keg({ positionMesh, rotationMesh, scaleMesh = [2, 2, 2], type }) {
  const gltfFiles = {
    keg_decorated: '/assets/obstacles/keg_decorated.gltf',
    keg_large: '/assets/obstacles/barrel_large.gltf',
    keg_large_decorated: '/assets/obstacles/barrel_large_decorated.gltf',
    keg: '/assets/obstacles/keg.gltf',
  }
  const [randomGltf] = useState(type ? gltfFiles[type] : gltfFiles[Object.keys(gltfFiles)[Math.floor(Math.random() * Object.keys(gltfFiles).length)]])
  const { scene, materials } = useGLTF(randomGltf, true)
  const kegRef = useRef()

  return (
    <group
      ref={kegRef}
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
