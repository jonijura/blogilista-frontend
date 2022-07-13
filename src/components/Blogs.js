import { useSelector } from "react-redux";
import Blog from "./Blog";

const Blogs = ({ user }) => {
  //const dispatch = useDispatch();
  const blogs = useSelector((state) => state.blogs);
  return (
    <div>
      <h2>blogs</h2>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} user={user} />
      ))}
    </div>
  );
};

export default Blogs;
