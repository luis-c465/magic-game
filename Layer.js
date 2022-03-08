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
    for (let i = this.objects.length - 1; i >= 0; i--) {
      /** @type {GameObject} */
      let obj = this.objects[i];
      if (!obj.deleteCheck) {
        obj.update();
      } else {
        this.objects.splice(i, 1);
      }
    }
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
