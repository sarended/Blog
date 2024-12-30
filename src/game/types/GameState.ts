import { Player } from './Player';
import { Platform } from './Platform';

export type Position = {
  x: number;
  y: number;
};

export type Velocity = {
  x: number;
  y: number;
};

export interface GameState {
  player: Player;
  platforms: Platform[];
  canvas: HTMLCanvasElement | null;
  ctx: CanvasRenderingContext2D | null;
}
