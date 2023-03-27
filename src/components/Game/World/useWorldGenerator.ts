import { useFrame } from "@react-three/fiber";
import { ILevel } from "interfaces/Level";
import { IObstacle } from "interfaces/obstacle";
import { useRef, useState } from "react";
import { Group } from "three";

import { randomColor } from "utils/randomColor";
import { v4 as uuidv4 } from "uuid";

let lastLevelPosition = -20;

function generateLevel(): ILevel {
  // generate random int (21 to 40)
  // const length = Math.floor((Math.random() * 2 + 2 ) * 10) + 1

  lastLevelPosition += 20;
  return {
    id: uuidv4(),
    length: 20,
    positionZ: lastLevelPosition,
    obstacles: generateObstacles(),
    color: randomColor(),
  };
}

// this is just test for testing improve it latter
function generateObstacles() {
  function generate(): IObstacle[] {
    return [
      { positionZ: 5, type: "bottom" },
      { positionZ: -5, type: "bottom" },
    ];
  }
  return {
    left: generate(),
    right: generate(),
    mid: generate(),
  };
}

function useWorldGenerator() {
  const parent = useRef<Group>(null);
  const [levels, _] = useState<ILevel[]>([
    generateLevel(),
    generateLevel(),
    generateLevel(),
    generateLevel(),
    generateLevel(),
  ]);

  useFrame(({ clock }, _) => {
    if (!parent.current) return;
    parent.current.position.z = -clock.elapsedTime;
  });

  return { parent, levels };
}

export default useWorldGenerator;
