class IndestructibleWall extends Wall {
  /**
   * @param {GameLayer} layer
   * @param {number} x
   * @param {number} y
   */
  constructor(layer, x, y) {
    // Pass all arguments passed to constructor into constructing Wall
    super(layer, x, y);

    this.sprite.immovable = true;

    // Enable debugging for sprite
    this.sprite.debug = true;
  }
}
