import React from 'react'
import { useVenti, state } from '..'
import { render, screen, cleanup } from '@testing-library/react'
import { act } from 'react'

describe('useVenti', function () {
  const id = 'a'
  const title = 'Ready Player One'
  const price = 19.99

  afterEach(() => {
    cleanup()
  })

  function Book({ id }) {
    const s = useVenti()
    const { title, price } = s.get(`books.${id}`, {})
    return <>
      <i data-testid='title'>{title}</i>
      <i data-testid='price'>{price}</i>
    </>
  }

  it('should render title before document exists', function () {
    const { container } = render(<Book id={id} />)
    expect(container.innerHTML).toBe('<i data-testid="title"></i><i data-testid="price"></i>')
  })

  it('should render initial data', function () {
    state.set('books.a', { id, title, price })
    render(<Book id={id} />)
    expect(screen.getByTestId('price').textContent).toBe('19.99')
  })

  it('should update book', function () {
    act(() => state.set('books.a', { id, title, price }))
    render(<Book id={id} />)
    act(() => state.set('books.a', { id, title, price: 29.99 }))
    expect(screen.getByTestId('price').textContent).toBe('29.99')
  })

  it('should update price', function () {
    act(() => state.set('books.a', { id, title, price }))
    render(<Book id={id} />)
    act(() => state.set('books.a.price', 39.99))
    expect(screen.getByTestId('price').textContent).toBe('39.99')
  })

  it('should remove listeners when unmounted', function () {
    act(() => state.set('books.a', { id, title, price }))
    const { unmount } = render(<Book id={id} />)
    act(() => state.set('books.a.price', 1.99))
    expect(screen.getByTestId('price').textContent).toBe('1.99')
    expect(Object.keys(state.listeners).length).toBe(1)
    unmount()
    expect(Object.keys(state.listeners).length).toBe(0)
    act(() => state.set('books.a.price', 2.99))
    const { unmount: unmount2 } = render(<Book id={id} />)
    act(() => state.set('books.a.price', 3.99))
    expect(screen.getByTestId('price').textContent).toBe('3.99')
    unmount2()
  })

  it('should increment price', function () {
    act(() => state.set('books.a', { id, title, price }))
    render(<Book id={id} />)
    act(() => state.update('books.a.price', price => price + 10))
    expect(screen.getByTestId('price').textContent).toBe('29.99')
  })
})
