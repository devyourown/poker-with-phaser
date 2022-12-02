import React, { useCallback, useState } from "react";
import call, { Methods } from "../utils/api";

function Signup() {
  const [email, setEmail] = useState("");
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");

  const onEmailChange = useCallback((e) => {
    setEmail(e.target.value);
  }, []);

  const onNicknameChange = useCallback((e) => {
    setNickname(e.target.value);
  }, []);

  const onPasswordChange = useCallback((e) => {
    setPassword(e.target.value);
  }, []);

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();
      call("/auth/signup", Methods.POST, {
        email: email,
        nickname: nickname,
        password: password,
      })?.then((response) => {
        if (response.status === 200) window.location.href = "/login";
      });
    },
    [email, nickname, password]
  );

  return (
    <form onSubmit={onSubmit}>
      <div className="container">
        <label htmlFor="email">
          <b>Email: </b>
        </label>
        <input type="text" name="email" required onChange={onEmailChange} />
        <label htmlFor="nickname">
          <b>Nickname: </b>
        </label>
        <input
          type="text"
          name="nickname"
          required
          onChange={onNicknameChange}
        />
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
      </div>
    </form>
  );
}

export default Signup;
