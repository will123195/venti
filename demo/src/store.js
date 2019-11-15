import StateEventer from 'state-eventer'
import reactStateEventer from '../..'
import io from 'socket.io-client'

export const state = new StateEventer()

// initialize state
state.set({
  count: 0,
  symbols: {}
})

export const withStateEventer = reactStateEventer(state)

//
// price feed updates the state in real time
//
const socket = io.connect('https://streamer.cryptocompare.com/')
export const symbols = ['BTC','ETH','XRP','BCH','LTC','BNB','EOS','XLM','TRX','ETC','ADA','XMR']
const subs = symbols.map(symbol => `5~CCCAGG~${symbol}~USD`)
socket.emit('SubAdd', { subs })

socket.on('m', message => {
  const data = message.split('~')
  const [messageType, exchange, symbol, currency, flags, price] = data
  if (messageType !== '5') return
  if (flags === '4') return
  state.set(`symbols.${symbol}.price`, price)
})
