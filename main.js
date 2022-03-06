// Adds references to global p5.js functions
/// <reference types="p5/global" />

/** @type {GameLayer<Player>} */
var playerLayer = new Layer();

/** @type {GameLayer<Bullet>} */
var bulletsLayer = new Layer();

/** @type {GameLayer<Wall>} */
var wallsLayer = new Layer();

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

  // playerLayer = new Layer();
  // bulletsLayer = new Layer();
  // wallsLayer = new Layer();

  new Player(playerLayer, 250, 250);

  new IndestructibleWall(wallsLayer, 500, 500);
  new DestructibleWall(wallsLayer, 500, 400);
  // walls.push(
  //   new IndestructibleWall(playerLayer, 500, 500),
  //   new DestructibleWall(playerLayer, 500, 400)
  // );
  // objLayer = new GameLayer();

  // FIXME: Will not update canvas size when user resizes browser window!
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  // background(255);

  // player.update();
  // bullets.forEach((bullet) => bullet.update());
  // walls.forEach((wall) => wall.update());

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
