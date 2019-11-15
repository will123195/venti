import React from 'react'
import { state, withStateEventer } from '../store'

function increment() {
  const count = state.get('count')
  state.set('count', count + 1)
}

const Counter = ({ count }) => (
  <button onClick={increment}>Increment: {count}</button>
)

const getProps = (state, props) => ({
  count: state.get('count')
})

export default withStateEventer(getProps)(Counter)
