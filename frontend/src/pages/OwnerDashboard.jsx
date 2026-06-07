import {
  useEffect,
  useState
} from "react";

import API
from "../services/api";

function OwnerDashboard() {

  const [
    dashboard,
    setDashboard
  ] = useState([]);

  const [
    ratings,
    setRatings
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

      try {

        const response =
          await API.get(
            "/owner/dashboard",
            { headers }
          );

        setDashboard(
          response.data
        );

      } catch (error) {

        console.log(error);
      }
    };

  const fetchRatings =
    async () => {

      try {

        const response =
          await API.get(
            "/owner/ratings",
            { headers }
          );

        setRatings(
          response.data
        );

      } catch (error) {

        console.log(error);
      }
    };

  useEffect(() => {

    fetchDashboard();
    fetchRatings();

    // eslint-disable-next-line
  }, []);

  const updatePassword =
    async () => {

      const oldPassword =
        prompt(
          "Old Password"
        );

      const newPassword =
        prompt(
          "New Password"
        );

      try {

        const response =
          await API.put(
            "/user/update-password",
            {
              oldPassword,
              newPassword
            },
            { headers }
          );

        alert(
          response.data
          .message
        );

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
        Owner Dashboard
      </h1>

      <button
        onClick={
          logout
        }
      >
        Logout
      </button>

      <button
        onClick={
          updatePassword
        }
      >
        Change Password
      </button>

      <hr />

      <h2>
        Store Dashboard
      </h2>

      <table
        border="1"
        cellPadding="10"
      >

        <thead>

          <tr>
            <th>ID</th>
            <th>Store Name</th>
            <th>Average Rating</th>
          </tr>

        </thead>

        <tbody>

          {dashboard.map(
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
                {
                  store.averageRating
                }
              </td>

            </tr>
          ))}

        </tbody>

      </table>

      <hr />

      <h2>
        Ratings Received
      </h2>

      <table
        border="1"
        cellPadding="10"
      >

        <thead>

          <tr>
            <th>
              Store
            </th>

            <th>
              User
            </th>

            <th>
              Email
            </th>

            <th>
              Rating
            </th>

          </tr>

        </thead>

        <tbody>

          {ratings.map(
            (rating,
            index) => (

            <tr
              key={
                index
              }
            >

              <td>
                {
                  rating.storeName
                }
              </td>

              <td>
                {
                  rating.userName
                }
              </td>

              <td>
                {
                  rating.email
                }
              </td>

              <td>
                {
                  rating.rating
                }
              </td>

            </tr>
          ))}

        </tbody>

      </table>

    </div>
  );
}

export default OwnerDashboard;