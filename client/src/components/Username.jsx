import React from "react";
import { Link, useNavigate } from "react-router-dom";
import avatar from "../assets/profile.png";
import styles from "../styles/Username.module.css";
import { Toaster } from "react-hot-toast";
import { useFormik } from "formik";
import { usernameValidate } from "../helper/validate";
import { useAuthStore } from "../store/store";

const Username = () => {
  const navigate = useNavigate();

  const setUsername = useAuthStore((state) => state.setUsername);

  const formik = useFormik({
    initialValues: { username: "" },
    // I want to vaildate the form only when i click the button
    validate: usernameValidate,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: async (values) => {
      console.log(values);
      setUsername(values.setUsername);
      navigate("/password");
    },
  });
  return (
    <div className="container mx-auto">
      {/* If the reverseOrder prop is set to true, then the toast notifications will be rendered in reverse order, meaning that the newest toast notification will be rendered first. If the reverseOrder prop is set to false, then the toast notifications will be rendered in the order in which they are created. */}
      <Toaster position="top-center" reverseOrder={false}></Toaster>

      {/* <div className="flex justify-center items-center h-screen"> */}
      <div className="flex justify-center items-center">
        <div className={styles.glass}>
          <div className="title flex flex-col items-center">
            <h4 className="text-5xl font-bold">Hello Again!</h4>
            <span className="py-4 text-xl w-2/3 text-center text-gray-500">
              Explore More by connecting with us.
            </span>
          </div>

          <form className="py-1" onSubmit={formik.handleSubmit}>
            <div className="profile flex justify-center py-4">
              <img src={avatar} className={styles.profile_img} alt="avatar" />
            </div>

            <div className="textbox flex flex-col items-center gap-6">
              <input
                {...formik.getFieldProps("username")}
                className={styles.textbox}
                type="text"
                placeholder="Username"
              />
              <button className={styles.btn} type="submit">
                Let's Go
              </button>
            </div>

            <div className="text-center py-4">
              <span className="text-gray-500">
                Not a Member{" "}
                <Link className="text-red-500" to="/register">
                  Register Now
                </Link>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Username;
