// ============================================
// UI — Your name here!
// Draws menus, HUD, and game over screen.
// Uses the game manager for data.
// ============================================

function drawMenu(gm) {
  fill('#ffffff');
  textAlign(CENTER, CENTER);
  textSize(32);
  text('John Grace\'s Airsoft Weapons VS Scherm\'s Evil Balloons', width / 2, height / 3);
  textSize(16);
  text('Press SPACE or ENTER to start', width / 2, height / 2);
  
  if (gm.highScore > 0) {
    text('High Score: ' + gm.highScore, width / 2, height * 2 / 3);
  }

  // TODO: Add instructions, credits, game art, etc.
}

function drawHUD(gm) {
  
  fill(0, 0, 0, 150); 
  noStroke();
  rect(5, 5, 200, 85); 
  
  fill('#ffffff');
  textAlign(LEFT, TOP);
  textSize(14);
  text('Score: ' + gm.score, 10, 10);
  text('Wave: ' + gm.wave + '/8', 10, 30);
  text('Enemies: ' + gm.enemies.length, 10, 50);
  
  // Show prep time or wave state
  if (gm.waveState === 'prep') {
    let secondsLeft = ceil((gm.prepDuration - gm.prepTimer) / 60);
    text('Prep Time: ' + secondsLeft + 's', 10, 70);
  } else if (gm.waveState === 'spawning') {
    text('State: Spawning...', 10, 70);
  }

  // TODO: Add more HUD elements
  // Ideas: health bar, minimap, wave progress, combo counter
}

function drawGameOver(gm) {
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
