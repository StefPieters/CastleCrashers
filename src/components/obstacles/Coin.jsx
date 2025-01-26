import { useGLTF } from '@react-three/drei'
import React, { useRef } from 'react'
import { useFrame } from '@react-three/fiber'

export function Coin({ positionMesh, scaleMesh}) {
  const { scene, materials } = useGLTF('/assets/obstacles/coin.gltf', true)
  const coinRef = useRef()

  useFrame(() => {
    if (coinRef.current) {
      coinRef.current.rotation.z += 0.01
    }
  })

  return (
    <group
      ref={coinRef}
      position={positionMesh}
      dispose={null}
      rotation={[Math.PI / 2, 0, 0]} // Rotate 90 degrees around the X-axis
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
