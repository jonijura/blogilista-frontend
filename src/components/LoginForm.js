import { useDispatch } from "react-redux/es/exports";
import { setNotification } from "../reducers/notificationReducer";
import { useState } from "react";
import { login } from "../reducers/loggedUserReducer";

const LoginForm = ({ setUser }) => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (event) => {
    event.preventDefault();
    dispatch(login(username, password))
      .then((user) => {
        window.localStorage.setItem("loggedBlogAppUser", JSON.stringify(user));
        setUsername("");
        setPassword("");
        //setUser(user); //TODO find better way to reload App
      })
      .catch((error) => {
        dispatch(
          setNotification(
            { msg: "wrong username or password", type: "error" },
            3
          )
        );
      });
  };

  return (
    <div>
      <h2>login</h2>
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            value={username}
            onChange={({ target }) => setUsername(target.value)}
            id="username"
          />
        </div>
        <div>
          password
          <input
            value={password}
            onChange={({ target }) => setPassword(target.value)}
            id="password"
          />
        </div>
        <button type="submit" id="login-button">
          login
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
