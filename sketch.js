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
  textFont('monospace');
  window.gm = new GameManager();
}

function draw() {
  background('#1a1a2e');

  if (window.gm.gameState === 'menu') {
    drawMenu(window.gm);
  } else if (window.gm.gameState === 'playing') {
    window.gm.update();
    window.gm.draw();
    drawHUD(window.gm);
  } else if (window.gm.gameState === 'gameover') {
    drawGameOver(window.gm);
  }
}

function keyPressed() {
  if (window.gm.gameState === 'menu' && (key === ' ' || keyCode === ENTER)) {
    window.gm.startGame();
  } else if (window.gm.gameState === 'gameover' && (key === 'r' || key === 'R')) {
    window.gm.gameState = 'menu';
  }
  // TODO: Add game-specific key controls
  // Example: if (key === ' ' && gm.gameState === 'playing') { gm.playerShoot(mouseX, mouseY); }
  if (keyIsDown("1") || keyIsDown(49)) window.gm.heldTower = "sniper";
  if (keyIsDown("2") || keyIsDown(50)) window.gm.heldTower = "pistol";
  if (keyIsDown("3") || keyIsDown(51)) window.gm.heldTower = "knife";
  if (keyIsDown("4") || keyIsDown(52)) window.gm.heldTower = "wall";
  if (keyIsDown("5") || keyIsDown(53)) window.gm.heldTower = "bigMoney";

}

function mousePressed() {
  if (window.gm.gameState === 'playing') {
    window.gm.playerShoot(mouseX, mouseY);
  }
}
