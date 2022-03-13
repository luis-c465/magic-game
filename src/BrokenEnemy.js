class BrokenEnemy extends Tank {
  /**
   * @param {GameLayer} layer
   * @param {number} x
   * @param {number} y
   * @param {typeTankColor} color
   */
  constructor(layer, x, y) {
    super(layer, x, y, "yellow");

    this.SHOOT_EVERY_N_UPDATES = 75;
  }

  _update() {
    if (this.canShootNow) {
      const fireAt = createVector(random(CANVAS_WIDTH), random(CANVAS_HEIGHT));
      this._shoot(fireAt);
    }
  }
}
