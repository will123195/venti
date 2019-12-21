import { state } from '../../venti'
import io from 'socket.io-client'

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
  // update global state
  state.set(`symbols.${symbol}.price`, price)
})
