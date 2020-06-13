[![Venti](https://raw.githubusercontent.com/will123195/venti/HEAD/venti.png)](https://github.com/will123195/venti)

**Global State for React**

[![Build Status](https://travis-ci.org/will123195/venti.svg?branch=master)](https://travis-ci.org/will123195/venti)

## Install

```
npm i venti
```

## Quick Start

#### Get global state

```jsx
import React from 'react'
import { useVenti } from 'venti'

export default function Book({ id }) {
  const state = useVenti() // this is needed so your component updates when state changes
  const { author, title } = state.get(`books.${id}`, {}) // get an object
  const year = state.get(`books.${id}.year`)             // or a property
  return <div>"{title}" by {author} ({year})</div>
}
```

#### Set global state

```js
import { state } from 'venti'

state.set('books.1', {
  author: 'John Steinbeck',
  title: 'Cannery Row',
  year: 1945
})
```

## API

### `useVenti( [state] )`
  - `state` {State} (optional) defaults to singleton state if not provided
  - Returns `state` that has been instrumented to update the component when applicable
  - See [StateEventer](https://github.com/will123195/state-eventer) for more info

### `state.get( path, [defaultValue] )`
  - `path` {Array|string} The path to get
  - `defaultValue` {*} (optional) The value returned for undefined resolved values
  - Returns the resolved value

### `state.set( path, value )`
  - `path` {Array|string} The path of the property to set
  - `value` {*} The value to set

### `state.unset( path )`
  - `path` {Array|string} The path of the property to unset

### `state.update( path, transformFn, [defaultValue] )`
  - `path` {Array|string} The path of the property to set
  - `transformFn` {Function} transforms the current value to a new value
  - `defaultValue` {*} (optional) the default value to pass into the transform function if the existing value at the given path is undefined
    ```js
    state.update('counter', n => n + 1, 0)
    ```

## Advanced Usage

If you don't want to use Venti's singleton state, you can do this:

```jsx
import React from 'react'
import { State, useVenti } from 'venti'

const globalState = new State()
const useGlobalState = () => useVenti(globalState)

export default function Book({ id }) {
  const state = useGlobalState()
  const { title, year } = state.get(`books.${id}`)
  return <div>{title} ({year})</div>
}
```

## Performance Benchmarks

### Color Matrix Benchmark
- Venti: https://will123195.github.io/venti-performance/build/
- Redux: https://will123195.github.io/redux-performance/build/

## Examples

- [React State Museum - Packing List App](https://codesandbox.io/s/github/GantMan/ReactStateMuseum/tree/master/React/venti)

## Tests

```
npm test
```

## License

MIT
