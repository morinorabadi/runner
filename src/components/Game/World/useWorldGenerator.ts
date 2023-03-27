import { useFrame } from "@react-three/fiber";
import {
  MIN_LEVEL_FORWARD_LENGTH,
  MIN_LEVEL_BACKWARD_LENGTH,
  ALL_LEVEL_LENGTH,
} from "constants/index";
import { ILevel } from "interfaces/Level";
import { IObstacle } from "interfaces/obstacle";
import { useEffect, useRef, useState } from "react";
import { Group } from "three";

import { randomColor } from "utils/randomColor";
import { v4 as uuidv4 } from "uuid";

let lastLevelPosition = -20;
let lastLevelLength = 0;

function generateLevel(): ILevel {
  // generate random int (21 to 40)
  const length = Math.floor((Math.random() * 2 + 2) * 10) + 1;
  const positionZ = lastLevelPosition + (lastLevelLength + length) / 2;

  // save last position and level length
  lastLevelPosition = positionZ;
  lastLevelLength = length;

  return {
    id: uuidv4(),
    length,
    positionZ,
    obstacles: generateObstacles(),
    color: randomColor(),
    startPosition: positionZ - length / 2,
    endPosition: positionZ + length / 2,
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
  const [levels, setLevels] = useState<ILevel[]>([]);

  useEffect(() => {
    const result = [];
    let lengthSome = 0;

    do {
      const level = generateLevel();
      lengthSome += level.length;
      result.push(level);
    } while (lengthSome < ALL_LEVEL_LENGTH);

    setLevels(result);
  }, []);

  useFrame(({ clock }, _) => {
    if (!parent.current) return;

    parent.current.position.z = -clock.elapsedTime * 10;
    const positionZ = clock.elapsedTime * 10;

    // check for out position Level

    if (!levels[0]) {
      return;
    }

    if (levels[0].endPosition < positionZ + MIN_LEVEL_BACKWARD_LENGTH) {
      setLevels((levels) => levels.filter((_, i) => i !== 0));
    }

    if (
      levels[levels.length - 1].startPosition <
      positionZ + MIN_LEVEL_FORWARD_LENGTH
    ) {
      setLevels((levels) => [...levels, generateLevel()]);
    }
  });

  return { parent, levels };
}

export default useWorldGenerator;
