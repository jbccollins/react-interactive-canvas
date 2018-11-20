import PropTypes from "prop-types";
class Circle {}

Circle.drawEvents = ({ eventCtx, x, y, radius, uniqueColor }) => {
  /* SAFE CIRCLE (slow) */
  // const r = radius - 0.5;
  // eventCtx.fillStyle = uniqueColor;

  // for (let y2 = -r; y2 <= r; y2++) {
  //   for (let x2 = -r; x2 <= r; x2++) {
  //     if (x2 * x2 + y2 * y2 <= r * r) {
  //       eventCtx.fillRect(x + x2 + r, y + y2 + r, 1, 1);
  //     }
  //   }
  // }
  /* END SAFE CIRCLE */

  eventCtx.fillStyle = uniqueColor;
  eventCtx.beginPath();
  //eventCtx.arc(x + radius, y + radius, radius, 0, 2 * Math.PI);
  eventCtx.arc(x, y, radius, 0, 2 * Math.PI);
  eventCtx.fill();
};

Circle.draw = ({ ctx, x, y, radius, fillStyle }) => {
  ctx.fillStyle = fillStyle;
  ctx.beginPath();
  //ctx.arc(x + radius, y + radius, radius, 0, 2 * Math.PI);
  ctx.arc(x, y, radius, 0, 2 * Math.PI);
  ctx.fill();
};

Circle.getPatch = () => {
  return new Promise((resolve, reject) => {
    resolve(null);
  });
}

Circle.getEventsPatch = () => {
  return new Promise((resolve, reject) => {
    resolve(null);
  });
}

Circle.propTypes = {
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  radius: PropTypes.number.isRequired,
  fillStyle: PropTypes.string.isRequired
};

Circle.defaultProps = {
  fillStyle: "black"
};

export default Circle
