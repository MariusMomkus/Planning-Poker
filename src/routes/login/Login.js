import { Box } from "@mui/system";
import { SHA512 } from "crypto-js";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUrl } from "../../api/ApiUrls";
import AppRoutes from "../routesConfig/AppRoutes";
export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const encryptedPassword = SHA512(password).toString();

    const fetchUserByEmail = `${loginUrl}?email=${email}&password=${encryptedPassword}`;

    fetch(fetchUserByEmail, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      mode: "cors",
    })
      .then((response) => {
        if (response.ok) {
          response.json().then((data) => {
            sessionStorage.setItem("loggedUserId", data.userId);
            sessionStorage.setItem("loggedUserName", data.userName);
            navigate(AppRoutes.ROOM_LIST);
          });
        } else {
          // Handles error response
          response.json().then((data) => {
            if (data.message) {
              setErrorMessage(data.message);
            } else {
              setErrorMessage("An error occurred.");
            }
          });
        }
      })
      .catch((error) => {
        // Handles network error
        setErrorMessage("A problem has occured: " + error);
        //Todo limit acess to home, room list...
      });
  };

  return (
    <div className="auth-form-wrapper">
      <div className="auth-form-container">
        <h1 className="app-name">Ace Planning Poker</h1>

        <form className="login-form" onSubmit={handleSubmit}>
          <Box className="input-field-container">
            <label htmlFor="login-email" className="input-field-label">
              Email
            </label>
            <input
              id="login-email"
              className="auth-forms-input-fields"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="email@gmail.com"
              required
            ></input>
          </Box>
          <Box className="input-field-container">
            <label htmlFor="login-password" className="input-field-label">
              Password
            </label>
            <input
              id="login-password"
              className="auth-forms-input-fields"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="********"
              required
            ></input>
            <Box className="error-message">{errorMessage}</Box>
          </Box>
          <button id="login-button" type="submit">
            Log In
          </button>
        </form>

        <button
          className="link-button"
          onClick={() => navigate(AppRoutes.SIGN_UP)}
        >
          Don't have an account? Register here.
        </button>
      </div>
    </div>
  );
};
