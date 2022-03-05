// import GameObject from "./GameObject.js";

class Bullet extends GameObject {
  constructor(initialPosition, trajectory, rotation) {
    super();

    this.BULLET_SPEED = 5;
    this.initialPosition = initialPosition;
    this.trajectory = trajectory;
    this.trajectory.setMag(this.BULLET_SPEED);
    // this.position = initialPosition.copy();

    // this.initialPosition.rotate(90);
    // this.trajectory.rotate(90);

    // Creates a sprite at its initial position with an aspect ratio of the image
    this.sprite = createSprite(
      this.initialPosition.x,
      this.initialPosition.y,
      5,
      5 * (240 / 112)
    );
    this.sprite.addImage(loadImage("assets/bullet.png"));
    // Lower the sprites scale.
    // Other wise the bullet is too big
    this.sprite.scale = 0.2;
    this.sprite.rotation = rotation;
  }

  update() {
    // Makes the bullet move
    this.sprite.position.add(this.trajectory);
  }
}
