import React, { useState, useEffect, useReducer, useContext } from "react";

import Card from "../UI/Card/Card";
import classes from "./Login.module.css";
import Button from "../UI/Button/Button";
import Input from "../UI/Input/Input";
import AuthContext from "../../store/auth-context";

const emailReducer = (state, action) => {
    if (action.type === "EMAIL_CHANGE") {
        return { value: action.value, isValid: action.value.includes("@") };
    }

    if (action.type === "EMAIL_BLUR") {
        return { value: state.value, isValid: state.value.includes("@") };
    }

    return {
        value: "",
        isValid: false,
    };
};

const passwordReducer = (state, action) => {
    if (action.type === "PASSWORD_CHANGE") {
        return { value: action.value, isValid: action.value.trim().length > 6 };
    }

    if (action.type === "PASSWORD_BLUR") {
        return { value: state.value, isValid: state.value.trim().length > 6 };
    }
    return { value: "", isValid: false };
};

const Login = () => {
    const [formIsValid, setFormIsValid] = useState(false);

    const [emailState, dispatchEmail] = useReducer(emailReducer, {
        value: "",
        isValid: null,
    });

    const [passwordState, dispatchPassword] = useReducer(passwordReducer, {
        value: "",
        isValid: null,
    });

    const authCtx = useContext(AuthContext);

    const { isValid: emailIsValid } = emailState; // destructuring properties from object
    const { isValid: passwordIsValid } = passwordState; // destructuring properties from object
    useEffect(() => {
        const timeoutIndentifier = setTimeout(() => {
            console.log("Check form validity");
            setFormIsValid(emailIsValid && passwordIsValid);
        }, 500);

        return () => {
            console.log("CLEAN UP");
            clearTimeout(timeoutIndentifier);
        };
    }, [emailIsValid, passwordIsValid]); // pass specific properties instead of the entire object as a dependency

    const emailChangeHandler = (event) => {
        dispatchEmail({ type: "EMAIL_CHANGE", value: event.target.value });
        setFormIsValid(emailState.isValid && passwordState.isValid);
    };

    const passwordChangeHandler = (event) => {
        dispatchPassword({
            type: "PASSWORD_CHANGE",
            value: event.target.value,
        });

        setFormIsValid(emailState.isValid && passwordState.isValid);
    };

    const validateEmailHandler = () => {
        dispatchEmail({ type: "EMAIL_BLUR" });
    };

    const validatePasswordHandler = () => {
        dispatchPassword({ type: "PASSWORD_BLUR" });
    };

    const submitHandler = (event) => {
        event.preventDefault();
        authCtx.onLogin(emailState.value, passwordState.value);
    };

    return (
        <Card className={classes.login}>
            <form onSubmit={submitHandler}>
                <Input
                    type="email"
                    id="email"
                    value={emailState.value}
                    onChange={emailChangeHandler}
                    onBlur={validateEmailHandler}
                    isValid={emailState.isValid}
                    label="E-Mail"
                />

                <Input
                    type="password"
                    id="password"
                    value={passwordState.value}
                    onChange={passwordChangeHandler}
                    onBlur={validatePasswordHandler}
                    isValid={passwordState.isValid}
                    label="Password"
                />

                <div className={classes.actions}>
                    <Button
                        type="submit"
                        className={classes.btn}
                        disabled={!formIsValid}
                    >
                        Login
                    </Button>
                </div>
            </form>
        </Card>
    );
};

export default Login;
