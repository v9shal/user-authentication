import React, { useState } from "react";
import Axios from "axios";
import { useNavigate } from "react-router-dom";

function Register() {
  const [values, setValues] = useState({
    Username: "",
    password: "",
    confirmPassword: "",
  });

  const [registrationStatus, setRegistrationStatus] = useState("");
  const [passwordMatchError, setPasswordMatchError] = useState("");

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
    setPasswordMatchError("");
  };

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (values.password !== values.confirmPassword) {
      setPasswordMatchError("Passwords do not match");
      return;
    }

    Axios.post("http://localhost:8080/register", values)
      .then((res) => {
        if (res.data.success) {
          console.log("Registered");
          setRegistrationStatus("Registered");
        } else {
          console.log("User already exists");
          setRegistrationStatus("User already exists");
        }
      })
      .catch((err) => {
        console.log(err);
        setRegistrationStatus("Registration failed");
      });
  };

  const redirectToLogin = () => {
    navigate("/");
  };

  return (
    <div className="App">
      <div>REGISTER</div>
      <form action="/register" method="post" onSubmit={handleSubmit}>
        <label htmlFor="uname">Username: </label>
        <input type="text" required name="Username" onChange={handleChange} /><br />
        Password:<br />
        <input type="password" id="pwd" name="password" onChange={handleChange} /><br />
        Confirm Password:<br />
        <input
          type="password"
          data-equalto="#pwd"
          required
          name="confirmPassword"
          onChange={handleChange}
        /><br />
        {passwordMatchError && <p style={{ color: "b" }}>{passwordMatchError}</p>}
        <br />
        <input type="submit" value="Submit" />
      </form>
      <button onClick={redirectToLogin}>already have acc</button>
      <p>{registrationStatus}</p>
    </div>
  );
}

export default Register;
