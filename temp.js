const BULLET_SPEED = 5;

let player;
let bullet;
function setup() {
  createCanvas(windowWidth, windowHeight);

  bullet = {
    damage: 20,
  };
  player = {
    pos: createVector(width / 2, height / 2),

    //default
    health: 100,
  };
}

function draw() {
  background(220);

  stroke(0);

  // By taking the difference between the vector pointing to the mouse and the
  // vector pointing to the player we get a vector from the player to the mouse.
  let mouseDir = createVector(mouseX, mouseY).sub(player.pos);
  // Limit the length to display an indicator of the bullet direction
  mouseDir.setMag(30);
  // Because we want to draw a line to the point mouseDir offset away from
  // player, we'll need to add mouseDir and player pos. Do so using the static
  // function so that we don't modify either one.
  let dirOffset = p5.Vector.add(player.pos, mouseDir);

  // direction indicator
  line(player.pos.x, player.pos.y, dirOffset.x, dirOffset.y);
  fill("gray");
  ellipse(dirOffset.x, dirOffset.y, 10, 10);

  //player
  fill("green");
  ellipse(player.pos.x, player.pos.y, 20, 20);

  if (keyIsDown(87)) {
    player.pos.y -= 2;
  }
  if (keyIsDown(83)) {
    player.pos.y += 2;
  }
  if (keyIsDown(65)) {
    player.pos.x -= 2;
  }
  if (keyIsDown(68)) {
    player.pos.x += 2;
  }

  //Create bullet
  if (mouseIsPressed) {
    // Notice there can be only one bullet on the screen at a time, but there's
    // no reason you couldn't create multiple bullets and add them to an array.
    // However, if you did, you might want to create bullets in a mouseClicked()
    // function instead of in draw() lets you create too many bullets at a time.
    bullet.firing = true;
    // Save the direction of the mouse;
    bullet.dir = mouseDir;
    // Adjust the bullet speed
    bullet.dir.setMag(BULLET_SPEED);
    // Position the bullet  at/near the player
    bullet.initialPos = dirOffset;
    // Make a copy so that initialPos stays fixed when pos gets updated
    bullet.pos = bullet.initialPos.copy();
    //Shoots bullet
  }

  if (bullet.firing) {
    fill("yellow");
    ellipse(bullet.pos.x, bullet.pos.y, 5, 5);

    // move the bullet
    bullet.pos.add(bullet.dir);

    if (bullet.pos.dist(bullet.initialPos) > 500) {
      bullet.firing = false;
    }
  }
}
