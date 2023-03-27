export interface IContainer {
  length: number;
  positionZ: number;
  obstacles: {
    left: IObstacle[];
    mid: IObstacle[];
    right: IObstacle[];
  };
  color?: Color;
}
