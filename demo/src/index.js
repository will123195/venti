import React from 'react'
import ReactDOM from 'react-dom'
import Counter from './components/Counter'
import PriceFeed from './components/PriceFeed'

ReactDOM.render((
  <>
    <h1>Counter</h1>
    <Counter />
    <hr />
    <h1>Price Feed</h1>
    <PriceFeed />
  </>
), document.getElementById('root'))
