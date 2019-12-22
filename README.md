[![venti](venti.png)](https://github.com/will123195/venti)

Global state for React

[![Build Status](https://travis-ci.org/will123195/venti.svg?branch=master)](https://travis-ci.org/will123195/venti)

## Overview

A very simple alternative to Redux

## Demo

[Live Demo](https://will123195.github.io/venti/demo/) and view [source code for demo app](https://github.com/will123195/venti/tree/master/demo/src).

```
npm run demo
```

## Example Using React Hooks

```jsx
import React from 'react'
import { useVenti, state } from 'venti'

function increment() {
  const count = state.get('count', 0) // default 0
  state.set('count', count + 1)
}

function MyComponent() {
  const state = useVenti()
  const count = state.get('count')
  return (
    <button onClick={increment}>
      Count: {count}
    </button>
  )
}
```

## Example With Higher-Order Component

```jsx
import React from 'react'
import { withVenti, state } from 'venti'

function increment() {
  const count = state.get('count', 0) // default 0
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