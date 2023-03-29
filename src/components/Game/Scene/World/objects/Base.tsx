import { Color } from "@react-three/fiber";

interface BaseInterface {
  length: number;
  color?: Color;
}

function Base({ length, color }: BaseInterface) {
  return (
    <mesh receiveShadow rotation-x={-Math.PI / 2}>
      <planeGeometry args={[15, length]} />
      <meshStandardMaterial color={color ? color : "red"} />
    </mesh>
  );
}

export default Base;
