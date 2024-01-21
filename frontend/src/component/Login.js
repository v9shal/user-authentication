import React, { useState } from "react";
import Axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const [values, setValues] = useState({
    Username: "",
    password: "", 
  });

  const [loginStatus, setLoginStatus] = useState("");

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
 const  RedirectToRegister=()=>{
  navigate("/register")
 }

  const handleSubmit = (e) => {
    e.preventDefault();
    Axios.post("http://localhost:8080/login", values)
      .then((result) => {
        if (result.data.success) {
          console.log("Login successful");
          setLoginStatus("Logged in");
        // Redirect to the home page
          navigate("/home");
        } else {
          setLoginStatus("Wrong username or password");
          console.log("Login unsuccessful");
        }
      })
      .catch((err) => {
        console.error(err);
        setLoginStatus("Invalid Password");
      });
  };

  return (
    <div>
      <div>Login</div>
      <form action="/login" method="post" onSubmit={handleSubmit}>
        <label htmlFor="uname">Username: </label>
        <input type="text" required name="Username" onChange={handleChange} />
        <br />
        Password:<br />
        <input
          type="password"
          id="pwd"
          name="password" 
          onChange={handleChange}
        />
        <br />
        <button type="submit" id="sub">
          Submit
        </button>
        <button  onClick={RedirectToRegister}>register here</button>
      </form>
      <p>{loginStatus}</p>
    </div>
  );
};

export default Login;
