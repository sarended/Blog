// export class Game {
//   private canvas: HTMLCanvasElement;
//   private ctx: CanvasRenderingContext2D;
//   private player: Player;
//   private platforms: Platform[];
//   private gravity = 0.5;
//   private jumping = false;
//   public getCanvas() {
//     return this.canvas;
//   }

//   constructor() {
//     this.canvas = document.createElement('canvas');
//     this.canvas.width = 800;
//     this.canvas.height = 600;
//     document.body.appendChild(this.canvas);

//     this.ctx = this.canvas.getContext('2d')!;

//     this.player = new Player(50, 50);
//     this.platforms = [
//       new Platform(0, 550, 1400, 450), // ground
//       new Platform(300, 425, 200, 20), // platform 1
//       new Platform(100, 350, 200, 100), // platform 2
//       new Platform(500, 275, 200, 20), // platform 3
//     ];

//     this.resizeCanvas();
//     this.setupControls();
//     this.gameLoop();
//   }

//   private resizeCanvas() {
//     this.canvas.width = window.innerWidth;
//     this.canvas.height = window.innerHeight;
//   }

//   private setupControls() {
//     document.addEventListener('keydown', (e) => {
//       switch (e.key) {
//         case 'ArrowLeft':
//           this.player.velocity.x = -5;
//           break;
//         case 'ArrowRight':
//           this.player.velocity.x = 5;
//           break;
//         case 'Space':
//         case 'ArrowUp':
//           if (!this.jumping) {
//             this.player.velocity.y = -12;
//             this.jumping = true;
//           }
//           break;
//       }
//     });

//     document.addEventListener('keyup', (e) => {
//       switch (e.key) {
//         case 'ArrowLeft':
//         case 'ArrowRight':
//           this.player.velocity.x = 0;
//           break;
//       }
//     });
//   }

//   private update() {
//     // Store previous position
//     const prevX = this.player.position.x;
//     const prevY = this.player.position.y;

//     // Apply gravity
//     this.player.velocity.y += this.gravity;

//     // Update position
//     this.player.position.x += this.player.velocity.x;
//     this.player.position.y += this.player.velocity.y;

//     // Check collisions
//     this.platforms.forEach((platform) => {
//       if (this.checkCollision(this.player, platform)) {
//         // Vertical collision
//         if (prevY + this.player.height <= platform.y) {
//           this.player.position.y = platform.y - this.player.height;
//           this.player.velocity.y = 0;
//           this.jumping = false;
//         }
//         // Horizontal collision
//         else if (prevX + this.player.width <= platform.x) {
//           this.player.position.x = platform.x - this.player.width;
//         } else if (prevX >= platform.x + platform.width) {
//           this.player.position.x = platform.x + platform.width;
//         }
//       }
//     });

//     // Keep player in bounds
//     if (this.player.position.x < 0) this.player.position.x = 0;
//     if (this.player.position.x > this.canvas.width - this.player.width) {
//       this.player.position.x = this.canvas.width - this.player.width;
//     }
//   }

//   private checkCollision(player: Player, platform: Platform): boolean {
//     // Previous position was above the platform
//     const isAbove = player.position.y - player.velocity.y <= platform.y;

//     // Standard collision check
//     const collision =
//       player.position.x < platform.x + platform.width &&
//       player.position.x + player.width > platform.x &&
//       player.position.y < platform.y + platform.height &&
//       player.position.y + player.height > platform.y;

//     // Only return true if the player was above AND there's a collision
//     return isAbove && collision;
//   }

//   private draw() {
//     // Clear canvas
//     this.ctx.fillStyle = '#333';
//     this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

//     // Draw player
//     this.ctx.fillStyle = '#ff0000';
//     this.ctx.fillRect(
//       this.player.position.x,
//       this.player.position.y,
//       this.player.width,
//       this.player.height,
//     );

//     // Draw platforms
//     this.ctx.fillStyle = '#00ff00';
//     this.platforms.forEach((platform) => {
//       this.ctx.fillRect(
//         platform.x,
//         platform.y,
//         platform.width,
//         platform.height,
//       );
//     });
//   }

//   private gameLoop = () => {
//     this.update();
//     this.draw();
//     requestAnimationFrame(this.gameLoop);
//   };
// }

// class Player {
//   public width = 30;
//   public height = 30;
//   public position: { x: number; y: number };
//   public velocity = { x: 0, y: 0 };

//   constructor(x: number, y: number) {
//     this.position = { x, y };
//   }
// }

// class Platform {
//   constructor(
//     public x: number,
//     public y: number,
//     public width: number,
//     public height: number,
//   ) {}
// }
