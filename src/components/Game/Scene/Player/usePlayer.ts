import { LINE_WIDTH } from "constants/index";
import { useEffect } from "react";
import { useStore, mutation } from "state/useStore";
import { gsap } from "gsap";
import { shallow } from "zustand/shallow";

export function usePlayer() {
  const [player, playerCurrentLine, playerMoveState, setPlayerMoveState] =
    useStore(
      (state) => [
        state.player,
        state.playerCurrentLine,
        state.playerMoveState,
        state.setPlayerMoveState,
      ],
      shallow
    );

  // changing line logic
  useEffect(() => {
    if (!player.current) return;

    gsap.to(player.current.position, {
      duration: 0.4 / mutation.speed,
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
      duration: 0.6 / mutation.speed, // always its repeat once an
      onComplete: () => {
        setPlayerMoveState("run");
      },
    });
  }, [setPlayerMoveState, playerMoveState, player]);
}
