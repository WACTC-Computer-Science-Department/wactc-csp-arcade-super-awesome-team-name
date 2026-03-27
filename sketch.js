// ============================================
// GAME LOOP — Modify with care!
// Creates the GameManager and runs the loop.
// ============================================

let gm;  // GameManager instance

function setup() {
  createCanvas(800, 600);
  textFont('monospace');
  gm = new GameManager();
}

function draw() {
  background('#1a1a2e');

  if (gm.gameState === 'menu') {
    drawMenu(gm);
  } else if (gm.gameState === 'playing') {
    gm.update();
    gm.draw();
    drawHUD(gm);
  } else if (gm.gameState === 'gameover') {
    drawGameOver(gm);
  }
}

function keyPressed() {
  if (gm.gameState === 'menu' && (key === ' ' || keyCode === ENTER)) {
    gm.startGame();
  } else if (gm.gameState === 'gameover' && (key === 'r' || key === 'R')) {
    gm.gameState = 'menu';
  }
  // TODO: Add game-specific key controls
  // Example: if (key === ' ' && gm.gameState === 'playing') { gm.playerShoot(mouseX, mouseY); }
  if (keyIsDown("1") || keyIsDown(49)) this.heldTower = "sniper";
    if (keyIsDown("2") || keyIsDown(50)) this.heldTower = "pistol";
    if (keyIsDown("3") || keyIsDown(51)) this.heldTower = "knife";
    if (keyIsDown("4") || keyIsDown(52)) this.heldTower = "wall";
    if (keyIsDown("5") || keyIsDown(53)) this.heldTower = "bigMoney";
    

}

function mousePressed() {
  if (gm.gameState === 'playing') {
    gm.playerShoot(mouseX, mouseY);
  }
}
