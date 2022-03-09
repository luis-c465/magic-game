/**
 * Abstract class for levels
 *
 * @typedef {{x: number, y:number, type: "destructible" | "indestructible"}} wallJSON
 *
 * @typedef {"walls"} levelJSONObject
 * @typedef {{walls?: wallJSON}} levelJSON
 */
class Level {
  /**
   * @param {number} levelNum
   */
  constructor(levelNum) {
    /**
     * Level JSON
     * To be used later in the class to load the level
     *
     * @type {levelJSON}
     * @private
     */
    this._data = levels[levelNum];

    this._loadData();
  }

  /**
   * @private
   */
  _loadData() {
    // FIXME:
    // Loop through all keys and value pairs in the _data
    for (let [key, value] of Object.entries(this._data)) {
      switch (key) {
        case "walls":
          wallsLayer.deleteAll();
          wallsLayer.objects = value.map(this._loadWallJSON);
          break;

        default:
          break;
      }
    }
  }

  /**
   * Converts a JSON object to a wall
   *
   * @param {wallJSON} wall
   * @return {Wall}
   */
  _loadWallJSON(wall) {
    switch (wall.type) {
      case "indestructible":
        return new IndestructibleWall(wallsLayer, wall.x, wall.y);

      case "destructible":
        return new DestructibleWall(wallsLayer, wall.x, wall.y);

      case "verticalIndestructible":
        return new VerticalIndestructibleWall(wallsLayer, wall.x, wall.y);

      case "horizontalIndestructible":
        return new HorizontalIndestructibleWall(wallsLayer, wall.x, wall.y);

      default:
        return new IndestructibleWall(wallsLayer, wall.x, wall.y);
    }
  }
}
