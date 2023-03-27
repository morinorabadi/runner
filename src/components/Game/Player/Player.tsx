import React, { useRef } from "react";
import { Group } from "three";

function Player() {
  const group = useRef<Group>(null);

  return (
    <group ref={group}>
      <mesh castShadow position={[0, 2, 0]} scale={[1, 4, 1]}>
        <boxGeometry />
        <meshStandardMaterial />
      </mesh>
    </group>
  );
}

export default Player;
