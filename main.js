// Adds references to global p5.js functions
/// <reference types="p5/global" />

/** @type {Player} */
var player;

/** @type {GameLayer} */
var gameLayer;

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

  gameLayer = new GameLayer();

  player = new Player(gameLayer, 250, 250);
  walls.push(
    new IndestructibleWall(gameLayer, 500, 500),
    new DestructibleWall(gameLayer, 500, 400)
  );
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

  gameLayer.update();
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
  gameLayer.display();

  drawSprites();
}
