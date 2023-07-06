import React, { useState } from "react";
import { Link } from "react-router-dom";

function Register({ onRegister }) {
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
    if (formValue.password === formValue.confirmPassword) {
      console.log("Passwords should be equal");
      return;
    }
    const { password, email } = formValue;
    onRegister(password, email);
  };
  return (
    <>
      <div className="containerLoginForm">
        <h2 className="loginForm-header">Регистрация</h2>
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
          <button className="loginForm__button-login">
            Зарегистрироваться
          </button>
          <p className="loginForm__footer">
            Уже зарегистрированы?{" "}
            <Link className="loginForm__footer-button" to="/sign-in">
              Войти
            </Link>
          </p>
        </form>
      </div>
    </>
  );
}
export default Register;
