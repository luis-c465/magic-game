// Adds references to global p5.js functions
/// <reference types="p5/global" />

let player;

// // p5.js does'nt work when using Javascript ES6 modules so this launches p5.js in "instance mode"
// // read more here https://p5js.org/reference/#/p5/p5
// new p5((p5) => {
//   p5.preload = () => {
//     // Preload things here
//   };

//   p5.setup = () => {
//     p5.angleMode(p5.DEGREES);

//     player = new Player(p5);

//     // FIXME: Will not update canvas size when user resizes browser window!
//     p5.createCanvas(p5.windowWidth, p5.windowHeight);
//   };

//   p5.draw = () => {
//     p5.clear();
//     p5.background(255);

//     player.loop();

//     p5.drawSprites();
//   };

//   p5.mouseDragged = () => {
//     player.mouseDragged();
//   };
// });

function setup() {
  angleMode(DEGREES);

  player = new Player(p5);

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
