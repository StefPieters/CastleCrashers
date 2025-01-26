import { useGameStore, playBackgroundMusic, playAudio } from '../store'

function Menu({ fadeOut }) {
  const startGame = useGameStore(state => state.startGame)
  const goToSettings = useGameStore(state => state.goSettingScreen)

  const handleStartGame = () => {
    playAudio('Click.mp3')
    playBackgroundMusic()
    startGame()
  }

  const handleSettings = () => {
    playAudio('Click.mp3')
    goToSettings()
  }

  return (
    <div
      className={`fixed flex flex-col gap-4 justify-center items-center left-0 top-0 w-full h-screen bg-gradient-to-tr from-orange-600 to-amber-400 transition-opacity ${
        fadeOut ? 'opacity-0 duration-1000' : 'opacity-100 duration-10'
      }`}
    >
      {!fadeOut && (
        <>
          <img
            src="/assets/Ui/Logo.png"
            alt="Game Logo"
            className="w-[500px] h-[500px] mb-4 select-none [-webkit-user-drag:none]"
          />
          <div className="relative group">
            <div className="absolute top-4 left-4 z-0 w-[90%] h-[80%] bg-amber-800 opacity-70 blur-md transform group-hover:scale-120 group-hover:bg-yellow-400 group-hover:w-full group-hover:left-0 transition-transform duration-100"></div>
            <img
              src="/assets/Ui/PlayButton.png"
              className="w-[300px] h-[110px] z-10 text-2xl text-center p-4 select-none transform cursor-pointer hover:scale-105 transition-transform duration-100"
              onClick={handleStartGame}
              onMouseEnter={() => playAudio('Hover.mp3')}
            />
          </div>
          <div className="relative group">
            <div className="absolute top-4 left-4 z-0 w-[90%] h-[80%] bg-amber-800 opacity-70 blur-md transform group-hover:scale-120 group-hover:bg-yellow-400 group-hover:w-full group-hover:left-0 transition-transform duration-100"></div>
            <img
              src="/assets/Ui/SettingsButton.png"
              className="w-[300px] h-[110px] z-10 text-2xl text-center p-4 select-none transform cursor-pointer hover:scale-105 transition-transform duration-100"
              onClick={handleSettings}
              onMouseEnter={() => playAudio('Hover.mp3')}
            />
          </div>
        </>
      )}
    </div>
  )
}

export default Menu
