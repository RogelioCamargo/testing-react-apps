// form testing
// 💯 generate test data
// http://localhost:3000/login
import React from 'react'
import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import faker from 'faker'
import Login from '../../components/login'

function buildLoginForm() {
  return {
    username: faker.internet.userName(),
    password: faker.internet.password(),
  }
}

test('submitting the form calls onSubmit with username and password', async () => {
  const handleSubmit = jest.fn()
  render(<Login onSubmit={handleSubmit} />)
  const {username, password} = buildLoginForm()

  await userEvent.type(screen.getByLabelText(/username/i), username)
  await userEvent.type(screen.getByLabelText(/password/i), password)
  userEvent.click(screen.getByText(/submit/i))

  expect(handleSubmit).toHaveBeenCalledTimes(1)
  expect(handleSubmit).toHaveBeenCalledWith({
    username,
    password,
  })
})