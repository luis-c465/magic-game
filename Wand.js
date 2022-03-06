/**
 * Base class for wands
 * Contains cast function which creates a hit box sprite and onCastHit which is called when a bullet is hit by the hitBox
 */
class Wand extends GameObject {
  /**
   * @param {GameLayer} layer
   */
  constructor(layer) {
    super(layer);
    // Default sprite
    // this.sprite = createSprite(100, 100, 50, 50);

    // TODO: Add casting delay
    /** @type {boolean} */
    this.isCasting = false;

    /** @type {number} @default 0 */
    this.x = 0;

    /** @type {number} @default 0 */
    this.y = 0;

    /** @type {number} @default 0 */
    this.rotation = 0;

    this.wandHitBox = createSprite(this.x, this.y, 9999, 10);
    this.wandHitBox.immovable = true;
    this.wandHitBox.debug = true;

    this.sprites.push(this.wandHitBox);

    /** @type {gameSprite[]} */
    this.collidesWith = ["bullet"];
  }

  cast() {
    this.isCasting = true;
  }

  update() {
    this.wand.position.x = this.x;
    this.wand.position.y = this.y - 60;

    if (this.isCasting) {
      // bulletsLayer.objects.forEach((bullet) => {
      this.wandHitBox.position.x = this.x;
      this.wandHitBox.position.y = this.y;
      this.wandHitBox.rotation = this.rotation;

      this.updateCollisions();

      //   this.wandHitBox.collide(bullet.spriteGroup, this.onCastHit);
      // });

      this.isCasting = false;
    }
  }

  /**
   * Function called a bullet comes into contact with the wandHitBox
   * Likely will need to overridden by a class which inherits from this one
   *
   * @param {Sprite} bullet
   * @param {Sprite} wandHitBox
   */
  collisionWithBullet(wandHitBox, bullet) {
    // Do nothing
  }
}
