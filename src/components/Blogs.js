import Blog from './Blog'

const Blogs = ({ blogs, setBlogs, user, notify }) => (
    <div>
        <h2>blogs</h2>
        {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} setBlogs={setBlogs} blogs={blogs} user={user} notify={notify} />
        )}
    </div>
)

export default Blogs