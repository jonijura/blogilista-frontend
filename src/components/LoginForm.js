import { useDispatch } from "react-redux/es/exports";
import { setNotification } from "../reducers/notificationReducer";
import { useState } from "react";
import { login } from "../reducers/loggedUserReducer";
import { Form, Button } from "react-bootstrap";

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
            { msg: "wrong username or password", type: "warning" },
            3
          )
        );
      });
  };

  return (
    <div>
      <h2>login</h2>
      <Form onSubmit={handleLogin}>
        <Form.Group>
          <Form.Label>username:</Form.Label>
          <Form.Control
            value={username}
            onChange={({ target }) => setUsername(target.value)}
            id="username"
          />
          <Form.Label>password:</Form.Label>
          <Form.Control
            value={password}
            onChange={({ target }) => setPassword(target.value)}
            id="password"
          />
          <Button variant="primary" type="submit" id="login-button">
            login
          </Button>
        </Form.Group>
      </Form>
    </div>
  );
};

export default LoginForm;
