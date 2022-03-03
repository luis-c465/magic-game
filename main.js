/// <reference types="p5/global" />

import Player from "./Player.js";

let player;

new p5((p5) => {
  p5.preload = () => {
    // Preload things here
  };

  p5.setup = () => {
    p5.angleMode(p5.DEGREES);

    player = new Player(p5);

    // FIXME: Will not update canvas size when user resizes browser window!
    p5.createCanvas(p5.windowWidth, p5.windowHeight);
  };

  p5.draw = () => {
    p5.clear();
    p5.background(255);

    player.loop();

    p5.drawSprites();
  };

  p5.mouseDragged = () => {
    player.mouseDragged();
  };
});
