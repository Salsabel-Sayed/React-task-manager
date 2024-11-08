import axios from 'axios';
import { useFormik } from 'formik';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';  // Import Yup for validation

function LogIn() {
  const navigate = useNavigate(); 
  const [loading, setLoading] = useState(false); 
  const [message, setMessage] = useState("");

  async function loginNow(values) {
    setLoading(true); 
    try {
      const res = await axios.post('https://task-manager-j1at.onrender.com/api/users/login', values);
      localStorage.setItem("token", res.data.authorization);
      navigate("/home");
    } catch (error) {
      setLoading(false); 
      console.error("Error logging in:", error);

      if (error.response && error.response.data.message) {
        setMessage({
          type: 'danger',
          text: error.response.data.message,
        });
      } else {
        setMessage({
          type: 'danger',
          text: 'Error logging in. Please try again later.',
        });
      }
    }
  }

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      password: Yup.string()
        .min(3, "Password must be at least 3 characters")
        .max(10, "Password must be at most 10 characters")
        .required("Password is required"),
    }),
    onSubmit: loginNow,
  });

  return (
    <section className="login">
      <div className="container">
        <div className="row justify-content-around align-items-center">
          <div className="col-xl-8">
            <div className="loginForm p-4">
              <h2>Log In</h2>

              {/* Display success or error message */}
              {message && (
                <div className={`alert alert-${message.type} mt-3`} role="alert">
                  {message.text}
                </div>
              )}

              <form onSubmit={formik.handleSubmit}>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    name="email"
                    type="email"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.email}
                    className="form-control"
                    placeholder="Enter your email"
                  />
                  {formik.touched.email && formik.errors.email && (
                    <div className="text-danger">{formik.errors.email}</div>
                  )}
                </div>
                
                <div className="form-group mt-3">
                  <label htmlFor="password">Password</label>
                  <input
                    name="password"
                    type="password"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.password}
                    className="form-control"
                    placeholder="Enter your password"
                  />
                  {formik.touched.password && formik.errors.password && (
                    <div className="text-danger">{formik.errors.password}</div>
                  )}
                </div>

                <button
                  type="submit"
                  className="btn btn-primary mt-3"
                  disabled={loading}
                >
                  {loading ? 'Logging in...' : 'Log In'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default LogIn;
