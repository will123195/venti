import React from 'react'

function pathToString(path) {
  if (typeof path === 'string') return path
  if (Array.isArray(path)) return path.join('.')
  throw new Error('state.get: `path` must be a string or array')
}

class InstrumentedState {
  constructor(state) {
    this.state = state
    this.paths = {}
  }
  get(path) {
    const pathString = pathToString(path)
    this.paths[pathString] = true
    return this.state.get(path)
  }
}

export default function reactStateEventer(state) {
  return getProps => {
    return Component => {
      return class extends React.Component {
        constructor(props) {
          super(props)
          this.listeners = []
          this.beforeMount()
        }

        beforeMount() {
          // set state with data from getProps before initial render
          // also determine which paths to listen for changes
          const instrumentedState = new InstrumentedState(state)
          const props = getProps(instrumentedState, this.props)
          this.state = props
          // listen for changes to the applicable paths
          Object.keys(instrumentedState.paths).forEach(path => {
            const listener = state.on(path, event => {
              this.setState(getProps(state, this.props))
            })
            this.listeners.push(listener)
          })
        }

        componentWillUnmount() {
          this.listeners.forEach(listener => listener.off())
          this.listeners = []
        }

        render() {
          return React.createElement(Component, { ...this.props, ...this.state })
        }
      }
    }
  }
}
