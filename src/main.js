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

/** @type {Layer<MachineGunEnemy>} */
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

const CANVAS_WIDTH = 1600;
const CANVAS_HEIGHT = 900;

const KEY_CODES = {
  1: 49,
  2: 50,
  3: 51,
  4: 52,
  5: 53,
  6: 54,
  7: 55,
  8: 56,
  9: 56,
  w: 87,
  a: 65,
  s: 83,
  d: 68,
};

/**
 * Function called before setup
 * Should be used to preload sprites that are used multiple times like Bullet.js bullet sprite
 */
function preload() {
  // Load images
  /**
   * Image made by Eva
   */
  images.player = loadImage("assets/player.png");
  images.tanks = loadImage("assets/tanks.png");
  images.bullet = loadImage("assets/bullet.png");

  images.iceWand = loadImage("assets/ice-wand.png", (img) => {
    img.resize(50, 50);
  });
  images.fireWand = loadImage("assets/fire-wand.png", (img) => {
    img.resize(50, 50);
  });
  images.reflectWand = loadImage("assets/reflect-wand.png", (img) => {
    img.resize(50, 50);
  });

  images.iceBullet = loadImage("assets/ice-bullet.png");
  images.fireBullet = loadImage("assets/fire-bullet.png");

  // Load levels
  levels[1] = loadJSON("assets/level1.json");
}

function setup() {
  angleMode(DEGREES);

  new Player(playerLayer, 250, 250);

  // new IndestructibleWall(wallsLayer, 500, 500);
  // new DestructibleWall(wallsLayer, 500, 400);

  const spawnEnemies = () => {
    const player = playerLayer.objects[0];

    new MachineGunEnemy(enemiesLayer, ...player.getValidEnemyLocation());
    new BrokenEnemy(enemiesLayer, ...player.getValidEnemyLocation());
  };

  spawnEnemies();
  setInterval(spawnEnemies, 10_000);

  new Level(1);

  // FIXME: Will not update canvas size when user resizes browser window!
  createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
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
 * Consider moving `preUpdate` in `GameObject` to being called in this method
 */
function fixedUpdate() {
  //
}

/**
 * Updates game objects
 */
function generalUpdate() {
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
  // Clears the screen of old sprites
  // Fixes bug with old sprites not being cleared after being displayed again
  clear();

  // The order in which layers are drawn to the screen
  playerLayer.display();
  wandsLayer.display();
  wallsLayer.display();
  enemiesLayer.display();
  bulletsLayer.display();
}
