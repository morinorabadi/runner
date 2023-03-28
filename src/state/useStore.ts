import { PlayerMoveState } from "interfaces/player/PlayerMoveState";
import { RefObject, createRef } from "react";
import { Group } from "three";
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

  speed: 1,
  setSpeed: (newSpeed) => set((_) => ({ speed: newSpeed })),

  gameOver: false,
  setGameOver: (over) => set((_) => ({ gameOver: over })),

  gameStarted: false,
  setGameStarted: (started) => set((_) => ({ gameStarted: started })),

  player: createRef(),

  playerCurrentLine: 0,
  setPlayerCurrentLine: (newLine) =>
    set((_) => ({ playerCurrentLine: newLine })),

  playerMoveState: "run",
  setPlayerMoveState: (newMoveState) =>
    set((_) => ({ playerMoveState: newMoveState })),
}));

export const mutation = {
  speed: 1,
  speedFactor: 0,

  position: 0,

  difficulty: 0.1,
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
