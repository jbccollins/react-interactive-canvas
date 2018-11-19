import React, { Component } from 'react'

import { Canvas, Rectangle, TransparentImage, Circle, Polygon, Line } from 'react-interactive-canvas'

const size = 20;
const spacing = 10;

export default class App extends Component {
  state = {
    items: [],
    key: 0,
    clickedItem: null
  };
  generateItems = () => {
    let items = [];
    for (let x = 0; x < 10; x++) {
      items.push([]);
      for (let y = 0; y < 10; y++) {
        items[x].push(y);
      }
    }
    this.setState({ items });
  };
  incrementKey = () => {
    this.setState({key: this.state.key + 1});
  }
  componentDidMount() {
    this.generateItems();
    //setInterval(this.incrementKey, 200);
  }

  handleClick = id => {
    this.setState({clickedItem: id});
  }

  render() {
    const { items, key, clickedItem } = this.state;
    const color = key % 2 ? 'red' : 'green';
    return (
      <main>
        <div className="clicked-item">Clicked Item: {clickedItem}</div>
        <div className="canvas-wrapper">
          <Canvas width={1000} height={1000}>
            <TransparentImage
              src={`${process.env.PUBLIC_URL}/penguin-with-transparent-background.gif`}
              id="penguin" x={80} y={200} width={450} height={400} onClick={this.handleClick}/>
            <Polygon points={[
                [30, 100],
                [40, 400],
                [600, 20]
              ]}
              onClick={this.handleClick}
              id='grey-triangle'
              fillStyle='#2b2b2b'
            />
            <Line points={[
                [100, 100],
                [400, 40],
                [20, 600]
              ]}
              onClick={this.handleClick}
              id='purple-line'
              strokeStyle='#551a8b'
              lineWidth={10}
            />
            {items.map((itemList, x) => {
              return itemList.map(y => {
                return (
                  <Rectangle
                    onClick={this.handleClick}
                    x={x + (size + spacing) * x}
                    y={y + (size + spacing) * y}
                    width={size}
                    height={size}
                    fillStyle={color}
                    key={`${x}${y}-rectangle`}
                    id={`${x}${y}-rectangle`}
                  />
                );
              });
            })}
            {items.map((itemList, x) => {
              return itemList.map(y => {
                return (
                  <Circle
                    onClick={this.handleClick}
                    x={x + (size + spacing) * x}
                    y={(y + items.length * (size + spacing) + size) + (size + spacing) * y}
                    radius={size / 2}
                    fillStyle={color}
                    key={`${x}${y}-circle`}
                    id={`${x}${y}-circle`}
                  />
                );
              });
            })}
          </Canvas>
        </div>
      </main>
    );
  }
}
