import React, { Component } from 'react'

import { Canvas, Rectangle, TransparentImage, Circle } from 'react-interactive-canvas'

const size = 20;

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
    console.log(id);
    this.setState({clickedItem: id});
  }

  render() {
    const { items, key, clickedItem } = this.state;
    const color = key % 2 ? 'red' : 'green';
    return (
      <main>
        <div>Clicked Item: {clickedItem}</div>
        <div className="canvas-wrapper">
          <Canvas width={1000} height={1000}>
            <TransparentImage id="penguin" x={100} y={100} width={200} height={200} onClick={this.handleClick}/>
            {items.map((itemList, x) => {
              return itemList.map(y => {
                return (
                  <Rectangle
                    onClick={this.handleClick}
                    x={x + size * x}
                    y={y + size * y}
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
                    x={x + size * x}
                    y={(y + items.length * size + size) + size * y}
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
