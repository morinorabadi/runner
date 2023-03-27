import Container from "./Container";
import useWorldGenerator from "./useWorldGenerator";

function WorldGenerator() {
  const { parent } = useWorldGenerator();

  return (
    <group ref={parent}>
      {/* test containers */}

      <Container
        length={40}
        positionZ={0}
        obstacles={{
          left: [{ positionZ: 20, type: "bottom" }],
          right: [{ positionZ: 20, type: "bottom" }],
          mid: [{ positionZ: 10, type: "top" }],
        }}
      />
      <Container
        color="green"
        length={40}
        positionZ={40}
        obstacles={{
          left: [{ positionZ: -10, type: "bottom" }],
          right: [{ positionZ: -10, type: "bottom" }],
          mid: [{ positionZ: 10, type: "bottom" }],
        }}
      />
      <Container
        length={40}
        positionZ={80}
        obstacles={{ left: [], right: [], mid: [] }}
      />
    </group>
  );
}

export default WorldGenerator;
