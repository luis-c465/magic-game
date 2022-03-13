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

/** @type {Player} */
var player;

/**
 * Time between increasing the difficulty of the game
 *  @type {number}
 */
var increaseDifficultlyTimer = 10_000;

/** @type {number} */
var increaseDifficultyTimerId;

/** @type {number} @default 1 */
var gameDifficulty = 1;

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
  space: 32,
  tab: 192,
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

  /**
   * @param {number} n
   * @param {boolean} proportionally
   */
  const resizeTo = (n, proportionally) => {
    return (img) => {
      if (!proportionally) {
        return img.resize(n, n);
      }
      img.resize(n, 0);
    };
  };

  images.player = loadImage("assets/player.png");
  images.tanks = loadImage("assets/tanks.png");

  images.iceWand = loadImage("assets/ice-wand.png", (img) => {
    img.resize(50, 50);
  });
  images.fireWand = loadImage("assets/fire-wand.png", (img) => {
    img.resize(50, 50);
  });
  images.reflectWand = loadImage("assets/reflect-wand.png", (img) => {
    img.resize(50, 50);
  });
  // TODO: Add and load dirWand

  const BULLET_SIZE = 150;
  images.bullet = loadImage("assets/bullet.png", resizeTo(BULLET_SIZE, true));
  images.iceBullet = loadImage(
    "assets/ice-bullet.png",
    resizeTo(BULLET_SIZE, true)
  );
  images.fireBullet = loadImage(
    "assets/fire-bullet.png",
    resizeTo(BULLET_SIZE, true)
  );

  // Load icons
  const ICON_SIZE = 30;
  images.reflect = loadImage("assets/reflect.png", resizeTo(ICON_SIZE));
  images.snowFlake = loadImage("assets/snowFlake.png", resizeTo(ICON_SIZE));
  images.fire = loadImage("assets/fire.png", resizeTo(ICON_SIZE));
  images.mouse = loadImage("assets/mouse.png", resizeTo(ICON_SIZE));

  // Load levels
  levels[1] = loadJSON("assets/level1.json");
}

function setup() {
  angleMode(DEGREES);

  setupGame();

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

  // If player is set to be deleted
  if (player.deleteCheck) {
    showGameOverScreen();
  }
}

function showGameOverScreen() {
  const width = 500;
  const height = CANVAS_HEIGHT - 200;

  const middleX = CANVAS_WIDTH / 2;
  const middleY = CANVAS_HEIGHT / 2;

  // Background
  noStroke();
  fill(color(0, 100));
  rect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

  // Middle section
  rectMode(CENTER);

  fill(color(255, 255));
  rect(CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2, width, height, 20);

  stroke("black");
  strokeWeight(10);

  textSize(100);
  text("You died", middleX - 200, middleY);

  textSize(20);
  strokeWeight(3);
  text("Press <Space> to restart the game", middleX - 150, middleY + 200);

  rectMode(CORNER);

  if (keyIsDown(KEY_CODES.space)) {
    deleteGame();
    setupGame();
  }
}

function setupGame() {
  player = new Player(playerLayer, 250, 250);

  // new IndestructibleWall(wallsLayer, 500, 500);
  // new DestructibleWall(wallsLayer, 500, 400);

  increaseDifficulty();

  new Level(1);
}

function deleteGame() {
  playerLayer.deleteAll();
  bulletsLayer.deleteAll();
  wallsLayer.deleteAll();
  wandsLayer.deleteAll();
  enemiesLayer.deleteAll();

  gameDifficulty = 1;
  increaseDifficultlyTimer = 10_000;
  clearTimeout(increaseDifficultyTimerId);
}

function increaseDifficulty() {
  switch (true) {
    case 1 <= gameDifficulty && gameDifficulty < 3:
      BrokenEnemy.spawnInValidLocation();
      break;

    case 3 <= gameDifficulty && gameDifficulty < 10:
      MachineGunEnemy.spawnInValidLocation();
      break;

    case 10 <= gameDifficulty && gameDifficulty < 15:
      BrokenEnemy.spawnInValidLocation();
      CreeperEnemy.spawnInValidLocation();
      break;

    default:
      const num = random(100);
      if (33 >= num) {
        BrokenEnemy.spawnInValidLocation();
      } else if (66 >= num) {
        MachineGunEnemy.spawnInValidLocation();
      } else {
        CreeperEnemy.spawnInValidLocation();
      }
  }

  // new MachineGunEnemy(enemiesLayer, ...player.getValidEnemyLocation());
  // new BrokenEnemy(enemiesLayer, ...player.getValidEnemyLocation());
  // new CreeperEnemy(enemiesLayer, ...player.getValidEnemyLocation());

  gameDifficulty++;
  increaseDifficultlyTimer = max(
    increaseDifficultlyTimer - gameDifficulty * 50,
    500
  );

  increaseDifficultyTimerId = setTimeout(
    increaseDifficulty,
    increaseDifficultlyTimer
  );
}
