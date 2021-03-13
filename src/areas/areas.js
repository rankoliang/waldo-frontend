import RectangleArea from './rectangleArea';

class Areas {
  constructor(areas) {
    for (const [character, area] of Object.entries(areas)) {
      this.register(character, area);
    }
  }

  register(character, area) {
    this[character] = area;
  }

  containing(x, y) {
    const result = {};

    for (const [character, area] of Object.entries(this)) {
      result[character] = area.contains(x, y);
    }

    return result;
  }
}

const areas = new Areas({
  waldo: new RectangleArea(1133, 282, 1215, 399),
  odlaw: new RectangleArea(521, 1243, 589, 1357),
  wizard: new RectangleArea(1893, 46, 1957, 130),
});

export default areas;
