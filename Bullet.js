import GameObject from "./GameObject.js";

export default class Bullet extends GameObject {
  constructor(p5, initialPosition, trajectory) {
    super(p5);
    this.BULLET_SPEED = 5;
    this.initialPosition = initialPosition;
    this.trajectory = trajectory;
    this.trajectory.setMag(this.BULLET_SPEED);
    // this.position = initialPosition.copy();

    // this.initialPosition.rotate(90);
    // this.trajectory.rotate(90);

    // Creates a sprite at its initial position with an aspect ratio of the image
    this.sprite = p5.createSprite(
      this.initialPosition.x,
      this.initialPosition.y,
      5,
      5 * (240 / 112)
    );
    this.sprite.addImage(p5.loadImage("assets/bullet.png"));
    // Lower the sprites scale.
    // Other wise the bullet is too big
    this.sprite.scale = 0.2;
  }

  loop() {
    this.sprite.position.add(this.trajectory);
  }
}
