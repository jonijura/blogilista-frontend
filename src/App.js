import { useState, useEffect } from 'react'
import Blogs from './components/Blog'
import BlogForm from './components/BlogForm'
import Loginform from './components/LoginForm'
import Notification from './components/Notification'
import blogService from './services/blogs'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState("")

  const notify = (message, type) => {
    setNotification({ message, type })
    setTimeout(() => {
      setNotification(null)
    }, 5000)
  }

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
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

return (
    <div>
      <Notification notification={notification}/>
      {user===null && <Loginform setUser={setUser} notify={notify} />}
      {user!==null && <h2>{user.name} logged in</h2>}
      {user!==null && <button onClick={handleLogout}>logout</button>}
      {user!==null && <BlogForm user={user} notify={notify}/>}
      {user!==null && <Blogs blogs={blogs} />}
    </div>
  )
}

export default App