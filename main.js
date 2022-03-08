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
  images.iceWand = loadImage("assets/ice-wand.png", (img) => {
    img.resize(50, 50);
  });
  images.iceBullet = loadImage("assets/ice-bullet.png");
}

function setup() {
  angleMode(DEGREES);

  new Player(playerLayer, 250, 250);

  new IndestructibleWall(wallsLayer, 500, 500);
  new DestructibleWall(wallsLayer, 500, 400);

  new TestEnemy(enemiesLayer, 400, 400);

  // FIXME: Will not update canvas size when user resizes browser window!
  createCanvas(windowWidth, windowHeight);
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
  console.log("Bullets", bulletsLayer.objects.length);
  console.log("Bullets", bulletsLayer.objects);
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
