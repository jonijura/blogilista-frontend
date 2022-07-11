import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

const blog = {
    title: 'Test blog title',
    author: 'Test author',
    url: 'www.test.com',
    likes: 0,
    user: {
        username: 'Test user',
        name: 'Test name'
    }
}

test('renders only title and author by default', () => {

    render(<Blog blog={blog} />)

    screen.getByText('Test blog title Test author')
})

test('clicking the button shows more information of a blog', async () => {

    render(<Blog blog={blog} />)

    const user = userEvent.setup()
    const button = screen.getByText('more')
    await user.click(button)

    screen.getByText('www.test.com')
    screen.getByText('0 like')
})

test('clicking like button twice increases likes by 2', async () => {

    render(<Blog blog={blog} />)

    const user = userEvent.setup()
    const button1 = screen.getByText('more')
    await user.click(button1)
    const button = screen.getByText('like')
    await user.click(button)
    await user.click(button)

    screen.getByText('2 like')
})
