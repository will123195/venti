import React from 'react'
import { useVenti } from '../../..'

export default function Row({ symbol }) {
  const state = useVenti()
  const price = state.get(`symbols.${symbol}.price`)
  return <div>{symbol}: ${price}</div>
}
