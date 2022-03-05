// import GameObject from "./GameObject.js";

/**
 * A bullet that moves forward ever time the update function is called
 */
class Bullet extends GameObject {
  constructor(initialPosition, trajectory, rotation) {
    super();

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
    // Adds an image for the sprite
    this.sprite.addImage(loadImage("assets/bullet.png"));

    // Lower the sprites scale.
    // Other wise the bullet is too big
    this.sprite.scale = 0.2;

    this.sprite.rotation = rotation;

    // Sets the amount of times the sprite will the drawn before destroyed
    this.sprite.life = 500;

    this.sprite.debug = true;

    this.setup();
  }

  update() {
    // Makes the bullet move
    this.sprite.position.add(this.trajectory);

    walls.forEach((wall) => {
      this.sprite.collide(wall.spriteGroup, this.collisionWithWall);
    });

    // If sprite is destroyed destroy instance of Bullet
    // TODO: Also remove itself from the array of bullets
    if (this.sprite.life <= 0) {
      delete this;
    }
  }

  /**
   * @param {Sprite} bullet
   * @param {Sprite} wall
   */
  collisionWithWall(bullet, wall) {
    // bullet.remove();
    delete this;
  }
}
