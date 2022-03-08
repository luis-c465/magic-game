class TestEnemy extends GameObject {
  /**
   * @param {GameLayer} layer Layer that the game object will be added to
   */
  constructor(layer) {
    super(layer);

    this.isMoving = false;
    this.movementSpeed = 2;
    this.bullets = [];
    this.rotation = 0;

    // Animations
    this.bodyAnimation = loadAnimation(
      new SpriteSheet("assets/tanks.png", [
        {
          name: "stand",
          frame: { x: 123, y: 11, width: 80, height: 89 },
        },
      ])
    );
    this.cannonAnimation = loadAnimation(
      new SpriteSheet("assets/tanks.png", [
        {
          name: "stand",
          frame: { x: 79, y: 0, width: 40, height: 76 },
        },
      ])
    );

    // Create sprites
    this.bodySprite = createSprite(250, 250, 70, 94);
    this.bodySprite.addAnimation("stand", this.bodyAnimation);
    this.sprites.push(this.bodySprite);

    this.cannonSprite = createSprite(100, 284, 70, 94);
    this.cannonSprite.addAnimation("default", this.cannonAnimation);
    this.sprites.push(this.cannonSprite);

    // Move cannon sprite
    this.cannonSprite.position.x = this.bodySprite.position.x - 1;
    this.cannonSprite.position.y = this.bodySprite.position.y - 5;

    setInterval(() => {
      const mouseVector = createVector(500, 500).sub(this.bodySprite.position);

      const dirOffset = this.bodySprite.position.copy();
      // dirOffset.add(this.bodySprite.position, mouseVector);
      // dirOffset.x = this.bodySprite.position.x;
      dirOffset.x += 50;

      // Fire bullet
      const bullet = new Bullet(
        bulletsLayer,
        dirOffset,
        mouseVector,
        this.rotation
      );
    }, 500);

    this.setup();
  }

  update() {
    // const mouseVector = createVector(500, 500).sub(this.bodySprite.position);
    // const dirOffset = this.bodySprite.position.copy();
    // // dirOffset.add(this.bodySprite.position, mouseVector);
    // // dirOffset.x = this.bodySprite.position.x;
    // dirOffset.x += 50;
    // // Fire bullet
    // const bullet = new Bullet(dirOffset, mouseVector, this.rotation);
    // bullets.push(bullet);
  }
}
