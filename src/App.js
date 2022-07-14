import { useEffect, useRef } from "react";
import Blogs from "./components/Blogs";
import Blog from "./components/Blog";
import BlogForm from "./components/BlogForm";
import Loginform from "./components/LoginForm";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";
import { getBlogs } from "./reducers/blogReducer";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "./reducers/loggedUserReducer";
import { getUsers } from "./reducers/usersReducer";
import Users from "./components/Users";
import User from "./components/User";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";

const App = () => {
  const user = useSelector((state) => state.loggedUser);
  const blogFormRef = useRef();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getBlogs());
    dispatch(getUsers());
    console.log("here");
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
  const padding = {
    padding: 5,
  };
  const showWhenLoggedIn = () => (
    <Router>
      <div>
        <Link style={padding} to="/">
          blogs
        </Link>
        <Link style={padding} to="/users">
          users
        </Link>
        {user.name} logged in
        <button onClick={handleLogout}>logout</button>
      </div>
      <h2>blog app</h2>
      <Togglable buttonLabel="new blog" ref={blogFormRef}>
        <BlogForm user={user} toggleVisibility={toggleVisibility} />
      </Togglable>
      <Routes>
        <Route path="/users" element={<Users />} />
        <Route path="/" element={<Blogs user={user} />} />
        <Route path="/users/:id" element={<User />} />
        <Route path="/blogs/:id" element={<Blog />} />
      </Routes>
    </Router>
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
