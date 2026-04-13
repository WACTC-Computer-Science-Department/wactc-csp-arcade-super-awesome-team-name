// ============================================
// GAME LOOP — Modify with care!
// Creates the GameManager and runs the loop.
// ============================================

let gm;  // GameManager instance

function preload() {
  loadAssets();
}

function setup() {
  createCanvas(1000, 400);
  noCursor();
  textFont('monospace');
  window.gm = new GameManager();
}

function draw() {
  if (window.gm.gameState === 'playing') {
    // Use background image when playing
    if (typeof backgroundImg !== 'undefined') {
      image(backgroundImg, 0, 0, width, height);
    } else {
      background('#1a1a2e');
    }
  } else {
    background('#1a1a2e');
  }

  if (window.gm.gameState === 'menu') {
    drawMenu(window.gm);
  } else if (window.gm.gameState === 'playing') {
    window.gm.update();
    window.gm.draw();
    drawHUD(window.gm);
  } else if (window.gm.gameState === 'gameover') {
    drawGameOver(window.gm);
  } else if (window.gm.gameState === 'victory') {
    drawVictory(window.gm);
  }
}

function mousePressed() {
  if (window.gm && window.gm.gameState === 'playing' && window.gm.player && window.gm.player.heldTower) {
    window.gm.placeTower(window.gm.player.heldTower, mouseX, mouseY);
  }
}

function keyPressed() {
  if (window.gm.gameState === 'menu' && (keyCode === 32 || keyCode === 13)) {
    window.gm.startGame();
    return;
  }

  if ((window.gm.gameState === 'gameover' || window.gm.gameState === 'victory') && (key === 'r' || key === 'R')) {
    window.gm.gameState = 'menu';
    return;
  }

  if (window.gm.gameState !== 'playing' || !window.gm.player) {
    return;
  }

  if (key === '1' || keyCode === 49) {
    window.gm.player.heldTower = 'sniper';
  } else if (key === '2' || keyCode === 50) {
    window.gm.player.heldTower = 'pistol';
  } else if (key === '4' || keyCode === 52) {
    window.gm.player.heldTower = 'wall';
  } else if (key === '5' || keyCode === 53) {
    window.gm.player.heldTower = 'bigMoney';
  } else if (key === 'Escape') {
    window.gm.player.heldTower = null;
  }
}


