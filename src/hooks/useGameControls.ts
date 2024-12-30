import { useEffect } from 'react';
import { GameState } from '../game/types';
import { MOVEMENT_SPEED, DASH_SPEED } from '../game/constants/physics';

export const useGameControls = (
  setGameState: React.Dispatch<React.SetStateAction<GameState>>,
) => {
  useEffect(() => {
    const pressedKeys = new Set<string>();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.repeat) return;
      pressedKeys.add(e.code);
      console.log('pressedKeys', pressedKeys);

      setGameState((prevState) => {
        const newPlayer = {
          ...prevState.player,
          velocity: { ...prevState.player.velocity },
        };

        if (e.code === 'ArrowLeft' || e.code === 'KeyA') {
          newPlayer.velocity.x -= MOVEMENT_SPEED;
          newPlayer.facingDirection = 'left';
        } else if (e.code === 'ArrowRight' || e.code === 'KeyD') {
          newPlayer.velocity.x += MOVEMENT_SPEED;
          newPlayer.facingDirection = 'right';
        } else if (
          e.code === 'Space' ||
          e.code === 'ArrowUp' ||
          e.code === 'KeyW'
        ) {
          newPlayer.jumping = true;
          // if (!newPlayer.onGround && !newPlayer.doubleJump) {
          //   newPlayer.doubleJump = true;
          // }
        } else if (e.code === 'ControlRight' || e.code === 'ShiftLeft') {
          if (newPlayer.canDash) {
            newPlayer.dashing = true;
            newPlayer.canDash = false;
            newPlayer.dashDistance = 0;
            // Always dash in facing direction
            newPlayer.velocity.x =
              newPlayer.facingDirection === 'right' ? DASH_SPEED : -DASH_SPEED;
          }
        }

        return {
          ...prevState,
          player: newPlayer,
        };
      });
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      pressedKeys.delete(e.code);
      console.log('pressedKeys', pressedKeys);
      setGameState((prevState) => {
        const newPlayer = {
          ...prevState.player,
          velocity: { ...prevState.player.velocity },
        };

        if (e.code === 'ArrowLeft' || e.code === 'KeyA') {
          newPlayer.velocity.x = 0;
          newPlayer.facingDirection = 'left';
        } else if (e.code === 'ArrowRight' || e.code === 'KeyD') {
          newPlayer.velocity.x = 0;
          newPlayer.facingDirection = 'right';
        } else if (
          e.code === 'Space' ||
          e.code === 'ArrowUp' ||
          e.code === 'KeyW'
        ) {
          newPlayer.jumping = false;
          if (!prevState.player.onGround && !prevState.player.doubleJump) {
            newPlayer.doubleJump = true;
            console.log('double jump here', prevState);
          }
          if (newPlayer.onGround) {
            console.log('on ground');
            newPlayer.doubleJump = false;
          }
        }

        return {
          ...prevState,
          player: newPlayer,
        };
      });
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('keypress', handleKeyDown);
    document.addEventListener('keyup', handleKeyUp);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('keyup', handleKeyUp);
    };
  }, [setGameState]);
};
