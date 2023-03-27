import { line } from "interfaces/line";

const lineDistance = 5;
export function getLinePositionX(line: line) {
  switch (line) {
    case "mid":
      return 0;
    case "left":
      return -lineDistance;
    case "right":
      return lineDistance;
  }
}
