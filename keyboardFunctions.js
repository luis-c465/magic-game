/**
 * This file is where p5 functions using keyboard and mouse are to be added
 *
 * Note: you can still use `mouseX` and `mouseY` along with `keyPressed` and other mouse and keyboard
 * variables in classes though it is not advised since it may cause crashes.
 * Instead pass these variables into methods as parameters and use mouseX, mouseY, keyPressed, ect in these functions
 */

function mouseMoved() {
  //
}

function keyPressed() {
  //
}

function mouseDragged() {
  // Calls mouseDragged function for each player in player layer
  // Allows for multiple players to exist at the same time
  playerLayer.objects.forEach((player) => {
    player.mouseDragged();
  });
}

function keyTyped() {
  //
}
