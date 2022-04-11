var spaceShip, spaceShipimg
var UFO
var spaceimg
var space
var meteor
var meteorImg
var meteorGroup
var laser, laserImg
var laserGroup
var blast, blastImg
var score = 0
var lives = 3
var PLAY = 1
var END = 0
var gameState = PLAY

function preload() {
  spaceimg = loadImage("space.png");
  spaceShipimg = loadImage("SpaceShip.gif");
  meteorImg = loadImage("Meteor.gif");
  laserImg = loadImage("laser_bullet.png");
  blastImg = loadImage("blast.gif");
}

function setup() {
  createCanvas(1200, 800);
  space = createSprite(500, 350);
  space.addImage(spaceimg);
  space.velocityX = -10
  spaceShip = createSprite(200, 400, 50, 50)
  spaceShip.addImage(spaceShipimg)
  spaceShip.scale = 0.35
  meteorGroup = new Group()
  laserGroup = new Group()

  rectMode(CENTER);

}

function draw() {
  background(51);

  if (gameState === PLAY) {
    if (space.x <= 300) {
      space.x = space.width / 2
    }
    if (keyDown(UP_ARROW)) {
      spaceShip.y = spaceShip.y - 10
    }
    if (keyDown(DOWN_ARROW)) {
      spaceShip.y = spaceShip.y + 10
    }
    if (keyDown("space")) {
      laser = createSprite(spaceShip.x, spaceShip.y, 2, 5)
      laser.addImage(laserImg)
      laser.velocityX = 20
      laser.scale = 0.1
      laser.lifetime = 1200
      laserGroup.add(laser)
    }
    if (meteorGroup.isTouching(laserGroup)) {
      //meteor.changeImage("blast",blastImg)
      score = score + 5
      meteorGroup.destroyEach()
    }
    if (meteorGroup.isTouching(spaceShip)) {
      lives = lives - 1
    }
    if (lives < 1) {
      gameState = END
    }
    spawnMeteors();
    drawSprites();
  } else {
    textSize(30)
    text("GAME OVER", 550, 400)
  }
  
  text("SCORE:" + score, 50, 50)
  text("LIVES:" + lives, 250, 50)
}

function spawnMeteors() {
  if (frameCount % 60 === 0) {
    meteor = createSprite(1200, 100, 40, 10);
    meteor.y = Math.round(random(10, 750));
    meteor.addImage(meteorImg);
    meteor.scale = 1;
    meteor.velocityX = -15;

    meteor.lifetime = 1500;

    meteor.depth = spaceShip.depth;
    spaceShip.depth = spaceShip.depth + 1;

    meteorGroup.add(meteor);
  }
}

