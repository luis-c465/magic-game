class IceWand extends Wand {
  /**
   * @param {Layer} layer
   */
  constructor(layer) {
    super(layer);

    this.wand.addImage(images.iceWand);

    this.setup();
  }

  /**
   * Function called a bullet comes into contact with the wandHitBox
   * Likely will need to overridden by a class which inherits from this one
   *
   * @type {collisionWith}
   */
  collisionWithBullet(self, wandHitBox, bulletSprite) {
    bulletSprite.changeImage("iceBullet");
  }
}
