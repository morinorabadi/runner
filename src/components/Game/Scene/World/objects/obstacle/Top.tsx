function Top() {
  return (
    <mesh position-y={2}>
      <boxGeometry args={[4, 2, 0.5]} />
      <meshStandardMaterial color={"blue"} />
    </mesh>
  );
}

export default Top;
