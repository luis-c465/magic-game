class DirWand extends Wand {
  /**
   * @param {Layer} layer
   * @param {GameObject} owner
   */
  constructor(layer, owner) {
    super(layer, owner);

    this.icon.addImage(images.mouse);

    this.setup();
  }

  /**
   * Function called a bullet comes into contact with the wandHitBox
   * Likely will need to overridden by a class which inherits from this one
   *
   * @param {Bullet} bullet
   */
  collisionWithBullet(bullet) {
    const vector = createVector(mouseX, mouseY);
    bullet.dir(vector, this.owner);
  }
}
