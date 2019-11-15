import React from 'react'
import { withStateEventer } from '../store'

const Row = ({ symbol, price }) => <div>{symbol}: ${price}</div>

const getProps = (state, props) => ({
  price: state.get(`symbols.${props.symbol}.price`)
})

export default withStateEventer(getProps)(Row)
