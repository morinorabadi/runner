import { OBSTACLES_OBJECTS_MIN_DISTANCE } from "constants/index";
import { ILevel } from "interfaces/World/Level";
import { IObstacle, IObstacleTypes } from "interfaces/World/obstacle";
import { PlayerMoveState } from "interfaces/player/PlayerMoveState";
import { mutation } from "state/useStore";
import { randomColor } from "utils/randomColor.utils";
import { v4 as uuidv4 } from "uuid";

// hold obstacles objects preset
interface ObstaclesCollectionInterface {
  type: IObstacleTypes;
  optimumMoveState: PlayerMoveState;
}
const ObstaclesCollection: ObstaclesCollectionInterface[] = [
  { type: "bottom", optimumMoveState: "jump" },
  { type: "top", optimumMoveState: "slip" },
];

// return an array for
function generateLineObstacles(length: number, parentPosition: number) {
  const result: IObstacle[] = [];

  let lastPosition = 0;

  do {
    // generate random int ( 6 to 15 )
    const position = Math.floor((Math.random() * 2 + 1) * 5) + 1;

    if (Math.random() < mutation.difficulty) {
      const randomObstacle =
        ObstaclesCollection[
          Math.floor(Math.random() * ObstaclesCollection.length)
        ];

      const availableLength = length - lastPosition;

      if (OBSTACLES_OBJECTS_MIN_DISTANCE < availableLength) {
        const selfPosition = lastPosition - length / 2;
        result.push({
          positionZ: selfPosition,
          type: randomObstacle.type,
          hipPoint: {
            start: parentPosition + selfPosition - 2,
            end: parentPosition + selfPosition + 2,
          },
          optimumMoveState: randomObstacle.optimumMoveState,
        });
      }
    }

    // update last position
    lastPosition += position;
  } while (lastPosition < length);
  return result;
}

function generateObstacles(length: number, positionZ: number) {
  return {
    left: generateLineObstacles(length, positionZ),
    right: generateLineObstacles(length, positionZ),
    mid: generateLineObstacles(length, positionZ),
  };
}

let lastLevelPosition = -20;
let lastLevelLength = 0;

export function generateLevel(): ILevel {
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
    obstacles: generateObstacles(length, positionZ),
    color: randomColor(),
    startPosition: positionZ - length / 2,
    endPosition: positionZ + length / 2,
  };
}
