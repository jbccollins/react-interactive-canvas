import PropTypes from "prop-types";

class Rectangle {}

Rectangle.drawEvents = ({ eventCtx, x, y, width, height, uniqueColor }) => {
    eventCtx.fillStyle = uniqueColor;
    eventCtx.fillRect(x, y, width, height);
}

Rectangle.draw = ({ ctx, x, y, width, height, fillStyle }) => {
    ctx.fillStyle = fillStyle;
    ctx.fillRect(x, y, width, height);
}

Rectangle.getPatch = () => {
  return new Promise((resolve, reject) => {
    resolve(null);
  });
}

Rectangle.getEventsPatch = () => {
  return new Promise((resolve, reject) => {
    resolve(null);
  });
}

Rectangle.propTypes = {
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  fillStyle: PropTypes.string.isRequired,
};

Rectangle.defaultProps = {
  fillStyle: "black",
};

export default Rectangle;