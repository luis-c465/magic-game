class Wall extends GameObject {
  /**
   * @param {number} x
   * @param {number} y
   */
  constructor(x, y) {
    super();

    /** @type {number} @constant @default */
    this.WALL_WIDTH = 100;

    /** @type {number} @constant  @default 100 */
    this.WALL_HEIGHT = 100;

    /** @type {number} */
    this.x = x;

    /** @type {number} */
    this.y = y;
  }

  update() {
    // Prevents crash when sprite has not been set yet
    if (!this.sprite) return;

    bullets.forEach((bullet) => {
      this.sprite.collide(bullet.sprite, this.collisionWithBullet);
    });
  }

  /**
   * @param {Sprite} bullet
   * @param {Sprite} wall
   */
  collisionWithBullet(wall, bullet) {
    throw new Error("onBulletHit function has not been overridden!");
  }
}
