# venti

Global state for React

[![Build Status](https://travis-ci.org/will123195/venti.svg?branch=master)](https://travis-ci.org/will123195/venti)

## Overview

A very simple alternative to Redux

## Demo

[Live Demo](https://will123195.github.io/venti/demo/)

```
npm run demo
```

Browse the code for the [demo app here](https://github.com/will123195/venti/tree/master/demo/src).

## Example

```js
import React from 'react'
import { withVenti, state } from 'venti'

function increment() {
  const count = state.get('count') || 0
  state.set('count', count + 1)
}

const MyComponent = ({ count }) => (
  <button onClick={increment}>
    Count: {count}
  </button>
)

const getProps = (state, props) => ({
  count: state.get('count')
})

const myComponent = withVenti(getProps)(MyComponent)
```

## Tests

```
npm test
```

## License

MIT