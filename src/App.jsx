import { useEffect, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { Stats, useGLTF } from '@react-three/drei'
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
  const [loading, setLoading] = useState(true)
  const [loadingProgress, setLoadingProgress] = useState(0)

  useEffect(() => {
    const assets = [
      '/assets/obstacles/barrier.gltf',
      '/assets/obstacles/BlueGem.glb',
      '/assets/obstacles/GreenGem.glb',
      '/assets/obstacles/Glow.glb',
      '/assets/obstacles/floor_foundation_front.gltf',
      '/assets/obstacles/column.gltf',
      '/assets/obstacles/coin.gltf',
      '/assets/obstacles/box_large.gltf',
      '/assets/obstacles/box_stacked.gltf',
      '/assets/obstacles/crates_stacked.gltf',
      '/assets/obstacles/bed_decorated.gltf',
      '/assets/obstacles/wall.gltf',
      '/assets/obstacles/wall_doorway.gltf',
      '/assets/obstacles/table_medium_decorated_A.gltf',
      '/assets/obstacles/table_medium_tablecloth.gltf',
      '/assets/obstacles/table_medium_tablecloth_decorated_B.gltf',
      '/assets/obstacles/table_medium.gltf',
      '/assets/obstacles/table_long.gltf',
      '/assets/obstacles/table_long_tablecloth.gltf',
      '/assets/obstacles/table_long_tablecloth_decorated_A.gltf',
      '/assets/obstacles/table_long_decorated_C.gltf',
      '/assets/obstacles/floor_tile_big_spikes.gltf',
      '/assets/obstacles/rubble_large.gltf',
      '/assets/obstacles/RedGem.glb',
      '/assets/obstacles/pillar.gltf',
      '/assets/obstacles/keg_decorated.gltf',
      '/assets/obstacles/barrel_large.gltf',
      '/assets/obstacles/barrel_large_decorated.gltf',
      '/assets/obstacles/keg.gltf',
      '/assets/obstacles/YellowGem.glb',
      '/assets/obstacles/wall_sloped.gltf',
      '/assets/obstacles/wall_gated.gltf'
    ]

    const loadAssets = async () => {
      for (let i = 0; i < assets.length; i++) {
        await useGLTF.preload(assets[i])
        setLoadingProgress(((i + 1) / assets.length) * 100)
      }
      setLoading(false)
    }
    loadAssets()
  }, [])

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
      {loading ? (
        <div className="flex w-full h-screen justify-center items-center bg-gradient-to-tr from-orange-600 to-amber-400">
          <div className="flex flex-col items-center">
            <svg
              aria-hidden="true"
              className="w-24 h-24 mb-6 mt-6 text-gray-200 animate-spin dark:text-gray-200 opacity-100 fill-orange-500"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
            <div className="text-white font-medium font-Belanosima">
              Loading
            </div>
            <div className="text-white font-medium font-Belanosima">
              [{Math.round(loadingProgress)}%]
            </div>
          </div>
        </div>
      ) : (
        <div className="w-full h-screen bg-[#150F0F] font-Belanosima">
          <div style={{ opacity: gameState === 'game' ? 100 : 0 }}>
            {controls === 'hand' ? (
              <HandPoseCanvas />
            ) : controls === 'pose' ? (
              <PoseNetCanvas />
            ) : null}
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
      )}
    </>
  )
}

export default App
