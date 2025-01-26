import React, { useState, useEffect } from 'react'
import { useGameStore } from '../store' // Adjust the import path as necessary

export function SpeedChanger() {
  const [sliderSpeed, setSliderSpeed] = useState(1)
  const speed = useGameStore(state => state.speed)
  const setSpeed = useGameStore(state => state.setSpeed)
  const gameState = useGameStore(state => state.gameState)

  const handleChange = event => {
    setSliderSpeed(Number(event.target.value))
    setSpeed(Number(event.target.value / 10))
  }

  useEffect(() => {
    if (gameState === 'restart') {
      setSliderSpeed(1)
      setSpeed(0.1)
    }
  }, [gameState, setSpeed])

  return (
    <div className='fixed top-0 right-0 p-4 bg-white text-white shadow-lg rounded-md'>
      <label htmlFor="speed-slider" className='pr-2 text-gray-700'>Speed: {speed}</label>
      <input
        id="speed-slider"
        type="range"
        step="1"
        min="1"
        max="20"
        value={sliderSpeed}
        onChange={handleChange}
      />
    </div>
  )
}
