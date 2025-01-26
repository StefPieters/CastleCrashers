import React, { useEffect, useRef, useState } from 'react';
import * as handpose from '@tensorflow-models/handpose';
import * as tf from '@tensorflow/tfjs';
import Webcam from 'react-webcam';
import { useGameStore } from '../store';
import jumpIcon from '/assets/Ui/JumpIcon1.png';
import crouchIcon from '/assets/Ui/CrouchIcon1.png';

const HandPoseCanvas = () => {
  const webcamRef = useRef(null);
  const poseCanvasRef = useRef(null);
  const setPose = useGameStore(state => state.setPose);
  const setGameAction = useGameStore((state) => state.setGameAction)
    const modelLoaded = useGameStore(state => state.modelLoaded);
    const setModelLoaded = useGameStore(state => state.setModelLoaded);
    const [actionLocked, setActionLocked] = useState(false)

  useEffect(() => {
    const initializeBackendAndRunHandpose = async () => {
      try {
        await tf.setBackend('webgl');
        await tf.ready();
        console.log('Backend set to WebGL');
        runHandpose();
      } catch (error) {
        console.error('Error setting backend or initializing TensorFlow.js:', error);
      }
    };

    initializeBackendAndRunHandpose();
  }, []);

  const runHandpose = async () => {
    const net = await handpose.load();
    console.log('Handpose model loaded.');
    setModelLoaded(true)

    setInterval(() => {
      detect(net).catch(error => console.error('Detection error:', error));
    }, 200); // Adjusted interval to 200ms
  };

  const detect = async net => {
    if (
      typeof webcamRef.current !== 'undefined' &&
      webcamRef.current !== null &&
      webcamRef.current.video.readyState === 4
    ) {
      const video = webcamRef.current.video;
      const videoWidth = webcamRef.current.video.videoWidth;
      const videoHeight = webcamRef.current.video.videoHeight;

      webcamRef.current.video.width = videoWidth;
      webcamRef.current.video.height = videoHeight;

      const predictions = await net.estimateHands(video);

      const ctx = poseCanvasRef.current.getContext('2d');
      poseCanvasRef.current.width = videoWidth;
      poseCanvasRef.current.height = videoHeight;

      drawHand(predictions, ctx, videoHeight, videoWidth);
    }
  };

  const drawStaticElements = (ctx, videoHeight, videoWidth) => {
    const numLanes = 3;
    const laneWidth = videoWidth / numLanes;
    const jumpThreshold = videoHeight * 0.3;
    const crouchThreshold = videoHeight * 0.7;

    ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
    ctx.fillRect(0, 0, videoWidth, videoHeight);

    for (let i = 1; i < numLanes; i++) {
      const xPos = i * laneWidth;
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.7)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(xPos, 0);
      ctx.lineTo(xPos, videoHeight);
      ctx.stroke();
    }

    ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
    ctx.fillRect(0, 0, videoWidth, jumpThreshold);

    ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
    ctx.fillRect(0, crouchThreshold, videoWidth, videoHeight - crouchThreshold);
  };

  const drawHand = (predictions, ctx, videoHeight, videoWidth) => {
    const jumpThreshold = videoHeight * 0.3;
    const crouchThreshold = videoHeight * 0.7;

    ctx.clearRect(0, 0, videoWidth, videoHeight); // Clear the canvas
    drawStaticElements(ctx, videoHeight, videoWidth); // Draw static elements

    if (predictions.length === 0) return;

    predictions.forEach(prediction => {
      const landmarks = prediction.landmarks;

      // Use the palm base point instead of the index finger tip
      const palmBase = landmarks[0];
      if (palmBase) {
        const [x, y] = palmBase;

        ctx.beginPath();
        ctx.arc(x, y, 20, 0, 2 * Math.PI);
        ctx.fillStyle = 'rgba(255, 154, 0, 0.8)';
        ctx.fill();

        ctx.lineWidth = 4;
        ctx.strokeStyle = 'rgba(255, 207, 0, 0.8)';
        ctx.stroke();

        const newPose =
          x < videoWidth / 3 ? 2 : x < (2 * videoWidth) / 3 ? 1 : 0;
        if (newPose !== useGameStore.getState().pose) {
          setPose(newPose);
          console.log(`Lane changed to: ${newPose}`);
        }

        // Determine the current action based on Y position
        let currentAction = null;
        if (y < jumpThreshold) {
          currentAction = 'Jump';
        } else if (y > crouchThreshold) {
          currentAction = 'Crouch';
        } else {
          currentAction = 'Neutral';
        }

        // Only log the action if it's different from the current action and not locked
        if (currentAction !== useGameStore.getState().action && !actionLocked) {
          console.log(`Action performed: ${currentAction}`);
          setGameAction(currentAction);
          setActionLocked(true);
        }
      }
    });
  };

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
  );
};

export default HandPoseCanvas;

