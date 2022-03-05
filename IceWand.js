class IceWand extends Wand {
  constructor() {
    super();

    this.sprite = createSprite(10, 10, 50, 50);
    this.sprite.addImage(images.iceWand);

    /** @type {Image} */
    // this.iceBulletImage = images.iceBullet;

    this.setup();
  }

  onCastHit(wandHitBox, bulletSprite) {
    bulletSprite.changeImage("iceBullet");
  }
}
