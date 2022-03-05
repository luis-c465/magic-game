class DestructibleWall extends Wall {
  /**
   * @param {number} x X coordinate for where the block will be placed on the canvas
   * @param {number} y Y coordinate for where the block will be placed on the canvas
   */
  constructor(x, y) {
    // Pass all arguments passed to constructor into constructing Wall
    super(x, y);

    this.sprite = createSprite(x, y, this.WALL_WIDTH, this.WALL_HEIGHT);
    this.sprite.immovable = true;

    // Enable debugging for sprite
    this.sprite.debug = true;

    this.setup();
  }

  /**
   * @param bullet bullet sprite
   * @param wall wall sprite
   */
  collisionWithBullet(wall, bullet) {
    wall.remove();
  }
}
