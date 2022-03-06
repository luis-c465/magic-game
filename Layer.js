/** @template [T=GameObject] */
class Layer {
  constructor() {
    /** @type {T[]} */
    this.objects = [];
  }

  /**
   * Adds a new object to `this.objects`
   *
   * @param {T} object
   */
  add(object) {
    this.objects.push(object);
  }

  /**
   * Updates all the objects in the layer.
   *
   * Note: Its is important that each object in `this.objects` has its own `update()` method
   * and `.deleteCheck` field
   */
  update() {
    this.objects.forEach((obj) => {
      obj.update();
    });
  }

  /**
   * Displays all the objects in the layer
   *
   * Note: It is important that all objects in `this.objects` has its own `display()` method
   */
  display() {
    this.objects.forEach((obj) => {
      obj.display();
    });
  }
}
