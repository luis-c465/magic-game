class IndestructibleWall extends Wall {
  /**
   * @param {number} x
   * @param {number} y
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

  collisionWithBullet() {
    console.log("collision with bullet immovable");
    // Do nothing
    // Wall is immovable and cannot be destroyed
  }
}
