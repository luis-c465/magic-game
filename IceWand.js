class IceWand extends Wand {
  /**
   * @param {Layer} layer
   */
  constructor(layer) {
    super(layer);

    this.wand = createSprite(10, 10, 50, 50);
    this.wand.addImage(images.iceWand);

    this.setup();
  }

  /**
   * Function called a bullet comes into contact with the wandHitBox
   * Likely will need to overridden by a class which inherits from this one
   *
   * @param {Sprite} bullet
   * @param {Sprite} wandHitBox
   */
  collisionWithBullet(wandHitBox, bulletSprite) {
    bulletSprite.changeImage("iceBullet");
  }
}
