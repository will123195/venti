import React from 'react'
import { useVenti, state } from '..'
import { render, screen, cleanup } from '@testing-library/react'
import { act } from 'react'

describe('int', function () {
  afterEach(() => {
    cleanup()
  })

  function A() {
    const s = useVenti()
    const a = s.get(`a`)
    return <B a={a} />
  }
  function B({ a }) {
    return <>
      <i data-testid='c'>{a.b.c}</i>
    </>
  }
  it('should update', function () {
    act(() => state.set('a.b', { c: 1 }))
    const { unmount } = render(<A />)
    expect(screen.getByTestId('c').textContent).toBe('1')
    act(() => state.set('a.b', { c: 2 }))
    expect(screen.getByTestId('c').textContent).toBe('2')
    unmount()
  })
})

describe('obj', function () {
  afterEach(() => {
    cleanup()
  })

  function A() {
    const s = useVenti()
    const a = s.get(`a`)
    return <B a={a} />
  }
  function B({ a }) {
    return <>
      <i data-testid='c'>{JSON.stringify(a.b.c)}</i>
    </>
  }
  it('should update', function () {
    act(() => state.set('a.b.c', { d: 1 }))
    const { unmount } = render(<A />)
    expect(screen.getByTestId('c').textContent).toBe('{"d":1}')
    act(() => state.set('a.b.c', { d: 2 }))
    expect(screen.getByTestId('c').textContent).toBe('{"d":2}')
    unmount()
  })
})

describe('arr', function () {
  afterEach(() => {
    cleanup()
  })

  function A() {
    const s = useVenti()
    const a = s.get(`a`)
    return <B a={a} />
  }
  function B({ a }) {
    return <C a={a} />
  }
  function C({ a }) {
    return <>
      <i data-testid='c'>{JSON.stringify(a.b.c)}</i>
    </>
  }
  it('should update', function () {
    act(() => state.set('a.b.c', ['d']))
    const { unmount } = render(<A />)
    expect(screen.getByTestId('c').textContent).toBe('["d"]')
    act(() => state.update('a.b.c', arr => [...arr, 'e']))
    expect(screen.getByTestId('c').textContent).toBe('["d","e"]')
    unmount()
  })
})
