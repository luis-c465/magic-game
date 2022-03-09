/**
 * Abstract class for wall objects
 */
class Wall extends GameObject {
  /**
   * @param {GameLayer} layer
   * @param {number} x
   * @param {number} y
   */
  constructor(layer, x, y) {
    super(layer);

    /** @type {number} @constant @default */
    this.WALL_WIDTH = 50;

    /** @type {number} @constant  @default 100 */
    this.WALL_HEIGHT = 50;

    /** @type {Sprite} */
    this.sprite = createSprite(x, y, this.WALL_WIDTH, this.WALL_HEIGHT);

    /** @type {number} */
    this.x = x;

    /** @type {number} */
    this.y = y;

    this.collidesWith = ["player", "bullet"];
  }

  _update() {
    // Do nothing
  }
}
