import { useFrame } from "@react-three/fiber";
import {
  MIN_LEVEL_FORWARD_LENGTH,
  MIN_LEVEL_BACKWARD_LENGTH,
  ALL_LEVEL_LENGTH,
  DEFAULT_SPEED_FACTOR,
  DEFAULT_SCORE_FACTOR,
  INCREASE_SPEED_AFTER,
  INCREASE_SPEED_AMOUNT,
  START_SPEED,
} from "constants/index";
import { ILevel } from "interfaces/World/Level";
import { useEffect, useRef, useState } from "react";
import { Group } from "three";
import { generateLevel } from "../World/generateLevel";
import { useStore, mutation } from "state/useStore";

export function useSceneWorld() {
  const parent = useRef<Group>(null);
  const [levels, setLevels] = useState<ILevel[]>([]);
  const { setScore, setSpeed } = useStore();
  // generate first levels
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

  // main game loop
  useFrame(({ clock }, delta) => {
    if (!parent.current) return;
    if (!levels[0]) return;

    // update speed
    const newSpeedFactor = Math.floor(clock.elapsedTime / INCREASE_SPEED_AFTER);
    if (mutation.speedFactor !== newSpeedFactor) {
      mutation.speedFactor = newSpeedFactor;
      // update ui
      const newSpeed = START_SPEED + mutation.speedFactor * INCREASE_SPEED_AMOUNT;
      setSpeed(newSpeed);
      mutation.speed = newSpeed;
    }

    // update position
    mutation.position += delta * DEFAULT_SPEED_FACTOR * mutation.speed;
    const { position } = mutation;

    // update map position
    parent.current.position.z = -position;

    // update score
    setScore(Math.floor(position * DEFAULT_SCORE_FACTOR));

    // delete old levels
    if (levels[0].endPosition < position + MIN_LEVEL_BACKWARD_LENGTH) {
      setLevels((levels) => levels.filter((_, i) => i !== 0));
    }

    // generate new levels
    if (
      levels[levels.length - 1].startPosition <
      position + MIN_LEVEL_FORWARD_LENGTH
    ) {
      setLevels((levels) => [...levels, generateLevel()]);
    }
  });

  return { parent, levels };
}

// this method write for make sure generated position are relative to elapsedTime
// its not necessary any more but iy might be useful in backend

// function recalculatePosition(elapsedTime: number) {
//   let position = 0;
//   let i;
//   let j = 0;
//   for (i = INCREASE_SPEED_AFTER; i < elapsedTime; i += INCREASE_SPEED_AFTER) {
//     position += (START_SPEED + j * INCREASE_SPEED_AMOUNT) * INCREASE_SPEED_AFTER;
//     j++;
//   }
//   return position * DEFAULT_SPEED_FACTOR;
// }
