[![Venti](https://raw.githubusercontent.com/will123195/venti/HEAD/venti.png)](https://github.com/will123195/venti)

**Global State for React**

[![Build Status](https://travis-ci.org/will123195/venti.svg?branch=master)](https://travis-ci.org/will123195/venti)

## Install

```
npm i venti
```

## Quick Start

```jsx
import React from 'react'
import { useVenti } from 'venti'

export default function Book({ id }) {
  const state = useVenti()
  const { title, year } = state.get(`books.${id}`)
  return <div>{title} ({year})</div>
}
```

```js
import { state } from 'venti'

state.set('books.1', {
  title: 'Cannery Row',
  year: 1945
})
```

## API

### `useVenti()`
  - Returns `state` 
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