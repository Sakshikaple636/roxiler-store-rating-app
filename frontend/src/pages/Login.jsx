import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function Login() {

  const navigate =
    useNavigate();

  const [formData,
    setFormData] =
    useState({
      email: "",
      password: ""
    });

  const handleChange =
    (e) => {

      setFormData({
        ...formData,
        [e.target.name]:
          e.target.value
      });
    };

  const handleSubmit =
    async (e) => {

      e.preventDefault();

      try {

        const response =
          await API.post(
            "/auth/login",
            formData
          );

        const {
          token,
          user
        } =
          response.data;

        localStorage.setItem(
          "token",
          token
        );

        localStorage.setItem(
          "user",
          JSON.stringify(user)
        );

        // Redirect by role
        if (
          user.role ===
          "ADMIN"
        ) {
          navigate("/admin");
        }

        else if (
          user.role ===
          "OWNER"
        ) {
          navigate("/owner");
        }

        else {
          navigate("/user");
        }

      } catch (error) {

        alert(
          error.response?.data?.message ||
          "Login Failed"
        );
      }
    };

  return (

    <div
      style={{
        width: "400px",
        margin: "50px auto"
      }}
    >

      <h2>
        Login
      </h2>

      <form
        onSubmit={
          handleSubmit
        }
      >

        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={
            handleChange
          }
          required
        />

        <br /><br />

        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={
            handleChange
          }
          required
        />

        <br /><br />

        <button
          type="submit"
        >
          Login
        </button>

      </form>

      <br />

      <button
        onClick={() =>
          navigate(
            "/register"
          )
        }
      >
        Register
      </button>

    </div>
  );
}

export default Login;