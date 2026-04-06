// ============================================
// PLAYER — Your name here!
// Extends GameObject with player controls.
// ============================================

class Player extends GameObject {
  constructor(x, y) {
    super(x, y, 15);  // size = 15
    this.health = 1;
    this.color = '#00ff88';
    this.alive = true;
    this.heldTower = null;
    // TODO: Add any additional properties your player needs
    // Examples: this.abilities = [], this.score = 0, this.direction = 0
  }

  update() {
    // TODO: Handle keyboard input for movement
    // Use keyIsDown(LEFT_ARROW) or keyIsDown(65) for 'A', etc.
    // Don't forget to keep the player inside the canvas!
    //
    // Example:
    // if (keyIsDown(LEFT_ARROW) || keyIsDown(65)) this.x -= this.speed;
    // if (keyIsDown(RIGHT_ARROW) || keyIsDown(68)) this.x += this.speed;
    // if (keyIsDown(UP_ARROW) || keyIsDown(87)) this.y -= this.speed;
    // if (keyIsDown(DOWN_ARROW) || keyIsDown(83)) this.y += this.speed;
    //
    // Keep in bounds:
    // this.x = constrain(this.x, this.size, width - this.size);
    // this.y = constrain(this.y, this.size, height - this.size);
  }
  draw() {
      image(swordImg, this.x - this.size, this.y - this.size, this.size * 2, this.size * 2);
   

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
Class Bigmoney extends GameObject {
  constructor(x,y) {
  super(x,y,15);
  this.health(2);
  this.image =
  
}
