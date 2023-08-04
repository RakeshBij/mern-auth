import toast from "react-hot-toast";

/** Validate login page username */

export async function usernameValidate(values) {
  const errors = usernameVerify({}, values);
  return errors;
}

/** Validate username */

function usernameVerify(error = {}, values) {
  if (!values.username) {
    error.username = toast.error("Username Required...!");
  } else if (values.username.includes(" ")) {
    error.username = toast.error("Invalid Username...!");
  }
  return error;
}

/** Validate password page password */

export async function passwordValidate(values) {
  const errors = passwordVerify({}, values);
  return errors;
}

/** Validate password */

function passwordVerify(error = {}, values) {
  const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;

  if (!values.password) {
    error.password = toast.error("Please enter password...!");
  } else if (values.password.includes(" ")) {
    error.password = toast.error("Wrong password...!");
  } else if (values.password.length < 4) {
    error.password = toast.error(
      "Too short, Paswword must be more than 4 characters long"
    );
  } else if (!specialChars.test(values.password)) {
    error.password = toast.error("Password mus thave special characters");
  }

  return error;
}
