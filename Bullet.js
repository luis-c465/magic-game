// import GameObject from "./GameObject.js";

/**
 * A bullet that moves forward ever time the update function is called
 *
 * @typedef {"bullet" | "iceBullet"} bulletType
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

    /**
     * Changes how the bullet will react when colliding with things
     * Is updated every time the `update` function is called
     *
     * @type {"bullet" | "iceBullet"}
     * @default "bullet"
     */
    this.bulletType = "bullet";

    // Adds an image for the sprites
    this.sprite.addImage("bullet", images.bullet);
    this.sprite.changeImage("bullet");

    this.sprite.addImage("iceBullet", images.iceBullet);

    // Lower the sprites scale.
    // Other wise the bullet is too big
    this.sprite.scale = 0.2;

    this.sprite.rotation = rotation;

    // Sets the amount of times the sprite will the drawn before destroyed
    this.sprite.life = 300;

    this.sprite.debug = true;

    /** @type {gameSprite[]} */
    this.collidesWith = ["wall"];

    this.setup();
  }

  _update() {
    // Updates the current bullet type equal to the animation label
    this.bulletType = this.sprite.getAnimationLabel();

    // Makes the bullet move
    this.sprite.position.add(this.trajectory);

    if (this.bulletType === "iceBullet") {
      this.trajectory.setMag(0.5);
    }
  }

  /**
   * @param {Wall} wall
   */
  collisionWithWall(wall) {
    this.deleteCheck = true;
    if (this.bulletType === "iceBullet") {
      // wall.deleteCheck = true;
    }
  }
}
