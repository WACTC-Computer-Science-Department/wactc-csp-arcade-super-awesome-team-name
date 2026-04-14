// ============================================
// GAME MANAGER — Your name here!
// Manages all game objects, spawning, and collisions.
// This is the brain of the game.
// ============================================

class GameManager {
  constructor() {
    this.player = null;
    this.enemies = [];
    this.projectiles = [];
    this.towers = [];
    this.score = 0;
    this.highScore = 0;
    this.wave = 1;
    this.spawnTimer = 0;
    this.spawnRate = 300;  // frames between spawns (5 seconds at 60fps)
    this.gameState = 'menu';  // 'menu', 'playing', 'gameover', 'victory'
    
    // Wave system
    this.waveState = 'prep';  // 'prep', 'spawning', 'waiting'
    this.prepTimer = 0;
    this.prepDuration = 0;
    this.enemyQueue = [];  // Queue of enemies to spawn this wave
    this.waveDefinitions = this.getWaveDefinitions();
  }

  getWaveDefinitions() {
    // Define all waves: [type, type, ...]
    return [
      { prep: 30 * 60, enemies: ['basic'] },  // Wave 1: 1 basic (30 sec prep)
      { prep: 20 * 60, enemies: ['basic', 'basic', 'basic'] },  // Wave 2: 3 basic (20 sec prep)
      { prep: 20 * 60, enemies: ['basic', 'basic', 'basic', 'basic', 'basic', 'basic'] },  // Wave 3: 6 basic
      { prep: 20 * 60, enemies: ['basic', 'basic', 'basic', 'basic', 'basic', 'basic', 'cone', 'cone', 'cone'] },  // Wave 4: 6 basic, 3 cone
      { prep: 20 * 60, enemies: ['basic', 'basic', 'basic', 'cone', 'cone', 'cone', 'cone', 'cone', 'bucket', 'bucket'] },  // Wave 5
      { prep: 20 * 60, enemies: ['basic', 'cone', 'cone', 'cone', 'cone', 'cone', 'cone', 'cone', 'cone', 'bucket', 'bucket', 'bucket', 'bucket', 'bucket'] },  // Wave 6
      { prep: 20 * 60, enemies: ['cone', 'cone', 'cone', 'cone', 'cone', 'cone', 'cone', 'cone', 'fast', 'fast', 'fast', 'fast', 'fast', 'fast', 'fast'] },  // Wave 7
      { prep: 20 * 60, enemies: ['boss'] }  // Boss wave
    ];
  }

  createPlayer() {
    return new Player(width / 2, height / 2);
  }

  startGame() {
    this.player = this.createPlayer();
    this.enemies = [];
    this.projectiles = [];
    this.towers = [];
    this.score = 0;
    this.wave = 1;
    this.gameState = 'playing';
    this.waveState = 'prep';
    this.prepTimer = 0;
    this.spawnAutoKnives();
    this.startWave(1);
  }

  startWave(waveNum) {
    if (waveNum > this.waveDefinitions.length) {
      this.gameState = 'victory';
      return;
    }
    
    this.wave = waveNum;
    this.waveState = 'prep';
    this.prepTimer = 0;
    const waveDef = this.waveDefinitions[waveNum - 1];
    this.prepDuration = waveDef.prep;
    this.enemyQueue = [...waveDef.enemies];  // Copy enemy list
    this.shuffleArray(this.enemyQueue);  // Randomize spawn order
    this.spawnTimer = 0;
  }

  shuffleArray(arr) {
    // Fisher-Yates shuffle algorithm
    for (let i = arr.length - 1; i > 0; i--) {
      const j = floor(random(0, i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];  // Swap
    }
  }

  update() {
    if (this.gameState !== 'playing') return;

    // Update player
    this.player.update();

    // Update towers so they can attack enemies and block paths
    for (let i = 0; i < this.towers.length; i++) {
      if (typeof this.towers[i].update === 'function') {
        this.towers[i].update(this.enemies, this.projectiles);
      }
    }

    // Handle wave states
    if (this.waveState === 'prep') {
      this.prepTimer++;
      if (this.prepTimer >= this.prepDuration) {
        this.waveState = 'spawning';
        this.spawnTimer = 0;
      }
    } else if (this.waveState === 'spawning') {
      this.spawnTimer++;
      if (this.spawnTimer >= this.spawnRate && this.enemyQueue.length > 0) {
        this.spawnEnemyFromQueue();
        this.spawnTimer = 0;
      }
      
      // Check if wave is complete (all queued enemies spawned and all enemies defeated)
      if (this.enemyQueue.length === 0 && this.enemies.length === 0) {
        this.startWave(this.wave + 1);
      }
    }

    // TODO: Update all enemies (polymorphic — works for any Enemy subclass!)
    for (let i = 0; i < this.enemies.length; i++) {
      this.enemies[i].update();
    }

    // If any enemy reaches x <= 80, trigger game over and let enemies drop to y=250 at x<=100
    for (let i = 0; i < this.enemies.length; i++) {
      if (this.enemies[i].x <= 80) {
        this.gameOver();
        return;
      }
    }

    // TODO: Update all projectiles
    for (let i = 0; i < this.projectiles.length; i++) {
      this.projectiles[i].update();
    }

    // Check collisions
    this.checkCollisions();

    // Remove dead objects (backward loop!)
    this.cleanup();
  }

  draw() {
    if (this.gameState !== 'playing') return;

    // TODO: Draw all game objects (polymorphic — each draws itself!)
    for (let i = 0; i < this.enemies.length; i++) {
      this.enemies[i].draw();
    }

    for (let i = 0; i < this.towers.length; i++) {
      this.towers[i].draw();
    }

    for (let i = 0; i < this.projectiles.length; i++) {
      this.projectiles[i].draw();
    }

    // Draw player last (on top)
    this.player.draw();
  }

  spawnEnemyFromQueue() {
    if (this.enemyQueue.length === 0) return;
    
    const enemyType = this.enemyQueue.shift();  // Get and remove first enemy from queue
    
    // Spawn at random grid row
    let row = floor(random(1, 6));  // Rows 1-5
    let gridPos = TOWER_GRID.getPosition(row, 7);
    
    let x = width + 20;  // Off-screen to the right
    let y = (gridPos ? gridPos.y : height / 2) + 20;  // Use grid y-position, moved down by 20 pixels

    // Spawn the correct enemy type
    if (enemyType === 'basic') {
      this.enemies.push(new Basicballoon(x, y));
    } else if (enemyType === 'fast') {
      this.enemies.push(new Fastballoon(x, y));
    } else if (enemyType === 'cone') {
      this.enemies.push(new ConeBalloon(x, y));
    } else if (enemyType === 'bucket') {
      this.enemies.push(new bucketballoon(x, y));
    } else if (enemyType === 'boss') {
      // Boss spawns in middle lane
      let bossPosY = TOWER_GRID.getPosition(3, 7).y;  // Middle row
      this.enemies.push(new SCHERMBOSS(x, bossPosY));
    }
  }

  createTower(type, x, y) {
    if (type === 'sniper') {
      return new SniperTower(x, y, 45);
    } else if (type === 'pistol') {
      return new PistolTower(x, y, 45);
    } else if (type === 'sword') {
      return new SwordTower(x, y, 45);
    } else if (type === 'knife') {
      return new KnifeTrap(x, y, 45);
    } else if (type === 'wall') {
      return new wallTower(x, y, 45);
    } else if (type === 'bigMoney') {
      return new BigMoney(x, y);
    }
    return null;
  }

  findTowerPosition(x, y) {
    return TOWER_GRID.findNearestPosition(x, y, 50);
  }

  spawnAutoKnives() {
    for (let row = 1; row <= 5; row++) {
      const pos = TOWER_GRID.getPosition(row, 1);
      if (!pos) continue;
      const knife = new KnifeTrap(pos.x, pos.y, 45);
      this.towers.push(knife);
    }
  }

  findKnifeBackPosition(x, y) {
    let bestRow = 1;
    let minDistance = Infinity;
    for (let row = 1; row <= 5; row++) {
      const pos = TOWER_GRID.getPosition(row, 1);
      if (!pos) continue;
      const d = abs(y - pos.y);
      if (d < minDistance) {
        minDistance = d;
        bestRow = row;
      }
    }
    return TOWER_GRID.getPosition(bestRow, 1);
  }

  isTowerOccupiedAt(pos) {
    if (!pos) return false;
    for (let tower of this.towers) {
      if (dist(tower.x, tower.y, pos.x, pos.y) < 1) {
        return true;
      }
    }
    return false;
  }

  placeTower(type, x, y) {
    if (!type || type === 'knife') return false;
    const position = this.findTowerPosition(x, y);
    if (!position || this.isTowerOccupiedAt(position)) {
      return false;
    }

    const tower = this.createTower(type, position.x, position.y);
    if (!tower) return false;

    this.towers.push(tower);
    return true;
  }

  checkCollisions() {
    // TODO: Check projectile-enemy collisions
    // The beauty of OOP: collidesWith() works for ANY subclass!
    for (let i = 0; i < this.projectiles.length; i++) {
      for (let j = 0; j < this.enemies.length; j++) {
        if (this.projectiles[i].collidesWith(this.enemies[j])) {
          this.enemies[j].takeDamage(this.projectiles[i].damage);
          this.projectiles[i].alive = false;
          if (!this.enemies[j].alive) {
            this.score += 10;
          }
        }
      }
    }

    // Player-cursor collision is not used for loss in tower defense mode.
    // Game over happens when an enemy reaches the left edge.
  }

  cleanup() {
    // Remove dead enemies (backward loop!)
    for (let i = this.enemies.length - 1; i >= 0; i--) {
      if (!this.enemies[i].alive) {
        this.enemies.splice(i, 1);
      }
    }

    // Remove dead projectiles
    for (let i = this.projectiles.length - 1; i >= 0; i--) {
      if (!this.projectiles[i].alive) {
        this.projectiles.splice(i, 1);
      }
    }

    // Remove destroyed towers
    for (let i = this.towers.length - 1; i >= 0; i--) {
      if (!this.towers[i].alive) {
        this.towers.splice(i, 1);
      }
    }
  }

  playerShoot(targetX, targetY) {
    // Create a projectile aimed at the target
    let dirX = targetX - this.player.x;
    let dirY = targetY - this.player.y;
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
