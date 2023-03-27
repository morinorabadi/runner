import { useFrame } from "@react-three/fiber";
import { useRef, useState } from "react";
import { Group } from "three";

function useWorldGenerator() {
  const parent = useRef<Group>(null);
  const [currentPosition, setCurrentPosition] = useState(0);

  useFrame(({ clock }, _) => {
    if (!parent.current) return;

    setCurrentPosition(clock.elapsedTime);

    parent.current.position.z = -currentPosition;
  });

  return { parent };
}

export default useWorldGenerator;
