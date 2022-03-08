class DestructibleWall extends Wall {
  /**
   * @param {GameLayer} layer
   * @param {number} x X coordinate for where the block will be placed on the canvas
   * @param {number} y Y coordinate for where the block will be placed on the canvas
   */
  constructor(layer, x, y) {
    // Pass all arguments passed to constructor into constructing Wall
    super(layer, x, y);

    /** @type {Sprite} */
    this.sprite = createSprite(x, y, this.WALL_WIDTH, this.WALL_HEIGHT);
    this.sprite.immovable = true;

    // Enable debugging for sprite
    this.sprite.debug = true;

    /** @type {number} @default 1 */
    this.life = 10;

    this.collidesWith = ["player", "bullet"];

    this.setup();
  }

  /** @type {collisionWith} */
  collisionWithBullet(self, wall, bullet) {
    bullet.remove();
    self.life--;

    if (self.life <= 0) {
      wall.remove();
    }
  }
}
