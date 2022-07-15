import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Blogs = ({ user }) => {
  //const dispatch = useDispatch();
  const blogs = useSelector((state) => state.blogs);
  if (!blogs) {
    return null;
  }
  return (
    <div>
      <h2>blogs</h2>
      {blogs.map((blog) => (
        <div key={blog.id}>
          <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
        </div>
      ))}
    </div>
  );
};

export default Blogs;
