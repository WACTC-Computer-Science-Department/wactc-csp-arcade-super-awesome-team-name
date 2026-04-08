// ============================================
// PLAYER — Your name here!
// Extends GameObject with player controls.
// ============================================

class Player extends GameObject {
  constructor(x, y) {
    super(mouseX, mouseY, 10);  // size = 15
    this.color = '#00ff88';
    this.heldTower = null;
    this.image = null
    // TODO: Add any additional properties your player needs
    // Examples: this.abilities = [], this.score = 0, this.direction = 0
  }

  update() {
    // Follow cursor
    this.x = mouseX;
    this.y = mouseY;
  }
  draw() {
      // Draw green circle
      fill(0, 255, 100);
      circle(this.x, this.y, this.size * 2);
   
    // Draw health bar
    let barWidth = 30;
    let healthPercent = this.health / (this.maxHealth || 1);
    fill(100);
    rect(this.x - barWidth/2, this.y - this.size - 10, barWidth, 4);
    fill(0, 255, 100);
    rect(this.x - barWidth/2, this.y - this.size - 10, barWidth * healthPercent, 4);
  }

  takeDamage(amount) {
    this.health -= amount;
    if (this.health <= 0) {
      this.health = 0;
      this.alive = false;
    }
    // TODO: Add visual feedback (flash red, knockback, etc.)
  }

  // TODO: Add player-specific methods
  // Examples: shoot(), dash(), useAbility(), heal()
}
class SniperTower extends GameObject {
  constructor(x, y, size) {
    super(x, y);
    this.image = typeof sniperImg !== 'undefined' ? sniperImg : null;
    this.projectile = "Sniper";
    this.range = 400;
    this.fireRate = 180; // Frames between shots
    this.health = 3;
    this.alive = true;
    this.cooldown = 0; // Add cooldown timer
    this.cost = 50; // Cost of the sniper tower
  }
  update(enemies, projectiles) {
    this.cooldown--; // Decrease cooldown each frame
    
    if (this.cooldown <= 0) {
      this.fire(projectiles);
      this.cooldown = this.fireRate; // Reset cooldown
    }
  }

  draw() {
      image(this.image, this.x - this.size, this.y - this.size, this.size * 2, this.size * 2);

    // Draw health bar
    let barWidth = 30;
    let healthPercent = this.health / 3;
    fill(100);
    rect(this.x - barWidth/2, this.y - this.size - 10, barWidth, 4);
    fill(0, 255, 100);
    rect(this.x - barWidth/2, this.y - this.size - 10, barWidth * healthPercent, 4);
  }

  takeDamage(amount) {
    this.health -= amount;
    if (this.health <= 0) {
      this.health = 0;
      this.alive = false;
    }
  }

  fire(projectiles) {
    // Shoot straight to the right
    let dirX = 1;
    let dirY = 0;
    
    // Create sniper projectile (high damage)
    let p = new Projectile(this.x, this.y, dirX, dirY, 10, 5);
    p.owner = 'tower';
    projectiles.push(p);
  }
}

class PistolTower extends GameObject {
  constructor(x, y, size) {
    super(x, y);
    this.image = typeof pistolImg !== 'undefined' ? pistolImg : null;
    this.projectile = "Pistol";
    this.range = 400;
    this.fireRate = 60; // Frames between shots
    this.health = 5;
    this.alive = true;
    this.cooldown = 0; // Add cooldown timer
    this.cost = 30; // Cost of the pistol tower
  }
  update(enemies, projectiles) {
    this.cooldown--; // Decrease cooldown each frame
    
    if (this.cooldown <= 0) {
      this.fire(projectiles);
      this.cooldown = this.fireRate; // Reset cooldown
    }
  }

  draw() {
    if (this.image) {
      image(this.image, this.x - this.size, this.y - this.size, this.size * 2, this.size * 2);
    } else {
      noStroke();
      fill('#0000ff');
      rect(this.x - this.size, this.y - this.size, this.size * 2, this.size * 2);
    }

    // Draw health bar
    let barWidth = 30;
    let healthPercent = this.health / 5;
    fill(100);
    rect(this.x - barWidth/2, this.y - this.size - 10, barWidth, 4);
    fill(0, 255, 100);
    rect(this.x - barWidth/2, this.y - this.size - 10, barWidth * healthPercent, 4);
  }

  takeDamage(amount) {
    this.health -= amount;
    if (this.health <= 0) {
      this.health = 0;
      this.alive = false;
    }
  }

  fire(projectiles) {
    // Shoot straight to the right
    let dirX = 1;
    let dirY = 0;
    
    // Create pistol projectile (medium damage)
    let p = new Projectile(this.x, this.y, dirX, dirY, 10, 3);
    p.owner = 'tower';
    projectiles.push(p);
  }
}
class Bigmoney extends GameObject {
  constructor(x,y) {
  super(x,y,15);
  this.health = 2;
  this.image = typeof bigmoneyImg !== 'undefined' ? bigmoneyImg : null;
  this.alive = true;
  this.dropTimer = 300; // Timer for dropping money every 5 seconds
  this.cooldown = 0; // Cooldown for dropping money 
   this.moneyAmount = 10; // Amount of money dropped each time
   this.cost = 50; // Cost of the Bigmoney tower
  }
  draw() {
    fill(0, 255, 0);
    square(50, 50, 40);

    // Draw health bar
    let barWidth = 30;
    let healthPercent = this.health / 2;
    fill(100);
    rect(this.x - barWidth/2, this.y - this.size - 10, barWidth, 4);
    fill(255, 255, 0);
    rect(this.x - barWidth/2, this.y - this.size - 10, barWidth * healthPercent, 4);
  }

  takeDamage(amount) {
    this.health -= amount;
    if (this.health <= 0) {
      this.health = 0;
      this.alive = false;
    }
  }
}
