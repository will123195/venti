import React from 'react'
import { withVenti } from '../../..'
import Row from './Row'

const PriceFeed = ({ symbols, count }) => (
  <>
    <div>
      {symbols.map(symbol => <Row key={symbol} symbol={symbol} />)}
    </div>
    <hr />
    <div>
      Counter: {count}
    </div>
  </>
)

const getProps = (state, props) => ({
  symbols: Object.keys(state.get('symbols', {})),
  count: state.get('count', 'Please click the increment button.')
})

export default withVenti(getProps)(PriceFeed)
