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
  }

  takeDamage(amount) {
    this.health -= amount;
    if (this.health <= 0) {
      this.alive = false;
    }
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
    this.health = 10;
    this.damage = 2;
  }

  update() {
    this.x -= this.speed;
    this.bobTimer += 0.05;  // Increment bob animation
    this.y = this.baseY + sin(this.bobTimer) * this.bobAmount;  // Apply bobbing
    if (this.x < -this.size) this.alive = false;
  }

  draw() {
    if (this.image) {
      image(this.image, this.x - this.size, this.y - this.size, this.size * 2, this.size * 2);
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
  }
}

  class Fastballoon extends Enemy {
  constructor(x, y) {
    super(x, y, 40, 2);
    this.image = typeof fastBalloonImg !== 'undefined' ? fastBalloonImg : null;
    this.health = 5;
    this.damage = 3;
  }

  update() {
    this.x -= this.speed;
    this.bobTimer += 0.05;  // Increment bob animation
    this.y = this.baseY + sin(this.bobTimer) * this.bobAmount;  // Apply bobbing
    if (this.x < -this.size) this.alive = false;
  }

  draw() {
    if (this.image) {
      image(this.image, this.x - this.size, this.y - this.size, this.size * 2, this.size * 2);
      return;
    }
    ellipse(this.x, this.y, this.size);
  }
 }

 class Basicballoon extends Enemy{
   constructor(x,y){
    super(x,y, 40, 1)
    this.image = typeof basicBalloonImg !== 'undefined' ? basicBalloonImg : null;
    this.health = 15
    this.damage = 1
  }
 update() {
    this.x -= this.speed;
    this.bobTimer += 0.05;  // Increment bob animation
    this.y = this.baseY + sin(this.bobTimer) * this.bobAmount;  // Apply bobbing
    if (this.x < -this.size) this.alive = false;
  }
  draw() {
    if (this.image) {
      image(this.image, this.x - this.size, this.y - this.size, this.size * 2, this.size * 2);
      return;
    }
    fill(this.color);
    ellipse(this.x, this.y, this.size * 2);
  }
}

class bucketballoon extends Enemy{
  constructor(x,y){
    super(x,y, 40, 1)
    this.image = typeof bucketBalloonImg !== 'undefined' ? bucketBalloonImg : null;
    this.health = 15
    this.damage = 2
  }
  update() {
    this.x -= this.speed;
    this.bobTimer += 0.05;  // Increment bob animation
    this.y = this.baseY + sin(this.bobTimer) * this.bobAmount;  // Apply bobbing
    if (this.x < -this.size) this.alive = false;
  }
  draw() {
    if (this.image) {
      image(this.image, this.x - this.size, this.y - this.size, this.size * 2, this.size * 2);
      return;
    }
    fill(this.color);
    ellipse(this.x, this.y, this.size * 2);
  }
}
  
 class SCHERMBOSS extends Enemy {
  constructor(x, y) {
    super(x, y, 80, 0.4);  // Larger and slower than regular enemies
    this.image = typeof schermBalloonImg !== 'undefined' ? schermBalloonImg : null;
    this.health = 500;
    this.damage = 35;
  }
 
 update(){
 this.x -= this.speed;
    this.bobTimer += 0.05;  // Increment bob animation
    this.y = this.baseY + sin(this.bobTimer) * this.bobAmount;  // Apply bobbing
    if (this.x < -this.size) this.alive = false;
 } 
 draw(){
    if (this.image) {
      image(this.image, this.x - this.size, this.y - this.size, this.size * 2, this.size * 2);
      return;
    }
    fill(this.color);
    ellipse(this.x, this.y, this.size * 2);
  }
 } 