import { between } from '../helpers.js';

class RectangleArea {
  constructor(x1, y1, x2, y2) {
    this.x1 = x1;
    this.y1 = y1;
    this.x2 = x2;
    this.y2 = y2;
  }

  contains(x, y) {
    return between(x, this.x1, this.x2) && between(y, this.y1, this.y2);
  }

  tostring() {
    const { x1, y1, x2, y2 } = this;

    return `${x1},${y1},${x2},${y2}`;
  }
}

export default RectangleArea;
