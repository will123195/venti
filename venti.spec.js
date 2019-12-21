import React from 'react'
import venti, { State } from '.'
import { mount, configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

configure({ adapter: new Adapter() })

describe('venti', function () {
  const id = 'a'
  const title = 'Ready Player One'
  const price = 19.99

  function Book({ title, price }) {
    return <>
      <i className='title'>{title}</i>
      <i className='price'>{price}</i>
    </>
  }

  function getProps(state, props) {
    return state.get(`books.${props.id}`)
  }

  it('should render title before document exists', function () {
    const state = new State()
    const withVenti = venti(state)
    const ConnectedBook = withVenti(getProps)(Book)
    const wrapper = mount(<ConnectedBook id={id} />)
    expect(wrapper.html()).toBe('<i class="title"></i><i class="price"></i>')
    wrapper.unmount()
  })

  it('should render initial data', function () {
    const state = new State()
    const withVenti = venti(state)
    const ConnectedBook = withVenti(getProps)(Book)
    state.set('books.a', { id, title, price })
    const wrapper = mount(<ConnectedBook id={id} />)
    expect(wrapper.find('.price').text()).toBe('19.99')
    wrapper.unmount()
  })

  it('should update book', function () {
    const state = new State()
    const withVenti = venti(state)
    const ConnectedBook = withVenti(getProps)(Book)
    state.set('books.a', { id, title, price })
    const wrapper = mount(<ConnectedBook id={id} />)
    state.set('books.a', { id, title, price: 29.99 })
    expect(wrapper.find('.price').text()).toBe('29.99')
    wrapper.unmount()
  })

  it('should update price', function () {
    const state = new State()
    const withVenti = venti(state)
    const ConnectedBook = withVenti(getProps)(Book)
    state.set('books.a', { id, title, price })
    const wrapper = mount(<ConnectedBook id={id} />)
    state.set('books.a.price', 39.99)
    expect(wrapper.find('.price').text()).toBe('39.99')
    wrapper.unmount()
  })

  it('should remove listeners when unmounted', function () {
    const state = new State()
    const withVenti = venti(state)
    const ConnectedBook = withVenti(getProps)(Book)
    state.set('books.a', { id, title, price })
    const wrapper = mount(<ConnectedBook id={id} />)
    state.set('books.a.price', 1.99)
    expect(wrapper.find('.price').text()).toBe('1.99')
    wrapper.unmount()
    expect(Object.keys(state.listeners).length).toBe(0)
    state.set('books.a.price', 2.99)
    const wrapper2 = mount(<ConnectedBook id={id} />)
    state.set('books.a.price', 3.99)
    expect(wrapper2.find('.price').text()).toBe('3.99')
    wrapper2.unmount()
  })
})
