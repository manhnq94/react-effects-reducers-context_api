import React, { useState, useEffect, useReducer } from "react";

import Card from "../UI/Card/Card";
import classes from "./Login.module.css";
import Button from "../UI/Button/Button";

const formReducer = (state, action) => {
    if (action.type === "EMAIL_CHANGE") {
        return {
            ...state,
            enteredEmail: action.value,
            emailIsValid: action.value.includes("@"),
            formIsValid: action.value.includes("@") && state.passwordIsValid,
        };
    }

    if (action.type === "EMAIL_BLUR") {
        return {
            ...state,
            emailIsValid: state.enteredEmail.includes("@"),
            formIsValid:
                state.enteredEmail.includes("@") && state.passwordIsValid,
        };
    }

    if (action.type === "PASSWORD_CHANGE") {
        return {
            ...state,
            enteredPassword: action.value,
            passwordIsValid: action.value.trim().length > 6,
            formIsValid: action.value.trim().length > 6 && state.emailIsValid,
        };
    }

    if (action.type === "PASSWORD_BLUR") {
        return {
            ...state,
            passwordIsValid: state.enteredPassword.trim().length > 6,
            formIsValid:
                state.enteredPassword.trim().length > 6 && state.emailIsValid,
        };
    }

    return {
        enteredEmail: "",
        emailIsValid: false,
        enterPassword: "",
        passwordIsValid: false,
        formIsValid: false,
    };
};

const Login = (props) => {
    const [formState, dispatchForm] = useReducer(formReducer, {
        enteredEmail: "",
        emailIsValid: null,
        enterPassword: "",
        passwordIsValid: null,
        formIsValid: null,
    });
    // useEffect(() => {
    //     const timeoutIndentifier = setTimeout(() => {
    //         console.log("Check form validity");
    //         setFormIsValid(
    //             enteredEmail.includes("@") && enteredPassword.trim().length > 6
    //         );
    //     }, 500);

    //     return () => {
    //         console.log("CLEAN UP");
    //         clearTimeout(timeoutIndentifier);
    //     };
    // }, [enteredEmail, enteredPassword]); // if enteredEmail or enteredPassword change, it will check form validity

    const emailChangeHandler = (event) => {
        dispatchForm({ type: "EMAIL_CHANGE", value: event.target.value });
    };

    const passwordChangeHandler = (event) => {
        dispatchForm({
            type: "PASSWORD_CHANGE",
            value: event.target.value,
        });
    };

    const validateEmailHandler = () => {
        dispatchForm({ type: "EMAIL_BLUR" });
    };

    const validatePasswordHandler = () => {
        dispatchForm({ type: "PASSWORD_BLUR" });
    };

    const submitHandler = (event) => {
        event.preventDefault();
        props.onLogin(formState.enteredEmail, formState.enteredPassword);
    };

    return (
        <Card className={classes.login}>
            <form onSubmit={submitHandler}>
                <div
                    className={`${classes.control} ${
                        formState.emailIsValid === false ? classes.invalid : ""
                    }`}
                >
                    <label htmlFor="email">E-Mail</label>
                    <input
                        type="email"
                        id="email"
                        value={formState.enteredEmail}
                        onChange={emailChangeHandler}
                        onBlur={validateEmailHandler}
                    />
                </div>
                <div
                    className={`${classes.control} ${
                        formState.passwordIsValid === false
                            ? classes.invalid
                            : ""
                    }`}
                >
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        value={formState.enteredPassword}
                        onChange={passwordChangeHandler}
                        onBlur={validatePasswordHandler}
                    />
                </div>
                <div className={classes.actions}>
                    <Button
                        type="submit"
                        className={classes.btn}
                        disabled={!formState.formIsValid}
                    >
                        Login
                    </Button>
                </div>
            </form>
        </Card>
    );
};

export default Login;
