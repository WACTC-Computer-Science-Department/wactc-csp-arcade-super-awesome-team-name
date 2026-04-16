// ============================================
// PLAYER — Your name here!
// Extends GameObject with player controls.
// ============================================

class Player extends GameObject {
  constructor(x, y) {
    super(mouseX, mouseY, 10);  // size = 15
    this.color = '#00ff88';
    this.heldTower = null;
    this.image = typeof cursorImg !== 'undefined' ? cursorImg : null;
    // TODO: Add any additional properties your player needs
    // Examples: this.abilities = [], this.score = 0, this.direction = 0
  }

  update() {
    // Follow cursor
    this.x = mouseX;
    this.y = mouseY;
  }
  draw() {
    if (this.image) {
      push();
      imageMode(CENTER);
      image(this.image, this.x, this.y, this.size * 7, this.size * 7);
      pop();
    } else {
      fill(0, 255, 100);
      circle(this.x, this.y, this.size * 3);
    }
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

function hasEnemyInRange(tower, enemies) {
  if (!enemies || enemies.length === 0) return false;
  return enemies.some(enemy => dist(tower.x, tower.y, enemy.x, enemy.y) <= tower.range);
}

function getTowerRowCenterY(tower) {
  let bestRow = 1;
  let bestDistance = Infinity;
  for (let row = 1; row <= 5; row++) {
    const pos = TOWER_GRID.getPosition(row, 1);
    if (!pos) continue;
    const d = abs(tower.y - pos.y);
    if (d < bestDistance) {
      bestDistance = d;
      bestRow = row;
    }
  }
  const rowPos = TOWER_GRID.getPosition(bestRow, 1);
  return rowPos ? rowPos.y : tower.y;
}

function hasEnemyInSameRowAndRange(tower, enemies, threshold = 30) {
  if (!enemies || enemies.length === 0) return false;
  const rowY = getTowerRowCenterY(tower);
  return enemies.some(enemy => abs(enemy.y - rowY) <= threshold && dist(tower.x, tower.y, enemy.x, enemy.y) <= tower.range);
}

function getSwordRowCenterY(tower) {
  let bestRow = 1;
  let bestDistance = Infinity;
  for (let row = 1; row <= 5; row++) {
    const pos = TOWER_GRID.getPosition(row, 1);
    if (!pos) continue;
    const d = abs(tower.y - pos.y);
    if (d < bestDistance) {
      bestDistance = d;
      bestRow = row;
    }
  }
  const rowPos = TOWER_GRID.getPosition(bestRow, 1);
  return rowPos ? rowPos.y : tower.y;
}

function anyEnemyOnSwordRow(tower, enemies, threshold = 40) {
  if (!enemies || enemies.length === 0) return false;
  const rowY = getSwordRowCenterY(tower);
  return enemies.some(enemy => abs(enemy.y - rowY) <= threshold && dist(tower.x, tower.y, enemy.x, enemy.y) <= (tower.range || Infinity));
}

class SniperTower extends GameObject {
  constructor(x, y, size) {
    super(x, y, size || 45);
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
    
    if (this.cooldown <= 0 && hasEnemyInSameRowAndRange(this, enemies)) {
      this.fire(projectiles);
      this.cooldown = this.fireRate; // Reset cooldown
    }
  }

  draw() {
    if (this.image) {
      noStroke();
      image(this.image, this.x - this.size, this.y - this.size, this.size * 2, this.size * 2);
    } else {
      noStroke();
      fill('#999999');
      rect(this.x - this.size, this.y - this.size, this.size * 2, this.size * 2);
    }

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
    let p = new Projectile(this.x, this.y, dirX, dirY, 6, 5);
    p.owner = 'tower';
    projectiles.push(p);
  }
}

class PistolTower extends GameObject {
  constructor(x, y, size) {
    super(x, y, size || 45);
    this.image = typeof pistolImg !== 'undefined' ? pistolImg : null;
    this.projectile = "Pistol";
    this.range = 300;
    this.fireRate = 100; // Frames between shots
    this.health = 5;
    this.alive = true;
    this.cooldown = 0; // Add cooldown timer
    this.cost = 25; // Cost of the pistol tower
  }
  update(enemies, projectiles) {
    this.cooldown--; // Decrease cooldown each frame
    
    if (this.cooldown <= 0 && hasEnemyInSameRowAndRange(this, enemies)) {
      this.fire(projectiles);
      this.cooldown = this.fireRate; // Reset cooldown
    }
  }

  draw() {
    if (this.image) {
      noStroke();
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
    let p = new Projectile(this.x, this.y, dirX, dirY, 8, 3);
    p.owner = 'tower';
    projectiles.push(p);
  }
}
class SwordTower extends GameObject {
  constructor(x, y, size) {
    super(x, y, size || 45);
    this.image = typeof swordImg !== 'undefined' ? swordImg : null;
    this.projectile = "Sword";
    this.range = 100; // Melee range
    this.fireRate = 30; // Frames between attacks
    this.health = 8;
    this.alive = true;
    this.cooldown = 0; // Add cooldown timer
    this.used = false; // One-time row kill
  }
  update(enemies, projectiles) {
    this.cooldown--; // Decrease cooldown each frame
    
    if (!this.used && anyEnemyOnSwordRow(this, enemies)) {
      this.used = true;
      this.fire(enemies);
      this.alive = false;
    }
  }

  draw() {
    if (this.image) {
      image(this.image, this.x - this.size, this.y - this.size, this.size * 2, this.size * 2);
    } else {
      noStroke();
      fill('#ffff00');
      rect(this.x - this.size, this.y - this.size, this.size * 2, this.size * 2);
    }

    // Draw health bar
    let barWidth = 30;
    let healthPercent = this.health / 8;
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

  fire(enemies) {
    const rowY = getSwordRowCenterY(this);
    for (let enemy of enemies) {
      if (abs(enemy.y - rowY) <= 45) {
        enemy.takeDamage(enemy.health);
        enemy.alive = false;
      }
    }

    if (window.gm && Array.isArray(window.gm.towers)) {
      for (let tower of window.gm.towers) {
        if (!tower || !tower.alive) continue;
        if (abs(getTowerRowCenterY(tower) - rowY) <= 10) {
          tower.alive = false;
        }
      }
    }

    this.health = 0;
    this.alive = false;
  }
}

class KnifeTrap extends SwordTower {}

class wallTower extends GameObject {
  constructor(x, y, size) {
    super(x, y, size || 45);
    this.image = typeof wallImg !== 'undefined' ? wallImg : null;
    this.health = 20;
    this.alive = true;
    this.cost = 1000; // Cost of the wall tower
  }
  update() {
    // Walls don't do anything, just sit there and block enemies
  }

  draw() {
    if (this.image) {
      image(this.image, this.x - this.size, this.y - this.size, this.size * 2, this.size * 2);
    } else {
      noStroke();
      fill('#888888');
      rect(this.x - this.size, this.y - this.size, this.size * 2, this.size * 2);
    }

    // Draw health bar
    let barWidth = 30;
    let healthPercent = this.health / 20;
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
}
