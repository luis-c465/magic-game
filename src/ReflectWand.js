class ReflectWand extends Wand {
  /**
   * @param {Layer} layer
   * @param {GameObject} owner
   */
  constructor(layer, owner) {
    super(layer, owner);

    this.icon.addImage(images.reflect);

    this.setup();
  }

  /**
   * Function called a bullet comes into contact with the wandHitBox
   * Likely will need to overridden by a class which inherits from this one
   *
   * @param {Bullet} bullet
   */
  collisionWithBullet(bullet) {
    bullet.reflect(this.owner);
  }
}
