import React, { Component } from 'react'

import { Canvas, Rectangle, TransparentImage, Circle, Polygon, Line } from 'react-interactive-canvas'

const RECTANGLE = "rectangle";
const CIRCLE = "circle";
const POLYGON = "polygon";
export default class App extends Component {
  state = {
    customItems:[
      {
        type: RECTANGLE,
        x: 80,
        y: 55,
        width: 40,
        height: 50,
        fillStyle: 'red',
        id: `red-rectangle`
      }
    ],
    eventLog: [],
    [RECTANGLE]: {
      x: 10,
      y: 10,
      width: 50,
      height: 200,
      id: "UNIQUE_RECTANGLE_ID",
      fillStyle: "#ff0000"
    },
    [CIRCLE]: {
      x: 30,
      y: 30,
      radius: 30,
      id: "UNIQUE_CIRCLE_ID",
      fillStyle: "#ff00ff"  
    },
    [POLYGON]: {
      points: [
        [10, 10],
        [20, 40],
        [50, 5]
      ],
      fillStyle: "#00ffff",
      id: 'derpy-polygon'
    }
  };
  handleClick = id => {
    this.setState({
      eventLog: this.state.eventLog.concat({
        type: 'click',
        time: new Date(),
        id
      }).slice(-20)
    });
  }

  handleItemCreateChange = (type, property, e) => {
    const newItem = {
      ...this.state[type],
      [property]: e.target.value
    }
    this.setState({
      [type]: newItem
    });
  }

  handleItemAdd = type => {
    const { id } = this.state[type];
    if (this.state.customItems.some(i => i.id === id)) {
      alert(`Duplicate ID ${id} is not allowed`);
      return;
    }
    this.setState({
      customItems: this.state.customItems.concat({
        ...this.state[type],
        type
      })
    })
  }

  render() {
    const { rectangle, circle, polygon, customItems, eventLog } = this.state;
    return (
      <main>
        <div className="event-log">
          <div className="events-container">
            <div>Event Log</div>
            <div>
              {eventLog.map(({type, time, id}) => {
                return (
                  <div key={Math.random()}>
                    <span>{time.toLocaleTimeString()} {type} {id}</span>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
        <div className="left-panel">
          <div className="canvas-wrapper">
            <Canvas width={400} height={400}>
              <TransparentImage
                src={`${process.env.PUBLIC_URL}/penguin.gif`}
                id="penguin" x={80} y={200} width={200} height={200} onClick={this.handleClick}/>
              <Polygon points={[
                  [30, 100],
                  [40, 200],
                  [100, 20]
                ]}
                onClick={this.handleClick}
                id='grey-triangle'
                fillStyle='#2b2b2b'
              />
              <Line points={[
                  [100, 100],
                  [300, 40],
                  [20, 250]
                ]}
                onClick={this.handleClick}
                id='purple-line'
                strokeStyle='#551a8b'
                lineWidth={10}
              />
              <Circle
                onClick={this.handleClick}
                x={350}
                y={200}
                radius={30}
                fillStyle={'blue'}
                id={`blue-circle`}
              />
              {customItems.map(c => {
                if (c.type === RECTANGLE) {
                  return (
                    <Rectangle
                      {...c}
                      onClick={this.handleClick}
                      key={c.id}
                    />
                  );
                }
                if (c.type === CIRCLE) {
                  return (
                    <Circle
                      {...c}
                      onClick={this.handleClick}
                      key={c.id}
                    />
                  );
                }
                if (c.type === POLYGON) {
                  return (
                    <Polygon
                      {...c}
                      onClick={this.handleClick}
                      key={c.id}
                    />
                  );
                }
                return false;
              })}
            </Canvas>
          </div>
        </div>
        <div className="right-panel">
          <div className="rectangle-create item-create">
            <div className="item-create-content">
              <div className="item-type-title">Add a Rectangle</div>
              <div>x <input value={rectangle.x} onChange={e => this.handleItemCreateChange(RECTANGLE, "x", e)} type="number"/></div>
              <div>y <input value={rectangle.y} onChange={e => this.handleItemCreateChange(RECTANGLE, "y", e)} type="number"/></div>
              <div>width <input value={rectangle.width} onChange={e => this.handleItemCreateChange(RECTANGLE, "width", e)} type="number"/></div>
              <div>height <input value={rectangle.height} onChange={e => this.handleItemCreateChange(RECTANGLE, "height", e)} type="number"/></div>
              <div>fillStyle <input value={rectangle.fillStyle} onChange={e => this.handleItemCreateChange(RECTANGLE, "fillStyle", e)} type="text"/></div>
              <div>id <input value={rectangle.id} onChange={e => this.handleItemCreateChange(RECTANGLE, "id", e)} type="text"/></div>
              <div className="item-add" onClick={() => this.handleItemAdd(RECTANGLE)}>Add Rectangle</div>
            </div>
          </div>
          <div className="circle-create item-create">
            <div className="item-create-content">
              <div className="item-type-title">Add a Circle</div>
              <div>x <input value={circle.x} onChange={e => this.handleItemCreateChange(CIRCLE, "x", e)} type="number"/></div>
              <div>y <input value={circle.y} onChange={e => this.handleItemCreateChange(CIRCLE, "y", e)} type="number"/></div>
              <div>radius <input value={circle.radius} onChange={e => this.handleItemCreateChange(CIRCLE, "radius", e)} type="number"/></div>
              <div>fillStyle <input value={circle.fillStyle} onChange={e => this.handleItemCreateChange(CIRCLE, "fillStyle", e)} type="text"/></div>
              <div>id <input value={circle.id} onChange={e => this.handleItemCreateChange(CIRCLE, "id", e)} type="text"/></div>
              <div className="item-add" onClick={() => this.handleItemAdd(CIRCLE)}>Add Circle</div>
            </div>
          </div>
          <div className="polygon-create item-create">
            <div className="item-create-content">
              <div className="item-type-title">Add a Polygon</div>
              <div>fillStyle <input value={polygon.fillStyle} onChange={e => this.handleItemCreateChange(POLYGON, "fillStyle", e)} type="text"/></div>
              <div>id <input value={polygon.id} onChange={e => this.handleItemCreateChange(POLYGON, "id", e)} type="text"/></div>
              <div className="item-add" onClick={() => this.handleItemAdd(POLYGON)}>Add Polygon</div>
            </div>
          </div>
        </div>
      </main>
    );
  }
}
