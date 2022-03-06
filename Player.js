class Player extends GameObject {
  /**
   * @param {GameLayer} layer
   * @param {number} x
   * @param {number} y
   */
  constructor(layer, x, y) {
    super(layer);

    this.isMoving = false;
    this.movementSpeed = 2;
    this.bullets = [];
    this.rotation = 0;
    this.collidesWith = ["wall"];

    // Animations
    /** @type {Animation} */
    this.bodyAnimation = loadAnimation(
      new SpriteSheet("assets/tanks.png", [
        {
          name: "stand",
          frame: { x: 123, y: 11, width: 80, height: 89 },
        },
      ])
    );
    /** @type {Animation} */
    this.cannonAnimation = loadAnimation(
      new SpriteSheet("assets/tanks.png", [
        {
          name: "stand",
          frame: { x: 79, y: 0, width: 40, height: 76 },
        },
      ])
    );

    // Create sprites
    /** @type {Sprite} */
    this.bodySprite = createSprite(x, y, 70, 94);
    this.bodySprite.addAnimation("stand", this.bodyAnimation);
    this.sprites.push(this.bodySprite);

    this.cannonSprite = createSprite(100, 284, 70, 94);
    this.cannonSprite.addAnimation("default", this.cannonAnimation);
    this.sprites.push(this.cannonSprite);

    this.setup();
  }

  update() {
    this.updateDelete();

    // If false returns and stops executing the function
    if (!this.updateCheck) return;

    this.isMoving = false;

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
    }

    // If player is not moving (not arrow keys are pressed) set its velocity to zero
    if (!this.isMoving) {
      this.bodySprite.velocity.x = 0;
      this.bodySprite.velocity.y = 0;
    }

    // If mouse is pressed
    if (mouseIsPressed) {
      // Do calculations for bullet position
      const mouseVector = createVector(mouseX, mouseY).sub(
        this.bodySprite.position
      );

      const dirOffset = this.bodySprite.position.copy();
      // dirOffset.add(this.bodySprite.position, mouseVector);
      // dirOffset.x = this.bodySprite.position.x;
      dirOffset.x += 50;

      // Fire bullet
      const bullet = new Bullet(
        this.layer,
        dirOffset,
        mouseVector,
        this.rotation
      );
      bullets.push(bullet);
    }

    // Loop through all bullets and call their loop function updating them
    // TODO: Add children array into `GameObject.js` and when update is called update children
    this.bullets.forEach((bullet) => bullet.update());

    this.updateCollisions();
  }

  /**
   * @param {Sprite} self
   * @param {Sprite} wall
   */
  collisionWithWall(self, wall) {
    // Do nothing
  }

  /**
   * Function called when mouse is dragged
   */
  mouseDragged() {
    if (!this.updateCheck) return;

    this.rotation = atan2(
      mouseY - this.cannonSprite.position.y,
      mouseX - this.cannonSprite.position.x
    );
    this.cannonSprite.rotation = this.rotation + 90;
  }
}
