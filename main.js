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

    p5.createCanvas(800, 400);
  };

  p5.draw = () => {
    p5.clear();
    p5.background(255);

    player.loop();

    p5.drawSprites();
  };

  p5.mouseMoved = () => {
    player.mouseMoved();
  };
});
