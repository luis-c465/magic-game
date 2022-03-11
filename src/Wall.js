/**
 * Abstract class for wall objects
 */
class Wall extends GameObject {
  /**
   * @param {GameLayer} layer
   * @param {number} x
   * @param {number} y
   * @param {number} width
   * @param {number} height
   */
  constructor(layer, x, y, width = 100, height = 100) {
    super(layer);

    /** @type {Sprite} */
    this.sprite = createSprite(x, y, width, height);

    /** @type {number} */
    this.x = x;

    /** @type {number} */
    this.y = y;

    this.collidesWith = ["player", "bullet"];
    /** @type {typeCollisionType}  */
    this.collisionType = "collide";
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
    /** @param {Wall} wallType */
    const constructWall = (wallType) => {
      return new wallType(wallsLayer, wall.x, wall.y, wall.width, wall.height);
    };

    switch (wall.type) {
      case "indestructible":
        return constructWall(IndestructibleWall);

      case "destructible":
        return constructWall(DestructibleWall);

      default:
        return new constructWall(DestructibleWall);
    }
  }
}
