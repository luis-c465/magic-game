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
      const playerVector = player.bodySprite.position.copy();
      this._shoot(playerVector);
    }

    this._updateMovement();
  }

  _updateMovement() {
    if (this.isMoving) return;
    this.isMoving = true;
    this.bodySprite.velocity.x = randomBoolean()
      ? -this.movementSpeed
      : this.movementSpeed;
    this.bodySprite.velocity.y = randomBoolean()
      ? -this.movementSpeed
      : this.movementSpeed;

    setTimeout(() => (this.isMoving = false), 2000);
  }
}
