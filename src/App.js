import { useEffect, useRef } from "react";
import Blogs from "./components/Blogs";
import BlogForm from "./components/BlogForm";
import Loginform from "./components/LoginForm";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";
import { getBlogs } from "./reducers/blogReducer";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "./reducers/loggedUserReducer";

const App = () => {
  const user = useSelector((state) => state.loggedUser);
  const blogFormRef = useRef();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getBlogs());
  });

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogAppUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      dispatch(setUser(user));
    }
  }, []);

  const handleLogout = () => {
    dispatch(setUser(null));
    window.localStorage.removeItem("loggedBlogAppUser");
  };

  const toggleVisibility = () => {
    blogFormRef.current.toggleVisibility();
  };

  const showWhenLoggedIn = () => (
    <div>
      <h2>{user.name} logged in</h2>
      <button onClick={handleLogout}>logout</button>
      <Togglable buttonLabel="new blog" ref={blogFormRef}>
        <BlogForm user={user} toggleVisibility={toggleVisibility} />
      </Togglable>
      <Blogs user={user} />
    </div>
  );

  return (
    <div>
      <Notification />
      {user === null && <Loginform />}
      {user && showWhenLoggedIn()}
    </div>
  );
};

export default App;
