import { useStore } from "state/useStore";
import { usePlayer } from "./usePlayer";

function Player() {
  const player = useStore((state) => state.player);
  usePlayer();
  return (
    <group ref={player}>
      <mesh castShadow position-y={2} scale={[1, 4, 1]}>
        <boxGeometry />
        <meshStandardMaterial />
      </mesh>
    </group>
  );
}

export default Player;
