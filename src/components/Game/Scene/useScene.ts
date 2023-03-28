import { useFrame } from "@react-three/fiber";
import {
  MIN_LEVEL_FORWARD_LENGTH,
  MIN_LEVEL_BACKWARD_LENGTH,
  ALL_LEVEL_LENGTH,
} from "constants/index";
import { ILevel } from "interfaces/World/Level";
import { useEffect, useRef, useState } from "react";
import { Group } from "three";
import { generateLevel } from "../World/generateLevel";

export function useSceneWorld() {
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
