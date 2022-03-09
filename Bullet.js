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

    this.BULLET_SPEED = 5;
    this.initialPosition = initialPosition;
    this.trajectory = trajectory;
    this.trajectory.setMag(this.BULLET_SPEED);

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
     * @type {number} @default 1
     */
    this.speed = 5;

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
    this.trajectory.setMag(value);
  }

  /** @param {_typeBulletType} value */
  set bulletType(value) {
    switch (value) {
      case "bullet":
        this.speed = 5;
        this.damage = 2;

      case "iceBullet":
        this.speed = 0.5;
        this.damage = 1;

      default:
        this.speed = 5;
        this.damage = 2;
    }
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
