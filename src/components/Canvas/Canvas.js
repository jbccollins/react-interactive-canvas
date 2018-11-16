import React from "react";
import PropTypes from "prop-types";
import { getRgbFromEvent, shallowArrayEquality } from "../../utilities";
import ColorTracker from 'canvas-color-tracker';
import styles from './Canvas.scss';

// Extendable class to standardize how drawing is done
class BaseCanvasChild extends React.Component {
  shouldComponentUpdate() {
    return false;
  }
  render() {
    return false;
  }
}

class Canvas extends React.Component {
  state = {
    ctx: null,
    eventCtx: null,
    colors: new ColorTracker(),
    ids: {},
  };

  shouldComponentUpdate(nextProps, nextState) {
    const { width, height, children } = this.props;
    const { ctx, eventCtx } = this.state;
    return (
      nextProps.width !== width ||
      nextProps.height !== height ||
      nextState.ctx !== ctx ||
      nextState.eventCtx !== eventCtx ||
      !shallowArrayEquality(
        React.Children.toArray(children).map(({id}) => id),
        React.Children.toArray(nextProps.children).map(({id}) => id)
      )
    );
    return true;
  }

  constructor(props) {
    super(props);
    this.canvasRef = React.createRef();
    this.eventCanvasRef = React.createRef();
    this.handleEvent = this.handleEvent.bind(this);
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const ids = {};
    const colors = new ColorTracker();

    React.Children.toArray(nextProps.children).forEach(
      ({ props: { id, onClick } }, index) => {
        ids[id] = {
          color: colors.register(id),
          onClick,
        }
      }
    );
    return { colors, ids };
  }

  componentDidMount() {
    const eventCtx = this.eventCanvasRef.current.getContext("2d");
    eventCtx.msImageSmoothingEnabled = false;
    eventCtx.imageSmoothingEnabled = false;
    this.setState({
      ctx: this.canvasRef.current.getContext("2d"),
      eventCtx
    });
  }

  handleEvent = e => {
    const { colors, ids } = this.state;
    const rgb = getRgbFromEvent(e, this.eventCanvasRef.current);
    if (rgb === null) {
      return;
    }
    const id = colors.lookup(rgb);
    if (!id) {
      return;
    }
    switch (e.type) {
      case "click":
        if(ids[id]['onClick']) {
          ids[id]['onClick'](id);
        }
        break;
      default:
        console.error(
          `"${
            e.type
          }" is not currently supported by react-interactive-canvas :(`
        );
    }
  };

  clearCanvases = () => {
    const { ctx, eventCtx } = this.state;
    const { width, height } = this.props;
    if (ctx) {
      ctx.clearRect(0, 0, width, height);
    }
    if (eventCtx) {
      eventCtx.clearRect(0, 0, width, height);
    }
  };

   drawPatches = () => {
    const { ctx, eventCtx, ids } = this.state;
    const { children } = this.props;

    const childrenArr = React.Children.toArray(children);
    Promise.all(childrenArr.map(child => {
      return child.type.getPatch({...child.props});
    })).then(patches => {
      childrenArr.forEach((child, i) => {
        const patch = patches[i];
        child.type.draw({...child.props, ctx, patch});
      })
    })

    Promise.all(childrenArr.map(child => {
      const uniqueColor = ids[child.props.id]['color'];
      return child.type.getEventsPatch({...child.props, uniqueColor});
    })).then(patches => {
      childrenArr.forEach((child, i) => {
        const uniqueColor = ids[child.props.id]['color'];
        const patch = patches[i];
        child.type.drawEvents({...child.props, eventCtx, patch, uniqueColor});
      })
    })

  }

  render() {
    const { ctx, eventCtx, ids } = this.state;
    const { width, height, children } = this.props;
    this.clearCanvases();

    return (
      <div
        className="Canvas"
        style={{ width: width + "px", height: height + "px" }}
      >
        <canvas
          className={`${styles.EventCanvas} ${styles.Canvas}`}
          width={width}
          height={height}
          ref={this.eventCanvasRef}
        />
        <canvas
          className={`${styles.Canvas}`}
          width={width}
          height={height}
          ref={this.canvasRef}
          onClick={this.handleEvent}
        />
        {ctx && eventCtx && this.props.children && 
          this.drawPatches()
        }
      </div>
    );
  }
}

Canvas.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired
};

export default Canvas;
export { Canvas, BaseCanvasChild };
