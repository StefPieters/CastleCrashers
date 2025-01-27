import React, { useEffect, useRef } from 'react';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { useThree } from '@react-three/fiber';
import { AnimationMixer } from 'three';

export const Character = ({ isCrouching, isJumping }) => {
  const { scene, clock } = useThree();
  const characterRef = useRef();
  const mixerRef = useRef();
  const actionsRef = useRef({});

  useEffect(() => {
    const loader = new GLTFLoader()
    loader.load('/assets/character/Knight.glb', gltf => {
      const model = gltf.scene
      model.position.set(0, -1.1, 0.7)
      model.rotation.y = Math.PI
      model.scale.set(1.5, 1.5, 1.5)
      characterRef.current.add(model)

      // Traverse the model's scene graph to find and remove items
      const meshesToRemove = []
      model.traverse(child => {
        if (
          child.isMesh &&
          [
            '2H_Sword',
            'Rectangle_Shield',
            'Round_Shield',
            'Spike_Shield',
            '1H_Sword_Offhand',
          ].includes(child.name)
        ) {
          meshesToRemove.push(child)
        }
      })

      meshesToRemove.forEach(child => {
        child.parent.remove(child)
        child.geometry.dispose()
        child.material.dispose()
      })

      const mixer = new AnimationMixer(model)
      mixerRef.current = mixer
      actionsRef.current = {
        Running_A: mixer.clipAction(
          gltf.animations.find(clip => clip.name === 'Running_A'),
        ),
        Lie_Down: mixer.clipAction(
          gltf.animations.find(clip => clip.name === 'Lie_Down'),
        ),
        Jump: mixer.clipAction(
          gltf.animations.find(clip => clip.name === 'Jump_Land'),
        ),
      }

      actionsRef.current.Running_A.timeScale = 14 // Increase the speed of the Running_A animation
      actionsRef.current.Running_A.play()
      actionsRef.current.Jump.timeScale = 2 // Increase the speed of the Jump animation
      actionsRef.current.Lie_Down.timeScale = 15 // Increase the speed of the Lie_Down animation
    })

    return () => {
      if (mixerRef.current) {
        mixerRef.current.stopAllAction();
      }
    };
  }, []);

  useEffect(() => {
    if (
      actionsRef.current.Running_A &&
      actionsRef.current.Lie_Down &&
      actionsRef.current.Jump
    ) {
      const model = characterRef.current.children[0] // Assuming the model is the first child of characterRef
      if (isCrouching) {
        actionsRef.current.Running_A.stop()
        actionsRef.current.Jump.stop()
        actionsRef.current.Lie_Down.play()
        if (model) {
          model.position.y = -0.2 // Set position for crouching
          model.position.z = -0.7 // Adjust position for crouching
        }
      } else if (isJumping) {
        actionsRef.current.Running_A.stop()
        actionsRef.current.Lie_Down.stop()
        actionsRef.current.Jump.play()
        if (model) {
          model.position.y = -1.1 // Reset position for jumping
          model.position.z = 0.7 // Reset position for jumping
        }
      } else {
        actionsRef.current.Lie_Down.stop()
        actionsRef.current.Jump.stop()
        actionsRef.current.Running_A.play()
        if (model) {
          model.position.y = -1.1 // Reset position for running
          model.position.z = 0.7 // Reset position for running
        }
      }
    }
  }, [isCrouching, isJumping])

  useEffect(() => {
    const animate = () => {
      if (mixerRef.current) {
        mixerRef.current.update(clock.getDelta());
      }
      requestAnimationFrame(animate);
    };
    animate();
  }, [clock]);

  return (
      <group ref={characterRef}>
        {/* The knight model will be added here */}
      </group>
  )
};