import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useFormik } from "formik";
import { passwordValidate } from "../helper/validate";
import styles from "../styles/Username.module.css";
import avatar from "../assets/profile.png";
import { useAuthStore } from "../store/store";
import useFetch from "../hooks/fetch.hook";
import { verifyPassword } from "../helper/helper";

const Password = () => {
  const navigate = useNavigate();

  // getting the usernam from the store so that we can pass it in useFetch
  const { username } = useAuthStore((state) => state.auth);
  const [{ isLoading, apiData, serverError }] = useFetch(`/user/${username}`);

  const formik = useFormik({
    initialValues: { password: "admin@123" },
    validate: passwordValidate,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      // first we verify the password, this will make a request to the login route and retur a resolved data
      let loginPromise = verifyPassword({
        username,
        password: values.password,
      });
      // then we pass in the promise as the the first arument, when promise is being resolved than we show loading, when it is successfully resolved than we show success and if there is error than we show error
      toast.promise(loginPromise, {
        loading: "Checking...",
        success: <b>Login Successfully...!</b>,
        error: <b>Password Not Match!</b>,
      });

      // when the promise is resolved
      loginPromise.then((res) => {
        // this is what it sends on successfull execution of task .send({ msg: "login succesfull ✅", username: user.username, token });
        // so we get token out of it
        let { token } = res.data;
        // saving token in local storage
        localStorage.setItem("token", token);
        // than navigating to profile
        navigate("/profile");
      });
    },
  });

  if (isLoading) return <h1 className="text-2xl font-bold">isLoading</h1>;
  if (serverError)
    return <h1 className="text-xl text-red-500">{serverError.message}</h1>;

  return (
    <div className="container mx-auto">
      <Toaster position="top-center" reverseOrder={false}></Toaster>

      <div className="flex justify-center items-center">
        <div className={styles.glass}>
          <div className="title flex flex-col items-center">
            <h4 className="text-5xl font-bold">
              {/* if we simply write apiData.firstname than it will give use error as it will take some time to get data */}
              {/* so we use ? now it wont give error */}
              Hello {apiData?.firstName || apiData?.username}
            </h4>
            <span className="py-4 text-xl w-2/3 text-center text-gray-500">
              Explore More by connecting with us.
            </span>
          </div>

          <form className="py-1" onSubmit={formik.handleSubmit}>
            <div className="profile flex justify-center py-4">
              <img
                src={apiData?.profile || avatar}
                className={styles.profile_img}
                alt="avatar"
              />
            </div>

            <div className="textbox flex flex-col items-center gap-6">
              <input
                {...formik.getFieldProps("password")}
                className={styles.textbox}
                type="password"
                placeholder="Password"
              />
              <button className={styles.btn} type="submit">
                Enter Password
              </button>
            </div>

            <div className="text-center py-4">
              <span className="text-gray-500">
                Forgot Password?{" "}
                <Link className="text-red-500" to="/recovery">
                  Recover Now
                </Link>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Password;
