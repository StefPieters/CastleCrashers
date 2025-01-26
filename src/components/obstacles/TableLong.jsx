import { useGLTF } from '@react-three/drei'
import React, { useRef, useState} from 'react'

useGLTF.preload('/assets/obstacles/table_long.gltf')
useGLTF.preload('/assets/obstacles/table_long_tablecloth.gltf')
useGLTF.preload('/assets/obstacles/table_long_tablecloth_decorated_A.gltf')
useGLTF.preload('/assets/obstacles/table_long_decorated_C.gltf')

export function TableLong({ positionMesh, rotationMesh, scaleMesh = [2, 2, 2], type }) {
  const gltfFiles = {
    table: '/assets/obstacles/table_long.gltf',
    table_cloth: '/assets/obstacles/table_long_tablecloth.gltf',
    table_decorated_A: '/assets/obstacles/table_long_tablecloth_decorated_A.gltf',
    table_decorated_B: '/assets/obstacles/table_long_decorated_C.gltf'
  }
  const [randomGltf] = useState(type ? gltfFiles[type] : gltfFiles[Object.keys(gltfFiles)[Math.floor(Math.random() * Object.keys(gltfFiles).length)]])
    const { scene, materials } = useGLTF(randomGltf, true)
  const tableLongRef = useRef()

  return (
    <group
      ref={tableLongRef}
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
