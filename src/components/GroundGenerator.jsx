import { useRef, useState } from 'react'
import { useFrame, useLoader } from '@react-three/fiber'
import { useGameStore } from '../store'
import { lightenColor, getRandomColor } from '../utils/Colors'
import * as THREE from 'three'
import woodTextureUrl from '/assets/textures/wood-texture8.png'

export function GroundGenerator() {
   const color1 = getRandomColor()
   const color2 = lightenColor(color1, 10)

  const speed = useGameStore(state => state.speed) // Access the speed from the Zustand store
  const gameState = useGameStore(state => state.gameState)
  //console.log(speed)

  const [grounds, setGrounds] = useState([
    { id: 1, positionZ: -240, color: color2 },
    { id: 2, positionZ: -210, color: color1 },
    { id: 3, positionZ: -180, color: color2 },
    { id: 4, positionZ: -150, color: color1 },
    { id: 5, positionZ: -120, color: color2 },
    { id: 6, positionZ: -90, color: color1 },
    { id: 7, positionZ: -60, color: color2 },
    { id: 8, positionZ: -30, color: color1 },
    { id: 9, positionZ: 0, color: color2 },
  ])

  const woodTexture = useLoader(THREE.TextureLoader, woodTextureUrl)
  woodTexture.wrapS = THREE.RepeatWrapping
  woodTexture.wrapT = THREE.RepeatWrapping
  woodTexture.repeat.set(3, 3)

  useFrame(() => {
    if (gameState !== 'game') return
    setGrounds(prevGrounds => {
      const newGrounds = prevGrounds.map(ground => {
        const newPositionZ = ground.positionZ + speed
        return { ...ground, positionZ: newPositionZ }
      })

      newGrounds.forEach(ground => {
        if (ground.positionZ >= 40) {
          const lastGround = newGrounds.reduce((prev, current) =>
            prev.positionZ < current.positionZ ? current : prev,
          )
          ground.positionZ = lastGround.positionZ - 240
        }
      })

      return newGrounds
    })
  })

  return (
    <>
      {grounds.map(ground => (
        <mesh
          key={ground.id}
          position={[0, -0.1, ground.positionZ]}
          receiveShadow
        >
          <boxGeometry args={[15, 0.2, 30]} />
          <meshStandardMaterial map={woodTexture} color="white" />
        </mesh>
      ))}
    </>
  )
}
