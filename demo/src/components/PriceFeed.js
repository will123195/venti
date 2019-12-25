import React from 'react'
import { useVenti } from '../../..'
import Row from './Row'

export default function PriceFeed() {
  const state = useVenti()
  const symbols = Object.keys(state.get('symbols', {}))
  const count = state.get('count', 'Please click the increment button.')
  return <>
    <div>
      {symbols.map(symbol => <Row key={symbol} symbol={symbol} />)}
    </div>
    <hr />
    <div>
      Counter: {count}
    </div>
  </>
}
