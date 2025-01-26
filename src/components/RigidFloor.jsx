import React from 'react'
import { RigidBody, CuboidCollider } from '@react-three/rapier'

export const RigidFloor = () => {
    return (
      <RigidBody colliders={false} position={[0, -1, 0]} type="fixed">
        <CuboidCollider args={[25, 1, 0.8]} />
        <boxGeometry args={[25, 1, 0.8]} />
      </RigidBody>
    )
}
