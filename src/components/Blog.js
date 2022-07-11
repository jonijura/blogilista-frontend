import { useState } from "react"
import blogServices from "../services/blogs"

const Blog = ({ blog, setBlogs, blogs, user, notify }) => {
  const [showMore, toggleMore] = useState(false)
  const [likes, setLikes] = useState(blog.likes)	
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  const addLike = () => {
    setLikes(likes + 1)
    blogServices.modify(blog.id, {...blog, likes: likes + 1 })
    .then(blog => {
      setBlogs(blogs.map(b => b.id !== blog.id ? b : blog).sort((a, b) => b.likes - a.likes))
    }).catch(error => {
      console.log(error)
    })
  }
  const removeBlog = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      blogServices.remove(blog.id, user)
      .then(() => {
        setBlogs(blogs.filter(b => b.id !== blog.id))
      }
      ).catch(error => {
        notify(`user ${user.username} is not authorized to remove blog that belogs to ${blog.user.username}`,'error')
      })
    }
  }

  if(showMore) {
    return(
      <div style={blogStyle} className="blog">
        <p>{blog.title}</p>
        <p>{blog.author}</p>
        <p>{blog.url}</p>
        <p>{likes} like <button onClick={() => addLike()}>like</button></p>
        <p>{blog.user.name}</p>
        <button onClick={() => toggleMore(!showMore)}>less</button>
        <button onClick={()=> removeBlog(blog.id)}>remove</button>
      </div>
    )
  }
  return (
    <div className="blog">
      {blog.title} {blog.author} 
      <button onClick={() => toggleMore(!showMore)}>more</button>
    </div>
  )
}

//export both, blogs and blog
export default Blog
