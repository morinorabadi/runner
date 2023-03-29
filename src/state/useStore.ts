import { START_SPEED } from "constants/index";
import { line } from "interfaces/line";
import { PlayerMoveState } from "interfaces/player/PlayerMoveState";
import { RefObject, createRef } from "react";
import { Clock, Group } from "three";
import { getLineString } from "utils/getLineInformation.utils";
import { create } from "zustand";

interface State {
  score: number;
  setScore: (newScore: number) => void;
  gameOver: boolean;
  setGameOver: (over: boolean) => void;
  gameStarted: boolean;
  setGameStarted: (started: boolean) => void;
  speed: number;
  setSpeed: (newSpeed: number) => void;
  player: RefObject<Group>;
  playerCurrentLine: number;
  setPlayerCurrentLine: (newLine: number) => void;
  playerMoveState: PlayerMoveState;
  setPlayerMoveState: (newMoveState: PlayerMoveState) => void;
}

export const useStore = create<State>()((set) => ({
  score: 0,
  setScore: (newScore) => set((_) => ({ score: newScore })),
  speed: START_SPEED,
  setSpeed: (newSpeed) => set((_) => ({ speed: newSpeed })),
  gameOver: false,
  setGameOver: (over) => set((_) => ({ gameOver: over })),
  gameStarted: false,
  setGameStarted: (started) => set((_) => ({ gameStarted: started })),
  player: createRef(),
  playerCurrentLine: 0,
  setPlayerCurrentLine: (newLine) => {
    set((_) => ({ playerCurrentLine: newLine }));

    // todo add socket here
    const newlineString = getLineString(newLine);
    const now = Date.now();

    mutation.playerCurrentLine = newlineString;

    // add this action to time playerLineTimeLine
    mutation.playerLineChanges.push({
      line: newlineString,
      time: now,
    });
  },
  playerMoveState: "run",
  setPlayerMoveState: (newMoveState) =>
    set((_) => ({ playerMoveState: newMoveState })),
}));

interface mutationInterface {
  speed: number;
  speedFactor: number;
  playerCurrentLine: line;
  playerLineChanges: {
    line: line;
    time: number;
  }[];
  position: number;
  difficulty: number;
  clock?: Clock;
}

export const mutation: mutationInterface = {
  speed: START_SPEED,
  speedFactor: 0,
  playerCurrentLine: "mid",
  playerLineChanges: [],
  position: 0,
  difficulty: 0.2,
};

/**
 *
 * difficulty property =>
 * this property specified amount of
 * obstacles in one line in each level
 * near to 1.0 makes harder with more obstacles and
 * near to 0.0 makes easer with less obstacles
 *
 */
