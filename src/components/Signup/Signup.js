import { Input } from '@material-ui/core';
import React, { useContext, useState } from 'react'
import { signUp } from '../../Util/authUtil';
import './Signup.css';
import { Redirect } from 'react-router-dom';
import UserContext from '../../provider/UserContext';

const Signup = (props) => {
  const user = useContext(UserContext);
  const [values, setValues] = useState({
    formInput: {
      email: "",
      password: "",
      username: ""
    },
    loading: false,
    error: "",
    isFormValid: false
  });

  const onSignupHandler = (event) => {
    event.preventDefault();
    setValues({ ...values, loading: true, error: "" });

    signUp(values.formInput.email, values.formInput.password, values.formInput.username, ({ success, message }) => {
      if (success) {
        setValues({ formInput: { email: "", password: "", username: "" }, error: "", loading: false });
        props.history.replace("/");
      } else {
        setValues({ ...values, error: message, loading: false });
      }
    });
  }

  const onInputChangeHandler = (name, value) => {
    let tempFormInput = { ...values.formInput };
    tempFormInput[name] = value;
    if (name === "email") {
      let index = value.lastIndexOf("@");
      let tempUserName = index === -1 ? value : value.substring(0, index);
      tempFormInput["username"] = tempUserName;
    }
    let isFormValid = true;
    for (let input in tempFormInput) {
      isFormValid = tempFormInput[input] !== "" && isFormValid;
    }
    setValues({ formInput: tempFormInput, error: "", isFormValid: isFormValid });
  }


  return (
    <div className="signup__container">
      <form className="signup__form">
        {user && <Redirect to="/" />}
        <img
          className="signup__headerImage"
          src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
          alt="" />

        {values.error && <p style={{ marginTop: '8px', color: 'red', textAlign: 'center' }}>{values.error}</p>}

        <Input
          disabled={values.loading}
          className="signup__input"
          value={values.formInput.email}
          placeholder="Email"
          type="text"
          onChange={(e) => { onInputChangeHandler("email", e.target.value) }}
        />
        <Input
          disabled={values.loading}
          className="signup__input"
          placeholder="Password"
          value={values.formInput.password}
          type="password"
          onChange={(e) => { onInputChangeHandler("password", e.target.value) }}
        />

        <Input
          disabled
          className="signup__input"
          placeholder="Username"
          value={values.formInput.username}
          type="text"
          onChange={(e) => { onInputChangeHandler("username", e.target.value) }}
        />
        <button
          disabled={!values.isFormValid || values.loading}
          className="primaryButton my-2 py-1"
          type="submit"
          onClick={onSignupHandler}>{!values.isFormValid ? "Sign In" : values.loading ? "Please wait..." : "Sign In"}</button>
      </form>
    </div>
  )
}

export default Signup;
