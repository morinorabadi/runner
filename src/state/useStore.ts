import { RefObject, createRef } from "react";
import { Group, PerspectiveCamera } from "three";
import { create } from "zustand";

interface State {
  score: number;
  gameOver: boolean;
  gameStarted: boolean;

  camera: RefObject<PerspectiveCamera>;
  character: RefObject<Group>;

  setScore: (newScore: number) => void;
  setGameStarted: (started: boolean) => void;
  setGameOver: (over: boolean) => void;
}

export const useStore = create<State>()((set) => ({
  score: 0,
  gameOver: false,
  gameStarted: false,

  camera: createRef(),
  character: createRef(),

  setScore: (newScore) => set((_) => ({ score: newScore })),
  setGameStarted: (started) => set((_) => ({ gameStarted: started })),
  setGameOver: (over) => set((_) => ({ gameOver: over })),
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
