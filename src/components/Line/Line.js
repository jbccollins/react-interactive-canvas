import PropTypes from "prop-types";

class Line {}

Line.drawEvents = ({ eventCtx, points, lineWidth, uniqueColor }) => {
    eventCtx.strokeStyle = uniqueColor;
    eventCtx.lineWidth = lineWidth;
    eventCtx.beginPath();
    eventCtx.moveTo(points[0][0], points[0][1]);
    points.forEach(([x, y]) => {
        eventCtx.lineTo(x, y);
    })
    eventCtx.stroke();
}

Line.draw = ({ ctx, points, lineWidth, strokeStyle }) => {
    ctx.strokeStyle = strokeStyle;
    ctx.beginPath();
    ctx.lineWidth = lineWidth;
    ctx.moveTo(points[0][0], points[0][1]);
    points.forEach(([x, y]) => {
        ctx.lineTo(x, y);
    })
    ctx.stroke();
}

Line.getPatch = () => {
  return new Promise((resolve, reject) => {
    resolve(null);
  });
}

Line.getEventsPatch = () => {
  return new Promise((resolve, reject) => {
    resolve(null);
  });
}

Line.propTypes = {
  points: PropTypes.array.isRequired,
  strokeStyle: PropTypes.string.isRequired,
  lineWidth: PropTypes.number.isRequired
};

export default Line;