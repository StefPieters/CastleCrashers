import React, { useState, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import { RigidBody } from '@react-three/rapier'
import Obstacle from './Obstacles'
import patterns0 from './patterns/patterns0'
import patterns1 from './patterns/patterns1'
import beginPattern from './patterns/BeginPattern'
import { useGameStore } from '../store'

// Combine all patterns
const allPatterns = [patterns0, patterns1]

const ObstaclePattern = ({
  patternIndex,
  speed,
  gameState,
  useBeginPattern,
}) => {
  const difficulty = useGameStore(state => state.difficulty)
  const patterns = allPatterns[difficulty] || patterns1 // Default to all patterns if difficulty is out of bounds

  const validPatternIndex =
    patternIndex >= 0 && patternIndex < patterns.length ? patternIndex : 0

  const [obstacles, setObstacles] = useState([])

  useEffect(() => {
    if (useBeginPattern) {
      setObstacles(
        beginPattern[0].map(obstacle => ({
          ...obstacle,
          id: Math.random(), // Unique ID for each obstacle
        })),
      )
    } else {
      setObstacles(prevObstacles => [
        ...prevObstacles,
        ...((Array.isArray(patterns[validPatternIndex])
          ? patterns[validPatternIndex]
          : []
        ).map(obstacle => ({
          ...obstacle,
          id: Math.random(), // Unique ID for each obstacle
        })) || []),
      ])
    }
  }, [patternIndex, useBeginPattern])

  useFrame(() => {
    if (gameState !== 'game') {
      setObstacles(prev => prev) // Do not move obstacles
    } else {
      setObstacles(
        prev =>
          prev
            .map(obstacle => ({
              ...obstacle,
              positionZ: obstacle.positionZ + speed, // Move the obstacle based on the speed
            }))
            .filter(obstacle => obstacle.positionZ < 20), // Remove obstacles when they reach z = 20
      )
    }
  })

  return (
    <>
      {obstacles.map(obstacle => (
        <RigidBody
          key={obstacle.id}
          position={[
            obstacle.positionX,
            obstacle.positionY,
            obstacle.positionZ,
          ]}
          type="fixed"
          color={obstacle.color}
          name={obstacle.type} // Add name for the intersection
          typeMesh={obstacle.typeMesh} // Add type for mesh type
          sensor
          onIntersectionEnter={() => {
            //if obstacle is a coin remove coin
            if (obstacle.type === 'coin') {
              setObstacles(prev => prev.filter(o => o.id !== obstacle.id))
            }

            if (obstacle.type.includes('gem')) {
              setObstacles(prev => prev.filter(o => o.id !== obstacle.id))
            }
          }}
        >
          <Obstacle {...obstacle} />
        </RigidBody>
      ))}
    </>
  )
}

export default ObstaclePattern
