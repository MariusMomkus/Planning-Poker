import { useState } from "react";

export const ForgotPassword = () => {
  const [remindPasswordEmail, setRemindPasswordEmail] = useState("");

  const handleSubmit = (e) => {
    alert("Check Your email!");
  };

  return (
    <div className="auth-form-wrapper">
      <div className="auth-form-container">
        <h1 className="app-name">Ace Planning Poker</h1>

        <form className="forgot-password-form" onSubmit={handleSubmit}>
          <label htmlFor="remind-password-email" className="input-field-label">
            Please enter your email address. You will <br />
            receive a link to create a new password.
          </label>
          <input
            id="remind-password-email"
            className="auth-forms-input-fields"
            value={remindPasswordEmail}
            onChange={(e) => setRemindPasswordEmail(e.target.value)}
            type="email"
            placeholder="email@gmail.com"
            required
          ></input>

          <button id="remind-password-button" type="submit">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};
