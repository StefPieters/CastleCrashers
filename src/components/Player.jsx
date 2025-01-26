import { useState, useEffect, useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { RigidBody, CapsuleCollider } from '@react-three/rapier'
import { Character } from './Character'
import { useGameStore, playAudio } from '../store'
import { play } from '@tensorflow/tfjs-core/dist/test_util'

export function Player() {
  const [targetPosition, setTargetPosition] = useState([0, 10, 0])
  const [velocity, setVelocity] = useState([0, 0, 0])
  const [isOnGround, setIsOnGround] = useState(true)
  const [lineIndex, setLineIndex] = useState(2) // Start in the middle line (index 2)
  const [isCrouching, setIsCrouching] = useState(false) // Crouch state
  const [controlsEnabled, setControlsEnabled] = useState(true) // Controls state
  const [playerDied, setPlayerDied] = useState(false) // Player died state
  const [isJumping, setIsJumping] = useState(false); // Jump state

  const lines = [-5, 0, 5] // Define the 5 lines

  const rigidBodyRef = useRef()
  const setGameState = useGameStore(state => state.endGame)
  const gameState = useGameStore(state => state.gameState)
  const speed = useGameStore(state => state.speed)
  const pose = useGameStore(state => state.pose)
  const action = useGameStore(state => state.action)
  const controls = useGameStore(state => state.controls)
  const coins = useGameStore(state => state.coins)
  const setCoins = useGameStore(state => state.setCoins)
  const { camera } = useThree()
  camera.fov = 80; // Set the desired FOV value
  camera.updateProjectionMatrix(); // Update the projection matrix after changing the FOV

  // Smoothly interpolate values
  const lerp = (start, end, t) => start + (end - start) * t

  // Movement Logic
  useEffect(() => {
    if (!controlsEnabled || (controls !== 'keyboard' && controls !== 'hand')) return

    const handleKeyDown = event => {
      setTargetPosition(prevPosition => {
        switch (event.key) {
          case 'ArrowUp':
          case 'w':
          case 'W':
            if (isOnGround && !isCrouching) {
              playAudio('jump.mp3')
              // Translate the player 0.2 units up to avoid getting stuck on the floor
              setTargetPosition(prevPosition => [prevPosition[0], prevPosition[1] + 0.2, prevPosition[2]])
              setVelocity([velocity[0], 1, velocity[2]]) // Jump up
              setIsOnGround(false)
              setIsJumping(true)
              let jumpStart = null
              const jumpDuration = 1000 // Adjust jump duration as needed
              const animateJump = (timestamp) => {
                if (!jumpStart) jumpStart = timestamp
                const elapsed = timestamp - jumpStart
                if (elapsed < jumpDuration) {
                  requestAnimationFrame(animateJump)
                } else {
                  setIsJumping(false)
                }
              }
              requestAnimationFrame(animateJump)
            }
            return prevPosition
          case 'ArrowLeft':
          case 'a':
          case 'A':
            if (lineIndex > 0) {
              setLineIndex(lineIndex - 1)
              return [lines[lineIndex - 1], prevPosition[1], prevPosition[2]]
            }
            return prevPosition
          case 'ArrowRight':
          case 'd':
          case 'D':
            if (lineIndex < lines.length - 1) {
              setLineIndex(lineIndex + 1)
              return [lines[lineIndex + 1], prevPosition[1], prevPosition[2]]
            }
            return prevPosition
          case 'ArrowDown':
          case 's':
          case 'S':
            if (isOnGround && !isCrouching) {
              playAudio('crouch.mp3')
              setIsCrouching(true)
              const crouchDuration = 1200 - 600 * ((speed - 0.1) / 1.9) // Adjust crouch duration based on speed
              //console.log('Crouching for', crouchDuration, 'ms')
              let crouchStart = null
              const animateCrouch = (timestamp) => {
                if (!crouchStart) crouchStart = timestamp
                const elapsed = timestamp - crouchStart
                if (elapsed < crouchDuration) {
                  requestAnimationFrame(animateCrouch)
                } else {
                  setIsCrouching(false)
                }
              }
              requestAnimationFrame(animateCrouch)
            }
            return prevPosition
          default:
            return prevPosition
        }
      })
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [lineIndex, isOnGround, velocity, isCrouching, speed, controlsEnabled, controls])

  // Update position based on pose from store
  useEffect(() => {
    if (!controlsEnabled || (controls !== 'pose' && controls !== 'hand')) return
    if (pose !== null && pose !== lineIndex) {
      setLineIndex(pose)
      setTargetPosition(prevPosition => [
        lines[pose],
        prevPosition[1],
        prevPosition[2],
      ])
    }
  }, [pose, lineIndex, lines, controls])
  // Update crouch state based on action from store
  useEffect(() => {
    if (!controlsEnabled || (controls !== 'pose' && controls !== 'hand')) return
    if (action === 'Crouch' && isOnGround && !isCrouching) {
      playAudio('crouch.mp3')
      setIsCrouching(true)
      const crouchDuration = 1200 - 600 * ((speed - 0.1) / 1.9) // Adjust crouch duration based on speed
      //console.log('Crouching for', crouchDuration, 'ms')
      let crouchStart = null
      const animateCrouch = (timestamp) => {
        if (!crouchStart) crouchStart = timestamp
        const elapsed = timestamp - crouchStart
        if (elapsed < crouchDuration) {
          requestAnimationFrame(animateCrouch)
        } else {
          setIsCrouching(false)
        }
      }
      requestAnimationFrame(animateCrouch)
    }
  }, [action, isOnGround, isCrouching, speed])

  // Update jump state based on action from store
  useEffect(() => {
    if (!controlsEnabled || (controls !== 'pose' && controls !== 'hand')) return
    if (action === 'Jump' && isOnGround && !isCrouching) {
      playAudio('jump.mp3')
      // Translate the player 0.2 units up to avoid getting stuck on the floor
      setTargetPosition(prevPosition => [prevPosition[0], prevPosition[1] + 0.2, prevPosition[2]])
      setVelocity([velocity[0], 1, velocity[2]]) // Jump up
      setIsOnGround(false)
      setIsJumping(true)
      let jumpStart = null
      const jumpDuration = 1000 // Adjust jump duration as needed
      const animateJump = (timestamp) => {
        if (!jumpStart) jumpStart = timestamp
        const elapsed = timestamp - jumpStart
        if (elapsed < jumpDuration) {
          requestAnimationFrame(animateJump)
        } else {
          setIsJumping(false)
        }
      }
      requestAnimationFrame(animateJump)
    }
  }, [action, isOnGround, isCrouching, velocity])

  // Gravity Simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setTargetPosition(prevPosition => {
        const newY = prevPosition[1] + velocity[1]
        const newVelocityY = velocity[1] - 0.04 // Gravity effect
        setVelocity([velocity[0], newVelocityY, velocity[2]])

        if (newY <= 0.4) {
          setIsOnGround(true)
          setVelocity([velocity[0], 0, velocity[2]]) // Reset vertical velocity when on ground
          return [prevPosition[0], 0.4, prevPosition[2]] // Ensure player doesn't fall below ground level
        }

        return [prevPosition[0], newY, prevPosition[2]]
      })
    }, 1000 / 60) // 60 FPS

    return () => clearInterval(interval)
  }, [velocity])

  // UseFrame to sync the RigidBody with the spring position and update the camera position
  useFrame((state, delta) => {
    if (rigidBodyRef.current) {
      const [x, y, z] = targetPosition
      const currentPos = rigidBodyRef.current.translation()

      // Smoothly transition position using lerp
      const smoothX = lerp(currentPos.x, x, delta * 5) // Adjust '5' to make it faster/slower
      const smoothY = lerp(currentPos.y, y, delta * 5)
      const smoothZ = lerp(currentPos.z, z, delta * 5)

      rigidBodyRef.current.setTranslation(
        { x: smoothX, y: smoothY, z: smoothZ },
        true,
      )

      // Smoothly update the camera position to follow the player if the player hasn't died
      if (gameState === 'game' && !playerDied) {
        camera.position.x = lerp(camera.position.x, smoothX, delta * 5)
        camera.position.y = lerp(camera.position.y, smoothY + 7, delta * 5) // Adjust the camera height as needed
        camera.position.z = lerp(camera.position.z, smoothZ + 15, delta * 5) // Adjust the camera distance as needed
        camera.lookAt(smoothX, smoothY, smoothZ)
      }
    }
  })

  useEffect(() => {
    if (gameState === 'game') {
      setControlsEnabled(true)
      setTargetPosition([0, 10, 0])
      setVelocity([0, 0, 0])
      if (rigidBodyRef.current) {
        rigidBodyRef.current.setTranslation({ x: 0, y: 10, z: 0 }, true)
        rigidBodyRef.current.setLinvel({ x: 0, y: 0, z: 0 }, true)
      }
    }
  }, [gameState])

  const handlePlayerDied = () => {
    if (playerDied) return;
    setPlayerDied(true);
    setControlsEnabled(false);
    playAudio('impact.mp3');
    playAudio('deathSound.mp3');
    setTargetPosition(prevPosition => [
      prevPosition[0],
      prevPosition[1],
      prevPosition[2] + 25, // Move the player back on the z-axis
    ]);

    let deathStart = null;
    const deathDuration = 700; // Duration in milliseconds

    const animateDeath = (timestamp) => {
      if (!deathStart) deathStart = timestamp;
      const elapsed = timestamp - deathStart;
      if (elapsed < deathDuration) {
        requestAnimationFrame(animateDeath);
      } else {
        setGameState();
        setPlayerDied(false);
      }
    };

    requestAnimationFrame(animateDeath);
  };

  const handleCoinCollection = () => {
    setCoins(coins + 1);
    playAudio('coinCollection.mp3');
  };

  const handleGemCollected = (gemType) => {
    playAudio('gemCollection.mp3')
    switch (gemType) {
      case 'green':
        //console.log('Green gem collected!')
        setCoins(coins + 25)
        break
      case 'yellow':
        //console.log('Yellow gem collected!')
        setCoins(coins + 50)
        break
      case 'blue':
        //console.log('Blue gem collected!')
        setCoins(coins + 75)
        break
      case 'red':
        //console.log('Red gem collected!')
        setCoins(coins + 100)
        break
      default:
        break
    }
  }

  return (
    <group>
      <RigidBody
        ref={rigidBodyRef}
        colliders={false}
        type="dynamic"
        enabledRotations={[false, false, false]}
        name="player" // Add name for collision detection
        onIntersectionEnter={({ other }) => {
          if (other.colliderObject.name === 'coin') {
            //console.log('Coin collected!')
            handleCoinCollection();
          }
          if (other.colliderObject.name === 'obstacle') {
            //console.log('Player hit an obstacle!')
            handlePlayerDied();
          }
          if (other.colliderObject.name.includes('gem')) {
           const gemColors = ['yellow', 'red', 'green', 'blue']
           const gemColor = gemColors.find(
             color => other.colliderObject.name === `${color}-gem`,
           )
           if (gemColor) handleGemCollected(gemColor)
          }
        }}
      >
        {/* Change the size of the collider based on the crouch state */}
        <CapsuleCollider
          scale={2} // Adjust collider size
          args={[isCrouching ? 0.02 : 0.4, isCrouching ? 0.55 : 0.6]} // Adjust height when crouching
          position={[0, isCrouching ? 0.3 : 0.6, 0]} // Lower the collider when crouching
          // Call playerDied when the player collides with an obstacle only if it is type obstacle
        />
        <Character isCrouching={isCrouching} isJumping={isJumping} />
      </RigidBody>
    </group>
  )
}
