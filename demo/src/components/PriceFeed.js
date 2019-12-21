import React from 'react'
import { withVenti } from '../../..'
import Row from './Row'

const PriceFeed = ({ symbols }) => (
  <div>
    {symbols.map(symbol => <Row key={symbol} symbol={symbol} />)}
  </div>
)

const getProps = (state, props) => ({
  symbols: Object.keys(state.get('symbols', {}))
})

export default withVenti(getProps)(PriceFeed)
