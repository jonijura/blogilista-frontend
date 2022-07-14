import { useDispatch } from "react-redux/es/exports";
import { setNotification } from "../reducers/notificationReducer";
import { createBlog } from "../reducers/blogReducer";
import { useState } from "react";

const BlogForm = ({ user, toggleVisibility, mockFun }) => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    if (mockFun) {
      mockFun(title, author, url);
      return;
    }
    dispatch(createBlog({ title, author, url, user })).then((blog) => {
      setTitle("");
      setAuthor("");
      setUrl("");
      dispatch(
        setNotification(
          {
            msg: `a new blog ${blog.title} by ${blog.author} added`,
            type: "success",
          },
          3
        )
      );
    });
    toggleVisibility();
  };

  return (
    <div>
      <h2>new blog</h2>
      <form onSubmit={handleSubmit}>
        <div>
          title
          <input
            value={title}
            onChange={({ target }) => setTitle(target.value)}
            id="title"
          />
        </div>
        <div>
          author
          <input
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
            id="author"
          />
        </div>
        <div>
          url
          <input
            value={url}
            onChange={({ target }) => setUrl(target.value)}
            id="url"
          />
        </div>
        <button type="submit" id="create-button">
          create
        </button>
      </form>
    </div>
  );
};

export default BlogForm;
