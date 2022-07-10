import {useState} from 'react'
import blogService from '../services/blogs'

const BlogForm = ({user, notify}) => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

    const handleSubmit = (event) => {
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
        }).catch(error => {
            notify(error.response.data.error, 'error')
        })
    }

    return (
        <div>
            <h2>create new</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    title
                    <input
                        value={title}
                        onChange={({ target }) => setTitle(target.value)}
                    />
                </div>
                <div>
                    author
                    <input
                        value={author} 
                        onChange={({ target }) => setAuthor(target.value)}
                    />
                </div>
                <div>
                    url
                    <input
                        value={url} 
                        onChange={({ target }) => setUrl(target.value)}
                    />
                </div>
                <button type="submit">create</button>
            </form>
        </div>
    )
}

export default BlogForm
