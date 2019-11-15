# react-state-eventer

## Usage

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

// get data for initial render and listen for changes
// idea: this "state" could be a wrapped instance of state for a specific component
// monkey patch the get method to log the paths to listen for changes
// if props changes, we need to remove the listener(s) and start listening to the new path(s)
const getProps = (state, props) => ({
  count: state.get(`count`)
})
const myComponent = withStateEventer(getProps)(MyComponent)
```
