import React from "react";
// import { OrbitControls } from "@react-three/drei";

import Player from "../Player/Player";
import WorldGenerator from "../World/WorldGenerator";
import { useThree } from "@react-three/fiber";
import { Vector3 } from "three";

function Scene() {
  useThree(({ camera }) => {
    camera.lookAt(new Vector3(0, 0, 20));
  });

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

      {/* meshes */}

      <Player />

      <WorldGenerator />
    </>
  );
}

export default Scene;
