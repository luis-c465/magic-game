class Player extends GameObject {
  /**
   * @param {GameLayer} layer
   * @param {number} x
   * @param {number} y
   */
  constructor(layer, x, y) {
    super(layer);

    /** @type {IceWand} */
    this.iceWand = new IceWand(wandsLayer, this);
    /** @type {FireWand} */
    this.fireWand = new FireWand(wandsLayer, this);
    /** @type {ReflectWand} */
    this.reflectWand = new ReflectWand(wandsLayer, this);
    /** @type {ReflectWand} */
    this.dirWand = new DirWand(wandsLayer, this);

    /** @type {Wand} @default IceWand */
    this.currentWand = this.reflectWand;

    /** @type {boolean} */
    this.isMoving = false;

    /** @type {number} @default 2 */
    this.movementSpeed = 2;

    /** @type {number} @default 0 */
    this.rotation = 0;

    /** @type {gameSprite[]} */
    this.collidesWith = ["wall", "bullet"];

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
    this.SHOOT_EVERY_N_UPDATES = 20;

    /**
     * Determines if the player can shoot when the mouse is pressed
     * @type {boolean}
     * @default true
     */
    this.canShootNow = true;

    // Animations
    /** @type {Animation} */
    // this.bodyAnimation = loadAnimation(
    //   new SpriteSheet(images.tanks, [
    //     {
    //       name: "stand",
    //       frame: { x: 123, y: 11, width: 80, height: 89 },
    //     },
    //   ])
    // );

    this.bodyAnimation = loadAnimation(
      new SpriteSheet(images.player, 64, 64, 2)
    );
    this.bodyAnimation.frameDelay = 15;
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
    this.cannonSprite.visible = false;
    this.sprites.push(this.cannonSprite);

    this.setup();
  }

  _update() {
    this.updates++;
    if (!this.canShootNow) {
      this.canShootNow = this.updates % this.SHOOT_EVERY_N_UPDATES === 0;
    }

    this._updateMovement();
    this._updateCurrentWand();

    // If mouse is pressed
    if (mouseIsPressed && this.canShootNow) {
      this._cast();
      this.canShootNow = false;
    }
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
    if (keyIsDown(KEY_CODES.a) || keyIsDown(LEFT_ARROW)) {
      this.bodySprite.velocity.x = -this.movementSpeed;
      this.isMoving = true;
    }
    if (keyIsDown(KEY_CODES.d) || keyIsDown(RIGHT_ARROW)) {
      this.bodySprite.velocity.x = this.movementSpeed;
      this.isMoving = true;
    }
    if (keyIsDown(KEY_CODES.w) || keyIsDown(UP_ARROW)) {
      this.bodySprite.velocity.y = -this.movementSpeed;
      this.isMoving = true;
    }
    if (keyIsDown(KEY_CODES.s) || keyIsDown(DOWN_ARROW)) {
      this.bodySprite.velocity.y = this.movementSpeed;
      this.isMoving = true;
    }

    if (this.isMoving) {
      this.cannonSprite.position.x = this.bodySprite.position.x - 1;
      this.cannonSprite.position.y = this.bodySprite.position.y - 5;

      this.iceWand.x = this.cannonSprite.position.x;
      this.iceWand.y = this.cannonSprite.position.y;

      this.fireWand.x = this.cannonSprite.position.x;
      this.fireWand.y = this.cannonSprite.position.y;

      this.reflectWand.x = this.cannonSprite.position.x;
      this.reflectWand.y = this.cannonSprite.position.y;

      this.dirWand.x = this.cannonSprite.position.x;
      this.dirWand.y = this.cannonSprite.position.y;
    }

    // If player is not moving (not arrow keys are pressed) set its velocity to zero
    if (!this.isMoving) {
      this.bodySprite.velocity.x = 0;
      this.bodySprite.velocity.y = 0;
    }
  }

  /** @param {Wand} wand */
  set currentWand(wand) {
    // If current wand is not set set it to the current value
    if (this.currentWand === undefined) {
      this._currentWand = wand;
    }

    if (this.currentWand === wand) return;

    this.currentWand.hide();
    this._currentWand = wand;
    wand.show();
  }

  get currentWand() {
    return this._currentWand;
  }

  /**
   * Updates the currently equipped wand to the corresponding key press
   */
  _updateCurrentWand() {
    if (keyIsDown(KEY_CODES[1])) {
      this.currentWand = this.reflectWand;
    }
    if (keyIsDown(KEY_CODES[2])) {
      this.currentWand = this.fireWand;
    }
    if (keyIsDown(KEY_CODES[3])) {
      this.currentWand = this.iceWand;
    }
    if (keyIsDown(KEY_CODES[4])) {
      this.currentWand = this.dirWand;
    }
  }

  /**
   * Casts a wand
   * @private
   */
  _cast() {
    const mouseVector = createVector(mouseX, mouseY).sub(
      this.bodySprite.position
    );
    mouseVector.setMag(90_000);

    // this.iceWand.trajectory = mouseVector;
    // this.iceWand.rotation = this.rotation;

    // this.iceWand.cast();

    // this.fireWand.trajectory = mouseVector;
    // this.fireWand.rotation = this.rotation;

    // this.fireWand.cast();

    // this.reflectWand.trajectory = mouseVector;
    // this.reflectWand.rotation = this.rotation;

    // this.reflectWand.cast();

    this.currentWand.trajectory = mouseVector;
    this.currentWand.rotation = this.rotation;
    this.currentWand.cast();
  }

  /**
   * Shoots a bullet from the cannon to the mouses current location
   * @private
   * @deprecated The player should not be able to shoot bullets
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

  /** @param {Bullet} bullet */
  collisionWithBullet(bullet) {
    // this.life -= bullet.damage;
  }

  whenNoLife() {
    throw new Error("player is dead!");
  }

  /** @return {[number, number]} */
  getValidEnemyLocation() {
    const bodySpritePosition = this.bodySprite.position;
    const invalidRange = 200;
    return [
      this._getCoordNotInRange(
        CANVAS_WIDTH,
        bodySpritePosition.x - invalidRange,
        bodySpritePosition.x + invalidRange
      ),
      this._getCoordNotInRange(
        CANVAS_HEIGHT,
        bodySpritePosition.y - invalidRange,
        bodySpritePosition.y + invalidRange
      ),
    ];
  }

  /**
   * @param {number} maxCoord
   * @param {number} min
   * @param {number} max
   */
  _getCoordNotInRange(maxCoord, min, max) {
    const isValid = (num) => num >= min && max >= num;
    let num;
    do {
      num = random(maxCoord);
    } while (isValid(num));
    return num;
  }
}
