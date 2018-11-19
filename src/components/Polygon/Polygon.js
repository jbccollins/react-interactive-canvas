import PropTypes from "prop-types";

class Polygon {}

Polygon.drawEvents = ({ eventCtx, points, uniqueColor }) => {
    eventCtx.fillStyle = uniqueColor;
    eventCtx.beginPath();
    eventCtx.moveTo(points[0][0], points[0][1]);
    points.forEach(([x, y]) => {
        eventCtx.lineTo(x, y);
    })
    eventCtx.closePath();
    eventCtx.fill();
}

Polygon.draw = ({ ctx, points, fillStyle }) => {
    ctx.fillStyle = fillStyle;
    ctx.beginPath();
    ctx.moveTo(points[0][0], points[0][1]);
    points.forEach(([x, y]) => {
        ctx.lineTo(x, y);
    })
    ctx.closePath();
    ctx.fill();
}

Polygon.getPatch = () => {
  return new Promise((resolve, reject) => {
    resolve(null);
  });
}

Polygon.getEventsPatch = () => {
  return new Promise((resolve, reject) => {
    resolve(null);
  });
}

Polygon.propTypes = {
  points: PropTypes.array.isRequired,
  fillStyle: PropTypes.string.isRequired
};

Polygon.defaultProps = {
  fillStyle: "black",
};

export default Polygon;