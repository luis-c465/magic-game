/**
 * Base class for game objects
 * Adds all sprite for the game object into a p5.play group
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
     * @typedef {"player" | "bullet" | "wall"} gameSprite
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
   * Depends on `this.collidesWith` so adding "Player" to the array will call `this.collisionWithPlayer`
   * Should be called in the update function to have the Object collide with things
   */
  updateCollisions() {
    // TODO: Change order of parameters by changing from self.collide to sprite.collide
    if (this.collidesWith.includes("player")) {
      this.spriteGroup.collide(player.spriteGroup, this.collisionWithPlayer);
    }

    if (this.collidesWith.includes("bullet")) {
      bullets.forEach((bullet) => {
        this.spriteGroup.collide(bullet.spriteGroup, this.collisionWithBullet);
      });
    }

    if (this.collidesWith.includes("wall")) {
      walls.forEach((wall) => {
        this.spriteGroup.collide(wall.spriteGroup, this.collisionWithWall);
      });
    }
  }

  /**
   * Function called colliding with a player
   *
   * @param {Sprite} self
   * @param {Sprite} player
   */
  collisionWithPlayer(self, player) {
    // Do nothing
  }

  /**
   * Function called when colliding with a bullet
   *
   * @param {Sprite} self
   * @param {Sprite} bullet
   */
  collisionWithBullet(self, bullet) {
    // Do nothing
  }

  /**
   * Function called when colliding with a wall
   *
   * @param {Sprite} self
   * @param {Sprite} wall
   */
  collisionWithWall(self, wall) {
    // Do nothing
  }
}
