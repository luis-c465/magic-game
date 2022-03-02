/// <reference types="p5/global" />
// p5.play.js does not have a type declarations file which is needed for intellisense
// /// <reference path="lib/p5.play.js" />

//Creating sprite using sprite sheets for animation

let rotation = 1;

let playerGroup;
let aimingAt = [0, 0];
let playerCannonRotation = 0;
let playerTankCannonDefaultAnimation;

let playerTankCannon;

var mouse_moved = false;
var touch_started = false;
var explode_sprite_sheet;
let playerSpriteSheet;
var tile_sprite_sheet;
var explode_sprite;
var player_walk;
var player_stand;
var playerTankSprite;

// console.log("sus");

// Normally you would put this in a .json file, but I'm putting it here
// for example purposes
const player_frames = [
  { name: "player_walk01", frame: { x: 0, y: 0, width: 70, height: 94 } },
  { name: "player_walk02", frame: { x: 71, y: 0, width: 70, height: 94 } },
  { name: "player_walk03", frame: { x: 142, y: 0, width: 70, height: 94 } },
  { name: "player_walk04", frame: { x: 0, y: 95, width: 70, height: 94 } },
  { name: "player_walk05", frame: { x: 71, y: 95, width: 70, height: 94 } },
  { name: "player_walk06", frame: { x: 142, y: 95, width: 70, height: 94 } },
  { name: "player_walk07", frame: { x: 213, y: 0, width: 70, height: 94 } },
  { name: "player_walk08", frame: { x: 284, y: 0, width: 70, height: 94 } },
  { name: "player_walk09", frame: { x: 213, y: 95, width: 70, height: 94 } },
  { name: "player_walk10", frame: { x: 355, y: 0, width: 70, height: 94 } },
  { name: "player_walk11", frame: { x: 284, y: 95, width: 70, height: 94 } },
];

function preload() {
  //
  //  There are two different ways to load a SpriteSheet
  //     1. Given width, height that will be used for every frame and the
  //        number of frames to cycle through. The sprite sheet must have a
  //        uniform grid with consistent rows and columns.
  //     2. Given an array of frame objects that define the position and
  //        dimensions of each frame.  This is Flexible because you can use
  //        sprite sheets that don't have uniform rows and columns.
  //
  //    Below demonstrates both methods:

  // Load the explode sprite sheet using frame width, height and number of frames
  // explode_sprite_sheet = loadSpriteSheet(
  //   "assets/explode_sprite_sheet.png",
  //   171,
  //   158,
  //   11
  // );

  // Load player sprite sheet from frames array
  // playerSpriteSheet = loadSpriteSheet("assets/tanks.png", player_frames);

  // Player walk animation passing in a SpriteSheet
  // player_walk = loadAnimation(playerSpriteSheet);

  // An animation with a single frame for standing
  player_stand = loadAnimation(
    new SpriteSheet("assets/tanks.png", [
      {
        name: "stand",
        frame: { x: 123, y: 11, width: 80, height: 89 },
      },
    ])
  );

  playerTankCannonDefaultAnimation = loadAnimation(
    new SpriteSheet("assets/tanks.png", [
      {
        name: "stand",
        frame: { x: 79, y: 0, width: 40, height: 76 },
      },
    ])
  );
}

function setup() {
  angleMode(DEGREES);

  playerGroup = new Group();

  playerTankSprite = createSprite(100, 284, 70, 94);
  // player_sprite.addAnimation("walk", player_walk);
  playerTankSprite.addAnimation("stand", player_stand);
  playerGroup.add(playerTankSprite);

  playerTankCannon = createSprite(100, 284, 70, 94);
  playerTankCannon.addAnimation("default", playerTankCannonDefaultAnimation);

  createCanvas(800, 400);
}

function draw() {
  clear();
  background(255);

  // var eventX;
  // if (isTouch()) {
  //   eventX = touchX;
  // } else {
  //   eventX = mouseX;
  // }

  let isMoving = false;
  if (keyIsDown(LEFT_ARROW)) {
    // playerTankSprite.x += 10;
    playerTankSprite.velocity.x = -2;
    isMoving = true;
  }
  if (keyIsDown(RIGHT_ARROW)) {
    // playerTankSprite.x -= 10;
    playerTankSprite.velocity.x = 2;
    isMoving = true;
  }
  if (keyIsDown(UP_ARROW)) {
    playerTankSprite.velocity.y = -2;
    isMoving = true;
  }
  if (keyIsDown(DOWN_ARROW)) {
    playerTankSprite.velocity.y = 2;
    isMoving = true;
  }

  if (isMoving) {
    // playerTankCannon.attractionPoint(
    //   1,
    //   playerTankSprite.position.x - 5,
    //   playerTankSprite.position.y - 5
    // );
    playerTankCannon.position.x = playerTankSprite.position.x - 1;
    playerTankCannon.position.y = playerTankSprite.position.y - 5;
  }

  if (!isMoving) {
    playerTankSprite.velocity.x = 0;
    playerTankSprite.velocity.y = 0;
  }

  if (mouse_moved) {
    // const rotation = playerTankCannon.position.angleBetween(mouseVector);
    const rotation = atan2(
      mouseY - playerTankCannon.position.y,
      mouseX - playerTankCannon.position.x
    );
    // const rotation = mouseVector.angleBetween(playerTankCannon.position);
    playerTankCannon.rotation = rotation + 90;
  }
  // playerTankCannon.setSpeed(5, rotation++);
  // playerTankCannon.rotation += rotation++;

  //if mouse is to the left
  // if (eventX < playerTankSprite.position.x - 10) {
  //   // player_sprite.changeAnimation("walk");
  //   // flip horizontally
  //   // player_sprite.mirrorX(-1);
  //   // move left
  //   playerTankSprite.velocity.x = -2;
  // } else if (eventX > playerTankSprite.position.x + 10) {
  //   // player_sprite.changeAnimation("walk");
  //   // flip horizontally
  //   // player_sprite.mirrorX(1);
  //   // move right
  //   playerTankSprite.velocity.x = 2;
  // } else {
  //   playerTankSprite.changeAnimation("stand");
  //   //if close to the mouse, don't move
  //   playerTankSprite.velocity.x = 0;
  // }

  //draw the sprite
  drawSprites();
}

function touchStarted() {
  touch_started = true;
}

function mouseMoved() {
  mouse_moved = true;
}

function isTouch() {
  return touch_started && !mouse_moved;
}

function updateAiming() {
  aimingAt = [mouseX, mouseY];
}
