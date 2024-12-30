import { useRef } from 'react';
import { useGameState } from '../../hooks/useGameState';
import { useGameLoop } from '../../hooks/useGameLoop';
import { useGameControls } from '../../hooks/useGameControls';
import {
  INITIAL_CANVAS_WIDTH,
  INITIAL_CANVAS_HEIGHT,
} from '../../game/constants/dimensions';

export const Game: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { gameState, setGameState } = useGameState();

  useGameLoop(gameState, setGameState, canvasRef);
  useGameControls(setGameState);

  return (
    <canvas
      ref={canvasRef}
      width={INITIAL_CANVAS_WIDTH}
      height={INITIAL_CANVAS_HEIGHT}
      style={{ display: 'block' }}
    />
  );
};
