import {
  useEffect,
  useState
} from "react";

import API
from "../services/api";

function UserDashboard() {

  const [stores,
    setStores] =
    useState([]);

  const [search,
    setSearch] =
    useState("");

  const token =
    localStorage.getItem(
      "token"
    );

  const fetchStores =
    async () => {

      try {

        const response =
          await API.get(
            `/user/search-stores?search=${search}`,
            {
              headers: {
                Authorization:
                  `Bearer ${token}`
              }
            }
          );

        setStores(
          response.data
        );

      } catch (error) {

        console.log(error);
      }
    };

  useEffect(() => {
    fetchStores();
  }, []);

  const submitRating =
    async (
      store_id
    ) => {

      const rating =
        prompt(
          "Enter Rating (1-5)"
        );

      try {

        await API.post(
          "/user/submit-rating",
          {
            store_id,
            rating
          },
          {
            headers: {
              Authorization:
                `Bearer ${token}`
            }
          }
        );

        alert(
          "Rating Submitted"
        );

        fetchStores();

      } catch (error) {

        alert(
          error.response
          ?.data?.message
        );
      }
    };

  const updateRating =
    async (
      store_id
    ) => {

      const rating =
        prompt(
          "Update Rating (1-5)"
        );

      try {

        await API.put(
          "/user/update-rating",
          {
            store_id,
            rating
          },
          {
            headers: {
              Authorization:
                `Bearer ${token}`
            }
          }
        );

        alert(
          "Rating Updated"
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
        width: "80%",
        margin: "auto"
      }}
    >

      <h1>
        User Dashboard
      </h1>

      <button
        onClick={
          logout
        }
      >
        Logout
      </button>

      <br />
      <br />

      <input
        type="text"
        placeholder="Search Store"
        value={search}
        onChange={(e) =>
          setSearch(
            e.target.value
          )
        }
      />

      <button
        onClick={
          fetchStores
        }
      >
        Search
      </button>

      <br />
      <br />

      <table
        border="1"
        cellPadding="10"
      >

        <thead>

          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Address</th>
            <th>Rating</th>
            <th>Action</th>
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
                {store.address}
              </td>

              <td>
                {
                  store.averageRating
                }
              </td>

              <td>

                <button
                  onClick={() =>
                    submitRating(
                      store.id
                    )
                  }
                >
                  Rate
                </button>

                <button
                  onClick={() =>
                    updateRating(
                      store.id
                    )
                  }
                >
                  Update
                </button>

              </td>

            </tr>
          ))}

        </tbody>

      </table>

    </div>
  );
}

export default UserDashboard;