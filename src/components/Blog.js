import { useDispatch, useSelector } from "react-redux/es/exports";
import { setNotification } from "../reducers/notificationReducer";
import { deleteBlog, updateBlog, addComment } from "../reducers/blogReducer";
import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";

const Blog = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [comment, setComment] = useState("");
  const id = useParams().id;
  const blog = useSelector((state) =>
    state.blogs.find((blog) => blog.id === id)
  );
  const user = useSelector((state) => state.loggedUser);
  if (!blog) {
    return null;
  }
  const handleComment = (event) => {
    event.preventDefault();
    dispatch(addComment(blog, comment));
    setComment("");
  };
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
                type: "success",
              },
              5
            )
          );
          navigate("/");
        })
        .catch((error) => {
          dispatch(
            setNotification(
              {
                msg: `user ${user.username} is not authorized to remove blog that belogs to ${blog.user.username}`,
                type: "warning",
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
        {blog.likes} likes <button onClick={() => addLike()}>like</button>
      </p>
      <p>added by {blog.user.name}</p>
      <button onClick={() => removeBlog(blog.id)}>remove</button>
      <h2>comments</h2>
      <form onSubmit={handleComment}>
        <input
          value={comment}
          onChange={({ target }) => setComment(target.value)}
          id="comment"
        />
        <button type="submit">add comment</button>
      </form>
      <ul>
        {blog.comments.map((comment) => (
          <li key={comment}>{comment}</li>
        ))}
      </ul>
    </div>
  );
};

export default Blog;
