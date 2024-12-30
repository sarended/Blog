import { useState } from 'react';
import { GameState } from '../game/types';
import { createInitialState } from '../game/state/initialState';

export const useGameState = () => {
  const [gameState, setGameState] = useState<GameState>(createInitialState());

  return {
    gameState,
    setGameState,
  };
};
