class FireWand extends Wand {
  /**
   * @param {Layer} layer
   */
  constructor(layer) {
    super(layer);

    this.wand.addImage(images.fireWand);

    this.setup();
  }

  /**
   * Function called a bullet comes into contact with the wandHitBox
   * Likely will need to overridden by a class which inherits from this one
   *
   * @param {Bullet} bullet
   */
  collisionWithBullet(bullet) {
    bullet.bulletType = "fire";
  }
}
