/* eslint-disable react/prop-types */
import { useState, useEffect, useReducer } from "react";

import Card from "../UI/Card/Card";
import classes from "./Login.module.css";
import Button from "../UI/Button/Button";

const emailReducer = (state, action) => {
  switch (action.type) {
    case "on_change": {
      return {
        ...state,
        value: action.value,
        isValid: action.value.includes("@"),
      };
    }

    case "on_blur": {
      return {
        ...state,
        isValid: state.value.includes("@"),
      };
    }
  }
  return {
    value: "",
    isValid: false,
  };
};

const passwordReducer = (state, action) => {
  switch (action.type) {
    case "on_change": {
      return {
        ...state,
        value: action.value,
        isValid: action.value.trim().length > 6,
      };
    }

    case "on_blur": {
      return {
        ...state,
        isValid: state.value.trim().length > 6,
      };
    }
  }
  return { value: "", isValid: false };
};

const Login = (props) => {
  const [emailState, emailDispatch] = useReducer(emailReducer, {
    value: "",
    isValid: null,
  });

  const [passwordState, passwordDispatch] = useReducer(passwordReducer, {
    value: "",
    isValid: null,
  });

  const [formIsValid, setFormIsValid] = useState(false);

  useEffect(() => {
    console.log("EFFECT RUNNING");

    return () => {
      console.log("EFFECT CLEANUP");
    };
  }, []);

  const emailChangeHandler = (event) => {
    emailDispatch({
      type: "on_change",
      value: event.target.value,
    });

    setFormIsValid(emailState.isValid && passwordState.isValid);
  };

  const passwordChangeHandler = (event) => {
    passwordDispatch({
      type: "on_change",
      value: event.target.value,
    });

    setFormIsValid(emailState.isValid && passwordState.isValid);
  };

  const validateEmailHandler = () => {
    emailDispatch({ type: "on_blur" });
  };

  const validatePasswordHandler = () => {
    passwordDispatch({ type: "on_blur" });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    props.onLogin(emailState.value, passwordState.value);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            emailState.isValid === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={emailState.value}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            passwordState.isValid === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={passwordState.value}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
