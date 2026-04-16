// ============================================
// ENEMY — Your name here!
// Extends GameObject with AI behavior.
// Create subclasses for different enemy types!
// ============================================

// Helper function to generate random integers between min and max (inclusive)
function randomNumber(min, max) {
  return int(random(min, max + 1));
}

class Enemy extends GameObject {
  constructor(x, y, size, speed) {
    super(x, y, size || 12);
    this.speed = speed || 1;
    this.health = 15;
    this.damage = 5;
    this.color = '#ff4444';
    this.target = window.gm.player;
    this.baseY = y;  // Store original Y position for bobbing
    this.bobTimer = random(TWO_PI);  // Random start for variation
    this.bobAmount = 5;  // Pixels to bob up and down
    this.reachedDropPoint = false;  // Drop to y=250 once at x<=100
    this.attackTimer = 0; // Frames until next tower attack
    this.attackDelay = 60; // Attack once per second at 60 FPS
    this.attackingTower = null; // Current tower target
    this.reward = 0; // money reward for killing this enemy

    // TODO: Add additional enemy properties
    // Examples: this.aiType = 'chase', this.target = null
  }

  update() {
    if (this.target) {
      let dx = this.target.x - this.x;
      let dy = this.target.y - this.y;
      let distance = dist(this.x, this.y, this.target.x, this.target.y);
      if (distance > 0) {
        this.x += (dx / distance) * this.speed;
        this.y += (dy / distance) * this.speed;
      }
    }
  }

  draw() {
    // TODO: Draw the enemy
    fill(this.color);
    ellipse(this.x, this.y, this.size * 2);
    this.drawHealthBar();
  }

  drawHealthBar() {
    let barWidth = this.size * 2;
    let healthPercent = this.maxHealth ? constrain(this.health / this.maxHealth, 0, 1) : 1;
    noStroke();
    fill(0, 0, 0, 150);
    rect(this.x - barWidth / 2, this.y - this.size - 14, barWidth, 6);
    fill(0, 255, 0);
    rect(this.x - barWidth / 2, this.y - this.size - 14, barWidth * healthPercent, 6);
  }

  takeDamage(amount) {
    const wasAlive = this.alive;
    this.health -= amount;
    if (this.health <= 0 && wasAlive) {
      this.alive = false;
      if (window.gm && typeof window.gm.money === 'number') {
        window.gm.money += this.reward || 0;
      }
    }
  }

  handleDropAndGameOver() {
    if (!this.reachedDropPoint && this.x <= 100) {
      this.reachedDropPoint = true;
      this.dropTargetY = 260;
      this.x = 100;
    }

    let dropping = false;
    if (this.reachedDropPoint) {
      const delta = this.dropTargetY - this.baseY;
      if (abs(delta) > 0.1) {
        this.baseY += Math.sign(delta) * 0.5;
        dropping = true;
      } else {
        this.baseY = this.dropTargetY;
      }
    }

    if (this.x <= 80 && window.gm && window.gm.gameState === 'playing') {
      window.gm.gameOver();
    }

    return dropping;
  }

  getNearestTowerInRow() {
    if (!window.gm || !window.gm.towers || window.gm.towers.length === 0 || !window.gm.towers[0]) {
      return null;
    }

    let ownRowY = null;
    let bestRowDistance = Infinity;
    for (let row = 1; row <= 5; row++) {
      const rowPos = TOWER_GRID.getPosition(row, 1);
      if (!rowPos) continue;
      const d = abs(this.y - rowPos.y);
      if (d < bestRowDistance) {
        bestRowDistance = d;
        ownRowY = rowPos.y;
      }
    }
    if (ownRowY === null) {
      return null;
    }

    let nearest = null;
    let bestDist = Infinity;
    for (let tower of window.gm.towers) {
      if (!tower.alive) continue;
      if (abs(tower.y - ownRowY) > 40) continue;
      const d = dist(this.x, this.y, tower.x, tower.y);
      if (d < bestDist) {
        bestDist = d;
        nearest = tower;
      }
    }
    return nearest;
  }

  handleTowerContact() {
    const tower = this.getNearestTowerInRow();
    if (!tower) {
      this.attackingTower = null;
      this.attackTimer = 0;
      return false;
    }

    const contactDistance = (this.size + tower.size) * 0.7;
    const distance = dist(this.x, this.y, tower.x, tower.y);
    if (distance <= contactDistance) {
      this.attackingTower = tower;
      this.attackTimer--; // count down each frame while in contact
      if (this.attackTimer <= 0) {
        tower.takeDamage(this.damage);
        this.attackTimer = this.attackDelay;
      }
      return true;
    }

    this.attackingTower = null;
    this.attackTimer = 0;
    return false;
  }

  // TODO: Add enemy-specific methods
  // Examples: patrol(), attack(), dropLoot()
}

// ============================================
// ENEMY SUBCLASSES — Create different enemy types!
// ============================================

// TODO: Create enemy subclasses with different behaviors

class ConeBalloon extends Enemy {
  constructor(x, y) {
    super(x, y, 40, 1);  // Slightly larger and a bit faster than Basicballoon
    this.image = typeof coneBalloonImg !== 'undefined' ? coneBalloonImg : null;
    this.health = 15;
    this.maxHealth = this.health;
    this.damage = 2;
    this.reward = 10;
  }

  update() {
    const dropping = this.handleDropAndGameOver();
    if (!dropping) {
      if (!this.handleTowerContact()) {
        this.x -= this.speed;
      }
    }
    this.bobTimer += 0.05;  // Increment bob animation
    this.y = this.baseY + sin(this.bobTimer) * this.bobAmount;  // Apply bobbing
    if (this.x < -this.size) this.alive = false;
  }

  draw() {
    if (this.image) {
      image(this.image, this.x - this.size, this.y - this.size, this.size * 2, this.size * 2);
      this.drawHealthBar();
      return;
    }

    // Draw a cone-shaped balloon
    fill(this.color);
    // Draw triangle (cone)
    triangle(
      this.x, this.y - this.size, // top
      this.x - this.size, this.y + this.size, // bottom left
      this.x + this.size, this.y + this.size  // bottom right
    );
    // Draw a small ellipse at the base for the balloon knot
    fill(80, 40, 0);
    ellipse(this.x, this.y + this.size + 2, this.size / 2, this.size / 4);
    this.drawHealthBar();
  }
}

  class Fastballoon extends Enemy {
  constructor(x, y) {
    super(x, y, 40, 2);
    this.image = typeof fastBalloonImg !== 'undefined' ? fastBalloonImg : null;
    this.health = 5;
    this.maxHealth = this.health;
    this.damage = 3;
    this.reward = 15;
  }

  update() {
    const dropping = this.handleDropAndGameOver();
    if (!dropping) {
      if (!this.handleTowerContact()) {
        this.x -= this.speed;
      }
    }
    this.bobTimer += 0.05;  // Increment bob animation
    this.y = this.baseY + sin(this.bobTimer) * this.bobAmount;  // Apply bobbing
    if (this.x < -this.size) this.alive = false;
  }

  draw() {
    if (this.image) {
      image(this.image, this.x - this.size, this.y - this.size, this.size * 2, this.size * 2);
      this.drawHealthBar();
      return;
    }
    ellipse(this.x, this.y, this.size);
    this.drawHealthBar();
  }
 }

 class Basicballoon extends Enemy{
   constructor(x,y){
    super(x,y, 40, 1)
    this.image = typeof basicBalloonImg !== 'undefined' ? basicBalloonImg : null;
    this.health = 9;
    this.maxHealth = this.health;
    this.damage = 1;
    this.reward = 5;
  }
 update() {
    const dropping = this.handleDropAndGameOver();
    if (!dropping) {
      if (!this.handleTowerContact()) {
        this.x -= this.speed;
      }
    }
    this.bobTimer += 0.05;  // Increment bob animation
    this.y = this.baseY + sin(this.bobTimer) * this.bobAmount;  // Apply bobbing
    if (this.x < -this.size) this.alive = false;
  }
  draw() {
    if (this.image) {
      image(this.image, this.x - this.size, this.y - this.size, this.size * 2, this.size * 2);
      this.drawHealthBar();
      return;
    }
    fill(this.color);
    ellipse(this.x, this.y, this.size * 2);
    this.drawHealthBar();
  }
}

class bucketballoon extends Enemy{
  constructor(x,y){
    super(x,y, 40, 1)
    this.image = typeof bucketBalloonImg !== 'undefined' ? bucketBalloonImg : null;
    this.health = 20;
    this.maxHealth = this.health;
    this.damage = 2;
    this.reward = 15;
  }
  update() {
    const dropping = this.handleDropAndGameOver();
    if (!dropping) {
      if (!this.handleTowerContact()) {
        this.x -= this.speed;
      }
    }
    this.bobTimer += 0.05;  // Increment bob animation
    this.y = this.baseY + sin(this.bobTimer) * this.bobAmount;  // Apply bobbing
    if (this.x < -this.size) this.alive = false;
  }
  draw() {
    if (this.image) {
      image(this.image, this.x - this.size, this.y - this.size, this.size * 2, this.size * 2);
      this.drawHealthBar();
      return;
    }
    fill(this.color);
    ellipse(this.x, this.y, this.size * 2);
    this.drawHealthBar();
  }
}
  
 class SCHERMBOSS extends Enemy {
  constructor(x, y) {
    super(x, y, 80, 0.4);  // Larger and slower than regular enemies
    this.image = typeof schermBalloonImg !== 'undefined' ? schermBalloonImg : null;
    this.health = 100;
    this.maxHealth = this.health;
    this.damage = 15;
  }
 
 update(){
 const dropping = this.handleDropAndGameOver();
 if (!dropping) {
   if (!this.handleTowerContact()) {
     this.x -= this.speed;
   }
 }
    this.bobTimer += 0.05;  // Increment bob animation
    this.y = this.baseY + sin(this.bobTimer) * this.bobAmount;  // Apply bobbing
    if (this.x < -this.size) this.alive = false;
 } 
 draw(){
    if (this.image) {
      image(this.image, this.x - this.size, this.y - this.size, this.size * 2, this.size * 2);
      this.drawHealthBar();
      return;
    }
    fill(this.color);
    ellipse(this.x, this.y, this.size * 2);
    this.drawHealthBar();
  }
 } 