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
    margin: "100px auto",
    padding: "30px",
    boxShadow: "0px 0px 10px lightgray",
    borderRadius: "10px",
    backgroundColor: "white"
  }}
>

     <h2
  style={{
    textAlign: "center",
    color: "#1976d2"
  }}
>
  Store Rating App
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
  onChange={handleChange}
  required
  style={{
    width: "100%",
    padding: "10px"
  }}
/>

        <br /><br />

        <input
  type="password"
  name="password"
  placeholder="Password"
  onChange={handleChange}
  required
  style={{
    width: "100%",
    padding: "10px"
  }}
/>

        <br /><br />

        <button
          type="submit"
          style={{
    width: "100%",
    padding: "10px",
    backgroundColor: "#1976d2",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer"
  }}
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
         style={{
    width: "100%",
    padding: "10px",
    backgroundColor: "#4caf50",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer"
  }}
      >
        Register
      </button>

    </div>
  );
}

export default Login;