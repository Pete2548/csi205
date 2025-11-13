import { useRef } from "react";
import { verifyUser } from "../data/users";
import "./Login.css";
import Form from "react-bootstrap/Form";

function Login({ setToken }) {
  const userRef = useRef();
  const passRef = useRef();
  return (
    <div className="login-container">
      <Form.Label htmlFor="username">username</Form.Label>
      <Form.Control
        type="text"
        id="username"
        aria-describedby="passwordHelpBlock"
        placeholder="user"
        style={{ textAlign: "center" }}
        ref={userRef}
      />
      <Form.Label htmlFor="password">Password</Form.Label>
      <Form.Control
        type="password"
        id="password"
        aria-describedby="passwordHelpBlock"
        placeholder="password"
        style={{ textAlign: "center" }}
        ref={passRef}
      />
      <button
        className="btn btn-success mt-3"
        onClick={() => {
          const user = userRef.current.value.trim();
          const pass = passRef.current.value.trim();
          userRef.current.value = '';
          passRef.current.value = '';
          const userInfo = verifyUser(user, pass);
          if (userInfo === null) {
            alert("Invalid Credentials");
            userRef.current.focus();
          } else {
            setToken(userInfo.token);
          }
        }}
      >
        Login
      </button>
    </div>
  );
}
export default Login;
