import React from 'react'
import Player from '../Player/Player';

function Scene() {
  return <>
    <fog attach="fog" args={["#333", 50, 100]} />

    {/* lights */}
    <ambientLight intensity={0.4} />
    <directionalLight
    intensity={0.8}
    castShadow
    position={[1,10,-3]}
    shadow-mapSize-height={512}
    shadow-mapSize-width={512}
    />

    {/* meshes */}

    <Player />

  </> 
}

export default Scene;