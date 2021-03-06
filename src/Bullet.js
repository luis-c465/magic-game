// import GameObject from "./GameObject.js";

/**
 * A bullet that moves forward ever time the update function is called
 *
 * @typedef {"normal" | "ice" | "fire"} _typeBulletType
 */
class Bullet extends GameObject {
  /**
   * @param {GameLayer} layer
   * @param {GameObject} firedBy
   * @param {Vector} initialPosition
   * @param {Vector} trajectory
   * @param {number} rotation
   */
  constructor(layer, firedBy, initialPosition, trajectory, rotation) {
    super(layer);

    /** @type {GameObject} */
    this.firedBy = firedBy;

    this.initialPosition = initialPosition;
    this.trajectory = trajectory;

    // Creates a sprite at its initial position with an aspect ratio of the image
    /** @type {Sprite} */
    this.sprite = createSprite(
      this.initialPosition.x,
      this.initialPosition.y,
      100,
      100 * (240 / 112)
    );

    /** @type {number} */
    this.damage = 1;

    // Adds an image for the sprites
    this.sprite.addImage("bullet", images.bullet);
    this.sprite.addImage("iceBullet", images.iceBullet);
    this.sprite.addImage("fireBullet", images.fireBullet);

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

    this.sprite.debug = false;

    /** @type {gameSprite[]} */
    this.collidesWith = ["wall", "player"];

    this.updatesTillCanBeReflected = 50;
    this.updatesTillCanBeDired = 50;

    /**
     * Changes how the bullet will react when colliding with things
     * Is updated every time the `update` function is called
     *
     * @type {_typeBulletType}
     * @default "bullet"
     */
    this.bulletType = "normal";

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
      case "ice":
        this.speed = 1;
        this.damage = 1;
        this.sprite.changeImage("iceBullet");
        break;

      case "fire":
        this.speed = 15;
        this.damage = 10;
        this.sprite.changeImage("fireBullet");
        break;

      case "normal":
      default:
        this.speed = 5;
        this.damage = 2;
        this.sprite.changeImage("bullet");
    }
  }

  get bulletType() {
    return this._bulletType;
  }

  _update() {
    this.updatesTillCanBeReflected--;
    this.updatesTillCanBeDired--;
    // Makes the bullet move
    this.sprite.position.add(this.trajectory);
  }

  /**
   * Makes the bullet take a 180 in its trajectory
   *
   * @param {GameObject} newFiredBy
   */
  reflect(newFiredBy) {
    if (this.updatesTillCanBeReflected > 0) {
      return;
    }

    this.firedBy = newFiredBy;

    this.trajectory.rotate(180);
    this.sprite.rotation += 180;

    this.updatesTillCanBeReflected = 50;
  }

  /** @param {Wall} wall */
  collisionWithWall(wall) {
    // Fix walls not getting collision because bullet is deleted immediately
    // Deletes the bullet 10ms after colliding with a wall
    setTimeout(() => {
      this.deleteCheck = true;
    }, 10);
  }

  /** @param {Player} player */
  collisionWithPlayer(player) {
    this.deleteCheck = true;
  }

  /**
   * @param {() => Vector} newTrajectory
   * @param {GameObject} newOwner
   */
  dir(newTrajectory, newOwner) {
    if (this.updatesTillCanBeDired > 0) return;

    /** Delay between bullet being slowed down and bullet changing trajectory to the new trajectory */
    const DIR_DELAY = 400;

    this.updatesTillCanBeDired = 50;

    const speedBefore = this.speed;
    this.speed = 0.3;

    setTimeout(() => {
      const bulletSpritePos = this.sprite.position;
      const trajectory = newTrajectory();

      this.sprite.rotation = angleBetween(trajectory, bulletSpritePos);
      trajectory.sub(bulletSpritePos);

      this.trajectory = trajectory;
      this.speed = speedBefore * 1.5;
      this.firedBy = newOwner;
    }, DIR_DELAY);
  }
}
