import Base from "./objects/Base";
import ObstacleGenerator from "./objects/ObstacleGenerator";
import { IContainer } from "interfaces/Container";

function Container({ length, positionZ, obstacles, color }: IContainer) {
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
