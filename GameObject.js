/**
 * Base class for game objects
 * Adds all sprite for the game object into a p5.play group
 *
 * @typedef {"player" | "bullet" | "wall"} gameSprite
 */
class GameObject {
  constructor() {
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
   * Depends on `this.collidesWith` so adding "Player" to the array will call `this.collisionWithPlayer`
   *
   * Should be called in the update function to have the Object collide with things
   */
  updateCollisions() {
    // TODO: Change order of parameters by changing from self.collide to sprite.collide
    if (this.collidesWith.includes("player")) {
      this.spriteGroup.collide(
        player.spriteGroup,
        this._collisionWith("player")
      );
    }

    if (this.collidesWith.includes("bullet")) {
      bullets.forEach((bullet) => {
        this.spriteGroup.collide(
          bullet.spriteGroup,
          this._collisionWith("bullet")
        );
      });
    }

    if (this.collidesWith.includes("wall")) {
      walls.forEach((wall) => {
        this.spriteGroup.collide(wall.spriteGroup, this._collisionWith("wall"));
      });
    }
  }

  /**
   * If the function `collideWith${spriteName}` exists on the game object it will be returned
   * else a function which does nothing is returned
   *
   * @param {gameSprite} spriteName
   * @returns {(self: Sprite, collidedWith: Sprite) => void}
   */
  _collisionWith(spriteName) {
    const collisionWithSpriteName = this[`collisionWith${spriteName}`];

    // If collisionWithSpriteName exists return it
    // Else return a function which does nothing
    if (collisionWithSpriteName != null) {
      return collisionWithSpriteName;
    } else {
      return () => {
        // Do nothing
      };
    }
  }
}
