import React from "react";

const Reset = () => {
  return (
    <div className="container mx-auto">
      {/* <Toaster position="top-center" reverseOrder={false}></Toaster> */}

      <div className="flex justify-center items-center h-screen">
        {/* <div className={styles.glass} style={{ width: "50%" }}> */}
        <div style={{ width: "50%" }}>
          <div className="title flex flex-col items-center">
            <h4 className="text-5xl font-bold">Reset</h4>
            <span className="py-4 text-xl w-2/3 text-center text-gray-500">
              Enter new password.
            </span>
          </div>

          {/* <form className="py-20" onSubmit={formik.handleSubmit}> */}
          <form className="py-20">
            <div className="textbox flex flex-col items-center gap-6">
              <input
                // {...formik.getFieldProps("password")}
                // className={styles.textbox}
                type="text"
                placeholder="New Password"
              />
              <input
                // {...formik.getFieldProps("confirm_pwd")}
                // className={styles.textbox}
                type="text"
                placeholder="Repeat Password"
              />
              {/* <button className={styles.btn} type="submit"> */}
              <button type="submit">Reset</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Reset;
