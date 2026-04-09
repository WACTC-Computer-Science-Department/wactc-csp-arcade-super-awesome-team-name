class BigMoney extends GameObject {
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
    fill(0,255,0);
    square(this.x - 20, this.y - 20, 40);

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
class Smallmoney extends Bigmoney {
  constructor(x,y,name, icon) {
    super(x, y, 15);
    this.name = "Smallmoney";
    this.icon = icon;
  }

  use(player) {
    // Implementation here
  }

  draw() {
    fill(0, 202, 0);
    square(this.x - 15, this.y - 15, 30);
  }
}

