import { LINE_DISTANCE } from "constants/index";
import { line } from "interfaces/line";

export function getLinePositionX(line: line) {
  switch (line) {
    case "mid":
      return 0;
    case "left":
      return LINE_DISTANCE;
    case "right":
      return -LINE_DISTANCE;
  }
}

export function getLineString(line: number): line {
  switch (line) {
    case 0:
      return "mid";
    case -1:
      return "left";
    default:
      return "right";
  }
}
