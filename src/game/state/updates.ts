import { GameState, Player } from '../types';
import { checkCollision } from '../utils/collision';
import { GRAVITY, JUMP_FORCE, MOVEMENT_SPEED } from '../constants/physics';

const handleJump = (player: Player) => {
  if (player.jumping) {
    if (player.onGround) {
      player.velocity.y = JUMP_FORCE;
      player.onGround = false;
      player.doubleJump = false;
    } else if (player.doubleJump) {
      // player.velocity.y = JUMP_FORCE;
    }
  }
};

export const updatePlayer = (state: GameState): GameState => {
  const { player, platforms } = state;
  const newPlayer = { ...player };

  // Reset dash when touching ground
  if (newPlayer.onGround) {
    newPlayer.canDash = true;
    newPlayer.dashing = false;
  }

  // Apply gravity only if not dashing
  if (!newPlayer.dashing) {
    newPlayer.velocity.y += GRAVITY;
  }

  // Update X position
  newPlayer.position.x += newPlayer.velocity.x;

  // Gradually slow down dash
  if (newPlayer.dashing) {
    newPlayer.velocity.x *= 0.9; // Reduce dash speed
    if (Math.abs(newPlayer.velocity.x) < MOVEMENT_SPEED) {
      newPlayer.dashing = false;
      newPlayer.velocity.x = 0;
    }
  }

  // Check horizontal collisions
  for (const platform of platforms) {
    if (checkCollision(newPlayer, platform)) {
      if (newPlayer.velocity.x > 0) {
        newPlayer.position.x = platform.x - newPlayer.width;
      } else if (newPlayer.velocity.x < 0) {
        newPlayer.position.x = platform.x + platform.width;
      }
    }
  }

  // Break down movement into smaller steps for better collision detection
  const STEP_SIZE = 1; // Adjust this value based on your needs
  const remainingY = newPlayer.velocity.y;
  const steps = Math.ceil(Math.abs(remainingY) / STEP_SIZE);

  // Move Y position gradually and check collisions at each step
  for (let i = 0; i < steps; i++) {
    const step =
      Math.min(STEP_SIZE, Math.abs(remainingY)) * Math.sign(remainingY);
    newPlayer.position.y += step;

    // Check vertical collisions
    for (const platform of platforms) {
      if (checkCollision(newPlayer, platform)) {
        if (remainingY > 0) {
          // Landing on top of platform
          newPlayer.position.y = platform.y - newPlayer.height;
          newPlayer.velocity.y = 0;
          newPlayer.onGround = true;
        } else if (remainingY < 0) {
          // Hitting bottom of platform
          newPlayer.position.y = platform.y + platform.height;
          newPlayer.velocity.y = 2;
        }
        // Break the step loop if collision is found
        i = steps;
        break;
      }
    }
  }

  // Handle jumping
  handleJump(newPlayer);

  return {
    ...state,
    player: newPlayer,
  };
};
