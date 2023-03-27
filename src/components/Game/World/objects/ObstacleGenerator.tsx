// types
import { line } from "interfaces/line";
import { IObstacle } from "interfaces/obstacle";
import Bottom from "./obstacle/Bottom";
import Top from "./obstacle/Top";
import { getLinePositionX } from "utils/getLinePositionX";

interface ObstacleGeneratorInterface {
  obstacles: IObstacle[];
  line: line;
}

function ObstacleGenerator({ obstacles, line }: ObstacleGeneratorInterface) {
  return (
    <group position-x={getLinePositionX(line)}>
      {obstacles.map((obstacle) => {
        let obstacleJsx = undefined;
        switch (obstacle.type) {
          case "bottom":
            obstacleJsx = <Bottom />;
            break;
          case "top":
            obstacleJsx = <Top />;
            break;
        }

        return (
          <group position-z={obstacle.positionZ} key={obstacle.positionZ}>
            {obstacleJsx}
          </group>
        );
      })}
    </group>
  );
}

export default ObstacleGenerator;
