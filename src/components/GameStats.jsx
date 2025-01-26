import React, { useState, useEffect, useRef } from 'react'
import { useGameStore } from '../store'

export function GameStats() {
  const coins = useGameStore(state => state.coins)
  const speed = useGameStore(state => state.speed)
  const setSpeed = useGameStore(state => state.setSpeed)
  const setSpawnSpeed = useGameStore(state => state.setSpawnSpeed)
  const gameState = useGameStore(state => state.gameState)
  const setDistanceStore = useGameStore(state => state.setDistance)
  const debugMode = useGameStore(state => state.debugMode)
  const [distance, setDistance] = useState(0)
  const upDifficulty = useGameStore(state => state.upDifficulty)
  const difficulty = useGameStore(state => state.difficulty)

  // Ref to store the latest distance value safely
  const distanceRef = useRef(0)

  useEffect(() => {
    let interval

    if (gameState === 'game') {
      interval = setInterval(() => {
        setDistance(prev => {
          const newDistance = prev + speed * 10 // Update distance in meters
          distanceRef.current = newDistance // Update the ref value
          return newDistance
        })
      }, 100)
    }

    return () => {
      if (interval) clearInterval(interval)

      if (gameState === 'endgame') {
        // Safely update the store using the ref
        //console.log('Restarting game')
        setDistanceStore(distanceRef.current)
        setDistance(0) // Reset local state
        upDifficulty(0)
      }
    }
  }, [gameState, speed, setDistanceStore])

  useEffect(() => {
    if (difficulty < 5) {
      if (distanceRef.current >= 100 && difficulty < 1) {
        upDifficulty(1)
        setSpeed(0.3)
        setSpawnSpeed(3000)
      } else if (distanceRef.current >= 500 && difficulty < 2) {
        upDifficulty(2)
        setSpawnSpeed(2500)
      } else if (distanceRef.current >= 1000 && difficulty < 3) {
        upDifficulty(3)
        setSpawnSpeed(2000)
      } else if (distanceRef.current >= 2500 && difficulty < 4) {
        upDifficulty(4)
        setSpeed(0.35)
        setSpawnSpeed(2000)
      } else if (distanceRef.current >= 5000 && difficulty < 5) {
        upDifficulty(5)
        setSpawnSpeed(1800)
      } else if (distanceRef.current >= 10000 && difficulty < 6) {
        upDifficulty(6)
        setSpeed(0.4)
      }
    }
  }, [distanceRef.current])

  return (
    <div className="fixed top-4 right-4">
      {debugMode && (
        <h1 className="pr-2 text-sm text-white w-full flex justify-end">Difficulty: {difficulty}</h1>
      )}
      <div className="relative">
        <img
          src="/assets/Ui/SmallContainer.png"
          alt="container"
          className="w-[200px] h-[140px] mb-4"
        />
        <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-center items-center p-2">
          <div className="flex mt-2">
            <img
              src="/assets/Ui/RunIcon.png"
              alt="RunIcon"
              className="w-[42px] h-[42px]"
            />
            <h1 className="text-2xl font-medium pl-2">
              {distance.toFixed(0)}m
            </h1>
          </div>
          <div className="flex items-stretch mt-2">
            <img
              src="/assets/Ui/coin.png"
              alt="coin"
              className="w-[32px] h-[32px] mb-4"
            />
            <h1 className="text-2xl font-medium pl-2"> {coins}</h1>
          </div>
        </div>
      </div>
    </div>
  )
}
