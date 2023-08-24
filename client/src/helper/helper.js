import axios from "axios";

// axios.defaults.baseURL = process.env.REACT_APP_SERVER_DOMAIN;
// axios.defaults.baseURL = REACT_APP_SERVER_DOMAIN;
// const BASE_URL = window.env.REACT_APP_SERVER_DOMAIN;

// axios.defaults.baseURL = BASE_URL;

// Making api call

// Define the authenticate function
export async function authenticate(username) {
  try {
    // Send a POST request to the "/api/authenticate" endpoint with the provided username
    return await axios.post("/api/authenticate", { username });
  } catch (error) {
    // If there's an error (like if the username doesn't exist), return an error message
    return { error: "Username doesn't exist...!" };
  }
}

// getuser details (using this funcion will give use all the details of the user)

export async function getUser({ username }) {
  try {
    // Send a GET request to the "/api/user/${username}" endpoint
    const { data } = await axios.get(`/api/user/${username}`);
    return { data };
  } catch (error) {
    // If there's an error (like if the password doesn't match), return an error message
    return { error: "Password doesn't Match...!" };
  }
}

/** register user function */
export async function registerUser(credentials) {
  try {
    // Send a POST request to the "/api/register" endpoint with the provided credentials
    // here we are taking msg out of data
    // we are getting stauts and msg fom this line from backend
    // return res.status(200).send({ msg: "User registered succesfully" });
    const {
      data: { msg },
      status,
    } = await axios.post(`/api/register`, credentials);

    // Extract username and email from the provided credentials
    let { username, email } = credentials;

    // If registration is successful (status === 201), send a registration email
    // we are posting data to registermail function
    // const { username, userEmail, text, subject } = req.body;
    if (status === 201) {
      await axios.post("/api/registerMail", {
        username,
        userEmail: email,
        text: msg,
      });
    }

    // Return a resolved Promise with the success message
    return Promise.resolve(msg);
  } catch (error) {
    // Return a rejected Promise with the error information
    return Promise.reject({ error });
  }
}

// Login user
export async function verifyPassword({ username, password }) {
  try {
    if (username) {
      const { data } = await axios.post("/api/login", { username, password });
      return Promise.resolve({ data });
    }
  } catch (error) {
    return Promise.reject({ error: "Password doesn't Match...!" });
  }
}

// update user profile
export async function updateUser(response) {
  try {
    // getting the token from the local storage
    const token = await localStorage.getItem("token");
    const data = await axios.put("/api/updateuser", response, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return Promise.resolve({ data });
  } catch (error) {
    return Promise.reject({ error: "Couldn't Update Profile...!" });
  }
}

// generate OTP

export async function generateOTP(username) {
  try {
    const {
      data: { code },
      status,
    } = await axios.get("/api/generateOTP", { params: { username } });

    // send mail with the OTP
    if (status === 201) {
      let {
        data: { email },
      } = await getUser({ username });
      let text = `Your Password Recovery OTP is ${code}. Verify and recover your password.`;
      await axios.post("/api/registerMail", {
        username,
        userEmail: email,
        text,
        subject: "Password Recovery OTP",
      });
    }
    return Promise.resolve(code);
  } catch (error) {
    return Promise.reject({ error });
  }
}

// verify OTP
export async function verifyOTP({ username, code }) {
  try {
    const { data, status } = await axios.get("/api/verifyOTP", {
      params: { username, code },
    });
    return { data, status };
  } catch (error) {
    return Promise.reject(error);
  }
}

/** reset password */
export async function resetPassword({ username, password }) {
  try {
    const { data, status } = await axios.put("/api/resetPassword", {
      username,
      password,
    });
    return Promise.resolve({ data, status });
  } catch (error) {
    return Promise.reject({ error });
  }
}
