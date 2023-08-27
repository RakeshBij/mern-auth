import axios from "axios";
import { useEffect, useState } from "react";
import { getUsername } from "../helper/helper";

// axios.defaults.baseURL = process.env.REACT_APP_SERVER_DOMAIN;

export default function useFetch(query) {
  // setting useState with default values
  const [getData, setData] = useState({
    isLoading: false,
    apiData: undefined,
    status: null,
    serverError: null,
  });

  useEffect(() => {
    // if there is no query than return
    // if (!query) return;

    const fetchData = async () => {
      try {
        // change isLoading to true while keeping everything else same
        setData((prev) => ({ ...prev, isLoading: true }));

        // get username from the jwt token, we did this because everytime we relaod the username in the store is removed

        const { username } = !query ? await getUsername() : "";

        // You can make any get request with query
        // if there is no query than make the get request to the api/user/ route with the useername that we got from the token
        // if there is query than make the request to the the route using the query
        const { data, status } = !query
          ? await axios.get(`/api/user/${username}`)
          : await axios.get(`/api/${query}`);

        if (status === 201) {
          setData((prev) => ({ ...prev, isLoading: false }));
          setData((prev) => ({ ...prev, apiData: data, status: status }));
        }

        setData((prev) => ({ ...prev, isLoading: false }));
      } catch (error) {
        setData((prev) => ({ ...prev, isLoading: false, serverError: error }));
      }
    };

    // call the fucntion
    fetchData();
    // the useEffect hook will be fired only when the query is changed
  }, [query]);

  //   returning the data and setData
  return [getData, setData];
}
