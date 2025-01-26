import { useGLTF } from '@react-three/drei'
import React, { useRef } from 'react'
import { useLoader, useFrame } from '@react-three/fiber'
import { useGameStore } from '../../store' // Import the game store
import lavaTextureUrl from '/assets/textures/lava-texture.png'
import * as THREE from 'three'

export function Lava() {
  const { scene } = useGLTF('/assets/background-elements/lava.glb', true)
  const lavaRef = useRef()
  const lavaTexture = useLoader(THREE.TextureLoader, lavaTextureUrl)
  const gameState = useGameStore((state) => state.gameState) // Get the game state

  // Define animation properties
  const animation = useRef({
    directionX: 1,
    directionZ: 1,
    speedX: 0.01,
    speedY: 0.005,
    speedZ: 0.01,
    positionX: 0, // Starting X position
    positionZ: 0, // Starting Z position
    timeY: 0, // Used for sine wave on Y-axis
  })

  // Update the group position in every frame
  useFrame(() => {
    if (lavaRef.current) {
      const { directionX, directionZ, speedX, speedZ, speedY } =
        animation.current

      // Update X position
      animation.current.positionX += speedX * directionX
      lavaRef.current.position.x = animation.current.positionX

      // Reverse X direction if bounds are exceeded
      if (
        lavaRef.current.position.x > 1 || // Replace 1 with your desired maximum
        lavaRef.current.position.x < -1 // Replace -1 with your desired minimum
      ) {
        animation.current.directionX *= -1
      }

      // Update Y position using a sine wave for smooth up and down motion
      animation.current.timeY += speedY
      lavaRef.current.position.y = -7 + Math.sin(animation.current.timeY) * 0.5 // Amplitude of 0.5

      // Update Z position
      if ((gameState === 'endgame' || gameState === 'restart') && lavaRef.current.position.z > -70) {
        lavaRef.current.position.z -= 0.1 // Move Z position backward gradually
      } else if (gameState !== 'endgame' && gameState !== 'restart') {
        animation.current.positionZ += speedZ * directionZ
        lavaRef.current.position.z = 15 + animation.current.positionZ

        // Reverse Z direction if bounds are exceeded
        if (
          lavaRef.current.position.z > 16 || // Centered at 25, max bound 25 + 1
          lavaRef.current.position.z < 14 // Centered at 25, min bound 25 - 1
        ) {
          animation.current.directionZ *= -1
        }
      }

      // Animate the texture offset to make it appear as if it is moving
      lavaTexture.offset.y += 0.001
      lavaTexture.offset.x += 0.001
    }
  })

  return (
    <group
      ref={lavaRef}
      position={[0, -7, 15]}
      dispose={null}
      scale={[5, 4, 4]}
      rotation={[-Math.PI / 2, 0, -Math.PI / 2]} // Rotate 90 degrees around the X-axis
    >
      <primitive object={scene.clone()} />
      {scene.traverse(child => {
        if (child.isMesh) {
          child.material.map = lavaTexture
          child.material.color = new THREE.Color('#ff0000')
          child.material.emissive = new THREE.Color('#ff8000')
          child.material.emissiveIntensity = 0.7
        }
      })}
    </group>
  )
}
