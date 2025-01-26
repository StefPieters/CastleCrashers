import { useGLTF, useTexture } from '@react-three/drei'
import React, { useRef } from 'react'
import wallTextureUrl from '/assets/textures/wall-texture2.png'

export function Roof({ positionMesh }) {
  const { scene } = useGLTF('/assets/background-elements/roof.glb', true)
  const roofRef = useRef()
  const wallTexture = useTexture(wallTextureUrl)

  scene.traverse(child => {
    if (child.isMesh) {
      child.material.map = wallTexture
    }
  })

  return (
    <group
      ref={roofRef}
      position={positionMesh}
      dispose={null}
      scale={[3.9, 4, 7]}
      rotation={[-Math.PI / 2, 0, Math.PI / 2]} //rotate 90 degrees around the X-axis
    >
      {/* Adding the GLTF scene to the group */}
      <primitive object={scene.clone()} />
    </group>
  )
}
