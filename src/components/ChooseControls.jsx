import React from 'react'
import { useGameStore, playAudio } from '../store'

const ChooseControls = () => {

    const controls = useGameStore(state => state.controls)
    const setControls = useGameStore(state => state.setControls)
    const modelLoaded = useGameStore(state => state.modelLoaded)
    const setModelLoaded = useGameStore(state => state.setModelLoaded)


  return (
    <div className="p-4">
      <div className="space-x-2 flex justify-center items-center">
        <div className="relative group">
          {controls === 'keyboard' && (
            <div className="absolute inset-2 z-20 border-8 border-yellow-400 bg-amber-500 bg-opacity-0 rounded-2xl transform scale-100 group-hover:scale-105 transition-transform duration-100 cursor-pointer"></div>
          )}
          <div className="absolute top-4 left-4 z-0 w-[90%] h-[90%] bg-amber-800 opacity-70 blur-md transform group-hover:scale-120 group-hover:bg-yellow-400 group-hover:w-full group-hover:h-full group-hover:top-0 group-hover:left-0 transition-transform duration-100"></div>
          <img
            src="/assets/Ui/KeyboardControls.png"
            className="w-[300px] h-[400px] z-10 text-2xl text-center p-4 select-none transform cursor-pointer group-hover:scale-105 transition-transform duration-100"
            onClick={() => {
              playAudio('Click.mp3')
              setControls('keyboard')
              setModelLoaded(true)
            }}
            onMouseEnter={() => playAudio('Hover.mp3')}
          />
        </div>
        <div className="relative group">
          {controls === 'pose' && (
            <div className="absolute inset-2 z-20 border-8 border-yellow-400 bg-amber-500 bg-opacity-0 rounded-2xl transform scale-100 group-hover:scale-105 transition-transform duration-100 cursor-pointer"></div>
          )}
          <div className="absolute top-4 left-4 z-0 w-[90%] h-[90%] bg-amber-800 opacity-70 blur-md transform group-hover:scale-120 group-hover:bg-yellow-400 group-hover:w-full group-hover:h-full group-hover:top-0 group-hover:left-0 transition-transform duration-100"></div>
          <img
            src="/assets/Ui/FaceControls.png"
            className="w-[300px] h-[400px] z-10 text-2xl text-center p-4 select-none transform cursor-pointer group-hover:scale-105 transition-transform duration-100"
            onClick={() => {
              playAudio('Click.mp3')
              setModelLoaded(false)
              setControls('pose')
            }}
            onMouseEnter={() => playAudio('Hover.mp3')}
          />
        </div>
        <div className="relative group">
          {controls === 'hand' && (
            <div className="absolute inset-2 z-20 border-8 border-yellow-400 bg-amber-500 bg-opacity-0 rounded-2xl transform scale-100 group-hover:scale-105 transition-transform duration-100 cursor-pointer"></div>
          )}
          <div className="absolute top-4 left-4 z-0 w-[90%] h-[90%] bg-amber-800 opacity-70 blur-md transform group-hover:scale-120 group-hover:bg-yellow-400 group-hover:w-full group-hover:h-full group-hover:top-0 group-hover:left-0 transition-transform duration-100"></div>
          <img
            src="/assets/Ui/HandControls.png"
            className="w-[300px] h-[400px] z-10 text-2xl text-center p-4 select-none transform cursor-pointer group-hover:scale-105 transition-transform duration-100"
            onClick={() => {
              playAudio('Click.mp3')
              setModelLoaded(false)
              setControls('hand')
            }}
            onMouseEnter={() => playAudio('Hover.mp3')}
          />
        </div>
      </div>
    </div>
  )
}

export default ChooseControls
