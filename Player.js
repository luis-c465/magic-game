class Player extends GameObject {
  /**
   * @param {GameLayer} layer
   * @param {number} x
   * @param {number} y
   */
  constructor(layer, x, y) {
    super(layer);

    /** @type {IceWand} */
    this.iceWand = new IceWand(wandsLayer);

    /** @type {boolean} */
    this.isMoving = false;

    /** @type {number} @default 2 */
    this.movementSpeed = 2;

    /** @type {number} @default 0 */
    this.rotation = 0;

    /** @type {gameSprite[]} */
    this.collidesWith = ["wall"];

    /**
     * The number of times that the players `update` function has been called
     *  @type {number}
     * @default 0
     */
    this.updates = 0;
    /**
     * The number of updates that must happen till the player can shoot again
     * @type {number}
     * @constant
     * @default 15
     */
    this.SHOOT_EVERY_N_UPDATES = 15;

    /**
     * Determines if the player can shoot when the mouse is pressed
     * @type {boolean}
     * @default true
     */
    this.canShootNow = true;

    // Animations
    /** @type {Animation} */
    this.bodyAnimation = loadAnimation(
      new SpriteSheet(images.tanks, [
        {
          name: "stand",
          frame: { x: 123, y: 11, width: 80, height: 89 },
        },
      ])
    );
    /** @type {Animation} */
    this.cannonAnimation = loadAnimation(
      new SpriteSheet(images.tanks, [
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
    // this.bodySprite.rotateToDirection = true;
    this.sprites.push(this.bodySprite);

    /** @type {Sprite} */
    this.cannonSprite = createSprite(x, y, 70, 94);
    this.cannonSprite.addAnimation("default", this.cannonAnimation);
    this.sprites.push(this.cannonSprite);

    this.setup();
  }

  _update() {
    // If false returns and stops executing the function
    if (!this.updateCheck) return;

    this.updates++;
    if (!this.canShootNow) {
      this.canShootNow = this.updates % this.SHOOT_EVERY_N_UPDATES === 0;
    }

    this._updateMovement();

    // If mouse is pressed
    if (mouseIsPressed && this.canShootNow) {
      this._shoot();
    }
  }

  /**
   * @type {collisionWith}
   */
  collisionWithWall(self, player, wall) {
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

  /**
   * Updates the movement of the player
   * @private
   */
  _updateMovement() {
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
    }

    // If player is not moving (not arrow keys are pressed) set its velocity to zero
    if (!this.isMoving) {
      this.bodySprite.velocity.x = 0;
      this.bodySprite.velocity.y = 0;
    }

    // If mouse is pressed
    if (mouseIsPressed) {
      this._cast();

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
  }

  /**
   * Casts a wand
   * @private
   */
  _cast() {
    const mouseVector = createVector(mouseX, mouseY).sub(
      this.cannonSprite.position
    );
    mouseVector.setMag(10000);

    this.iceWand.x = this.cannonSprite.position.x;
    this.iceWand.y = this.cannonSprite.position.y;
    this.iceWand.trajectory = mouseVector;
    this.iceWand.rotation = this.rotation;

    this.iceWand.cast();
  }

  /**
   * Shoots a bullet from the cannon to the mouses current location
   * @private
   */
  _shoot() {
    this.canShootNow = false;

    // Do calculations for bullet position
    const mouseVector = createVector(mouseX, mouseY).sub(
      this.bodySprite.position
    );

    const dirOffset = this.bodySprite.position.copy();
    // dirOffset.add(this.bodySprite.position, mouseVector);
    // dirOffset.x = this.bodySprite.position.x;
    dirOffset.x += 50;

    // Fire bullet
    new Bullet(bulletsLayer, dirOffset, mouseVector, this.rotation);
    // bulletsLayer.add(bullet);
    // bullets.push(bullet);
  }
}
