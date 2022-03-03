import Bullet from "./Bullet.js";
import GameObject from "./GameObject.js";

export default class Player extends GameObject {
  constructor(p5) {
    super(p5);
    this.isMoving = false;
    this.movementSpeed = 2;
    this.bullets = [];

    // Animations
    this.bodyAnimation = p5.loadAnimation(
      new p5.SpriteSheet("assets/tanks.png", [
        {
          name: "stand",
          frame: { x: 123, y: 11, width: 80, height: 89 },
        },
      ])
    );
    this.cannonAnimation = p5.loadAnimation(
      new p5.SpriteSheet("assets/tanks.png", [
        {
          name: "stand",
          frame: { x: 79, y: 0, width: 40, height: 76 },
        },
      ])
    );

    this.bodySprite = p5.createSprite(100, 284, 70, 94);
    this.bodySprite.addAnimation("stand", this.bodyAnimation);
    this.sprites.push(this.bodySprite);

    this.cannonSprite = p5.createSprite(100, 284, 70, 94);
    this.cannonSprite.addAnimation("default", this.cannonAnimation);
    this.sprites.push(this.cannonSprite);

    this.setup();
  }

  loop() {
    this.isMoving = false;

    if (this.p5.keyIsDown(this.p5.LEFT_ARROW)) {
      this.bodySprite.velocity.x = -this.movementSpeed;
      this.isMoving = true;
    }
    if (this.p5.keyIsDown(this.p5.RIGHT_ARROW)) {
      this.bodySprite.velocity.x = this.movementSpeed;
      this.isMoving = true;
    }
    if (this.p5.keyIsDown(this.p5.UP_ARROW)) {
      this.bodySprite.velocity.y = -this.movementSpeed;
      this.isMoving = true;
    }
    if (this.p5.keyIsDown(this.p5.DOWN_ARROW)) {
      this.bodySprite.velocity.y = this.movementSpeed;
      this.isMoving = true;
    }

    if (this.isMoving) {
      this.cannonSprite.position.x = this.bodySprite.position.x - 1;
      this.cannonSprite.position.y = this.bodySprite.position.y - 5;
    }

    if (!this.isMoving) {
      this.bodySprite.velocity.x = 0;
      this.bodySprite.velocity.y = 0;
    }

    if (this.p5.mouseIsPressed) {
      const mouseVector = this.p5
        .createVector(this.p5.mouseX, this.p5.mouseY)
        .sub(this.bodySprite.position);

      const dirOffset = this.bodySprite.position.copy();
      // dirOffset.add(this.bodySprite.position, mouseVector);
      // dirOffset.x = this.bodySprite.position.x;
      dirOffset.x += 50;

      const bullet = new Bullet(this.p5, dirOffset, mouseVector);
      this.bullets.push(bullet);
    }

    this.bullets.forEach((bullet) => bullet.loop());
  }

  mouseDragged() {
    const rotation = this.p5.atan2(
      this.p5.mouseY - this.cannonSprite.position.y,
      this.p5.mouseX - this.cannonSprite.position.x
    );
    this.cannonSprite.rotation = rotation + 90;
  }
}
