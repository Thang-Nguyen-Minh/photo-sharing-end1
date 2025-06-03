import React, { useState } from "react";
import "./LoginRegister.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const LoginRegister = () => {
    const navigate = useNavigate();
    const [loginName, setLoginName] = useState("");
    const [password, setPassword] = useState("");
    const [isLoginNameEmpty, setIsLoginNameEmpty] = useState(false);
    const [isPasswordEmpty, setIsPasswordEmpty] = useState(false);
    const [isLoginNameOrPasswordWrong, setIsLoginNameOrPasswordWrong] = useState(false);

    const handleLogin = (event) => {
        if (loginName !== "") {
            if (password !== "") {
                axios
                    .post("http://localhost:8080/admin/login", {
                        username: loginName,
                        password: password
                    },{withCredentials: true})
                    .then((response) => {
                        console.log(response.data);
                        let userLink = "/users/" + response.data._id;
                        setIsLoginNameEmpty(false);
                        setIsPasswordEmpty(false);
                        setIsLoginNameOrPasswordWrong(false);
                        sessionStorage.setItem("isLoggedIn", true);
                        sessionStorage.setItem("userNameLogin", {firstname:response.data.firstname, lastname:response.data.lastname});
                        navigate(userLink);
                        window.location.reload();
                    })
                    .catch((err) => {
                        console.log(err);
                        setIsLoginNameEmpty(false);
                        setIsPasswordEmpty(false);
                        setIsLoginNameOrPasswordWrong(true);
                    });
            } else {
                setIsLoginNameEmpty(false);
                setIsPasswordEmpty(true);
                setIsLoginNameOrPasswordWrong(false);
            }
        } else {
            setIsLoginNameEmpty(true);
            setIsPasswordEmpty(false);
            setIsLoginNameOrPasswordWrong(false);
        }
        event.preventDefault();
    };

    const handleRegister = (event) => {
        event.preventDefault();
        navigate("/register");
    };

    const handleChangeUsername = (event) => {
        setLoginName(event.target.value);
    };

    const handleChangePassword = (event) => {
        setPassword(event.target.value);
    };

    const showEmptyMessageForLoginName = () => {
        if (isLoginNameEmpty) {
            return (
                <span style={{ color: "red" }}>
          Username cannot be empty. Please try again.
          <br />
        </span>
            );
        }
        return null;
    };

    const showEmptyMessageForPassword = () => {
        if (isPasswordEmpty) {
            return (
                <span style={{ color: "red" }}>
          Password cannot be empty. Please try again.
          <br />
        </span>
            );
        }
        return null;
    };

    const showErrorMessage = () => {
        if (isLoginNameOrPasswordWrong) {
            return (
                <span style={{ color: "red" }}>
          Username or password is not correct.
          <br />
        </span>
            );
        }
        return null;
    };

    return (
        <div className="login-container">
            <h3>Please log in with your username and password.</h3>
            <p>If you do not have an account, please register as a new user.</p>

            <div className="form-group">
                <label>Username:</label>
                <input
                    type="text"
                    value={loginName}
                    onChange={handleChangeUsername}
                    className="input-field"
                />
            </div>

            <div className="form-group">
                <label>Password:</label>
                <input
                    type="password"
                    value={password}
                    onChange={handleChangePassword}
                    className="input-field"
                />
            </div>

            <div className="error-messages">
                {showEmptyMessageForLoginName()}
                {showEmptyMessageForPassword()}
                {showErrorMessage()}
            </div>

            <div className="button-group">
                <button type="button" onClick={handleLogin} className="btn login-btn">
                    Login
                </button>
                <button type="button" onClick={handleRegister} className="btn register-btn">
                    Register
                </button>
            </div>
        </div>
    );
};

export default LoginRegister;