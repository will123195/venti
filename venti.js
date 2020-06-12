import { useState, useEffect } from 'react'
import State from 'state-eventer'

export { State }

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
  get(path, defaultValue) {
    const pathString = pathToString(path)
    this.paths[pathString] = true
    return this.state.get(path, defaultValue)
  }
  set(path, value) {
    return this.state.set(path, value)
  }
  update(path, fn, defaultValue) {
    return this.state.update(path, fn, defaultValue)
  }
  unset(path) {
    return this.state.unset(path)
  }
}

export const state = new State()

export function useVenti(customState) {
  const globalState = customState || state
  const instrumentedState = new InstrumentedState(globalState)
  const [, forceUpdate] = useState(null)

  useEffect(() => {
    let listeners = []
    Object.keys(instrumentedState.paths).forEach(path => {
      const listener = state.on(path, event => {
        forceUpdate({})
      })
      listeners.push(listener)
    })

    return () => {
      listeners.forEach(listener => listener.off())
      listeners = []
    }
  })
  return instrumentedState
}
