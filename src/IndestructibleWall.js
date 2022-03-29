class IndestructibleWall extends Wall {
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
    this.sprite.debug = false;
    this.sprite.shapeColor = color(201, 114, 85);

    this.setup();
  }
}
