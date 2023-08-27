import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import styles from "../styles/Username.module.css";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/store";
import { generateOTP, verifyOTP } from "../helper/helper";

const Recovery = () => {
  const navigate = useNavigate();

  // getting the username
  const { username } = useAuthStore((state) => state.auth);
  const [OTP, setOTP] = useState();

  useEffect(() => {
    // generate otp
    generateOTP(username).then((OTP) => {
      console.log(OTP);
      // if it is generated than show this
      if (OTP) return toast.success("OTP has been send to your email!");
      // if not than this
      return toast.error("Problem while generating OTP!");
    });
    // re-run this when value of username is changed
  }, [username]);

  async function onSubmit(e) {
    e.preventDefault();
    try {
      // getting the status
      let { status } = await verifyOTP({ username, code: OTP });
      if (status === 201) {
        toast.success("Verify Successfully!");
        return navigate("/reset");
      }
    } catch (error) {
      return toast.error("Wront OTP! Check email again!");
    }
  }

  // when some one clicks on resend OTP
  function resendOTP() {
    // generate OTP
    let sentPromise = generateOTP(username);

    // show the status to the user
    toast.promise(sentPromise, {
      loading: "Sending...",
      success: <b>OTP has been send to your email!</b>,
      error: <b>Could not Send it!</b>,
    });

    // IF resolved than console the otp
    sentPromise.then((OTP) => {
      console.log(OTP);
    });
  }
  return (
    <div className="container mx-auto">
      <Toaster position="top-center" reverseOrder={false}></Toaster>

      <div className="flex justify-center items-center h-screen">
        <div className={styles.glass}>
          <div className="title flex flex-col items-center">
            <h4 className="text-5xl font-bold">Recovery</h4>
            <span className="py-4 text-xl w-2/3 text-center text-gray-500">
              Enter OTP to recover password.
            </span>
          </div>

          <form className="pt-20" onSubmit={onSubmit}>
            <div className="textbox flex flex-col items-center gap-6">
              <div className="input text-center">
                <span className="py-4 text-sm text-left text-gray-500">
                  Enter 6 digit OTP sent to your email address.
                </span>

                <input
                  // when any thing in the input box changes than it the value of otp state is set to the new value
                  onChange={(e) => setOTP(e.target.value)}
                  className={styles.textbox}
                  type="text"
                  placeholder="OTP"
                />
              </div>

              <button className={styles.btn} type="submit">
                Recover
              </button>
            </div>
          </form>

          <div className="text-center py-4">
            <span className="text-gray-500">
              Can't get OTP?{" "}
              <button onClick={resendOTP} className="text-red-500">
                Resend
              </button>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Recovery;
