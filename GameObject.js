export default class GameObject {
  constructor(p5) {
    this.p5 = p5;
    this.group = new p5.Group();
    this.sprites = [];
  }

  setup() {
    if (this.sprite) {
      this.group.add(this.sprite);
    } else {
      this.sprites.forEach((sprite) => {
        this.group.add(sprite);
      });
    }
  }
}
