import { useFrame } from "@react-three/fiber";

import {
  MIN_LEVEL_FORWARD_LENGTH,
  MIN_LEVEL_BACKWARD_LENGTH,
  ALL_LEVEL_LENGTH,
} from "constants/level.constants";
import { DEFAULT_SCORE_FACTOR } from "constants/score.constants";
import {
  DEFAULT_SPEED_FACTOR,
  INCREASE_SPEED_AFTER,
  INCREASE_SPEED_AMOUNT,
  START_SPEED,
} from "constants/speed.constants";
import { ILevel } from "interfaces/World/Level";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { Clock, Group } from "three";
import { generateLevel } from "./World/generateLevel";
import { useStore, mutation } from "state/useStore";
import { line } from "interfaces/line";

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

    // create new clock
    mutation.clock = new Clock();
  }, []);

  // main game loop
  useFrame(() => {
    if (!parent.current) return;
    if (!levels[0]) return;

    // update clock
    const { delta, oldElapsedTime, elapsedTime } = updateClock();

    // update speed
    updateSpeed(elapsedTime, setSpeed);

    // update position
    const { oldPosition, newPosition, deltaPosition } = updatePosition(delta);

    /**
     * check obstacle hit
     */

    // 1. check player movement and  find out player line or lines
    // detectPlayerLine(oldElapsedTime, delta)

    // update map position
    parent.current.position.z = -newPosition;

    // update score
    setScore(Math.floor(newPosition * DEFAULT_SCORE_FACTOR));

    // update levels
    updateLevels(levels, setLevels, newPosition);
  });

  return { parent, levels };
}

// update clock
function updateClock() {
  const result = { oldElapsedTime: 0, delta: 0, elapsedTime: 0 };

  if (!mutation.clock) return result;

  // save old elapsed time
  result.oldElapsedTime = mutation.clock.elapsedTime;

  //update clock and get delta
  result.delta = mutation.clock.getDelta();

  // get new elapsedTime
  result.elapsedTime = mutation.clock.elapsedTime;

  return result;
}

// update speed
function updateSpeed(
  elapsedTime: number,
  setSpeed: (newSpeed: number) => void
) {
  const newSpeedFactor = Math.floor(elapsedTime / INCREASE_SPEED_AFTER);

  if (mutation.speedFactor !== newSpeedFactor) {
    // update speed factor
    mutation.speedFactor = newSpeedFactor;

    // calculate new speed
    const newSpeed = START_SPEED + mutation.speedFactor * INCREASE_SPEED_AMOUNT;

    // update ui
    setSpeed(newSpeed);

    // update speed
    mutation.speed = newSpeed;

    //! fix position delta between new an old speed
  }
}

function updatePosition(delta: number) {
  const result = {
    oldPosition: mutation.position,
    deltaPosition: delta * DEFAULT_SPEED_FACTOR * mutation.speed,
    newPosition: 0,
  };

  mutation.position += result.deltaPosition;
  result.newPosition = mutation.position;

  return result;
}

function updateLevels(
  levels: ILevel[],
  setLevels: Dispatch<SetStateAction<ILevel[]>>,
  newPosition: number
) {
  // delete old levels
  if (levels[0].endPosition < newPosition + MIN_LEVEL_BACKWARD_LENGTH) {
    setLevels((levels) => levels.filter((_, i) => i !== 0));
  }

  // generate new levels
  if (
    levels[levels.length - 1].startPosition <
    newPosition + MIN_LEVEL_FORWARD_LENGTH
  ) {
    setLevels((levels) => [...levels, generateLevel()]);
  }
}

// interface playerFrameMove{
//   line : line,
//   startPosition : number,
//   endPosition : number
// }

// function detectPlayerLine(oldElapsedTime : number, delta : number) : playerFrameMove[] {

//   const result : playerFrameMove[] = [{
//     line : mutation.playerCurrentLine,
//     endPosition :
//   }]
//   for (
//     let index = mutation.playerLineChanges.length - 1;
//     index >= 0;
//     index--
//   ) {
//     const change = mutation.playerLineChanges[index];

//     // delete old changes
//     if (change.time < oldElapsedTime) {
//       mutation.playerLineChanges.splice(index, 1);
//     }

//     // check if player in this frame change lane or not
//     // if (oldElapsedTime < change.time) {

//     // }

//   }
//   return result
// }
// function checkingObstacle(levels : ILevel[], position : number){
//   levels[0]
// }

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
