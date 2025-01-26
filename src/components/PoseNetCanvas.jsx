import React, { useEffect, useRef, useState } from 'react'
import * as posenet from '@tensorflow-models/posenet'
import * as tf from '@tensorflow/tfjs'
import Webcam from 'react-webcam'
import { useGameStore } from '../store'
import jumpIcon from '/assets/Ui/JumpIcon1.png'
import crouchIcon from '/assets/Ui/CrouchIcon1.png'

const PoseNetCanvas = () => {
  const webcamRef = useRef(null)
  const poseCanvasRef = useRef(null)
  const setPose = useGameStore((state) => state.setPose)
  const setGameAction = useGameStore((state) => state.setGameAction)
  const modelLoaded = useGameStore((state) => state.modelLoaded)
  const setModelLoaded = useGameStore((state) => state.setModelLoaded)
  const [actionLocked, setActionLocked] = useState(false)

  useEffect(() => {
    const initializeBackendAndRunPosenet = async () => {
      try {
        await tf.setBackend('webgl')
        await tf.ready()
        console.log('Backend set to WebGL')
        runPosenet()
      } catch (error) {
        console.error(
          'Error setting backend or initializing TensorFlow.js:',
          error,
        )
      }
    }

    initializeBackendAndRunPosenet()
  }, [])

  const runPosenet = async () => {
    const net = await posenet.load({
      inputResolution: { width: 640, height: 480 },
      scale: 0.2,
    })
    console.log('Facepose model loaded.')
    setModelLoaded(true)


    setInterval(() => {
      detect(net)
    }, 100)
  }

  const detect = async net => {
    if (
      typeof webcamRef.current !== 'undefined' &&
      webcamRef.current !== null &&
      webcamRef.current.video.readyState === 4
    ) {
      const video = webcamRef.current.video
      const videoWidth = webcamRef.current.video.videoWidth
      const videoHeight = webcamRef.current.video.videoHeight

      webcamRef.current.video.width = videoWidth
      webcamRef.current.video.height = videoHeight

      const pose = await net.estimateSinglePose(video)

      const ctx = poseCanvasRef.current.getContext('2d')
      poseCanvasRef.current.width = videoWidth
      poseCanvasRef.current.height = videoHeight

      drawPose(pose, ctx, videoHeight, videoWidth)
    }
  }

  const drawPose = (pose, ctx, videoHeight, videoWidth) => {
    if (!pose) return

    const numLanes = 3
    const laneWidth = videoWidth / numLanes
    const jumpThreshold = videoHeight * 0.3
    const crouchThreshold = videoHeight * 0.7

    ctx.fillStyle = 'rgba(0, 0, 0, 0.3)'
    ctx.fillRect(0, 0, videoWidth, videoHeight)

    for (let i = 1; i < numLanes; i++) {
      const xPos = i * laneWidth
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.7)'
      ctx.lineWidth = 2
      ctx.beginPath()
      ctx.moveTo(xPos, 0)
      ctx.lineTo(xPos, videoHeight)
      ctx.stroke()
    }

    ctx.fillStyle = 'rgba(255, 255, 255, 0.3)'
    ctx.fillRect(0, 0, videoWidth, jumpThreshold)

    ctx.fillStyle = 'rgba(255, 255, 255, 0.3)'
    ctx.fillRect(0, crouchThreshold, videoWidth, videoHeight - crouchThreshold)

    const noseKeypoint = pose.keypoints.find(
      keypoint => keypoint.part === 'nose' && keypoint.score > 0.5,
    )

    if (noseKeypoint) {
      const { position } = noseKeypoint
      const noseX = position.x
      const noseY = position.y

      ctx.beginPath()
      ctx.arc(noseX, noseY, 20, 0, 2 * Math.PI)
      ctx.fillStyle = 'rgba(255, 154, 0, 0.8)'
      ctx.fill()

      // Add a white border
      ctx.lineWidth = 4
      ctx.strokeStyle = 'rgba(255, 207, 0, 0.8)'
      ctx.stroke()

      const newPose =
        noseX < videoWidth / 3 ? 2 : noseX < (2 * videoWidth) / 3 ? 1 : 0
      if (newPose !== useGameStore.getState().pose) {
        setPose(newPose)
        //console.log(`Lane changed to: ${newPose}`)
      }

      // Determine the current action based on Y position
      let currentAction = null
      if (noseY < jumpThreshold) {
        currentAction = 'Jump'
      } else if (noseY > crouchThreshold) {
        currentAction = 'Crouch'
      } else if (noseY >= jumpThreshold && noseY <= crouchThreshold) {
        currentAction = 'Neutral'
      } else {
        // In neutral zone
        //console.log('Checking Neutral zone')
        if (actionLocked) {
          setActionLocked(false)
          setGameAction(null)
          //console.log('Reset - ready for new action')
        }
        return
      }

      // Only log the action if it's different from the current action and not locked
      if (currentAction !== useGameStore.getState().action && !actionLocked) {
        //console.log(`Action performed: ${currentAction}`)
        setGameAction(currentAction)
        setActionLocked(true)
      }
    }
  }

  return (
    <>
      <Webcam
        ref={webcamRef}
        style={{
          position: 'absolute',
          right: 20,
          top: 200,
          zIndex: 9,
          width: 320,
          height: 240,
          border: '4px solid #000',
          borderRadius: '10px',
          transform: 'scaleX(-1)',
        }}
      />
      <canvas
        ref={poseCanvasRef}
        style={{
          position: 'absolute',
          right: 20,
          top: 200,
          zIndex: 9,
          width: 320,
          height: 240,
          border: '4px solid #000',
          borderRadius: '10px',
          transform: 'scaleX(-1)',
        }}
      />
      <img
        src={jumpIcon}
        alt="Jump Icon"
        style={{
          position: 'absolute',
          right: 30,
          top: 215,
          zIndex: 10,
          width: 40,
          height: 50,
        }}
      />
      <img
        src={crouchIcon}
        alt="Crouch Icon"
        style={{
          position: 'absolute',
          right: 30,
          top: 390,
          zIndex: 10,
          width: 60,
          height: 30,
        }}
      />
    </>
  )
}

export default PoseNetCanvas
