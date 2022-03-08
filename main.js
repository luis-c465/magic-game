// Adds references to global p5.js functions
/// <reference types="p5/global" />

/** @type {Layer<Player>} */
var playerLayer = new Layer();

/** @type {Layer<Wand>} */
var wandsLayer = new Layer();

/** @type {Layer<Bullet>} */
var bulletsLayer = new Layer();

/** @type {Layer<Wall>} */
var wallsLayer = new Layer();

/** @type {Layer<TestEnemy>} */
var enemiesLayer = new Layer();

/** @type {Object.<string, Image>} */
var images = {};

/** @type {Object.<number, levelJSON} */
var levels = {};

/**
 * Used to scale the canvas to fit the screen
 * @type {number} @default 1
 */
var canvasScale = 1;

/**
 * Function called before setup
 * Should be used to preload sprites that are used multiple times like Bullet.js bullet sprite
 */
function preload() {
  // Load images
  images.tanks = loadImage("assets/tanks.png");
  images.bullet = loadImage("assets/bullet.png");
  images.iceWand = loadImage("assets/ice-wand.png", (img) => {
    img.resize(50, 50);
  });
  images.iceBullet = loadImage("assets/ice-bullet.png");

  // Load levels
  levels[1] = loadJSON("assets/level1.json");
}

function setup() {
  angleMode(DEGREES);

  new Player(playerLayer, 250, 250);

  // new IndestructibleWall(wallsLayer, 500, 500);
  // new DestructibleWall(wallsLayer, 500, 400);

  new TestEnemy(enemiesLayer, 400, 400);

  new Level(1);

  // FIXME: Will not update canvas size when user resizes browser window!
  createCanvas(1600, 900);
}

function draw() {
  fixedUpdate();
  generalUpdate();
  lateUpdate();
  staticDisplay();
  generalDisplay();
}

/**
 * Calculates the physics of the game
 *
 * Used to tell the game how the layers should run.
 * Not so much used since update in each class should determine physics of the object.
 */
function fixedUpdate() {
  //
}

/**
 * Updates game objects
 */
function generalUpdate() {
  // Clears the screen of old sprites
  // Fixes bug with old sprites not being cleared after being displayed again
  clear();

  playerLayer.update();
  bulletsLayer.update();
  wallsLayer.update();
  wandsLayer.update();
  enemiesLayer.update();
}

/**
 * Calculates any after moments/anything else
 */
function lateUpdate() {
  //
}

/**
 * Displays non-changing elements of the game
 */
function staticDisplay() {
  background(255);
}

/**
 * Displays game objects
 */
function generalDisplay() {
  playerLayer.display();

  drawSprites();
}
