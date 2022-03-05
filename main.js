// Adds references to global p5.js functions
/// <reference types="p5/global" />

/** @type {Player} */
var player;

// var objLayer;

/** @type {Array<Bullet>} */
var bullets = [];

/** @type {Array<Wall>} */
var walls = [];

function setup() {
  angleMode(DEGREES);

  player = new Player();
  walls.push(new Wall(500, 500));
  // objLayer = new GameLayer();

  // FIXME: Will not update canvas size when user resizes browser window!
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  clear();
  background(255);

  player.update();
  bullets.forEach((bullet) => bullet.update());
  walls.forEach((wall) => wall.update());

  drawSprites();
}

function mouseDragged() {
  player.mouseDragged();
}
