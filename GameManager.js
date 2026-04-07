// ============================================
// GAME MANAGER
// Manages all game objects, spawning, and collisions.
// ============================================

class GameManager {
  constructor() {
    this.player = null;
    this.enemies = [];
    this.projectiles = [];
    this.score = 0;
    this.highScore = 0;
    this.wave = 1;
    this.spawnTimer = 0;
    this.spawnRate = 90;  // frames between spawns
    this.gameState = 'menu';  // 'menu', 'playing', 'gameover'
  }

  startGame() {
    // Note: width and height are p5.js global variables
    this.player = new Player(width / 2, height / 2);
    this.enemies = [];
    this.projectiles = [];
    this.score = 0;
    this.wave = 1;
    this.spawnTimer = 0;
    this.spawnRate = 90;
    this.gameState = 'playing';
  }

  update() {
    if (this.gameState !== 'playing') return;

    // Update player
    if (this.player) this.player.update();

    // Spawn enemies
    this.spawnTimer++;
    if (this.spawnTimer >= this.spawnRate) {
      this.spawnEnemy();
      this.spawnTimer = 0;
    }

    // Update all enemies
    for (let enemy of this.enemies) {
      enemy.update();
    }

    // Update all projectiles
    for (let projectile of this.projectiles) {
      projectile.update();
    }

    // Check collisions
    this.checkCollisions();

    // Remove dead objects
    this.cleanup();
  }

  draw() {
    if (this.gameState !== 'playing') return;

    // Draw all enemies
    for (let enemy of this.enemies) {
      enemy.draw();
    }

    // Draw all projectiles
    for (let projectile of this.projectiles) {
      projectile.draw();
    }

    // Draw player last (on top)
    if (this.player) this.player.draw();
  }

  spawnEnemy() {
    // Spawn enemies at random positions
    // Use different Enemy subclasses for variety!
    let side = floor(random(4));  // 0=top, 1=right, 2=bottom, 3=left
    let x, y;
    
    if (side === 0) { x = random(width); y = -20; }
    else if (side === 1) { x = width + 20; y = random(height); }
    else if (side === 2) { x = random(width); y = height + 20; }
    else { x = -20; y = random(height); }

    let type = floor(random(4));
    // Ensure these classes (Basicballoon, etc.) are defined in your other files
    if (type === 0) {
      this.enemies.push(new Basicballoon(x, y));
    } else if (type === 1) {
      this.enemies.push(new Fastballoon(x, y));
    } else if (type === 2) {
      this.enemies.push(new ConeBalloon(x, y));
    } else {
      this.enemies.push(new bucketballoon(x, y));
    }
  }

  checkCollisions() {
    // Projectile-Enemy collisions
    for (let p of this.projectiles) {
      for (let e of this.enemies) {
        if (p.alive && e.alive && p.collidesWith(e)) {
          e.takeDamage(p.damage || 1);
          p.alive = false;
          if (!e.alive) {
            this.score += 10;
          }
        }
      }
    }

    // Player-Enemy collisions
    if (this.player && this.player.alive) {
      for (let e of this.enemies) {
        if (e.alive && this.player.collidesWith(e)) {
          this.player.takeDamage(e.damage || 1);
          e.alive = false; // Enemy dies on impact
          if (!this.player.alive) {
            this.gameOver();
          }
        }
      }
    }
  }

  cleanup() {
    // Filter out dead objects (more concise than backward loops)
    this.enemies = this.enemies.filter(e => e.alive);
    this.projectiles = this.projectiles.filter(p => p.alive);
  }

  playerShoot(targetX, targetY) {
    if (!this.player) return;

    // Calculate direction vector
    let dirX = targetX - this.player.x;
    let dirY = targetY - this.player.y;
    
    // Normalize vector so projectile speed is consistent regardless of mouse distance
    let mag = Math.sqrt(dirX * dirX + dirY * dirY);
    if (mag !== 0) {
      dirX /= mag;
      dirY /= mag;
    }

    let p = new Projectile(this.player.x, this.player.y, dirX, dirY);
    p.owner = 'player';
    this.projectiles.push(p);
  }

  gameOver() {
    if (this.score > this.highScore) {
      this.highScore = this.score;
    }
    this.gameState = 'gameover';
  }
}
