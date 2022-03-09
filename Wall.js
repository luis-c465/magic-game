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

  /**
   * Converts a JSON object to a wall
   * Called by the `level` class
   *
   * @param {wallJSON} wall
   * @return {Wall}
   */
  static loadWallJSON(wall) {
    switch (wall.type) {
      case "smallIndestructible":
        return new SmallIndestructibleWall(wallsLayer, wall.x, wall.y);

      case "verticalIndestructible":
        return new VerticalIndestructibleWall(wallsLayer, wall.x, wall.y);

      case "horizontalIndestructible":
        return new HorizontalIndestructibleWall(wallsLayer, wall.x, wall.y);

      default:
        return new SmallIndestructibleWall(wallsLayer, wall.x, wall.y);
    }
  }
}
