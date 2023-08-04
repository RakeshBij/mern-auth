import React from "react";

const Profile = () => {
  return (
    <div className="container mx-auto">
      {/* <Toaster position="top-center" reverseOrder={false}></Toaster> */}

      <div className="flex justify-center items-center h-screen">
        <div
          // className={`${styles.glass} ${extend.glass}`}
          style={{ width: "45%", paddingTop: "3em" }}
        >
          <div className="title flex flex-col items-center">
            <h4 className="text-5xl font-bold">Profile</h4>
            <span className="py-4 text-xl w-2/3 text-center text-gray-500">
              You can update the details.
            </span>
          </div>

          {/* <form className="py-1" onSubmit={formik.handleSubmit}> */}
          <form className="py-1">
            <div className="profile flex justify-center py-4">
              <label htmlFor="profile">
                <img
                  // src={apiData?.profile || file || avatar}
                  // className={`${styles.profile_img} ${extend.profile_img}`}
                  alt="avatar"
                />
              </label>

              <input
                onChange={onUpload}
                type="file"
                id="profile"
                name="profile"
              />
            </div>

            <div className="textbox flex flex-col items-center gap-6">
              <div className="name flex w-3/4 gap-10">
                <input
                  // {...formik.getFieldProps("firstName")}
                  // className={`${styles.textbox} ${extend.textbox}`}
                  type="text"
                  placeholder="FirstName"
                />
                <input
                  // {...formik.getFieldProps("lastName")}
                  // className={`${styles.textbox} ${extend.textbox}`}
                  type="text"
                  placeholder="LastName"
                />
              </div>

              <div className="name flex w-3/4 gap-10">
                <input
                  // {...formik.getFieldProps("mobile")}
                  // className={`${styles.textbox} ${extend.textbox}`}
                  type="text"
                  placeholder="Mobile No."
                />
                <input
                  // {...formik.getFieldProps("email")}
                  // className={`${styles.textbox} ${extend.textbox}`}
                  type="text"
                  placeholder="Email*"
                />
              </div>

              <input
                // {...formik.getFieldProps("address")}
                // className={`${styles.textbox} ${extend.textbox}`}
                type="text"
                placeholder="Address"
              />
              {/* <button className={styles.btn} type="submit"> */}
              <button type="submit">Update</button>
            </div>

            <div className="text-center py-4">
              <span className="text-gray-500">
                come back later?{" "}
                {/* <button onClick={userLogout} className="text-red-500" to="/"> */}
                <button className="text-red-500" to="/">
                  Logout
                </button>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
