/**
 * Base class for wands
 * Contains cast function which creates a hit box sprite and onCastHit which is called when a bullet is hit by the hitBox
 */
class Wand extends GameObject {
  constructor() {
    super();

    /** @type {boolean} */
    this.isCasting = false;

    /** @type 0 @default 0 */
    this.x = 0;

    /** @type 0 @default 0 */
    this.y = 0;

    this.wandHitBox = createSprite(this.x, this.y, 9999, 600);
    this.wandHitBox.visible = false;
    this.wandHitBox.immovable = true;
    this.wandHitBox.debug = true;
  }

  cast() {
    this.wandHitBox.position.x = this.x;
    this.wandHitBox.position.y = this.y;

    this.isCasting = true;
  }

  update() {
    if (this.isCasting) {
      bullets.forEach((bullet) => {
        this.wandHitBox.collide(bullet.spriteGroup, this.onCastHit);
      });

      this.isCasting = false;
    }
  }

  // /**
  //  * Function called a bullet comes into contact with the wandHitBox
  //  * Throws an error when called and not overridden by a class which inherits from this one
  //  */
  // onCastHit() {
  //   throw Error("function onCastHit not implemented");
  // }
}
