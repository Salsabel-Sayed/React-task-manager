import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";  // Import Yup for validation

function Register() {
  const [loading, setLoading] = useState(false); 
  const [errorMessage, setErrorMessage] = useState(""); 
  const [successMessage, setSuccessMessage] = useState(""); 
  const navigate = useNavigate(); 

  // Handle registration request
  async function registerNow(values) {
    setLoading(true); 
    setErrorMessage(""); 
    setSuccessMessage(""); 

    try {
      const { data } = await axios.post(
        "https://task-manager-j1at.onrender.com/api/users/signup",
        values
      );
      console.log("Registration success:", data);

      // Show success message
      setSuccessMessage("Registration successful! Redirecting to login page.");

      // Redirect to login page after a short delay
      setTimeout(() => {
        navigate("/login"); 
      }, 2000); 
    } catch (error) {
      setLoading(false); 

      if (error.response && error.response.data.errors) {
        setErrorMessage(error.response.data.errors[0].msg); 
      } else {
        setErrorMessage("An error occurred during registration. Please try again.");
      }
    }
  }

  const RegisterFormik = useFormik({
    initialValues: {
      userName: "",
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      userName: Yup.string()
        .min(3, "Username must be at least 3 characters")
        .max(10, "Username must be at most 10 characters")
        .required("Username is required"),
      email: Yup.string()
        .email("Invalid email address")
        .matches(
          /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|net)$/,
          "Email must be a valid .com or .net address"
        )
        .required("Email is required"),
      password: Yup.string()
        .matches(/^[a-zA-Z0-9]{3,10}$/, "Password must be alphanumeric and between 3-10 characters")
        .required("Password is required"),
    }),
    onSubmit: registerNow,
  });

  return (
    <section className="register">
      <div className="container">
        <div className="row justify-content-around align-items-center">
          <div className="col-xl-8">
            <div className="registerForm p-4">
              <h2>Register</h2>

              {/* Display success message */}
              {successMessage && (
                <div className="alert alert-success mt-3" role="alert">
                  {successMessage}
                </div>
              )}

              {/* Display error message */}
              {errorMessage && (
                <div className="alert alert-danger mt-3" role="alert">
                  {errorMessage}
                </div>
              )}

              <form onSubmit={RegisterFormik.handleSubmit}>
                {/* UserName Input */}
                <div className="form-group">
                  <label htmlFor="userName">Username</label>
                  <input
                    name="userName"
                    type="text"
                    onBlur={RegisterFormik.handleBlur}
                    onChange={RegisterFormik.handleChange}
                    value={RegisterFormik.values.userName}
                    className="form-control"
                    placeholder="Enter your name"
                  />
                  {RegisterFormik.touched.userName && RegisterFormik.errors.userName && (
                    <div className="text-danger">{RegisterFormik.errors.userName}</div>
                  )}
                </div>

                {/* Email Input */}
                <div className="form-group mt-3">
                  <label htmlFor="email">Email</label>
                  <input
                    name="email"
                    type="email"
                    onBlur={RegisterFormik.handleBlur}
                    onChange={RegisterFormik.handleChange}
                    value={RegisterFormik.values.email}
                    className="form-control"
                    placeholder="Enter your email"
                  />
                  {RegisterFormik.touched.email && RegisterFormik.errors.email && (
                    <div className="text-danger">{RegisterFormik.errors.email}</div>
                  )}
                </div>

                {/* Password Input */}
                <div className="form-group mt-3">
                  <label htmlFor="password">Password</label>
                  <input
                    name="password"
                    type="password"
                    onBlur={RegisterFormik.handleBlur}
                    onChange={RegisterFormik.handleChange}
                    value={RegisterFormik.values.password}
                    className="form-control"
                    placeholder="Enter your password"
                  />
                  {RegisterFormik.touched.password && RegisterFormik.errors.password && (
                    <div className="text-danger">{RegisterFormik.errors.password}</div>
                  )}
                </div>

                {/* Submit Button */}
                <button type="submit" className="btn btn-primary mt-3" disabled={loading}>
                  {loading ? "Registering..." : "Register"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Register;
