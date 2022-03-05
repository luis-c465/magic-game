class Wall extends GameObject {
  /**
   * @param {number} x
   * @param {number} y
   */
  constructor(x, y) {
    super();

    /** @type {number} @constant @default */
    this.WALL_WIDTH = 100;

    /** @type {number} @constant  @default 100 */
    this.WALL_HEIGHT = 100;

    /** @type {number} */
    this.x = x;

    /** @type {number} */
    this.y = y;

    this.collidesWith = ["player", "bullet"];
  }

  update() {
    // Prevents crash when sprite has not been set yet
    if (!this.sprite) return;

    this.updateCollisions();
  }

  /**
   * @param {Sprite} bullet
   * @param {Sprite} player
   */
  collisionWithPlayer(wall, player) {
    // Do nothing
  }
}
