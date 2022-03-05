class Wall extends GameObject {
  /**
   * @param {number} x
   * @param {number} y
   */
  constructor(x, y) {
    super();

    /** @type {number} */
    this.x = x;

    /** @type {number} */
    this.y = y;

    this.sprite = createSprite(x, y, 100, 100);

    // Enable debugging for sprite
    this.sprite.debug = true;
    // this.sprite.immovable = true;

    this.setup();
  }

  update() {
    // Do something here
  }
}
