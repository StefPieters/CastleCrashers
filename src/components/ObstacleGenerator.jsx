import React, { useEffect, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import ObstaclePattern from './ObstaclePattern'
import { useGameStore } from '../store'
import patterns0 from './patterns/patterns0'
import patterns1 from './patterns/patterns1'

// Combine all patterns
const allPatterns = [patterns0, patterns1]

export function ObstacleGenerator() {
  const speed = useGameStore(state => state.speed)
  const gameState = useGameStore(state => state.gameState)
  const difficulty = useGameStore(state => state.difficulty)
  const spawnSpeed = useGameStore(state => state.spawnSpeed) // Use spawnSpeed from the store
  const patterns = allPatterns[difficulty] || patterns1 // Default to patterns0 if difficulty is out of bounds

  const [patternsState, setPatternsState] = useState([])
  const [currentDifficulty, setCurrentDifficulty] = useState(difficulty)
  const [skipNextGeneration, setSkipNextGeneration] = useState(false)
  const [beginPatternUsed, setBeginPatternUsed] = useState(false)

  useEffect(() => {
    if (gameState !== 'game') return

    const generatePattern = () => {
      setPatternsState(prev => {
        if (prev.length > 0 && prev[prev.length - 1].positionZ > -60)
          return prev
        if (skipNextGeneration) {
          setSkipNextGeneration(false)
          return prev
        }

        const patternIndex = Math.floor(Math.random() * patterns.length) // Randomly choose a pattern
        const newPattern = {
          id: Math.random(), // Unique ID for each pattern
          patternIndex, // Index of the chosen pattern
          positionZ:
            prev.length > 0 ? prev[prev.length - 1].positionZ - 200 : -200, // Ensure proper spacing
        }

        return [...prev, newPattern]
      })
    }

    if (!beginPatternUsed) {
      setPatternsState([
        {
          id: Math.random(),
          patternIndex: 0,
          positionZ: -200,
          useBeginPattern: true,
        },
      ])
      setBeginPatternUsed(true)
    } else {
      generatePattern() // Generate the first pattern immediately
    }

    const interval = setInterval(
      () => {
        generatePattern()
      },
      spawnSpeed, // Use spawnSpeed for the interval
    )

    return () => clearInterval(interval)
  }, [gameState, currentDifficulty, skipNextGeneration, beginPatternUsed])

  useEffect(() => {
    if (difficulty !== currentDifficulty) {
      setCurrentDifficulty(difficulty)
      setSkipNextGeneration(true) // Skip the next generation to prevent double generation
      setPatternsState(prev => prev.slice(0, -1)) // Remove the last obstacle from the array
    }
  }, [difficulty])

  useEffect(() => {
    if (gameState === 'restart') {
      setPatternsState([])
      setBeginPatternUsed(false)
    }
  }, [gameState])

  useEffect(() => {
    if (skipNextGeneration) {
      let animationFrameId

      const resetSkipNextGeneration = () => {
        setSkipNextGeneration(false)
      }

      const animate = () => {
        animationFrameId = requestAnimationFrame(animate)
        resetSkipNextGeneration()
      }

      animationFrameId = requestAnimationFrame(animate)

      return () => cancelAnimationFrame(animationFrameId)
    }
  }, [skipNextGeneration])

  return (
    <>
      {patternsState.map(pattern => (
        <ObstaclePattern
          key={pattern.id}
          patternIndex={pattern.patternIndex}
          speed={speed}
          gameState={gameState}
          useBeginPattern={pattern.useBeginPattern}
        />
      ))}
    </>
  )
}

export default ObstacleGenerator
