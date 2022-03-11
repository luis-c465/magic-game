class DirWand extends Wand {
  /**
   * @param {Layer} layer
   * @param {GameObject} owner
   */
  constructor(layer, owner) {
    super(layer, owner);

    this.wand.addImage(images.reflectWand);

    this.setup();
  }

  /**
   * Function called a bullet comes into contact with the wandHitBox
   * Likely will need to overridden by a class which inherits from this one
   *
   * @param {Bullet} bullet
   */
  collisionWithBullet(bullet) {
    const speedBefore = bullet.speed;
    bullet.speed = 0.3;

    setTimeout(() => {
      const vector = createVector(mouseX, mouseY);
      const bulletSpritePos = bullet.sprite.position;

      bullet.sprite.rotation = angleBetween(vector, bulletSpritePos);
      vector.sub(bulletSpritePos);
      // bullet.sprite.rotation = angleBetween(vector, bulletSpritePos) - 90;
      bullet.updateTrajectory(vector, speedBefore * 1.5);
    }, 400);
  }
}
