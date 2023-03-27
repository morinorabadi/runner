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
};
