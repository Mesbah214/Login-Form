/* eslint-disable react/prop-types */
import { useState, useEffect, useReducer, useContext, useRef } from "react";
import { emailReducer, passwordReducer } from "../../hooks/FormReducer";
import AuthContext from "../../store/auth-context";
import Input from "../UI/Input/Input";

import Card from "../UI/Card/Card";
import classes from "./Login.module.css";
import Button from "../UI/Button/Button";

const Login = () => {
  const [formIsValid, setFormIsValid] = useState(false);
  const loginCtx = useContext(AuthContext);

  const emailRef = useRef();
  const passwordRef = useRef();

  const [emailState, emailDispatch] = useReducer(emailReducer, {
    value: "",
    isValid: null,
  });

  const [passwordState, passwordDispatch] = useReducer(passwordReducer, {
    value: "",
    isValid: null,
  });

  const { isValid: emailIsValid } = emailState;
  const { isValid: passwordIsValid } = passwordState;

  useEffect(() => {
    const identifier = setTimeout(() => {
      setFormIsValid(emailIsValid && passwordIsValid);
    }, 500);

    return () => {
      clearTimeout(identifier);
    };
  }, [emailIsValid, passwordIsValid]);

  const emailChangeHandler = (event) => {
    emailDispatch({
      type: "on_change",
      value: event.target.value,
    });

    // setFormIsValid(emailState.isValid && passwordState.isValid);
  };

  const passwordChangeHandler = (event) => {
    passwordDispatch({
      type: "on_change",
      value: event.target.value,
    });

    // setFormIsValid(emailState.isValid && passwordState.isValid);
  };

  const validateEmailHandler = () => {
    emailDispatch({ type: "on_blur" });
  };

  const validatePasswordHandler = () => {
    passwordDispatch({ type: "on_blur" });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    if (formIsValid) {
      loginCtx.onLogin(emailState.value, passwordState.value);
    } else if (!emailIsValid) {
      emailRef.current.focus();
    } else {
      passwordRef.current.focus();
    }
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <Input
          ref={emailRef}
          label="E-mail"
          id="email"
          type="email"
          value={emailState.value}
          onChangeHandler={emailChangeHandler}
          onBlurHandler={validateEmailHandler}
          isValid={emailState.isValid}
        />
        <Input
          ref={passwordRef}
          label="Password"
          id="password"
          type="password"
          value={passwordState.value}
          onChangeHandler={passwordChangeHandler}
          onBlurHandler={validatePasswordHandler}
          isValid={passwordState.isValid}
        />
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
