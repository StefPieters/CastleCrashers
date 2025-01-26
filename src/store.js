import {create} from 'zustand';

export const playAudio = (path) => {
    //console.log('play audio from', path);
    const { sound } = useGameStore.getState();
    const audio = new Audio(`/assets/sounds/${path}`);
    audio.volume = sound;
    audio.play();
    return audio;
};

let backgroundMusic = null;

export const playBackgroundMusic = () => {
    const { speed } = useGameStore.getState();
    const playNextMusic = (path) => {
        backgroundMusic = new Audio(`/assets/sounds/${path}`);
        backgroundMusic.volume = 0.04;
        backgroundMusic.playbackRate = 1 + 0.1 + ((speed - 0.1) / 1.9) * 0.4; // Ensure max increment of 1.0
        backgroundMusic.play();
        backgroundMusic.onended = () => {
            playNextMusic(path === 'MedievalMusic.mp3' ? 'MedievalMusic2.mp3' : 'MedievalMusic.mp3');
        };
    };
    playNextMusic('MedievalMusic.mp3');
    return backgroundMusic;
}

export const useGameStore = create((set, get) => ({
    speed: 0,
    coins: 0,
    selectedAvatar: null,
    gameState: 'menu',
    difficulty: 0,
    controls: 'keyboard',
    distance: 0,
    pose: null,
    action: null,
    sound: 0.1,
    spawnSpeed: 2000,
    debugMode: false,
    modelLoaded: true,
    setDebugMode: () => set({ debugMode: !get().debugMode }),
    upDifficulty: (newDifficulty) => {
         set({ difficulty: newDifficulty });
        console.log('difficulty', get().difficulty);
    },
    goSettingScreen: () => {
        set(() => ({
            gameState: 'settings',
        }));
    },
    startGame: () => {
        console.log('start game');
        set(() => ({
            speed: 0.2, //0.2 CHANGE THIS TO 0.2
            difficulty: 0,
            gameState: 'game',
        }));
    },
    endGame: () => {
        console.log('end game');
        set(() => ({
            speed: 0,
            difficulty: 0,
            gameState: 'endgame',
        }));
        if (backgroundMusic) {
            backgroundMusic.pause();
            backgroundMusic = null;
        }
        const restartGame = () => {
            set(() => ({
                gameState: 'restart',
            }));
        };
        const waitForRestart = (timestamp) => {
            if (timestamp >= 2000) {
                restartGame();
            } else {
                requestAnimationFrame(waitForRestart);
            }
        };
        requestAnimationFrame(waitForRestart);
    },
    resetStats: () => {
        set(() => ({
            speed: 0,
            coins: 0,
            spawnSpeed: 4000,
            difficulty: 0,
            gameState: 'playagain',
            }));
            console.log('reset stats', get().gameState);
    },
    backToMenu: () => {
        set(() => ({
            speed: 0,
            coins: 0,
            spawnSpeed: 4000,
            difficulty: 0,
            gameState: 'menu',
        }));
    },
    setModelLoaded: (loaded) => set({ modelLoaded: loaded }),
    setSpeed: (newSpeed) => {
        set({ speed: newSpeed });
        if (backgroundMusic) {
            backgroundMusic.playbackRate = 1 + 0.1 + ((newSpeed - 0.1) / 1.9) * 0.4; // Ensure max increment of 1.0
        }
    },
    setSpawnSpeed: (newSpeed) => set({ spawnSpeed: newSpeed }),
    setControls: (newControls) => set({ controls: newControls }),
    setDistance: (newDistance) => set({ distance: newDistance }),
    setCoins: (newCoins) => set({ coins: newCoins }),
    resetDistance: () => set({ distance: 0 }),
    setPose: (newPose) => {
        if (get().pose !== newPose) {
            set({ pose: newPose });
        }
    },
    setGameAction: (newAction) => {
        
        if (get().action !== newAction) {
            console.log('action performed in store', newAction);
            set({ action: newAction });
        }
    },
    setsound: (newSound) => set({ sound: newSound }),
}));