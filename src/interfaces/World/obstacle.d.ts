import { PlayerMoveState } from "interfaces/player/PlayerMoveState";

interface hipPoint {
  start: number;
  end: number;
}

export type IObstacleTypes = "top" | "bottom";

export interface IObstacle {
  positionZ: number;
  type: IObstacleTypes;
  hipPoint: hipPoint;
  optimumMoveState: PlayerMoveState;
}
