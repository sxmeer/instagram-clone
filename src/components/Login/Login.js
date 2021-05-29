import { Input } from '@material-ui/core';
import React, { useContext, useState } from 'react'
import './Login.css';
import { signIn } from '../../Util/authUtil.js';
import { Redirect } from 'react-router-dom';
import UserContext from '../../provider/UserContext';

const Login = (props) => {
  const user = useContext(UserContext);
  const [values, setValues] = useState({
    formInput: {
      email: "",
      password: ""
    },
    loading: false,
    error: "",
    isFormValid: false
  });

  const onLoginHandler = (event) => {
    event.preventDefault();
    setValues({ ...values, loading: true, error: "" });
    signIn(values.formInput.email, values.formInput.password, ({ success, message }) => {
      if (success) {
        setValues({ formInput: { email: "", password: "" }, error: "", loading: false });
        props.history.replace("/");
      } else {
        setValues({ ...values, error: message, loading: false });
      }
    });
  }

  const onInputChangeHandler = (name, value) => {
    let tempFormInput = { ...values.formInput };
    tempFormInput[name] = value;
    let isFormValid = true;
    for (let input in tempFormInput) {
      isFormValid = tempFormInput[input] !== "" && isFormValid;
    }
    setValues({ formInput: tempFormInput, error: "", isFormValid: isFormValid });
  }


  return (
    <div className="login__container">
      <form className="login__form">
        {user && <Redirect to="/" />}
        <img
          className="login__headerImage"
          src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
          alt="" />

        {values.error && <p style={{ marginTop: '8px', color: 'red', textAlign: 'center' }}>{values.error}</p>}


        <Input
          disabled={values.loading}
          className="login__input"
          placeholder="Email"
          value={values.formInput.email}
          type="text"
          onChange={(e) => { onInputChangeHandler("email", e.target.value) }}
        />
        <Input
          disabled={values.loading}
          className="login__input"
          placeholder="Password"
          value={values.formInput.password}
          type="password"
          onChange={(e) => { onInputChangeHandler("password", e.target.value) }}
        />
        <button
          disabled={!values.isFormValid || values.loading}
          className="primaryButton primaryButton my-2 py-1"
          type="submit"
          onClick={onLoginHandler}>{!values.isFormValid ? "Log In" : values.loading ? "Logging in..." : "Log In"}</button>
      </form>
    </div>
  )
}

export default Login;
