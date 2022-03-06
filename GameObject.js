/**
 * Base class for game objects
 * Adds all sprite for the game object into a p5.play group
 *
 * @typedef {"player" | "bullet" | "wall"} gameSprite
 */
class GameObject {
  /**
   * @param {GameLayer} layer Layer that the game object will be added to
   */
  constructor(layer) {
    /** @type {Group} */
    this.spriteGroup = new Group();
    /** @type {Sprite[]} */
    this.sprites = [];
    /** @type {Sprite} */
    this.sprite = undefined;

    /**
     * The array of game sprites that the gameObject can collide with
     *
     * @type {gameSprite[]}
     * @default []
     */
    this.collidesWith = [];

    // State machine variables
    /**
     * Controls weather the GameObject will be drawn to the screen
     * @type {boolean}
     * @default true
     */
    this.drawCheck = true;

    /**
     * Controls weather the GameObject will be updated
     * @type {boolean}
     * @default true
     */
    this.updateCheck = true;

    /**
     * Controls weather the GameObject will be deleted
     * @type {boolean}
     * @default false
     */
    this.deleteCheck = false;

    /**
     * Controls weather the GameObject will collide with other objects
     * @type {boolean}
     * @default true
     */
    this.collisionCheck = true;

    /** @type {GameLayer} */
    this.layer = layer;
    layer.add(this);
  }

  /**
   * Does the setup for the game object.
   * Adds all the sprites into a group so they will be rendered together on the same layer
   */
  setup() {
    if (this.sprite) {
      this.spriteGroup.add(this.sprite);
    } else {
      this.sprites.forEach((sprite) => {
        this.spriteGroup.add(sprite);
      });
    }
  }

  /**
   * Updates the collisions for the game object
   *
   * Depends on `this.collidesWith` so adding `"Player"` to the array will call `this.collisionWithPlayer`
   *
   * Should be called in the update function to have the Object collide with things
   */
  updateCollisions() {
    // If false returns and stops executing the function
    if (!this.collisionCheck) return;

    if (this.collidesWith.includes("player")) {
      this.spriteGroup.collide(
        player.spriteGroup,
        this._collisionWith("Player")
      );
    }

    if (this.collidesWith.includes("bullet")) {
      bullets.forEach((bullet) => {
        this.spriteGroup.collide(
          bullet.spriteGroup,
          this._collisionWith("Bullet")
        );
      });
    }

    if (this.collidesWith.includes("wall")) {
      walls.forEach((wall) => {
        this.spriteGroup.collide(wall.spriteGroup, this._collisionWith("Wall"));
      });
    }
  }

  /**
   * Deletes the game objects sprite then deletes the object if `this.deleteCheck` is set to `true`
   * Will be called even if `this.updateCheck === false`
   */
  updateDelete() {
    // If false returns and stops executing the function
    if (!this.deleteCheck) return;

    this.spriteGroup.removeSprites();
    delete this;
  }

  /**
   * If the function `collideWith${spriteName}` exists on the game object it will be returned
   * else a function which does nothing is returned
   *
   * @param {gameSprite} spriteName
   * @returns {(collidedWith: Sprite, self: Sprite) => void}
   */
  _collisionWith(spriteName) {
    const collisionWithSpriteName = this[`collisionWith${spriteName}`];

    // If collisionWithSpriteName exists return it
    // Else return a function which does nothing
    if (collisionWithSpriteName != undefined) {
      return collisionWithSpriteName;
    } else {
      return () => {
        // Do nothing
      };
    }
  }

  /**
   * Updates the GameObject.
   *
   * Will only work run code if `this.updateCheck` is set to `true`.
   * Should be overridden by inheriting objects
   */
  update() {
    // Does nothing
  }

  /**
   * Displays the GameObject.
   *
   * Will only work run code if `this.drawCheck` is set to `true`.
   * Should be overridden by inheriting objects
   */
  display() {
    // Does nothing
  }
}
