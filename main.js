// Adds references to global p5.js functions
/// <reference types="p5/global" />

/** @type {Player} */
var player;

// var objLayer;

/** @type {Array<Bullet>} */
var bullets = [];

/** @type {Array<Wall>} */
var walls = [];

/**
 * Function called before setup
 * Should be used to preload sprites that are used multiple times like Bullet.js bullet sprite
 */
function preLoad() {
  /**
   * TODO: Preload bullet sprite
   * Currently ever time a new bullet is created is requests the bullet sprite image from the server
   * which may cause performance problems when playing on a mobile device or on poor internet connection
   */
}

function setup() {
  angleMode(DEGREES);

  player = new Player();
  walls.push(new IndestructibleWall(500, 500));
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
