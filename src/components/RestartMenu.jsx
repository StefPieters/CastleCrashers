import { useGameStore, playAudio, playBackgroundMusic, } from '../store'

function RestartMenu() {
  const backToMenu = useGameStore(state => state.backToMenu)
  const resetDistance = useGameStore(state => state.resetDistance)
  const coins = useGameStore(state => state.coins)
  const distance = useGameStore(state => state.distance)
  const startGame = useGameStore(state => state.startGame)
  const resetStats = useGameStore(state => state.resetStats)

  const handleBackToMenu = () => {
    playAudio('Click.mp3')
    backToMenu()
    resetDistance()
  }

  const handleStartGame = () => {
    playAudio('Click.mp3')
    playBackgroundMusic()
    resetStats()
    startGame()
  }

  return (
    <>
      <div className="fixed flex flex-col gap-4 justify-center items-center left-0 top-0 w-full h-screen backdrop-blur-lg">
        <div className="relative">
          <img
            src="/assets/Ui/SmallContainer.png"
            alt="container"
            className="w-[400px] h-[280px] mb-4"
          />
          <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-center items-center p-2">
            <h1 className="text-6xl mb-8">GAME OVER</h1>
            <div className="flex gap-10 items-center justify-center">
              <div className="flex">
                <img
                  src="/assets/Ui/RunIcon.png"
                  alt="RunIcon"
                  className="w-[42px] h-[42px]"
                />
                <h1 className="text-4xl  font-medium pl-2">
                  {distance.toFixed(0)}m
                </h1>
              </div>

              <div className="flex">
                <img
                  src="/assets/Ui/coin.png"
                  alt="coin"
                  className="w-[42px] h-[42px]"
                />
                <h1 className="text-4xl pl-2"> {coins}</h1>
              </div>
            </div>
          </div>
        </div>
        <div className="relative group">
          <div className="absolute top-4 left-4 z-0 w-[90%] h-[80%] bg-amber-800 opacity-70 blur-md transform group-hover:scale-120 group-hover:bg-yellow-400 group-hover:w-full group-hover:left-0 transition-transform duration-100"></div>
          <img
            src="/assets/Ui/PlayAgainButton.png"
            className="w-[300px] h-[110px] z-10 text-2xl text-center p-4 select-none transform cursor-pointer hover:scale-105 transition-transform duration-100"
            onClick={handleStartGame}
            onMouseEnter={() => playAudio('Hover.mp3')}
          />
        </div>
        <div className="relative group">
          <div className="absolute top-4 left-4 z-0 w-[90%] h-[80%] bg-amber-800 opacity-70 blur-md transform group-hover:scale-120 group-hover:bg-yellow-400 group-hover:w-full group-hover:left-0 transition-transform duration-100"></div>
          <img
            src="/assets/Ui/BackMenuButton.png"
            className="w-[300px] h-[110px] z-10 text-2xl text-center p-4 select-none transform cursor-pointer hover:scale-105 transition-transform duration-100"
            onClick={handleBackToMenu}
            onMouseEnter={() => playAudio('Hover.mp3')}
          />
        </div>
      </div>
    </>
  )
}

export default RestartMenu
