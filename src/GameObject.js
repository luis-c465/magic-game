/**
 * Base class for game objects
 * Adds all sprite for the game object into a p5.play group
 *
 * @typedef {"player" | "bullet" | "wall" | "wand"} gameSprite
 *
 * @typedef {(collidedWith: GameObject, self, GameObject) => void} collisionWith
 * @typedef {"collide" | "overlap"} typeCollisionType
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

    /**
     * The current life of the GameObject
     *
     * When 0 or less the GameObject will be deleted
     * @default 1
     */
    this.life = 1;

    /** @type {number} @default 1 */
    this.movementSpeed = 1;

    /**
     * The number of times that the players `update` function has been called
     *  @type {number}
     * @default 0
     */
    this.updates = 0;

    /**
     * Function called when the current life of the GameObject less than or equal to 0
     */
    this.whenNoLife = () => {};

    /** @type {typeCollisionType} @default overlap */
    this.collisionType = "overlap";

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

    this._collidesWith(playerLayer, "player");
    this._collidesWith(bulletsLayer, "bullet");
    this._collidesWith(wallsLayer, "wall");
    this._collidesWith(wandsLayer, "wand");

    // if (this.collidesWith.includes("player")) {
    //   this.spriteGroup.collide(
    //     player.spriteGroup,
    //     this._collisionWith("Player")
    //   );
    // }

    // if (this.collidesWith.includes("bullet")) {
    //   bullets.forEach((bullet) => {
    //     this.spriteGroup.collide(
    //       bullet.spriteGroup,
    //       this._collisionWith("Bullet")
    //     );
    //   });
    // }

    // if (this.collidesWith.includes("wall")) {
    //   walls.forEach((wall) => {
    //     this.spriteGroup.collide(wall.spriteGroup, this._collisionWith("Wall"));
    //   });
    // }
  }

  /**
   * Updates the collisions for that layer and calls `_collisionWith` if there is a collision
   *
   * @param {Layer} layer
   * @param {string} name
   */
  _collidesWith(layer, name) {
    if (!this.collidesWith.includes(name)) return;

    layer.objects.forEach((obj) => {
      this.spriteGroup[obj.collisionType](
        obj.spriteGroup,
        this._collisionWith(capitalizeFirstLetter(name), obj)
      );
    });
  }

  /**
   * Function that should be called before any other in the game objects update method
   *
   * @return {boolean} Returns if the update function should continue executing
   */
  _preUpdate() {
    // If sprites life is zero (sprite does not exist) remove the sprites from the screen
    // and set object to be deleted
    if (this.life <= 0) {
      this.deleteCheck = true;
      this.whenNoLife();
    }

    if (this.sprite?.life === 0) {
      this.deleteCheck = true;
    }
    if (this.deleteCheck) {
      this.spriteGroup.removeSprites();
      return false;
    }

    if (!this.updateCheck) {
      return false;
    }

    this.updates++;
    this.preUpdate();
    return true;
  }

  /**
   * Function that should be called last in the game object `update` method
   *
   * Updates the object collisions and the objects movements
   */
  _postUpdate() {
    this.postUpdate();

    this.updateMovement();
    this.updateCollisions();
  }

  /**
   * If the function `collideWith${spriteName}` exists on the game object it will be returned
   * else a function which does nothing is returned
   *
   * @param {gameSprite} spriteName
   * @returns {(...args) => (collidedWith: Sprite, self: Sprite) => void}
   */
  _collisionWith(spriteName, collidedWith) {
    /** @type  {(collidedWith: Sprite, self: Sprite) => void} */
    const collisionWithSpriteName = this[`collisionWith${spriteName}`];

    // If collisionWithSpriteName exists return it
    // Else return a function which does nothing
    if (collisionWithSpriteName != undefined) {
      // Returns a function which takes any amount of arguments which then calls the function
      return (...args) =>
        collisionWithSpriteName.call(this, collidedWith, ...args);
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
    if (!this._preUpdate()) return false;

    this._update();

    this._postUpdate();
  }

  /**
   * Function called in `_preUpdate` should be overridden to add extra functionality before updating the game object
   */
  preUpdate() {}

  /**
   * Function called in `_postUpdate` should be overridden to add extra functionality after updating the game object
   */
  postUpdate() {}

  /**
   * Updates the gameObject
   * Should be overridden by inheriting classes
   *
   * Should not be called directly (PRIVATE METHOD)
   * @private
   */
  _update() {
    // Do nothing
  }

  /**
   * Displays the GameObject.
   *
   * Does nothing as p5.play automatically handles displaying sprites
   *
   * Will only work run code if `this.drawCheck` is set to `true`.
   * Should be overridden by inheriting objects
   */
  display() {
    this.spriteGroup.draw();
  }

  /** @param {Player} player */
  collisionWithPlayer(player) {}

  /** @param {Bullet} bullet */
  collisionWithBullet(bullet) {}

  /** @param {Wall} wall */
  collisionWithWall(wall) {}

  _preUpdateMovement() {
    if (this.isMoving === undefined) {
      this.isMoving = false;
      this._updateAttachmentsPositions();
    }

    if (this.isMoving) {
      this._updateAttachmentsPositions();
    }
  }

  /**
   * Updates the position of objects that are attached to the `GameObject`
   */
  _updateAttachmentsPositions() {}

  /**
   * Updates the movement of `GameObject`
   * Should be overridden by inheriting Classes
   * @private
   */
  _updateMovement() {}

  updateMovement() {
    this._preUpdateMovement();
    this._updateMovement();
  }
}
