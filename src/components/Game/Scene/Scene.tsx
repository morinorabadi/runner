import React from "react";
// import { OrbitControls } from "@react-three/drei";

import Player from "../Player/Player";
import { useThree } from "@react-three/fiber";
import { Vector3 } from "three";

import Container from "../World/Level";
import useWorldGenerator from "../World/useWorldGenerator";

function Scene() {
  useThree(({ camera }) => {
    camera.lookAt(new Vector3(0, 0, 20));
  });

  const { parent, levels } = useWorldGenerator();

  return (
    <>
      <fog attach="fog" args={["#333", 50, 100]} />

      {/* lights */}
      <ambientLight intensity={0.4} />
      <directionalLight
        intensity={0.8}
        castShadow
        position={[1, 10, 3]}
        shadow-mapSize-height={512}
        shadow-mapSize-width={512}
        // ! fix shadow camera
      />

      {/* test control */}
      {/* <OrbitControls /> */}

      {/* player */}
      <Player />

      {/* world */}
      <group ref={parent}>
        {levels.map((levelProps) => (
          <Container key={levelProps.id} {...levelProps} />
        ))}
      </group>
    </>
  );
}

export default Scene;
