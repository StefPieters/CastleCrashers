import { useState, useMemo } from 'react'
import { useFrame, useLoader } from '@react-three/fiber'
import { useGameStore } from '../store'
import * as THREE from 'three'
import lavaTextureUrl from '/assets/textures/lava-texture.png'
import wallTextureUrl from '/assets/textures/wall-texture.png'
import wallTexture2Url from '/assets/textures/wall-texture2.png'
import pillarTextureUrl from '/assets/textures/pillar-texture.png'
import { Roof } from './background/Roof'

export function BackgroundGenerator() {
  const speed = useGameStore(state => state.speed) // Access the speed from the Zustand store
  const gameState = useGameStore(state => state.gameState)
  //console.log(speed)

  const lavaTexture = useLoader(THREE.TextureLoader, lavaTextureUrl)
  lavaTexture.wrapS = THREE.RepeatWrapping
  lavaTexture.wrapT = THREE.RepeatWrapping
  lavaTexture.repeat.set(0.2, 20)

  const wallTexture = useLoader(THREE.TextureLoader, wallTextureUrl)
  wallTexture.wrapS = THREE.RepeatWrapping
  wallTexture.wrapT = THREE.RepeatWrapping
  wallTexture.repeat.set(1, 1)

  const wallTexture2 = useLoader(THREE.TextureLoader, wallTexture2Url)
  wallTexture2.wrapS = THREE.RepeatWrapping
  wallTexture2.wrapT = THREE.RepeatWrapping
  wallTexture2.repeat.set(1, 1)

  const pillarTexture = useLoader(THREE.TextureLoader, pillarTextureUrl)
  pillarTexture.wrapS = THREE.RepeatWrapping
  pillarTexture.wrapT = THREE.RepeatWrapping
  pillarTexture.repeat.set(1, 1)

  const [smallWall, setsmallWall] = useState([
    { id: 1, positionZ: -300, texture: wallTexture2 },
    { id: 2, positionZ: -150, texture: wallTexture2 },
    { id: 3, positionZ: -0, texture: wallTexture2 },
  ])

  const [smallWall2, setsmallWall2] = useState([
    { id: 4, positionZ: -300, texture: wallTexture2 },
    { id: 5, positionZ: -150, texture: wallTexture2 },
    { id: 6, positionZ: -0, texture: wallTexture2 },
  ])

  const [walls, setWalls] = useState([
    { id: 1, positionZ: -300, texture: wallTexture },
    { id: 2, positionZ: -150, texture: wallTexture },
    { id: 3, positionZ: -0, texture: wallTexture },
  ])

  const [walls2, setWalls2] = useState([
    { id: 1, positionZ: -300, texture: wallTexture },
    { id: 2, positionZ: -150, texture: wallTexture },
    { id: 3, positionZ: -0, texture: wallTexture },
  ])

  const [stoneFloor, setStoneFloor] = useState([
    { id: 1, positionZ: -300, texture: lavaTexture },
    { id: 2, positionZ: -150, texture: lavaTexture },
    { id: 3, positionZ: -0, texture: lavaTexture },
  ])

  const [stoneFloor2, setStoneFloor2] = useState([
    { id: 1, positionZ: -300, texture: lavaTexture },
    { id: 2, positionZ: -150, texture: lavaTexture },
    { id: 3, positionZ: -0, texture: lavaTexture },
  ])

  const [pillars, setPillars] = useState([
    { id: 16, positionZ: -300, texture: pillarTexture },
    { id: 15, positionZ: -280, texture: pillarTexture },
    { id: 14, positionZ: -260, texture: pillarTexture },
    { id: 13, positionZ: -240, texture: pillarTexture },
    { id: 12, positionZ: -220, texture: pillarTexture },
    { id: 11, positionZ: -200, texture: pillarTexture },
    { id: 10, positionZ: -180, texture: pillarTexture },
    { id: 9, positionZ: -160, texture: pillarTexture },
    { id: 8, positionZ: -140, texture: pillarTexture },
    { id: 7, positionZ: -120, texture: pillarTexture },
    { id: 6, positionZ: -100, texture: pillarTexture },
    { id: 5, positionZ: -80, texture: pillarTexture },
    { id: 4, positionZ: -60, texture: pillarTexture },
    { id: 3, positionZ: -40, texture: pillarTexture },
    { id: 2, positionZ: -20, texture: pillarTexture },
    { id: 1, positionZ: -0, texture: pillarTexture },
  ])

  const [pillars2, setPillars2] = useState([
    { id: 16, positionZ: -300, texture: pillarTexture },
    { id: 15, positionZ: -280, texture: pillarTexture },
    { id: 14, positionZ: -260, texture: pillarTexture },
    { id: 13, positionZ: -240, texture: pillarTexture },
    { id: 12, positionZ: -220, texture: pillarTexture },
    { id: 11, positionZ: -200, texture: pillarTexture },
    { id: 10, positionZ: -180, texture: pillarTexture },
    { id: 9, positionZ: -160, texture: pillarTexture },
    { id: 8, positionZ: -140, texture: pillarTexture },
    { id: 7, positionZ: -120, texture: pillarTexture },
    { id: 6, positionZ: -100, texture: pillarTexture },
    { id: 5, positionZ: -80, texture: pillarTexture },
    { id: 4, positionZ: -60, texture: pillarTexture },
    { id: 3, positionZ: -40, texture: pillarTexture },
    { id: 2, positionZ: -20, texture: pillarTexture },
    { id: 1, positionZ: -0, texture: pillarTexture },
  ])

  const [roofs, setRoofs] = useState([
    { id: 1, positionZ: -300 },
    { id: 2, positionZ: -250 },
    { id: 3, positionZ: -200 },
    { id: 4, positionZ: -150 },
    { id: 5, positionZ: -100 },
    { id: 6, positionZ: -50 },
    { id: 7, positionZ: 0 },
  ])

  useFrame(() => {
    if (gameState !== 'game') return
    setsmallWall(prevsmallWall => {
      const newsmallWall = prevsmallWall.map(smallWall => {
        const newPositionZ = smallWall.positionZ + speed
        return { ...smallWall, positionZ: newPositionZ }
      })

      newsmallWall.forEach(smallWall => {
        if (smallWall.positionZ >= 150) {
          const lastsmallWall = newsmallWall.reduce((prev, current) =>
            prev.positionZ < current.positionZ ? current : prev,
          )
          smallWall.positionZ = lastsmallWall.positionZ - 450
        }
      })

      return newsmallWall
    })

    setsmallWall2(prevsmallWall => {
      const newsmallWall = prevsmallWall.map(smallWall => {
        const newPositionZ = smallWall.positionZ + speed
        return { ...smallWall, positionZ: newPositionZ }
      })

      newsmallWall.forEach(smallWall => {
        if (smallWall.positionZ >= 150) {
          const lastsmallWall = newsmallWall.reduce((prev, current) =>
            prev.positionZ < current.positionZ ? current : prev,
          )
          smallWall.positionZ = lastsmallWall.positionZ - 450
        }
      })

      return newsmallWall
    })

    setWalls(prevWalls => {
      const newWalls = prevWalls.map(wall => {
        const newPositionZ = wall.positionZ + speed
        return { ...wall, positionZ: newPositionZ }
      })

      newWalls.forEach(wall => {
        if (wall.positionZ >= 150) {
          const lastWall = newWalls.reduce((prev, current) =>
            prev.positionZ < current.positionZ ? current : prev,
          )
          wall.positionZ = lastWall.positionZ - 450
        }
      })

      return newWalls
    })

    setWalls2(prevWalls => {
      const newWalls = prevWalls.map(wall => {
        const newPositionZ = wall.positionZ + speed
        return { ...wall, positionZ: newPositionZ }
      })

      newWalls.forEach(wall => {
        if (wall.positionZ >= 150) {
          const lastWall = newWalls.reduce((prev, current) =>
            prev.positionZ < current.positionZ ? current : prev,
          )
          wall.positionZ = lastWall.positionZ - 450
        }
      })

      return newWalls
    })

    setStoneFloor(prevStoneFloor => {
      const newStoneFloor = prevStoneFloor.map(stoneFloor => {
        const newPositionZ = stoneFloor.positionZ + speed
        return { ...stoneFloor, positionZ: newPositionZ }
      })

      newStoneFloor.forEach(stoneFloor => {
        if (stoneFloor.positionZ >= 150) {
          const lastStoneFloor = newStoneFloor.reduce((prev, current) =>
            prev.positionZ < current.positionZ ? current : prev,
          )
          stoneFloor.positionZ = lastStoneFloor.positionZ - 450
        }
      })

      return newStoneFloor
    })

    setStoneFloor2(prevStoneFloor => {
      const newStoneFloor = prevStoneFloor.map(stoneFloor => {
        const newPositionZ = stoneFloor.positionZ + speed
        return { ...stoneFloor, positionZ: newPositionZ }
      })

      newStoneFloor.forEach(stoneFloor => {
        if (stoneFloor.positionZ >= 150) {
          const lastStoneFloor = newStoneFloor.reduce((prev, current) =>
            prev.positionZ < current.positionZ ? current : prev,
          )
          stoneFloor.positionZ = lastStoneFloor.positionZ - 450
        }
      })

      return newStoneFloor
    })

    setPillars(prevPillars => {
      const newPillars = prevPillars.map(pillar => {
        const newPositionZ = pillar.positionZ + speed
        return { ...pillar, positionZ: newPositionZ }
      })

      newPillars.forEach(pillar => {
        if (pillar.positionZ >= 40) {
          const lastPillar = newPillars.reduce((prev, current) =>
            prev.positionZ < current.positionZ ? current : prev,
          )
          pillar.positionZ = lastPillar.positionZ - 320
        }
      })

      return newPillars
    })

    setPillars2(prevPillars => {
      const newPillars = prevPillars.map(pillar => {
        const newPositionZ = pillar.positionZ + speed
        return { ...pillar, positionZ: newPositionZ }
      })

      newPillars.forEach(pillar => {
        if (pillar.positionZ >= 40) {
          const lastPillar = newPillars.reduce((prev, current) =>
            prev.positionZ < current.positionZ ? current : prev,
          )
          pillar.positionZ = lastPillar.positionZ - 320
        }
      })

      return newPillars
    })

    setRoofs(prevRoofs => {
      const newRoofs = prevRoofs.map(roof => {
        const newPositionZ = roof.positionZ + speed
        return { ...roof, positionZ: newPositionZ }
      })

      newRoofs.forEach(roof => {
        if (roof.positionZ >= 150) {
          const lastRoof = newRoofs.reduce((prev, current) =>
            prev.positionZ < current.positionZ ? current : prev,
          )
          roof.positionZ = lastRoof.positionZ - 350
        }
      })

      return newRoofs
    })
  })

  return (
    <>
      {smallWall.map(smallWall => (
        <mesh key={smallWall.id} position={[8, -0.1, smallWall.positionZ]}>
          <boxGeometry args={[1, 3, 150]} />
          <meshStandardMaterial map={wallTexture2} emissiveIntensity={0.1} />
        </mesh>
      ))}
      {smallWall2.map(smallWall => (
        <mesh key={smallWall.id} position={[-8, -0.1, smallWall.positionZ]}>
          <boxGeometry args={[1, 3, 150]} />
          <meshStandardMaterial map={wallTexture2} emissiveIntensity={0.1} />
        </mesh>
      ))}
      {walls.map(wall => (
        <mesh key={wall.id} position={[15, 13, wall.positionZ]}>
          <boxGeometry args={[2, 25, 150]} />
          <meshStandardMaterial map={wallTexture} emissiveIntensity={0.1} />
        </mesh>
      ))}
      {walls2.map(wall => (
        <mesh key={wall.id} position={[-15, 13, wall.positionZ]}>
          <boxGeometry args={[2, 25, 150]} />
          <meshStandardMaterial map={wallTexture} emissiveIntensity={0.1} />
        </mesh>
      ))}

      {stoneFloor.map(stoneFloor => (
        <mesh key={stoneFloor.id} position={[-11, 1, stoneFloor.positionZ]}>
          <boxGeometry args={[6, 0.2, 150]} />
          <meshStandardMaterial
            map={lavaTexture}
            emissive="#ff8000"
            emissiveIntensity={0.7}
          />
        </mesh>
      ))}

      {stoneFloor2.map(stoneFloor => (
        <mesh key={stoneFloor.id} position={[11, 1, stoneFloor.positionZ]}>
          <boxGeometry args={[6, 0.2, 150]} />
          <meshStandardMaterial
            map={lavaTexture}
            emissive="#ff8000"
            emissiveIntensity={0.7}
          />
        </mesh>
      ))}

      {pillars.map(pillar => (
        <mesh key={pillar.id} position={[-13, 14, pillar.positionZ]}>
          <boxGeometry args={[2, 28, 4]} />
          <meshStandardMaterial map={pillarTexture} emissiveIntensity={0.1} />
        </mesh>
      ))}

      {pillars2.map(pillar => (
        <mesh key={pillar.id} position={[13, 14, pillar.positionZ]}>
          <boxGeometry args={[2, 28, 4]} />
          <meshStandardMaterial map={pillarTexture} emissiveIntensity={0.1} />
        </mesh>
      ))}
      {roofs.map(roof => (
        <Roof key={roof.id} positionMesh={[0, 20, roof.positionZ]} />
      ))}
    </>
  )
}
