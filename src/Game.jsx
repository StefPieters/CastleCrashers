import React from 'react'
import Lanes from './components/Lanes'
import { GroundGenerator } from './components/GroundGenerator'
import { BackgroundGenerator } from './components/BackgroundGenerator'
import { Physics } from '@react-three/rapier'
import { Player } from './components/Player'
import { RigidFloor } from './components/RigidFloor'
import { ObstacleGenerator } from './components/ObstacleGenerator'
import { Lava } from './components/background/Lava'
import { useGameStore } from './store'

function Game() {
  const debugMode = useGameStore(state => state.debugMode)

  return (
    <>
      {debugMode && <axesHelper args={[5]} />}
      <Lanes />
      <directionalLight
        position={[0, 10, 0]}
        intensity={1.2}
        castShadow
        color="white"
      />
      <pointLight position={[-10, 4, 10]} intensity={100} color="orange" />
      <pointLight position={[10, 4, 10]} intensity={100} color="orange" />
      <pointLight position={[0, 15, -20]} intensity={200} color="orange" />
      {/* big lava light */}
      <pointLight position={[5, 10, 15]} intensity={300} color="orange" />
      <pointLight position={[0, 10, 15]} intensity={300} color="orange" />
      <pointLight position={[-5, 10, 15]} intensity={300} color="orange" />
      <Lava />
      <Physics gravity={[0, -9.81, 0]} debug={debugMode}>
        <ObstacleGenerator />
        {/* <OrbitControls /> */}
        <GroundGenerator />
        <BackgroundGenerator />
        <Player />
        <RigidFloor />
      </Physics>
    </>
  )
}

export default Game
