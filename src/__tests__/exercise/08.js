// testing custom hooks
// http://localhost:3000/counter-hook

import * as React from 'react'
import {render, screen, act} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import useCounter from '../../components/use-counter'

function UseCounterHookExample() {
  const {count, increment, decrement} = useCounter()
  return (
    <div>
      <div>Current count: {count}</div>
      <button onClick={decrement}>Decrement</button>
      <button onClick={increment}>Increment</button>
    </div>
  )
}

test('exposes the count and increment/decrement functions', async () => {
  let result
  function TestComponent() {
    result = useCounter()
    return null
  }
  render(<TestComponent />)
  expect(result.count).toBe(0)
  act(() => result.increment())
  expect(result.count).toBe(1)
  act(() => result.decrement())
  expect(result.count).toBe(0)

  // const increment = screen.getByRole('button', {name: /increment/i})
  // const decrement = screen.getByRole('button', {name: /decrement/i})
  // const message = screen.getByText(/current count/i)

  // expect(message).toHaveTextContent('Current count: 0')
  // await userEvent.click(increment)
  // expect(message).toHaveTextContent('Current count: 1')
  // await userEvent.click(decrement)
  // expect(message).toHaveTextContent('Current count: 0')
  // 🐨 render the component
  // 🐨 get the elements you need using screen
  // 🐨 assert on the initial state of the hook
  // 🐨 interact with the UI using userEvent and assert on the changes in the UI
})

/* eslint no-unused-vars:0 */
