class SmallIndestructibleWall extends IndestructibleWall {
  /**
   * @param {GameLayer} layer
   * @param {number} x
   * @param {number} y
   */
  constructor(layer, x, y) {
    super(layer, x, y);

    this.sprite.height = 50;
    this.sprite.width = 50;

    this.setup();
  }
}
