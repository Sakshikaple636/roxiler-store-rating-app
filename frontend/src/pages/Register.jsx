import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function Register() {

  const navigate =
    useNavigate();

  const [formData,
    setFormData] =
    useState({
      name: "",
      email: "",
      password: "",
      address: "",
      role: "USER"
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
            "/auth/register",
            formData
          );

        alert(
          response.data.message
        );

        navigate("/");

      } catch (error) {

        alert(
          error.response?.data?.message ||
          "Registration Failed"
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
        Register
      </h2>

      <form
        onSubmit={
          handleSubmit
        }
      >

        <input
          type="text"
          name="name"
          placeholder="Full Name"
          onChange={
            handleChange
          }
          required
        />

        <br /><br />

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

        <input
          type="text"
          name="address"
          placeholder="Address"
          onChange={
            handleChange
          }
          required
        />

        <br /><br />

        <select
          name="role"
          onChange={
            handleChange
          }
        >

          <option value="USER">
            USER
          </option>

          <option value="OWNER">
            OWNER
          </option>

        </select>

        <br /><br />

        <button
          type="submit"
        >
          Register
        </button>

      </form>

      <br />

      <button
        onClick={() =>
          navigate("/")
        }
      >
        Back To Login
      </button>

    </div>
  );
}

export default Register;