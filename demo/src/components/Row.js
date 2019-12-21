import React from 'react'
import { withVenti } from '../../..'

const Row = ({ symbol, price }) => <div>{symbol}: ${price}</div>

const getProps = (state, props) => ({
  price: state.get(`symbols.${props.symbol}.price`)
})

export default withVenti(getProps)(Row)
