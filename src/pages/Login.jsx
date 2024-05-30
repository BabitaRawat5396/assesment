import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../services/operations/authAPI";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const handleOnChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    dispatch(login(email, password, navigate));
  };

  return (
    <header className="showcase">
      <div className="showcase-content">
        <h1 className="text-[#fff] w-full text-center text-2xl p-4">LOGIN</h1>

        <div className="formm">
          <form onSubmit={handleOnSubmit}>
            <h2 className="w-full text-center text-lg pb-4">Welcome user!</h2>
            <div className="info">
              <input
                className="email"
                type="email"
                placeholder="Email"
                name="email"
                onChange={handleOnChange}
                required
              />
              <br />
              <input
                className="email"
                type="password"
                placeholder="Password"
                name="password"
                onChange={handleOnChange}
                required
              />
            </div>
            <div className="btn">
              <button className="btn-primary" type="submit">
                Sign In
              </button>
            </div>
          </form>
        </div>
      </div>
    </header>
  );
}

export default Login;
