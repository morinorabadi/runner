function Bottom() {
  return (
    <mesh castShadow position-y={1}>
      <boxGeometry args={[4, 2, 0.5]} />
      <meshStandardMaterial color={"#f3f311"} />
    </mesh>
  );
}

export default Bottom;
