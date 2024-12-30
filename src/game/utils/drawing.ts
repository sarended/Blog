import { GameState } from '../types';

export const drawGame = (state: GameState): void => {
  const { ctx, canvas, player, platforms } = state;
  if (!canvas || !ctx) return;

  // Clear canvas
  ctx.fillStyle = '#333';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Draw player
  ctx.fillStyle = '#ff0000';
  ctx.fillRect(
    player.position.x,
    player.position.y,
    player.width,
    player.height,
  );

  // Draw platforms
  ctx.fillStyle = '#00ff00';
  platforms.forEach((platform) => {
    ctx.fillRect(platform.x, platform.y, platform.width, platform.height);
  });
};
