import { useDispatch } from "react-redux/es/exports";
import { useState } from "react";
import { setNotification } from "../reducers/notificationReducer";
import { deleteBlog, updateBlog } from "../reducers/blogReducer";

const Blog = ({ blog, user }) => {
  const dispatch = useDispatch();
  const [showMore, toggleMore] = useState(false);
  const [likes, setLikes] = useState(blog.likes);
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };
  const addLike = () => {
    dispatch(updateBlog({ ...blog, likes: blog.likes + 1 })).then((blog) => {
      setLikes(blog.likes);
    });
  };
  const removeBlog = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      dispatch(deleteBlog(blog, user))
        .then(() => {
          dispatch(
            setNotification(
              {
                msg: `Blog ${blog.title} by ${blog.author} removed`,
                type: "msg",
              },
              5
            )
          );
        })
        .catch((error) => {
          dispatch(
            setNotification(
              {
                msg: `user ${user.username} is not authorized to remove blog that belogs to ${blog.user.username}`,
                type: "error",
              },
              3
            )
          );
        });
    }
  };

  if (showMore) {
    return (
      <div style={blogStyle} className="blog">
        <p>{blog.title}</p>
        <p>{blog.author}</p>
        <p>{blog.url}</p>
        <p>
          {likes} like <button onClick={() => addLike()}>like</button>
        </p>
        <p>{blog.user.name}</p>
        <button onClick={() => toggleMore(!showMore)}>less</button>
        <button onClick={() => removeBlog(blog.id)}>remove</button>
      </div>
    );
  }
  return (
    <div className="blog">
      {blog.title} {blog.author}
      <button onClick={() => toggleMore(!showMore)}>more</button>
    </div>
  );
};

export default Blog;
