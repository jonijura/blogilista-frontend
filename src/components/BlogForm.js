import {useState} from 'react'
import blogService from '../services/blogs'

const BlogForm = ({user, notify, toggleVisibility, blogs, setBlogs, mockFun}) => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

    const handleSubmit = (event) => {
        if(mockFun){
            mockFun(title, author, url)
            return
        }
        event.preventDefault()
        blogService.create({
            title: title,
            author: author,
            url: url
        }, user).then(blog => {
            setTitle('')
            setAuthor('')
            setUrl('')
            notify(`a new blog ${blog.title} by ${blog.author} added`, 'msg')
            setBlogs(blogs.concat(blog))
        }).catch(error => {
            notify(error.response.data.error, 'error')
        })
        toggleVisibility()
    }

    return (
        <div>
            <h2>new blog</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    title
                    <input
                        value={title}
                        onChange={({ target }) => setTitle(target.value)}
                        id='title'
                    />
                </div>
                <div>
                    author
                    <input
                        value={author} 
                        onChange={({ target }) => setAuthor(target.value)}
                        id='author'
                    />
                </div>
                <div>
                    url
                    <input
                        value={url} 
                        onChange={({ target }) => setUrl(target.value)}
                        id='url'
                    />
                </div>
                <button type="submit"
                id='create-button'>create</button>
            </form>
        </div>
    )
}

export default BlogForm
