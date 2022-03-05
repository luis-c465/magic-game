class Player extends GameObject {
  constructor() {
    super();

    /** @type {IceWand} */
    this.iceWand = new IceWand();

    this.isMoving = false;
    this.movementSpeed = 2;
    this.bullets = [];
    this.rotation = 0;

    // Animations
    this.bodyAnimation = loadAnimation(
      new SpriteSheet(images.tanks, [
        {
          name: "stand",
          frame: { x: 123, y: 11, width: 80, height: 89 },
        },
      ])
    );
    this.cannonAnimation = loadAnimation(
      new SpriteSheet(images.tanks, [
        {
          name: "stand",
          frame: { x: 79, y: 0, width: 40, height: 76 },
        },
      ])
    );

    // Create sprites
    this.bodySprite = createSprite(100, 284, 70, 94);
    this.bodySprite.addAnimation("stand", this.bodyAnimation);
    this.sprites.push(this.bodySprite);

    this.cannonSprite = createSprite(100, 284, 70, 94);
    this.cannonSprite.addAnimation("default", this.cannonAnimation);
    this.sprites.push(this.cannonSprite);

    this.setup();
  }

  update() {
    this.isMoving = false;
    // this.bodySprite.addImage("bullet", images.bullet);
    // this.bodySprite.changeImage("bullet");

    // If any arrow keys are pressed move the character in that direction
    if (keyIsDown(LEFT_ARROW)) {
      this.bodySprite.velocity.x = -this.movementSpeed;
      this.isMoving = true;
    }
    if (keyIsDown(RIGHT_ARROW)) {
      this.bodySprite.velocity.x = this.movementSpeed;
      this.isMoving = true;
    }
    if (keyIsDown(UP_ARROW)) {
      this.bodySprite.velocity.y = -this.movementSpeed;
      this.isMoving = true;
    }
    if (keyIsDown(DOWN_ARROW)) {
      this.bodySprite.velocity.y = this.movementSpeed;
      this.isMoving = true;
    }

    if (this.isMoving) {
      this.cannonSprite.position.x = this.bodySprite.position.x - 1;
      this.cannonSprite.position.y = this.bodySprite.position.y - 5;

      this.iceWand.x = this.cannonSprite.position.x;
      this.iceWand.y = this.cannonSprite.position.x;
    }

    // If player is not moving (not arrow keys are pressed) set its velocity to zero
    if (!this.isMoving) {
      this.bodySprite.velocity.x = 0;
      this.bodySprite.velocity.y = 0;
    }

    // If mouse is pressed
    if (mouseIsPressed) {
      this.iceWand.cast();

      // // Do calculations for bullet position
      // const mouseVector = createVector(mouseX, mouseY).sub(
      //   this.bodySprite.position
      // );

      // const dirOffset = this.bodySprite.position.copy();
      // // dirOffset.add(this.bodySprite.position, mouseVector);
      // // dirOffset.x = this.bodySprite.position.x;
      // dirOffset.x += 50;

      // // Fire bullet
      // const bullet = new Bullet(dirOffset, mouseVector, this.rotation);
      // bullets.push(bullet);
    }

    // Loop through all bullets and call their loop function updating them
    this.iceWand.update();
  }

  /**
   * Function called when mouse is dragged
   */
  mouseDragged() {
    this.rotation = atan2(
      mouseY - this.cannonSprite.position.y,
      mouseX - this.cannonSprite.position.x
    );
    this.cannonSprite.rotation = this.rotation + 90;
  }
}
