// ============================================
// ASSETS — Load your images and sounds here!
// ============================================
// How to use:
// 1. Create an "assets" folder in your project
// 2. Put your image files in it (png, jpg, gif)
// 3. Load them below using loadImage()
// 4. Use them in your class draw() methods with image()
//
// Example:
//   let playerImg;        ← declare at the top
//   playerImg = loadImage('assets/player.png');  ← load in loadAssets()
//   image(playerImg, this.x, this.y, this.size, this.size);  ← draw in class
// ============================================

// Declare your image variables here
// let playerImg;
// let enemyImg;
// let bossImg;
// let projectileImg;
// let backgroundImg;
let swordImg, 
pistolImg, 
sniperImg, 
wallImg, 
smallMoneyImg, 
bigMoneyImg, 
basicBalloonImg, 
fastBalloonImg, 
coneBalloonImg, 
bucketBalloonImg,
schermBalloonImg,
backgroundImg,
gameOverImg,
menuImg,
cursorImg

function loadAssets() {
  // Load your images here — they'll be ready before the game starts
  swordImg = loadImage('assets/swordSprite.png');
  pistolImg = loadImage('assets/pistolSprite.png');
  sniperImg = loadImage('assets/sniperSprite.png');
  wallImg = loadImage('assets/wallSprite.png');
  smallMoneyImg = loadImage('assets/smallMoneySprite.png');
  bigMoneyImg = loadImage('assets/bigMoneySprite.png');
  basicBalloonImg = loadImage('assets/basicBalloonSprite.png');
  fastBalloonImg = loadImage('assets/fastBalloonSprite.png');
  coneBalloonImg = loadImage('assets/coneBalloonSprite.png');
  bucketBalloonImg = loadImage('assets/bucketBalloonSprite.png');
  schermBalloonImg = loadImage('assets/schermBalloonSprite.png');
  cursorImg = loadImage('assets/cursorSprite.png');
  // backgroundImg = loadImage('assets/backgroundSprite.png');  // Add if image exists
  // gameOverImg = loadImage('assets/gameOverSprite.png');  // Add if image exists
  // menuImg = loadImage('assets/menuSprite.png');  // Add if image exists
}
