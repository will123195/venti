# react-state-eventer

Event emitter for React state

[![Build Status](https://travis-ci.org/will123195/react-state-eventer.svg?branch=master)](https://travis-ci.org/will123195/react-state-eventer)

## Overview

- A very simple alternative to Redux

## Example

```js
import StateEventer from 'state-eventer'
import reactStateEventer from 'react-state-eventer'

const state = new StateEventer()
const withStateEventer = reactStateEventer(state)

function increment() {
  const count = state.get('count') || 0
  state.set('count', count + 1)
}

const MyComponent = ({ count }) => (
  <button onClick={increment}>
    Increment: {count}
  </button>
)

const getProps = (state, props) => ({
  count: state.get('count')
}

const myComponent = withStateEventer(getProps)(MyComponent)
```

## Demo

Browse the code for the [demo app here](https://github.com/will123195/react-state-eventer/tree/master/demo/src).

```
npm run demo
```

## Tests

```
npm test
```
