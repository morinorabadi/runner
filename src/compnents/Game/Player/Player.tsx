import React, { useRef } from 'react'
import { Group } from 'three'

function Player() {
  const group = useRef<Group>(null)

  return <group ref={group}>
      
    <mesh
      castShadow
      position={[0 , 2, 0 ]}
      scale={[2,4,2]}
    >

        <boxGeometry/>
        <meshStandardMaterial/>

    </mesh>

  </group>
}

export default Player;