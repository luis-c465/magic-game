class MachineGunEnemy extends Tank {
  /**
   * @param {GameLayer} layer
   * @param {number} x
   * @param {number} y
   * @param {typeTankColor} color
   */
  constructor(layer, x, y) {
    super(layer, x, y, "red");

    this.SHOOT_EVERY_N_UPDATES = 25;
  }

  _update() {
    this.updates++;
    if (!this.canShootNow) {
      this.canShootNow = this.updates % this.SHOOT_EVERY_N_UPDATES === 0;
    }
    if (this.canShootNow) {
      const player = playerLayer.objects[0];
      const playerVector = player.bodySprite.position.copy();
      this._shoot(playerVector);
    }
  }
}
