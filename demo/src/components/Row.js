import React from 'react'
import { useVenti } from '../../..'

const Row = ({ symbol }) => {
  const state = useVenti()
  const price = state.get(`symbols.${symbol}.price`)
  return <div>{symbol}: ${price}</div>
}

export default Row
