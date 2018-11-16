const findPos = obj => {
  let current_left = 0;
  let current_top = 0;
  if (obj.offsetParent) {
    do {
      current_left += obj.offsetLeft;
      current_top += obj.offsetTop;
    } while ((obj = obj.offsetParent));
    return { x: current_left, y: current_top };
  }
  return undefined;
};

const rgbToHex = (r, g, b) => {
  if (r > 255 || g > 255 || b > 255) {
    throw new Error("Invalid color component");
  }
  return ((r << 16) | (g << 8) | b).toString(16);
};

const getImageDataFromEvent = (e, canvas) => {
  const position = findPos(canvas);
  const x = e.pageX - position.x;
  const y = e.pageY - position.y;
  const ctx = canvas.getContext("2d");
  return ctx.getImageData(x, y, 1, 1).data;
};

const getHexFromEvent = (e, canvas) => {
  const p = getImageDataFromEvent(e, canvas);
  if (p[3] === 0) {
    return null;
  }
  return "#" + ("000000" + rgbToHex(p[0], p[1], p[2])).slice(-6);
};

const getRgbFromEvent = (e, canvas) => {
  const p = getImageDataFromEvent(e, canvas);
  if (p[3] === 0) {
    return null;
  }
  return [p[0], p[1], p[2]];
};

const generateRandomHex = () =>
  "#" + Math.floor(Math.random() * 16777215).toString(16);

//https://stackoverflow.com/a/11012314
const decimalToHex = n =>
  `#${("000000" + n.toString(16).toUpperCase()).substr(-6)}`;

const shallowArrayEquality = (array1, array2) => {
  return array1.length === array2.length && array1.every((value, index) => value === array2[index])
}

export { findPos, rgbToHex, getHexFromEvent, getRgbFromEvent, decimalToHex, generateRandomHex, shallowArrayEquality };
