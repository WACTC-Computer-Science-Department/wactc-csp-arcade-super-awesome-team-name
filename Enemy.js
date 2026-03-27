// ============================================
// ENEMY — Your name here!
// Extends GameObject with AI behavior.
// Create subclasses for different enemy types!
// ============================================

class Enemy extends GameObject {
  constructor(x, y, size, speed) {
    super(x, y, size || 12);
    this.speed = speed || 1;
    this.health = 15;
    this.damage = 5;
    this.color = '#ff4444';

    // TODO: Add additional enemy properties
    // Examples: this.aiType = 'chase', this.target = null
  }

  update() {
    // TODO: Add AI behavior
    // Example: Move toward the player
    //
    // To chase a target:
    // let dx = target.x - this.x;
    // let dy = target.y - this.y;
    // let distance = dist(this.x, this.y, target.x, target.y);
    // if (distance > 0) {
    //   this.x += (dx / distance) * this.speed;
    //   this.y += (dy / distance) * this.speed;
    // }
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
    super(x, y, 8, 1);  // Slightly larger and a bit faster than Basicballoon
    this.health = 10;
    this.damage = 2;
  }

  draw() {
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
    super(x, y, 8, 2);  
    this.image = null
    this.health = 5;
    this.damage = 3;
    this.speed = speed || 2;
     }
     move(){
      this.x -= this.speed
      
     }
     draw(){
      ellipse(this.x, this.y, this.size);
      randomNumber(0,5)
     }
 }

 class Basicballoon extends Enemy{
   constructor(x,y){
    super(x,y, 8, 1)
    this.image = null
    this.health = 15
    this.damage = 1
  }
 update() {
    this.x -= this.speed;
    // Random vertical drift
    if (randomNumber(0, 5) === 0) {
      this.x += randomNumber(-2, 2);
    }
    if (this.x < -this.size) this.alive = false;
  }
  draw() {
    fill(this.color);
    ellipse(this.x, this.y, this.size * 2);
  }
}

class bucketballoon extends Enemy{
  constructor(x,y){
    super(x,y, 8, 1)
    this.image = null
    this.health = 15
    this.damage = 2
  }
  update() {
    this.x -= this.speed;
    // Random vertical drift
    if (randomNumber(0, 5) === 0) {
      this.x += randomNumber(-2, 2);
    }       
    if (this.x < -this.size) this.alive = false;
  }
  draw() {
    fill(this.color);
    ellipse(this.x, this.y, this.size * 2);
  }
}
  
 class BossEnemy extends Enemy {
  constructor(x, y) {
    super(x, y, 120, 0.1);  // Larger and slower than regular enemies
    this.health = 500;
    this.damage = 35;
  }
 
 update(){
 this.x -= this.speed;
    // Random vertical drift
    if (randomNumber(0, 5) === 0) {
      this.x += randomNumber(-2, 2);
    }       
    if (this.x < -this.size) this.alive = false;
 } 
 draw(){
    fill(this.color);
    ellipse(this.x, this.y, this.size * 2);
  }
 }
    
