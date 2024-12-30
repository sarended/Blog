import { useEffect, useRef } from 'react';
import { GameState } from '../game/types';
import { updatePlayer } from '../game/state/updates';
import { drawGame } from '../game/utils/drawing';

export const useGameLoop = (
  gameState: GameState,
  setGameState: React.Dispatch<React.SetStateAction<GameState>>,
  canvasRef: React.RefObject<HTMLCanvasElement>,
) => {
  const animationFrameRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d')!;

    const gameLoop = () => {
      setGameState((prevState) => updatePlayer(prevState));
      drawGame({ ...gameState, canvas, ctx });
      animationFrameRef.current = requestAnimationFrame(gameLoop);
    };

    gameLoop();

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [canvasRef, setGameState]);
};
