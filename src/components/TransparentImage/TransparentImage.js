import PropTypes from "prop-types";
class TransparentImage {}

TransparentImage.drawEvents = ({ eventCtx, x, y, width, height, patch }) => {
  eventCtx.drawImage(patch, x, y, width, height);
};

TransparentImage.draw = ({ ctx, x, y, width, height, patch }) => {
  ctx.drawImage(patch, x, y, width, height);
};

TransparentImage.getEventsPatch = ({ x, y, width, height, uniqueColor }) => {
  return new Promise((resolve, reject) => {
    const tempCanvas = document.createElement( "canvas" );
    tempCanvas.width = width;
    tempCanvas.height = height;
    const tempCtx = tempCanvas.getContext( "2d" );
    const img = new Image();
    img.onload = () => {
      tempCtx.drawImage(img, 0, 0, width, height);
      // Mask the image
      tempCtx.globalCompositeOperation = "source-in";
      tempCtx.fillStyle = uniqueColor;
      tempCtx.fillRect(0, 0, width, height);
      resolve(tempCanvas);
    };
    img.onerror = () => {
      reject();
    };
    img.src = `${process.env.PUBLIC_URL}/penguin-with-transparent-background.gif`;
  });
}

TransparentImage.getPatch = ({ x, y, width, height }) => {
  return new Promise((resolve, reject) => {
    const tempCanvas = document.createElement( "canvas" );
    tempCanvas.width = width;
    tempCanvas.height = height;
    const tempCtx = tempCanvas.getContext( "2d" );
    const img = new Image();
    img.onload = () => {
      tempCtx.drawImage(img, 0, 0, width, height);
      //ctx.drawImage(img, x, y, width, height);
      resolve(tempCanvas);
    };
    img.onerror = () => {
      reject();
    };
    img.src = `${process.env.PUBLIC_URL}/penguin-with-transparent-background.gif`;
  });
}

TransparentImage.propTypes = {
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired
};

TransparentImage.defaultProps = {
};

export default TransparentImage
