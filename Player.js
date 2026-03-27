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
    // TODO: Draw the player
    fill(this.color);
    ellipse(this.x, this.y, this.size * 2);

    // TODO: Draw health bar above player
    // let barWidth = 30;
    // let healthPercent = this.health / this.maxHealth;
    // fill(100);
    // rect(this.x - barWidth/2, this.y - this.size - 10, barWidth, 4);
    // fill(0, 255, 100);
    // rect(this.x - barWidth/2, this.y - this.size - 10, barWidth * healthPercent, 4);
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
    this.image = null; // Placeholder for tower image
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
    if (this.image) {
      image(this.image, this.x, this.y, this.size * 2, this.size * 2);
    } else {
      // Placeholder if no image loaded
      fill(100);
      rect(this.x - this.size, this.y - this.size, this.size * 2, this.size * 2);
    }
    
    // Draw health bar
    let barWidth = 30;
    let healthPercent = this.health / 3; // Assuming max health is 3
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
    let p = new Projectile(this.x, this.y, dirX, dirY, 10, 5); // speed 10, damage 5
    p.owner = 'tower';
    projectiles.push(p);
  }
}
