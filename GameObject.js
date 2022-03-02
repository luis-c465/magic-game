export default class GameObject {
  constructor(p5) {
    this.p5 = p5;
    this.group = new p5.Group();
    this.sprites = [];
  }

  setup() {
    this.sprites.forEach((sprite) => {
      this.group.add(sprite);
    });
  }
}
