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

    this.NUM_HIT_BOXES = 20;
    this.HIT_BOX_SIZE = 50;
    /** @type {Vector} */
    this.trajectory = createVector(0, 0);

    /** @type {number} @default 0 */
    this.x = 0;

    /** @type {number} @default 0 */
    this.y = 0;

    /** @type {number} @default 0 */
    this.rotation = 0;

    /** @type {Sprite[]} */
    this.hitBox = [];

    this.wandHitBox = createSprite(this.x, this.y, 9999, 10);
    this.wandHitBox.immovable = true;
    this.wandHitBox.debug = true;

    this.sprites.push(...this.hitBox);

    /** @type {gameSprite[]} */
    this.collidesWith = ["bullet"];
  }

  cast() {
    this._updateHitBox();
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

  /**
   * Returns an array of sprites which represents the wands hit box
   *
   * @returns {Sprite[]}
   */
  _updateHitBox() {
    // Remove all sprites from the hit box
    this.hitBox.forEach((sprite) => sprite.remove());

    // Create a range of hit boxes between current position and trajectory
    this.hitBox = range(
      0,
      max(windowWidth, windowHeight) / 10_000,
      1 / (this.NUM_HIT_BOXES * 10)
    ).map((n) => {
      const positionVector = createVector(this.x, this.y);
      const vectorBetween = positionVector.lerp(this.trajectory, n);

      const sprite = createSprite(
        vectorBetween.x,
        vectorBetween.y,
        this.HIT_BOX_SIZE,
        this.HIT_BOX_SIZE
      );
      sprite.setCollider("circle");
      sprite.immovable = true;
      // sprite.visible = false;

      sprite.debug = true;
      // this.hitBox.push(sprite);
      return sprite;
    });

    circle(this.trajectory.x, this.trajectory.y, 100);

    this.sprites = this.hitBox;
    // Remakes the group for the game object
    this.setup();
  }
}
