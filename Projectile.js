// ============================================
// PROJECTILE — Your name here!
// Extends GameObject for bullets, spells, etc.
// ============================================

class Projectile extends GameObject {
  constructor(x, y, dirX, dirY, speed, damage) {
    super(x, y, 4);  // size = 4
    this.speed = speed || 8;
    this.damage = damage || 10;
    this.color = '#ffff00';

    // Normalize direction
    let len = Math.sqrt(dirX * dirX + dirY * dirY);
    if (len > 0) {
      this.velX = (dirX / len) * this.speed;
      this.velY = (dirY / len) * this.speed;
    } else {
      this.velX = 0;
      this.velY = -this.speed;
    }

    // Who fired this? Prevents self-damage
    this.player = null;  // set to 'player' or 'enemy' after creation
  }

  update() {
    this.x += this.velX;
    this.y += this.velY;

    // Remove if off-screen
    if (this.isOffScreen()) {
      this.alive = false;
    }
  }

<<<<<<< HEAD
  draw() {
    if (typeof projectileImg !== 'undefined' && projectileImg) {
      image(projectileImg, this.x - this.size, this.y - this.size, this.size * 2, this.size * 2);
      return;
    }

    fill(this.color);
    ellipse(this.x, this.y, this.size * 2);
  }
=======
>>>>>>> c47f78da5506bb99df3508cd049d26dc1599653f

  // TODO: Create projectile subclasses for variety
  // Examples: class Missile extends Projectile (homing)
  //           class Laser extends Projectile (instant, no travel)
  //           class Spell extends Projectile (area damage)
}
class pistolProjectile extends Projectile {
  constructor(x, y, dirX, dirY, speed, damage) {
    super(x, y, dirX, dirY, speed, damage);
    this.size = 15;
    this.speed = speed || 10;
    this.damage = damage || 2;
  }
draw() {    
  fill(this.color);
   ellipse(this.x, this.y, this.size * 2);
  }

}