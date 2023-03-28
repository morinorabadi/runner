import { PlayerMoveState } from "interfaces/player/PlayerMoveState";
import { RefObject, createRef } from "react";
import { Group } from "three";
import { create } from "zustand";

interface State {
  score: number;
  setScore: (newScore: number) => void;

  gameOver: boolean;
  gameStarted: boolean;
  setGameStarted: (started: boolean) => void;
  setGameOver: (over: boolean) => void;

  player: RefObject<Group>;

  playerCurrentLine: number;
  setPlayerCurrentLine: (newLine: number) => void;

  playerMoveState: PlayerMoveState;
  setPlayerMoveState: (newMoveState: PlayerMoveState) => void;
}

export const useStore = create<State>()((set) => ({
  score: 0,
  setScore: (newScore) => set((_) => ({ score: newScore })),

  gameOver: false,
  gameStarted: false,
  setGameStarted: (started) => set((_) => ({ gameStarted: started })),
  setGameOver: (over) => set((_) => ({ gameOver: over })),

  player: createRef(),
  playerCurrentLine: 0,
  setPlayerCurrentLine: (newLine) =>
    set((_) => ({ playerCurrentLine: newLine })),

  playerMoveState: "run",
  setPlayerMoveState: (newMoveState) =>
    set((_) => ({ playerMoveState: newMoveState })),
}));

export const mutation = {
  gameOver: false,
  gameStart: true,

  score: 0,
  gameSpeed: 1,

  difficulty: 0.4,
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
