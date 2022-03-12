class CreeperEnemy extends Tank {
  /**
   * @param {GameLayer} layer
   * @param {number} x
   * @param {number} y
   */
  constructor(layer, x, y) {
    super(layer, x, y, "green");

    this.SHOOT_EVERY_N_UPDATES = 75;
    this.isMoving = true;
    this.movementSpeed = 1;

    this.collidesWith.push("player");
  }

  _update() {
    this.updates++;

    // if (!this.canShootNow) {
    //   this.canShootNow = this.updates % this.SHOOT_EVERY_N_UPDATES === 0;
    // }

    // if (this.canShootNow) {
    //   const fireAt = createVector(random(CANVAS_WIDTH), random(CANVAS_HEIGHT));

    //   const player = playerLayer.objects[0];
    //   const playerVector = player.bodySprite.position.copy();
    //   this._shoot(fireAt);
    // }

    this._updateMovement();
  }

  _updateMovement() {
    /** @type {Vector} */
    const playerPosition = player.bodySprite.position;
    if (this.isMoving) {
      /** @type {Vector} */
      const bodySpritePos = this.bodySprite.position.copy();
      /** @type {Vector} */
      const trajectory = bodySpritePos.sub(playerPosition);
      trajectory.setMag(this.movementSpeed);
      this.bodySprite.position.sub(trajectory);
      // this.cannonSprite.position.x = this.bodySprite.position.x - 1;
      // this.cannonSprite.position.y = this.bodySprite.position.y - 5;
      return;
    }
  }

  /** @param {Player} player */
  collisionWithPlayer(player) {
    player.kill();
    // player.bodySprite.rotation += 5;
  }
}
