import { ILevel } from "interfaces/Level";
import { mutation } from "state/useStore";
import { randomColor } from "utils/randomColor";
import { v4 as uuidv4 } from "uuid";

// hold obstacles objects preset
const ObstaclesObjects = [
  { minLength: 4, type: "bottom" },
  { minLength: 4, type: "top" },
];

// return an array for
function generateLineObstacles(length: number) {
  const result = [];

  let lastPosition = 0;

  do {
    // generate random int ( 6 to 15 )
    const position = Math.floor((Math.random() * 2 + 1) * 5) + 1;

    if (Math.random() < mutation.difficulty) {
      const randomObstacle =
        ObstaclesObjects[Math.floor(Math.random() * ObstaclesObjects.length)];

      const availableLength = length - lastPosition;

      if (randomObstacle.minLength < availableLength) {
        result.push({
          positionZ: lastPosition - length / 2,
          type: randomObstacle.type,
        });
      }
    }

    // update last position
    lastPosition += position;
  } while (lastPosition < length);
  return result;
}

function generateObstacles(length: number) {
  return {
    left: generateLineObstacles(length),
    right: generateLineObstacles(length),
    mid: generateLineObstacles(length),
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
    obstacles: generateObstacles(length),
    color: randomColor(),
    startPosition: positionZ - length / 2,
    endPosition: positionZ + length / 2,
  };
}
