import {
  useEffect,
  useState
} from "react";

import API
from "../services/api";

function AdminDashboard() {

  const [
    dashboard,
    setDashboard
  ] = useState({});

  const [
    users,
    setUsers
  ] = useState([]);

  const [
    stores,
    setStores
  ] = useState([]);

  const token =
    localStorage.getItem(
      "token"
    );

  const headers = {
    Authorization:
      `Bearer ${token}`
  };

  const fetchDashboard =
    async () => {

      const res =
        await API.get(
          "/admin/dashboard",
          { headers }
        );

      setDashboard(
        res.data
      );
    };

  const fetchUsers =
    async () => {

      const res =
        await API.get(
          "/admin/users",
          { headers }
        );

      setUsers(
        res.data
      );
    };

  const fetchStores =
    async () => {

      const res =
        await API.get(
          "/admin/stores",
          { headers }
        );

      setStores(
        res.data
      );
    };

  useEffect(() => {

    fetchDashboard();
    fetchUsers();
    fetchStores();

  }, []);

  const addUser =
    async () => {

      const name =
        prompt("Name");

      const email =
        prompt("Email");

      const password =
        prompt("Password");

      const address =
        prompt("Address");

      const role =
        prompt(
          "Role (USER / OWNER)"
        );

      try {

        await API.post(
          "/admin/add-user",
          {
            name,
            email,
            password,
            address,
            role
          },
          { headers }
        );

        alert(
          "User Added"
        );

        fetchUsers();

      } catch (error) {

        alert(
          error.response
          ?.data?.message
        );
      }
    };

  const addStore =
    async () => {

      const name =
        prompt("Store Name");

      const email =
        prompt("Store Email");

      const address =
        prompt("Address");

      const owner_id =
        prompt("Owner ID");

      try {

        await API.post(
          "/admin/add-store",
          {
            name,
            email,
            address,
            owner_id
          },
          { headers }
        );

        alert(
          "Store Added"
        );

        fetchStores();

      } catch (error) {

        alert(
          error.response
          ?.data?.message
        );
      }
    };

  const logout =
    () => {

      localStorage.clear();

      window.location.href =
        "/";
    };

  return (

    <div
      style={{
        width: "90%",
        margin: "auto"
      }}
    >

      <h1>
        Admin Dashboard
      </h1>

      <button
        onClick={
          logout
        }
      >
        Logout
      </button>

      <h2>
        Dashboard
      </h2>

      <p>
        Total Users:
        {
          dashboard.totalUsers
        }
      </p>

      <p>
        Total Stores:
        {
          dashboard.totalStores
        }
      </p>

      <p>
        Total Ratings:
        {
          dashboard.totalRatings
        }
      </p>

      <button
        onClick={
          addUser
        }
      >
        Add User
      </button>

      <button
        onClick={
          addStore
        }
      >
        Add Store
      </button>

      <hr />

      <h2>
        Users
      </h2>

      <table
        border="1"
      >

        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
          </tr>
        </thead>

        <tbody>

          {users.map(
            (user) => (
            <tr
              key={
                user.id
              }
            >
              <td>
                {user.id}
              </td>

              <td>
                {user.name}
              </td>

              <td>
                {user.email}
              </td>

              <td>
                {user.role}
              </td>
            </tr>
          ))}

        </tbody>

      </table>

      <hr />

      <h2>
        Stores
      </h2>

      <table
        border="1"
      >

        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Rating</th>
          </tr>
        </thead>

        <tbody>

          {stores.map(
            (store) => (
            <tr
              key={
                store.id
              }
            >
              <td>
                {store.id}
              </td>

              <td>
                {store.name}
              </td>

              <td>
                {store.email}
              </td>

              <td>
                {
                  store.averageRating
                }
              </td>
            </tr>
          ))}

        </tbody>

      </table>

    </div>
  );
}

export default AdminDashboard;