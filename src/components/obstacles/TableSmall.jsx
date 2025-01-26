import { useGLTF } from '@react-three/drei'
import React, { useRef } from 'react'
import { useEffect, useState } from 'react'

useGLTF.preload('/assets/obstacles/table_medium_decorated_A.gltf')
useGLTF.preload('/assets/obstacles/table_medium_tablecloth.gltf')
useGLTF.preload('/assets/obstacles/table_medium_tablecloth_decorated_B.gltf')
useGLTF.preload('/assets/obstacles/table_medium.gltf')

export function TableSmall({ positionMesh, rotationMesh, scaleMesh = [2, 2, 2] }) {
  const gltfFiles = [
    '/assets/obstacles/table_medium_decorated_A.gltf',
    '/assets/obstacles/table_medium_tablecloth.gltf',
    '/assets/obstacles/table_medium_tablecloth_decorated_B.gltf',
    '/assets/obstacles/table_medium.gltf',
  ]
  const [randomGltf, setRandomGltf] = useState(gltfFiles[Math.floor(Math.random() * gltfFiles.length)])
    
    useEffect(() => {
      setRandomGltf(gltfFiles[Math.floor(Math.random() * gltfFiles.length)])
    }, [])
  
    const { scene, materials } = useGLTF(randomGltf, true)
  const tableSmallRef = useRef()

  return (
    <group
      ref={tableSmallRef}
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
