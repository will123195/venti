import React from 'react'
import { useVenti, state } from '..'
import { mount, configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { act } from 'react-dom/test-utils'

configure({ adapter: new Adapter() })

describe('useVenti', function () {
  const id = 'a'
  const title = 'Ready Player One'
  const price = 19.99

  function Book({ id }) {
    const state = useVenti()
    const { title, price } = state.get(`books.${id}`, {})
    return <>
      <i className='title'>{title}</i>
      <i className='price'>{price}</i>
    </>
  }

  it('should render title before document exists', function () {
    const wrapper = mount(<Book id={id} />)
    expect(wrapper.html()).toBe('<i class="title"></i><i class="price"></i>')
    wrapper.unmount()
  })

  it('should render initial data', function () {
    state.set('books.a', { id, title, price })
    const wrapper = mount(<Book id={id} />)
    expect(wrapper.find('.price').text()).toBe('19.99')
    wrapper.unmount()
  })

  it('should update book', function () {
    act(() => state.set('books.a', { id, title, price }))
    const wrapper = mount(<Book id={id} />)
    act(() => state.set('books.a', { id, title, price: 29.99 }))
    expect(wrapper.find('.price').text()).toBe('29.99')
    wrapper.unmount()
  })

  it('should update price', function () {
    act(() => state.set('books.a', { id, title, price }))
    const wrapper = mount(<Book id={id} />)
    act(() => state.set('books.a.price', 39.99))
    expect(wrapper.find('.price').text()).toBe('39.99')
    wrapper.unmount()
  })

  it('should remove listeners when unmounted', function () {
    act(() => state.set('books.a', { id, title, price }))
    const wrapper = mount(<Book id={id} />)
    act(() => state.set('books.a.price', 1.99))
    expect(wrapper.find('.price').text()).toBe('1.99')
    expect(Object.keys(state.listeners).length).toBe(1)
    wrapper.unmount()
    expect(Object.keys(state.listeners).length).toBe(0)
    act(() => state.set('books.a.price', 2.99))
    const wrapper2 = mount(<Book id={id} />)
    act(() => state.set('books.a.price', 3.99))
    expect(wrapper2.find('.price').text()).toBe('3.99')
    wrapper2.unmount()
  })

  it('should increment price', function () {
    act(() => state.set('books.a', { id, title, price }))
    const wrapper = mount(<Book id={id} />)
    act(() => state.update('books.a.price', price => price + 10))
    expect(wrapper.find('.price').text()).toBe('29.99')
    wrapper.unmount()
  })
})
