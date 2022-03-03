// Adds references to global p5.js functions
/// <reference types="p5/global" />

var player;
var objLayer;
var bullets = [];

function setup() {
  angleMode(DEGREES);

  player = new Player();
  objLayer = new GameLayer();

  // FIXME: Will not update canvas size when user resizes browser window!
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  clear();
  background(255);

  player.update();

  drawSprites();
}

function mouseDragged() {
  player.mouseDragged();
}
