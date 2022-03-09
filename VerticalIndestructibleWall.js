class VerticalIndestructibleWall extends IndestructibleWall {
  /**
   * @param {GameLayer} layer
   * @param {number} x
   * @param {number} y
   */
  constructor(layer, x, y) {
    super(layer, x, y);

    this.sprite.height = 900 * 2;

    this.setup();
  }
}
