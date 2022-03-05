// Adds references to global p5.js functions
/// <reference types="p5/global" />

// JSDoc type declarations (adds intellisense and autocompletion)

/** @type {Player} */
var player;

/** @type {TestEnemy} */
var testEnemy;

// var objLayer;

/** @type {Array<Bullet>} */
var bullets = [];

/** @type {Array<Wall>} */
var walls = [];

/** @type {Object.<string, Image>} */
var images = {};

/**
 * Function called before setup
 * Should be used to preload sprites that are used multiple times like Bullet.js bullet sprite
 */
function preload() {
  /**
   * TODO: Preload bullet sprite
   * Currently ever time a new bullet is created is requests the bullet sprite image from the server
   * which may cause performance problems when playing on a mobile device or on poor internet connection
   */

  images.tanks = loadImage("assets/tanks.png");
  images.bullet = loadImage("assets/bullet.png");
  images.iceWand = loadImage("assets/ice-wand.png");
  images.iceBullet = loadImage("assets/ice-bullet.png");

  images.iceWand.resize(50, 50);
}

function setup() {
  angleMode(DEGREES);

  player = new Player();
  testEnemy = new TestEnemy();
  walls.push(new Wall(500, 500));
  // objLayer = new GameLayer();

  // FIXME: Will not update canvas size when user resizes browser window!
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  clear();
  background(255);

  player.update();
  testEnemy.update();
  bullets.forEach((bullet) => bullet.update());
  walls.forEach((wall) => wall.update());

  drawSprites();
}

function mouseDragged() {
  player.mouseDragged();
}
