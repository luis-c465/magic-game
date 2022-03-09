/**
 * Abstract class for levels
 *
 * @typedef {{x: number, y:number, type: "horizontalIndestructible" | "verticalIndestructible" | "smallIndestructible"}} wallJSON
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
          wallsLayer.objects = value.map(Wall.loadWallJSON);
          break;

        default:
          break;
      }
    }
  }
}
