import { useDispatch, useSelector } from "react-redux/es/exports";
import { useState } from "react";
import { setNotification } from "../reducers/notificationReducer";
import { deleteBlog, updateBlog } from "../reducers/blogReducer";
import { useParams } from "react-router-dom";

const Blog = () => {
  const dispatch = useDispatch();
  const id = useParams().id;
  const blog = useSelector((state) =>
    state.blogs.find((blog) => blog.id === id)
  );
  const user = useSelector((state) => state.loggedUser);
  if (!blog) {
    return null;
  }
  // const blogStyle = {
  //   paddingTop: 10,
  //   paddingLeft: 2,
  //   border: "solid",
  //   borderWidth: 1,
  //   marginBottom: 5,
  // };
  const addLike = () => {
    dispatch(updateBlog({ ...blog, likes: blog.likes + 1 }));
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
  return (
    <div className="blog">
      <h2>
        {blog.title} by {blog.author}
      </h2>
      <a href={blog.url}>{blog.url}</a>
      <p>
        {blog.likes} like <button onClick={() => addLike()}>like</button>
      </p>
      <p>added by {blog.user.name}</p>
      <button onClick={() => removeBlog(blog.id)}>remove</button>
    </div>
  );
};

export default Blog;
