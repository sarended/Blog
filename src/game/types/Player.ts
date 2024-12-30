import { Position, Velocity } from './GameState';

export type Player = {
  width: number;
  height: number;
  position: Position;
  velocity: Velocity;
  jumping: boolean;
  doubleJump: boolean;
  onGround: boolean;
  dashing: boolean;
  canDash: boolean;
  facingDirection: 'left' | 'right';
  dashDistance: number;
};
