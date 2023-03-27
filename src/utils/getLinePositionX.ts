import { LINE_DISTANCE } from "constants/index";
import { line } from "interfaces/line";

export function getLinePositionX(line: line) {
  switch (line) {
    case "mid":
      return 0;
    case "left":
      return -LINE_DISTANCE;
    case "right":
      return LINE_DISTANCE;
  }
}
