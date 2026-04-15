class BigMoney extends GameObject {
  constructor(x,y) {
    super(x,y,20);
    this.health = 2;
    this.image = typeof bigMoneyImg !== 'undefined' ? bigMoneyImg : null;
    this.alive = true;
    this.dropInterval = 180; // Frames between money drops
    this.dropTimer = this.dropInterval;
    this.moneyAmount = 10; // Amount of money dropped each time
    this.cost = 50; // Cost of the BigMoney tower
  }

  update() {
    this.dropTimer -= 1;
    if (this.dropTimer <= 0) {
      this.dropTimer = this.dropInterval;
      if (window.gm && Array.isArray(window.gm.moneyDrops)) {
        window.gm.moneyDrops.push(new MoneyDrop(this.x, this.y - this.size - 10, this.moneyAmount));
      }
    }
  }

  draw() {
    if (this.image) {
      image(this.image, this.x - this.size, this.y - this.size, this.size * 2, this.size * 2);
    } else {
      fill(0, 200, 0);
      rect(this.x - this.size, this.y - this.size, this.size * 2, this.size * 2, 8);
      fill(255);
      textAlign(CENTER, CENTER);
      textSize(12);
      text('$', this.x, this.y);
    }

    let barWidth = 30;
    let healthPercent = constrain(this.health / 2, 0, 1);
    noStroke();
    fill(100);
    rect(this.x - barWidth/2, this.y - this.size - 14, barWidth, 5);
    fill(255, 255, 0);
    rect(this.x - barWidth/2, this.y - this.size - 14, barWidth * healthPercent, 5);
  }

  takeDamage(amount) {
    this.health -= amount;
    if (this.health <= 0) {
      this.health = 0;
      this.alive = false;
    }
  }
}

class MoneyDrop extends GameObject {
  constructor(x, y, value) {
    super(x, y, 12);
    this.value = typeof value === 'number' ? value : 5;
    this.timer = 300; // Remove after 5 seconds if not collected
    this.bobTimer = random(TWO_PI);
    this.alive = true;
  }

  update() {
    this.timer -= 1;
    this.bobTimer += 0.08;
    this.y += sin(this.bobTimer) * 0.2;
    if (this.timer <= 0) {
      this.alive = false;
    }
  }

  draw() {
    noStroke();
    fill(255, 215, 0, 220);
    ellipse(this.x, this.y, this.size * 1.5);
    fill(50);
    textAlign(CENTER, CENTER);
    textSize(10);
    text('+' + this.value, this.x, this.y);
  }
}

class Smallmoney extends Bigmoney {
  constructor(x,y,name, icon) {
    super(x, y, 15);
    this.name = "Smallmoney";
    this.icon = icon; //will just be an image of small money sprite
  }

  use(player) {
    // Implementation here
  }

  draw() {
    fill(0, 202, 0);
    square(this.x - 15, this.y - 15, 30)
  }
}

