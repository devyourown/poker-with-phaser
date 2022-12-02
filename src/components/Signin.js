import React from "react";
import { useCallback } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import call, { Methods } from "../utils/api";

function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const onEmailChange = useCallback((e) => {
    setEmail(e.target.value);
  }, []);

  const onPasswordChange = useCallback((e) => {
    setPassword(e.target.value);
  }, []);

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();
      call("/auth/signin", Methods.POST, {
        email: email,
        password: password,
      })
        ?.then((response) => {
          if (response.data.token) {
            localStorage.setItem("TOKEN", response.data.token);
            window.location.href = "/";
            return;
          }
          setError("아이디 또는 비밀번호가 정확하지 않습니다.");
        })
        .catch((error) => {
          setError("아이디 또는 비밀번호가 정확하지 않습니다.");
        });
    },
    [email, password]
  );

  return (
    <form onSubmit={onSubmit}>
      <div className="container">
        <label htmlFor="email">
          <b>Email: </b>
        </label>
        <input type="text" name="email" required onChange={onEmailChange} />
        <label htmlFor="password">
          <b>Password: </b>
        </label>
        <input
          type="password"
          name="password"
          required
          onChange={onPasswordChange}
        />
        <button type="submit">Login</button>
        <div>{error !== "" ? error : ""}</div>
        <Link to="../signup">Signup</Link>
      </div>
    </form>
  );
}

export default Signin;
