import { SwipeEventData, useSwipeable } from "react-swipeable";

import { useStore } from "state/useStore";

function useControl() {
  const {
    playerCurrentLine,
    setPlayerCurrentLine,
    playerMoveState,
    setPlayerMoveState,
  } = useStore();

  function onSwiped(event: SwipeEventData) {
    switch (event.dir) {
      case "Left":
        if (playerCurrentLine > -1) {
          setPlayerCurrentLine(playerCurrentLine - 1);
        }
        break;
      case "Right":
        if (playerCurrentLine < 1) {
          setPlayerCurrentLine(playerCurrentLine + 1);
        }
        break;

      case "Down":
        if (playerMoveState == "run") {
          setPlayerMoveState("slip");
        }
        break;
      case "Up":
        if (playerMoveState == "run") {
          setPlayerMoveState("jump");
        }
        break;
    }
  }
  //smoking

  const handlers = useSwipeable({
    onSwiped: onSwiped,
    trackMouse: true,
  });

  return handlers;
}

export default useControl;
