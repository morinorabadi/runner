import { ILevel } from "interfaces/World/Level";
import Base from "./objects/Base";
import ObstacleGenerator from "./objects/ObstacleGenerator";

function Container({ length, positionZ, obstacles, color }: ILevel) {
  return (
    <group position-z={positionZ}>
      {/* base ground */}
      <Base color={color} length={length} />

      {/* lines */}
      <ObstacleGenerator line="left" obstacles={obstacles.left} />
      <ObstacleGenerator line="mid" obstacles={obstacles.mid} />
      <ObstacleGenerator line="right" obstacles={obstacles.right} />
    </group>
  );
}

export default Container;
