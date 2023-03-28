import { LINE_WIDTH } from "constants/index";
import { useEffect } from "react";
import { useStore } from "state/useStore";
import { gsap } from "gsap";

export function usePlayer() {
  const { player, playerCurrentLine, playerMoveState, setPlayerMoveState } =
    useStore();

  // changing line logic
  useEffect(() => {
    if (!player.current) return;

    gsap.to(player.current.position, {
      duration: 0.1,
      // todo add speed factor
      x: -playerCurrentLine * LINE_WIDTH,
    });
  }, [playerCurrentLine, player]);

  // jumping and slip
  useEffect(() => {
    if (!player.current) return;
    if (playerMoveState == "run") return;

    const positionY = playerMoveState == "jump" ? 4 : -2;

    gsap.to(player.current.position, {
      yoyo: true,
      repeat: 1,
      y: positionY,
      duration: 0.4,
      onComplete: () => {
        setPlayerMoveState("run");
      },
    });
  }, [setPlayerMoveState, playerMoveState, player]);
}
