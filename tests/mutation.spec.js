import React from 'react'
import { useVenti, state } from '..'
import { mount, configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { act } from 'react-dom/test-utils'

configure({ adapter: new Adapter() })

describe('int', function () {
  function A() {
    const state = useVenti()
    const a = state.get(`a`)
    return <B a={a} />
  }
  function B({ a }) {
    return <>
      <i className='c'>{a.b.c}</i>
    </>
  }
  it('should update', function () {
    act(() => state.set('a.b', { c: 1 }))
    const wrapper = mount(<A />)
    expect(wrapper.find('.c').text()).toBe('1')
    act(() => state.set('a.b', { c: 2 }))
    expect(wrapper.find('.c').text()).toBe('2')
    wrapper.unmount()
  })
})

describe('obj', function () {
  function A() {
    const state = useVenti()
    const a = state.get(`a`)
    return <B a={a} />
  }
  function B({ a }) {
    return <>
      <i className='c'>{JSON.stringify(a.b.c)}</i>
    </>
  }
  it('should update', function () {
    act(() => state.set('a.b.c', { d: 1 }))
    const wrapper = mount(<A />)
    expect(wrapper.find('.c').text()).toBe('{"d":1}')
    act(() => state.set('a.b.c', { d: 2 }))
    expect(wrapper.find('.c').text()).toBe('{"d":2}')
    wrapper.unmount()
  })
})

describe('arr', function () {
  function A() {
    const state = useVenti()
    const a = state.get(`a`)
    return <B a={a} />
  }
  function B({ a }) {
    return <C a={a} />
  }
  function C({ a }) {
    return <>
      <i className='c'>{JSON.stringify(a.b.c)}</i>
    </>
  }
  it('should update', function () {
    act(() => state.set('a.b.c', ['d']))
    const wrapper = mount(<A />)
    expect(wrapper.find('.c').text()).toBe('["d"]')
    act(() => state.update('a.b.c', arr => [...arr, 'e']))
    expect(wrapper.find('.c').text()).toBe('["d","e"]')
    wrapper.unmount()
  })
})
