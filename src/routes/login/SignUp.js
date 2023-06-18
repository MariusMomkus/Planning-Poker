import { SHA512 } from "crypto-js";
import React, { useState } from "react";
import PasswordChecklist from "react-password-checklist";
import { useNavigate } from "react-router-dom";
import { addUserUrl } from "../../api/ApiUrls";
import AppRoutes from "../routesConfig/AppRoutes";
import { Box } from "@mui/system";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
} from "@mui/material";

export const SignUp = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [allowSubmit, setAllowSubmit] = useState(false);

  const [openDialog, setOpenDialog] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (allowSubmit) {
      setAllowSubmit(true);

      const encryptedPassword = SHA512(password).toString();
      const data = {
        userName: username,
        email: email,
        password: encryptedPassword,
      };

      const saveData = () => {
        fetch(addUserUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          mode: "cors",
          body: JSON.stringify(data),
        })
          .then((response) => {
            if (response.ok) {
              setOpenDialog(true);
            } else {
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
            setErrorMessage("An error has occured: " + error.message);
          });
      };
      saveData();
    }
  };
  const navigate = useNavigate();
  const routeChange = () => navigate(AppRoutes.LOGIN);

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
  };

  const handlePasswordChecklistChange = (isValid) => {
    setAllowSubmit(isValid);
  };

  function handleCloseDialog() {
    setOpenDialog(false);
    navigate(AppRoutes.LOGIN);
  }

  return (
    <div className="auth-form-wrapper">
      <div className="auth-form-container">
        <h1 className="app-name">Ace Planning Poker</h1>
        <form className="register-form" onSubmit={handleSubmit}>
          <Box className="input-field-container">
            <label htmlFor="signup-username" className="input-field-label">
              Username
            </label>
            <input
              id="signup-username"
              className="auth-forms-input-fields"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              type="text"
              placeholder="Username"
              required
            ></input>
          </Box>
          <Box className="input-field-container">
            <label htmlFor="signup-email" className="input-field-label">
              Email
            </label>
            <input
              id="signup-email"
              className="auth-forms-input-fields"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="email@gmail.com"
              required
            ></input>
          </Box>
          <Box className="input-field-container">
            <label htmlFor="signup-password" className="input-field-label">
              Password
            </label>
            <input
              id="signup-password"
              className="auth-forms-input-fields"
              value={password}
              onChange={handlePasswordChange}
              type="password"
              placeholder="********"
              required
            ></input>
          </Box>
          <Box className="input-field-container">
            <label
              htmlFor="signup-confirm-password"
              className="input-field-label"
            >
              Confirm password
            </label>
            <input
              id="signup-confirmPassword"
              className="auth-forms-input-fields"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              type="password"
              placeholder="********"
              required
            ></input>
          </Box>
          <Box className="error-message">{errorMessage}</Box>
          <PasswordChecklist
            className="password-checklist"
            iconSize={14}
            invalidColor="#ba000d"
            rules={["minLength", "specialChar", "number", "capital", "match"]}
            minLength={5}
            value={password}
            valueAgain={confirmPassword}
            onChange={handlePasswordChecklistChange}
          />

          <button id="signup-button" type="submit">
            Register
          </button>
        </form>
        <button onClick={routeChange} className="link-button">
          Already have an account? Login here.
        </button>

        <Dialog
          open={openDialog}
          onClose={handleCloseDialog}
          className="create-room-success-popup"
        >
          <DialogContent>
            <DialogContentText className="create-room-success-popup-description">
              User{" "}
              <Box component="span" className="delete-room-room-name">
                {username}
              </Box>{" "}
              has been created successfully!
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog}>OK</Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
};
