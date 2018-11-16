# react-interactive-canvas

> Declarative canvas components that supports mouse events

[![NPM](https://img.shields.io/npm/v/react-interactive-canvas.svg)](https://www.npmjs.com/package/react-interactive-canvas) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save react-interactive-canvas
```

## Usage

```jsx
import React, { Component } from 'react'

import { Canvas, TransparentImage, Rectangle, Circle } from 'react-interactive-canvas'

class Example extends Component {
  handleClick = id => {
    console.log(id);
  }

  render () {
    return (
      <Canvas width={1000} height={1000}>
        <TransparentImage
          src="/images/penguin.png"
          id="penguin"
          x={100}
          y={100}
          width={200}
          height={200}
          onClick={this.handleClick}/>
        <Rectangle
          onClick={this.handleClick}
          x={10}
          y={40}
          width={35}
          height={60}
          fillStyle="#2b2b2b"
          id="grey-rectangle"
        />
        <Circle
          onClick={this.handleClick}
          x={200}
          y={200}
          radius={5}
          fillStyle="blue"
          id="blue-circle"
        />
      </Canvas>
    )
  }
}
```

## License

MIT © [jbccollins](https://github.com/jbccollins)
