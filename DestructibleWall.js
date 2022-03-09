class DestructibleWall extends Wall {
  /**
   * @param {GameLayer} layer
   * @param {number} x X coordinate for where the block will be placed on the canvas
   * @param {number} y Y coordinate for where the block will be placed on the canvas
   */
  constructor(layer, x, y) {
    // Pass all arguments passed to constructor into constructing Wall
    super(layer, x, y);

    this.sprite.immovable = true;

    // Enable debugging for sprite
    this.sprite.debug = true;

    /** @type {number} @default 1 */
    this.life = 10;

    this.collidesWith = ["player", "bullet"];

    this.setup();
  }

  /**
   * @param {DestructibleWall} self
   * @param {Bullet} bullet
   */
  collisionWithBullet(bullet) {
    bullet.deleteCheck = true;
    // bullet.remove();
    this.life--;

    if (this.life <= 0) {
      this.deleteCheck = true;
      // wall.remove();
    }
  }
}
