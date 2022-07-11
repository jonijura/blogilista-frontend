import { useState, useEffect, useRef } from 'react'
import Blogs from './components/Blogs'
import BlogForm from './components/BlogForm'
import Loginform from './components/LoginForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import blogService from './services/blogs'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState("")

  const blogFormRef = useRef()

  const notify = (message, type) => {
    setNotification({ message, type })
    setTimeout(() => {
      setNotification(null)
    }, 5000)
  }

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs.sort((a, b) => b.likes - a.likes))
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
    }
  }, [])

  const handleLogout = () => {
    setUser(null)
    window.localStorage.removeItem('loggedBlogAppUser')
  }

  const toggleVisibility = () => {
    blogFormRef.current.toggleVisibility()
  }

  const showWhenLoggedIn = () => (
    <div>
      <h2>{user.name} logged in</h2>
      <button onClick={handleLogout}>logout</button>
      <Togglable buttonLabel="new blog" ref={blogFormRef}>
        <BlogForm user={user} notify={notify} toggleVisibility={toggleVisibility} 
        blogs={blogs} setBlogs={setBlogs}/>
      </Togglable>
      <Blogs blogs={blogs} setBlogs={setBlogs} user={user} notify={notify}/>
    </div>
  )

  return (
    <div>
      <Notification notification={notification} />
      {user === null && <Loginform setUser={setUser} notify={notify} />}
      {user && showWhenLoggedIn()}
    </div>
  )
}

export default App