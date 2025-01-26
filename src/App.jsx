import { useEffect, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { Stats } from '@react-three/drei'
import { GameStats } from './components/GameStats'
import Menu from './components/Menu'
import Game from './Game'
import { useGameStore } from './store'
import RestartMenu from './components/RestartMenu'
import PoseNetCanvas from './components/PoseNetCanvas'
import Settings from './components/Settings'
import LogoStef from './components/LogoStef'
import HandPoseCanvas from './components/HandPoseCanvas'

function App() {
  const gameState = useGameStore(state => state.gameState)
  const controls = useGameStore(state => state.controls)
  const setDebugMode = useGameStore(state => state.setDebugMode)
  const debugMode = useGameStore(state => state.debugMode)
  const [fadeOut, setFadeOut] = useState(false)

  useEffect(() => {
  if (gameState === 'menu') {
    setFadeOut(false)
  }
  if (gameState === 'game') {
    setFadeOut(true)
  }
  }, [gameState])

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        window.location.reload();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'm' || event.key === 'M') {
        setDebugMode();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [setDebugMode]);

  return (
    <>
      <div className="w-full h-screen bg-[#150F0F] font-Belanosima">
        <div style={{ opacity: gameState === 'game' ? 100 : 0 }}>
          {controls === 'hand' ? <HandPoseCanvas /> : controls === 'pose' ? <PoseNetCanvas /> : null}
        </div>
        <LogoStef />
          <Canvas
            camera={{
              position: [0, 10, 14],
              fov: 70,
              far: 200,
              rotation: [100, 0, 0],
            }}
          >
            <fog attach="fog" args={['#150F0F', 60, 210]} />
            <ambientLight intensity={1.2} />
            {debugMode && <Stats />}
            <Game />
          </Canvas>
        <GameStats />
        <Menu fadeOut={fadeOut} />
        {gameState === 'settings' && <Settings />}
        {(gameState === 'restart' || gameState === 'playagain') && (
          <RestartMenu />
        )}
      </div>
    </>
  )
}

export default App
