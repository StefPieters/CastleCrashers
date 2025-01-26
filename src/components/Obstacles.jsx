import React from 'react'
import { Box } from '@react-three/drei'
import { Coin } from './obstacles/Coin'
import { BoxLarge } from './obstacles/BoxLarge';
import { WallFlat } from './obstacles/WallFlat';
import { WallDoorway } from './obstacles/WallDoorway';
import { Spikes } from './obstacles/Spikes';
import { RedGem } from './obstacles/RedGem';
import { YellowGem } from './obstacles/YellowGem';
import { BlueGem } from './obstacles/BlueGem';
import { GreenGem } from './obstacles/GreenGem';
import { useGameStore } from '../store'
import { Pillar } from './obstacles/Pillar';
import { Barrier } from './obstacles/Barrier';
import { WallGated } from './obstacles/WallGated';
import { Rubble } from './obstacles/Rubble';
import { WallSloped } from './obstacles/WallSloped';
import { FloorFoundation } from './obstacles/FloorFoundation';
import { Boxes } from './obstacles/Boxes';
import { TableSmall } from './obstacles/TableSmall';
import { TableLong } from './obstacles/TableLong';
import { Column } from './obstacles/Column';
import { Keg } from './obstacles/Keg';

const Obstacle = ({ position, obstacleName, rotation, scale, color, typeMesh }) => {
  const debugMode = useGameStore(state => state.debugMode)
  let mesh
  switch (obstacleName) {
    case 'WallDoorway':
      mesh = (
        <WallDoorway
          positionMesh={position}
          rotationMesh={rotation}
          scaleMesh={scale}
        />
      )
      break
    case 'WallFlat':
      mesh = (
        <WallFlat
          positionMesh={position}
          rotationMesh={rotation}
          scaleMesh={scale}
        />
      )
      break
    case 'BoxLarge':
      mesh = (
        <BoxLarge
          positionMesh={position}
          rotationMesh={rotation}
          scaleMesh={scale}
        />
      )

      break
    case 'Spikes':
    mesh = (
      <Spikes
        positionMesh={position}
        rotationMesh={rotation}
        scaleMesh={scale}
      />
    )
      break
    case 'Keg':
      mesh = (<Keg positionMesh={position} scaleMesh={scale} rotationMesh={rotation} type={typeMesh} />)
      break
    case 'TableSmall':
      mesh = (
        <TableSmall
          positionMesh={position}
          rotationMesh={rotation}
          scaleMesh={scale}
        />
      )
      break
    case 'RedGem':
      mesh = (<RedGem positionMesh={position} scaleMesh={[2.5, 2.5, 2.5]} />)
      break
    case 'YellowGem':
      mesh = (<YellowGem positionMesh={position} scaleMesh={[2.5, 2.5, 2.5]} />)
      break
    case 'BlueGem':
      mesh = (<BlueGem positionMesh={position} scaleMesh={[2.5, 2.5, 2.5]} />)
      break
    case 'GreenGem':
      mesh = <GreenGem positionMesh={position} scaleMesh={[2.5, 2.5, 2.5]} />
      break
    case 'Barrier':
      mesh = <Barrier positionMesh={position} scaleMesh={scale} />
      break
    case 'Pillar':
      mesh = <Pillar positionMesh={position} scaleMesh={scale} />
      break
    case 'WallGated':
      mesh = <WallGated positionMesh={position} scaleMesh={scale} rotationMesh={rotation} />
      break
    case 'Boxes':
      mesh = (<Boxes positionMesh={position} scaleMesh={scale} rotationMesh={rotation} type={typeMesh}/>
      )
        break
    case 'Rubble':
      mesh = 
        <Rubble
          positionMesh={position}
          scaleMesh={scale}
          rotationMesh={rotation}
        />
      break
    case 'FloorFoundation':
      mesh = <FloorFoundation positionMesh={position} scaleMesh={scale} rotationMesh={rotation} />
      break
    case 'WallSloped':
      mesh = <WallSloped positionMesh={position} scaleMesh={scale} rotationMesh={rotation} />
      break
    case 'TableLong':
      mesh = (
        <TableLong
          positionMesh={position}
          rotationMesh={rotation}
          scaleMesh={scale}
          type={typeMesh}
        />
      )
      break
    case 'Column':
      mesh = <Column positionMesh={position} scaleMesh={scale} rotationMesh={rotation} />
      break
    //COIN
    case 'Coin':
      mesh = <Coin positionMesh={position} scaleMesh={[5, 5, 5]} />
      break
    case 'BoxTransparent':
      mesh = (
        <Box
          position={position}
          rotation={rotation}
          scale={scale}
          args={[1, 1, 1]} // Default dimensions
        >
          <meshStandardMaterial
            transparent={true}
            opacity={debugMode ? 0.7 : 0}
            color={color} // Use the color property from the obstacle object
          />
        </Box>
      )
      break
    default:
      mesh = (
        <Box position={position} args={[4, 4, 15]} name="obstacle">
          <meshStandardMaterial attach="material" color="blue" />
        </Box>
      )
  }

  return mesh
}

export default Obstacle
