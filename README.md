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
  const state = useVenti()
  const { author, title } = state.get(`books.${id}`)
  const year = state.get(`books.${id}.year`)
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

## Demo

[Live Demo](https://will123195.github.io/venti/demo/) and view [source code for demo app](https://github.com/will123195/venti/tree/master/demo/src).

```
npm run demo
```

## Tests

```
npm test
```

## License

MIT