import { Player, Platform } from '../types';

export const checkCollision = (player: Player, platform: Platform): boolean => {
  return (
    player.position.x < platform.x + platform.width &&
    player.position.x + player.width > platform.x &&
    player.position.y < platform.y + platform.height &&
    player.position.y + player.height > platform.y
  );
};
