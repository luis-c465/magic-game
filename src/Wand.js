/**
 * Base class for wands
 * Contains cast function which creates a hit box sprite and onCastHit which is called when a bullet is hit by the hitBox
 */
class Wand extends GameObject {
  /**
   * @param {GameLayer} layer
   * @param {GameObject} owner
   */
  constructor(layer, owner) {
    super(layer);

    this.owner = owner;

    this.wand = createSprite(10, 10, 50, 50);
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

    this.sprites.push(this.wand, ...this.hitBox);

    /** @type {gameSprite[]} */
    this.collidesWith = ["bullet"];
  }

  cast() {
    this.isCasting = true;
  }

  /**
   * Overrides the update function
   * @override
   *
   * Update collision should only be called if the player is casting the wand currently
   */
  update() {
    if (!this.preUpdate()) return;

    this.wand.position.x = this.x + 32;
    this.wand.position.y = this.y;

    // FIXME: Does not call `postUpdate`. May cause error in the future!
    if (this.isCasting) {
      this._updateHitBox();
      this.updateCollisions();

      this.isCasting = false;
    }
  }

  /**
   * Function called a bullet comes into contact with the wandHitBox
   * Likely will need to overridden by a class which inherits from this one
   *
   * @type {collisionWith}
   */
  collisionWithBullet(self, wandHitBox, bullet) {
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
      max(windowWidth, windowHeight) / 90_000,
      1 / (this.NUM_HIT_BOXES * 90)
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
      sprite.visible = false;

      sprite.debug = true;
      // this.hitBox.push(sprite);
      return sprite;
    });

    circle(this.trajectory.x, this.trajectory.y, 100);

    this.sprites = this.hitBox;
    // Remakes the group for the game object
    this.setup();
  }

  hide() {
    this.wand.visible = false;
  }

  show() {
    this.wand.visible = true;
  }
}
