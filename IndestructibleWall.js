class IndestructibleWall extends Wall {
  /**
   * @param {GameLayer} layer
   * @param {number} x
   * @param {number} y
   */
  constructor(layer, x, y) {
    // Pass all arguments passed to constructor into constructing Wall
    super(layer, x, y);

    /** @type {Sprite} */
    this.sprite = createSprite(x, y, this.WALL_WIDTH, this.WALL_HEIGHT);
    this.sprite.immovable = true;

    // Enable debugging for sprite
    this.sprite.debug = true;

    this.setup();
  }

  /**
   * @param {Sprite} bullet
   * @param {Sprite} wall
   */
  collisionWithBullet(wall, bullet) {
    // bullet.remove();
    console.log("collision with bullet immovable");
    // Do nothing
    // Wall is immovable and cannot be destroyed
  }
}
