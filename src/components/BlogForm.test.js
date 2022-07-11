import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import BlogForm from './BlogForm'
import userEvent from '@testing-library/user-event'

test('<BlogForm /> updates parent state and calls onSubmit', async () => {
  const user = userEvent.setup()
  const mockFun = jest.fn()

  render(<BlogForm mockFun={mockFun} />)

  const inputs = screen.getAllByRole('textbox')
  const sendButton = screen.getByText('create')

  await user.type(inputs[0], 'new title')
  await user.type(inputs[1], 'new author')
  await user.type(inputs[2], 'new url')
  await user.click(sendButton)

  expect(mockFun.mock.calls).toHaveLength(1)
  console.log('mockFun.mock.calls', mockFun.mock.calls)
  expect(mockFun.mock.calls[0][0]).toBe('new title')
})