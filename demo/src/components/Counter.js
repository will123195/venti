import React from 'react'
import { useVenti } from '../../..'
import increment from '../services/increment'

export default function Counter() {
  const state = useVenti()
  const count = state.get('count', 0)
  return <button onClick={increment}>Increment: {count}</button>
}
