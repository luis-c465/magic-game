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

    /** @type {number} @default 2 */
    this.movementSpeed = 2;

    /** @type {number} @default 0 */
    this.rotation = 0;

    this.maxLife = 10;
    this.life = this.maxLife;

    /**
     * @type {number}
     * The number of updates that must happen between wand switched
     */
    this.CAN_SWITCH_EVERY = 25;

    /** @type {boolean} */
    this.canSwitchNow = true;

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
    this.CAST_EVERY_N_UPDATES = 20;

    /**
     * Determines if the player can shoot when the mouse is pressed
     * @type {boolean}
     * @default true
     */
    this.canCastNow = true;

    this.bodyAnimation = loadAnimation(
      new SpriteSheet(images.player, 64, 64, 2)
    );
    this.bodyAnimation.frameDelay = 15;

    // Body sprite
    /** @type {Sprite} */
    this.bodySprite = createSprite(x, y, 64, 64);
    this.bodySprite.addAnimation("stand", this.bodyAnimation);
    this.spritesWithCollision.push(this.bodySprite);

    // Life bar sprite
    /** @type {Sprite} */
    this.lifeBarSprite = createSprite(this.x, this.y, 100, 20);
    this.lifeBarSprite.draw = () => this.drawLifeBar.call(this);
    this.spritesWithNoCollision.push(this.lifeBarSprite);

    this.setup();
  }

  preUpdate() {
    if (!this.canCastNow) {
      this.canCastNow = this.updates % this.CAST_EVERY_N_UPDATES === 0;
    }

    if (!this.canSwitchNow) {
      this.canSwitchNow = this.updates % this.CAN_SWITCH_EVERY === 0;
    }
  }

  _update() {
    this._updateCurrentWand();
  }

  postUpdate() {
    if (mouseIsPressed && this.canCastNow) {
      this._cast();
      this.canCastNow = false;
    }
  }

  /**
   * Updates the movement of the player
   */
  _updateMovement() {
    this.isMoving = false;

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
      this.iceWand.hide();
      this.fireWand.hide();
      this.reflectWand.hide();
      this.dirWand.hide();

      this._currentWand = wand;
      wand.show();
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
    // If number keys are pressed sets players current wand equal to the numbers corresponding wand
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

    // If space bar is pressed cycle through the wands
    const keyPressed = keyIsDown(KEY_CODES.space);
    if (this.canSwitchNow && keyPressed) {
      this.canSwitchNow = false;

      switch (this.currentWand) {
        case this.reflectWand:
          this.currentWand = this.fireWand;
          break;

        case this.fireWand:
          this.currentWand = this.iceWand;
          break;

        case this.iceWand:
          this.currentWand = this.dirWand;
          break;

        case this.dirWand:
          this.currentWand = this.reflectWand;
          break;

        default:
          break;
      }
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

    this.currentWand.trajectory = mouseVector;
    this.currentWand.rotation = this.rotation;
    this.currentWand.cast();
  }

  /** @param {Bullet} bullet */
  collisionWithBullet(bullet) {
    this.life -= bullet.damage;
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
    const isValid = (num) => {
      // const inRange = num >= min && max >= num;
      return num >= min && max >= num;
    };
    let num;
    do {
      // Picks a random number from 100 to maxCoord - 100
      // Prevents enemies from spawning in the boundaries of the level
      num = random(100, maxCoord - 100);
    } while (isValid(num));
    return num;
  }

  kill() {
    this.deleteCheck = true;
  }

  drawLifeBar() {
    const LIFE_BAR_OUTLINE = 2;
    stroke(0);
    strokeWeight(LIFE_BAR_OUTLINE);
    rect(
      0,
      40,
      this.lifeBarSprite.width + LIFE_BAR_OUTLINE,
      this.lifeBarSprite.height + LIFE_BAR_OUTLINE
    );

    strokeWeight(0);
    const lifePercentage = this.life / this.maxLife;
    fill(color("red"));
    const lifeWidth = this.lifeBarSprite.width * lifePercentage;
    rect(
      (lifeWidth - this.lifeBarSprite.width) / 2,
      40,
      lifeWidth,
      this.lifeBarSprite.height
    );
  }

  _updateAttachmentsPositions() {
    this.iceWand.x = this.bodySprite.position.x;
    this.iceWand.y = this.bodySprite.position.y;

    this.fireWand.x = this.bodySprite.position.x;
    this.fireWand.y = this.bodySprite.position.y;

    this.reflectWand.x = this.bodySprite.position.x;
    this.reflectWand.y = this.bodySprite.position.y;

    this.dirWand.x = this.bodySprite.position.x;
    this.dirWand.y = this.bodySprite.position.y;

    this.lifeBarSprite.position = this.bodySprite.position.copy();
  }
}
