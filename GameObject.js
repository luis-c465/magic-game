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
}
