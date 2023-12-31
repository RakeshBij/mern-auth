import toast from "react-hot-toast";
import { authenticate } from "./helper";

/** Validate username */

function usernameVerify(error = {}, values) {
  if (!values.username) {
    error.username = toast.error("Username Required...!");
  } else if (values.username.includes(" ")) {
    error.username = toast.error("Invalid Username...!");
  }
  return error;
}

/** validate email */
function emailVerify(error = {}, values) {
  if (!values.email) {
    error.email = toast.error("Email Required...!");
  } else if (values.email.includes(" ")) {
    error.email = toast.error("Wrong Email...!");
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    error.email = toast.error("Invalid email address...!");
  }

  return error;
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

// =================================================================================

/** Validate login page username */

export async function usernameValidate(values) {
  const errors = usernameVerify({}, values);

  if (values.username) {
    // check user exist or not
    const { status } = await authenticate(values.username);

    if (status !== 200) {
      errors.exist = toast.error("User does not exist...!");
    }
  }
  return errors;
}

/** Validate password page password */

export async function passwordValidate(values) {
  const errors = passwordVerify({}, values);
  return errors;
}

// Validate paswword Reset page

export async function resetPasswordValidation(values) {
  const errors = passwordVerify({}, values);

  if (values.password !== values.confirm_pwd) {
    errors.exist = toast.error(
      "Password and confirm password should be same!!!"
    );
  }

  return errors;
}

// Validate register form

export async function registerValidation(values) {
  const errors = usernameVerify({}, values);
  passwordVerify(errors, values);
  emailVerify(errors, values);

  return errors;
}

// profile validation function

export async function profileValidation(values) {
  const errors = emailVerify({}, values);

  return errors;
}
