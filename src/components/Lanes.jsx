import React from 'react'
import { useRef } from 'react'
import { useGameStore } from '../store'
import { useFrame } from '@react-three/fiber'

const Box = ({ color, position }) => (
  <mesh position={position}>
    <boxGeometry args={[5, 0.01, 400]} />
    <meshPhongMaterial color={color} opacity={0.1} transparent />
  </mesh>
)

const Lanes = () => {

    const darkerLaneColor = '#a9a9a9'
    const lighterLaneColor = '#d3d3d3'
    
  return (
    <>
      <Box color={darkerLaneColor} position={[-5, 0.02, 0]} />
      <Box color={lighterLaneColor} position={[0, 0.02, 0]} />
      <Box color={darkerLaneColor} position={[5, 0.02, 0]} />
    </>
  )
}

export default Lanes
