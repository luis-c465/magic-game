// import GameObject from "./GameObject.js";

/**
 * A bullet that moves forward ever time the update function is called
 *
 * @typedef {"bullet" | "iceBullet"} _typeBulletType
 */
class Bullet extends GameObject {
  /**
   * @param {GameLayer} layer
   * @param {Vector} initialPosition
   * @param {Vector} trajectory
   * @param {number} rotation
   */
  constructor(layer, initialPosition, trajectory, rotation) {
    super(layer);

    this.initialPosition = initialPosition;
    this.trajectory = trajectory;

    // Creates a sprite at its initial position with an aspect ratio of the image
    /** @type {Sprite} */
    this.sprite = createSprite(
      this.initialPosition.x,
      this.initialPosition.y,
      5,
      5 * (240 / 112)
    );

    /** @type {number} */
    this.damage = 1;

    // Adds an image for the sprites
    this.sprite.addImage("bullet", images.bullet);
    this.sprite.changeImage("bullet");

    this.sprite.addImage("iceBullet", images.iceBullet);

    // Lower the sprites scale.
    // Other wise the bullet is too big
    this.sprite.scale = 0.2;

    this.sprite.rotation = rotation;

    // Sets the amount of times the sprite will the drawn before destroyed
    this.sprite.life = 10000;
    /**
     * The speed of the bullet
     * @type {number} @default 5
     */
    this.speed = 1;

    this.sprite.debug = true;

    /** @type {gameSprite[]} */
    this.collidesWith = ["wall"];

    /**
     * Changes how the bullet will react when colliding with things
     * Is updated every time the `update` function is called
     *
     * @type {_typeBulletType}
     * @default "bullet"
     */
    this.bulletType = "bullet";

    this.setup();
  }

  /** @param {number} value */
  set speed(value) {
    this._speed = value;
    this.trajectory.setMag(value);
  }

  get speed() {
    return this._speed;
  }

  /** @param {_typeBulletType} value */
  set bulletType(value) {
    // If the setting value is the same as the current bullet type return to avoid unnecessary calculations
    if (value === this.bulletType) return;

    this._bulletType = value;
    switch (value) {
      case "bullet":
        this.speed = 5;
        this.damage = 2;
        break;

      case "iceBullet":
        this.speed = 1;
        this.damage = 1;
        break;

      default:
        this.speed = 5;
        this.damage = 2;
        break;
    }
  }

  get bulletType() {
    return this._bulletType;
  }

  _update() {
    /** @type {_typeBulletType} */
    this.bulletType = this.sprite.getAnimationLabel();

    // Makes the bullet move
    this.sprite.position.add(this.trajectory);
  }

  /**
   * @param {Wall} wall
   */
  collisionWithWall(wall) {
    this.deleteCheck = true;
  }
}
