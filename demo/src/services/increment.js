import { state } from '../../..'

export default function increment() {
  const count = state.get('count', 0)
  state.set('count', count + 1)
}