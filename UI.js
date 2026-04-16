// ============================================
// UI — Your name here!
// Draws menus, HUD, and game over screen.
// Uses the game manager for data.
// ============================================

function drawMenu(gm) {
  if (menuImg) {
    push();
    imageMode(CENTER);
    image(menuImg, width / 2, height / 2, width, height);
    pop();
  } else {
    background('#1a1a2e');
  }

  fill(0, 0, 0, 180);
  noStroke();
  rect(width * 0.1, height * 0.22, width * 0.8, height * 0.50, 20);

  fill('#ffffff');
  textAlign(CENTER, CENTER);
  textSize(25);
  text('John Grace\'s Airsoft Weapons VS Scherm\'s Evil Balloons', width / 2, height / 3);
  textSize(18);
  text('Press SPACE or ENTER to start', width / 2, height / 2 + 40);
  
  if (gm.highScore > 0) {
    textSize(16);
    text('High Score: ' + gm.highScore, width / 2, height * 2 / 3 + 10);
  }
}

function drawHUD(gm) {
  
  fill(0, 0, 0, 170); 
  noStroke();
  rect(5, 5, 240, 175, 12); 
  
  fill('#ffffff');
  textAlign(LEFT, TOP);
  textSize(14);
  text('Score: ' + gm.score, 10, 10);
  text('Money: $' + gm.money, 10, 30);
  text('Wave: ' + gm.wave + '/8', 10, 50);
  text('Enemies: ' + gm.enemies.length, 10, 70);
  
  // Show prep time or wave state
  if (gm.waveState === 'prep') {
    let secondsLeft = ceil((gm.prepDuration - gm.prepTimer) / 60);
    text('Prep Time: ' + secondsLeft + 's', 10, 90);
  } else if (gm.waveState === 'spawning') {
    text('State: Spawning...', 10, 90);
  }

  const selectedTower = gm.player && gm.player.heldTower ? gm.player.heldTower : 'None';
  text('Selected: ' + selectedTower, 10, 110);
  textSize(12);
  text('Items: 1=Sniper $50   2=Pistol $25', 10, 130);
  text('       4=Wall $1000     5=Money $100', 10, 148);
  text('Click to place.', 10, 166);

  // TODO: Add more HUD elements
  // Ideas: health bar, minimap, wave progress, combo counter
}

function drawGameOver(gm) {
  if (gameOverImg) {
    push();
    imageMode(CENTER);
    image(gameOverImg, width / 2, height / 2, width, height);
    pop();
  } else {
    background('#1a1a2e');
  }

  fill(0, 0, 0, 200);
  noStroke();
  rect(width * 0.1, height * 0.2, width * 0.8, height * 0.5, 20);

  fill('#ffffff');
  textAlign(CENTER, CENTER);
  textSize(32);
  text('GAME OVER', width / 2, height / 3);
  textSize(20);
  text('Score: ' + gm.score, width / 2, height / 2 - 15);
  text('Wave: ' + gm.wave, width / 2, height / 2 + 15);
  textSize(14);
  text('Press R to return to menu', width / 2, height * 2 / 3);

  // TODO: Add game over art, stats summary, etc.
}

function drawVictory(gm) {
  fill('#ffffff');
  textAlign(CENTER, CENTER);
  textSize(40);
  text('VICTORY!', width / 2, height / 3 - 20);
  textSize(24);
  text('You defeated Scherm\'s Evil Balloons!', width / 2, height / 3 + 20);
  textSize(20);
  text('Final Score: ' + gm.score, width / 2, height / 2);
  textSize(14);
  text('Press R to return to menu', width / 2, height * 2 / 3);
}
