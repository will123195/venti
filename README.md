[![venti](venti.png)](https://github.com/will123195/venti)

**Global State for React**

[![Build Status](https://travis-ci.org/will123195/venti.svg?branch=master)](https://travis-ci.org/will123195/venti)

## Overview

A very simple alternative to Redux

## Demo

[Live Demo](https://will123195.github.io/venti/demo/) and view [source code for demo app](https://github.com/will123195/venti/tree/master/demo/src).

```
npm run demo
```

### Usage

```jsx
import React from 'react'
import { useVenti, state } from 'venti'

const randomize = () => state.set('random', Math.random())

export default function RandomButtonComponent() {
  const state = useVenti()
  const random = state.get('random')
  return <button onClick={randomize}>{random}</button>
}
```

### Alternate Usage (Higher-Order Component)

```jsx
import React from 'react'
import { withVenti, state } from 'venti'

const randomize = () => state.set('random', Math.random())

const RandomButtonComponent = ({ random }) => (
  <button onClick={randomize}>{random}</button>
)

const getProps = (state, props) => ({
  random: state.get('random')
})

export default withVenti(getProps)(RandomButtonComponent)
```

## Tests

```
npm test
```

## License

MIT