import { GameState } from '../types';
import { PLAYER_WIDTH, PLAYER_HEIGHT } from '../constants/dimensions';
import {
  INITIAL_CANVAS_WIDTH,
  INITIAL_CANVAS_HEIGHT,
} from '../constants/dimensions';

const WALL_THICKNESS = 30;

export const createInitialState = (): GameState => ({
  canvas: null,
  ctx: null,
  player: {
    width: PLAYER_WIDTH,
    height: PLAYER_HEIGHT,
    position: { x: 50, y: 50 },
    velocity: { x: 0, y: 0 },
    jumping: false,
    onGround: false,
    doubleJump: false,
    dashing: false,
    canDash: true,
    facingDirection: 'right',
    dashDistance: 0,
  },
  platforms: [
    // Bottom wall
    {
      x: 0,
      y: INITIAL_CANVAS_HEIGHT - WALL_THICKNESS,
      width: INITIAL_CANVAS_WIDTH,
      height: WALL_THICKNESS,
    },
    // Left wall
    { x: 0, y: 0, width: WALL_THICKNESS, height: INITIAL_CANVAS_HEIGHT },
    // Right wall
    {
      x: INITIAL_CANVAS_WIDTH - WALL_THICKNESS,
      y: 0,
      width: WALL_THICKNESS,
      height: INITIAL_CANVAS_HEIGHT,
    },
    // Top wall
    { x: 0, y: 0, width: INITIAL_CANVAS_WIDTH, height: WALL_THICKNESS },

    // Your existing platforms
    { x: 300, y: 425, width: 200, height: 20 },
    { x: 100, y: 350, width: 200, height: 100 },
    { x: 500, y: 275, width: 200, height: 20 },
  ],
});
