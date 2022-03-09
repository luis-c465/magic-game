class DestructibleWall extends Wall {
  /**
   * @param {GameLayer} layer
   * @param {number} x
   * @param {number} y
   * @param {number} width
   * @param {number} height
   */
  constructor(layer, x, y, width, height) {
    // Pass all arguments passed to constructor into constructing Wall
    super(layer, x, y, width, height);

    this.sprite.immovable = true;

    // Enable debugging for sprite
    this.sprite.debug = true;

    /** @type {number} @default 1 */
    this.life = 10;

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
