import { useState } from "react";

function Login({ onLogin }) {
  const [formValue, setFormValue] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValue({
      ...formValue,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formValue.password || !formValue.email) {
      console.log("Passwords should be equal");
      return;
    }
    onLogin(formValue.password, formValue.email);
  };

  return (
    <>
      <div className="containerLoginForm">
        <h2 className="loginForm-header">Вход</h2>
        <form className="loginForm" onSubmit={handleSubmit}>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            className="loginForm__input LoginForm__input_email"
            placeholder="Email"
            value={formValue.email}
            onChange={handleChange}
          />

          <input
            className="loginForm__input LoginForm__input_password"
            id="password"
            name="password"
            type="password"
            placeholder="Пароль"
            autoComplete="new-password"
            value={formValue.password}
            onChange={handleChange}
          />
          <button className="loginForm__button-login">Войти</button>
        </form>
      </div>
    </>
  );
}
export default Login;
