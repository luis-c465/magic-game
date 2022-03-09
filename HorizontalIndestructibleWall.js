class HorizontalIndestructibleWall extends IndestructibleWall {
  /**
   * @param {GameLayer} layer
   * @param {number} x
   * @param {number} y
   */
  constructor(layer, x, y) {
    super(layer, x, y);

    this.sprite.width = 4000;

    this.setup();
  }
}
