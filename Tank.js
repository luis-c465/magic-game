/**
 * @typedef {"grey" | "blue" | "red" | "green" | "yellow"} typeTankColor
 */
class Tank extends GameObject {
  /**
   * @param {GameLayer} layer
   * @param {number} x
   * @param {number} y
   * @param {typeTankColor} color
   */
  constructor(layer, x, y, color) {
    super(layer);
    /** @type {typeTankColor} */
    this.color = color;

    /** @type {boolean} */
    this.isMoving = false;

    /** @type {number} @default 2 */
    this.movementSpeed = 2;

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
    this.bodyAnimation = this._getBodyAnimation();

    /** @type {Animation} */
    this.cannonAnimation = this._getCannonAnimation();

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

    /** @type {number} @default 0 */
    this.rotation = 0;

    this.setup();
  }

  /** @param {number} value  */
  set rotation(value) {
    this._rotation = value;
    this.cannonSprite.rotation = this.rotation + 90;
  }

  get rotation() {
    return this._rotation;
  }

  /**
   * Shoots a bullet from the cannon to the the players current location
   * @param {Vector} trajectory
   * @private
   */
  _shoot(trajectory) {
    this.canShootNow = false;

    // Do calculations for bullet position
    this.rotation = atan2(
      trajectory.y - this.bodySprite.position.y,
      trajectory.x - this.cannonSprite.position.x
    );
    // this.rotation = playerVector.angleBetween(this.bodySprite.position);

    const updatedTrajectory = trajectory.sub(this.bodySprite.position);

    const dirOffset = this.bodySprite.position.copy();
    dirOffset.x += 50;

    new Bullet(bulletsLayer, dirOffset, updatedTrajectory, this.rotation);
  }

  /**
   * @param {typeTankColor} color
   * @return {Animation}
   */
  _getCannonAnimation() {
    const getY = () => {
      const tankSpriteSheetYPeriod = 104;

      switch (this.color) {
        default:
        case "gray":
          return 0;

        case "blue":
          return tankSpriteSheetYPeriod;

        case "red":
          return tankSpriteSheetYPeriod * 2;

        case "green":
          return tankSpriteSheetYPeriod * 3;

        case "yellow":
          return tankSpriteSheetYPeriod * 4;
      }
    };

    const spriteSheet = new SpriteSheet(images.tanks, [
      {
        name: "stand",
        frame: { x: 79, y: getY(), width: 40, height: 76 },
      },
    ]);
    return loadAnimation(spriteSheet);
  }
  /**
   * @param {typeTankColor} color
   * @return {Animation}
   */
  _getBodyAnimation() {
    const getY = () => {
      const tankSpriteSheetYGap = 11;
      const tankSpriteSheetYPeriod = 104;

      switch (this.color) {
        default:
        case "gray":
          return tankSpriteSheetYGap;

        case "blue":
          return tankSpriteSheetYGap + tankSpriteSheetYPeriod;

        case "red":
          return tankSpriteSheetYGap + tankSpriteSheetYPeriod * 2;

        case "green":
          return tankSpriteSheetYGap + tankSpriteSheetYPeriod * 3;

        case "yellow":
          return tankSpriteSheetYGap + tankSpriteSheetYPeriod * 4;
      }
    };

    const spriteSheet = new SpriteSheet(images.tanks, [
      {
        name: "stand",
        frame: { x: 123, y: getY(), width: 80, height: 89 },
      },
    ]);
    return loadAnimation(spriteSheet);
  }
}
