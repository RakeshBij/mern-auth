import UserModel from "../modal/User.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

import otpGenerator from "otp-generator";

dotenv.config();

// Miiddle ware to verify user
export async function verifyUser(req, res, next) {
  try {
    // if reuquest method is "GET" then return req.query (url se parameter lena), otherwise (for POST and PUT request) get the data from req.body
    const { username } = req.method == "GET" ? req.query : req.body;

    const exist = await UserModel.findOne({ username });
    if (!exist) return res.status(404).send({ error: "Can't find User!" });
    next();
  } catch (error) {
    return res.status(404).send({ error: "Authentication error" });
  }
}

/** POST: http://localhost:8080/api/register 
 * @param : {
  "username" : "example123",
  "password" : "admin123",
  "email": "example@gmail.com",
  "firstName" : "bill",
  "lastName": "william",
  "mobile": 8009860560,
  "address" : "Apt. 556, Kulas Light, Gwenborough",
  "profile": ""
}
*/
export async function register(req, res) {
  try {
    const { username, password, profile, email } = req.body;
    // check the existing user
    const existUsername = await UserModel.findOne({ username });

    // check for existing email
    const existEmail = await UserModel.findOne({ email });

    if (existUsername) {
      return res.status(400).send("Please use unique username");
    }

    if (existEmail) {
      return res.status(400).send("Please use unique emial");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new UserModel({
      username,
      password: hashedPassword,
      profile: profile || "",
      email,
    });

    // save the user

    user.save();

    return res.status(200).send({ msg: "User registered succesfully" });
  } catch (error) {
    return res.status(500).send(error);
  }
}

/** POST: http://localhost:8080/api/login 
 * @param: {
  "username" : "example123",
  "password" : "admin123"
}
*/

export async function login(req, res) {
  try {
    const { username, password } = req.body;

    const user = await UserModel.findOne({ username });

    if (!user) {
      return res.status(404).send({ error: "User doesnt exist" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(400).send({ error: "Password incorrect" });
    }

    // first jwt takes a payload, then string (jwt secret) then expiry
    // we will create a base64 value in config file and specify it at as jwt string, or you can create .env file
    const token = jwt.sign(
      { userId: user._id, username: user.username },
      process.env.JWT_SECRET,
      {
        expiresIn: "24h",
      }
    );

    return res
      .status(200)
      .send({ msg: "login succesfull ✅", username: user.username, token });

    // user.save();
  } catch (error) {
    return res.error(500).send(error);
  }
}

/** GET: http://localhost:8080/api/user/example123 */
export async function getUser(req, res) {
  const { username } = req.params;

  try {
    if (!username) return res.status(501).send({ error: "Invalid Username" });

    const user = await UserModel.findOne({ username });

    if (!user) return res.status(501).send({ error: "Couldn't Find the User" });

    /** remove password from user */
    // mongoose return unnecessary data with object so convert it into json
    const { password, ...rest } = Object.assign({}, user.toJSON());

    return res.status(201).send(rest);
  } catch (error) {
    return res.status(404).send({ error: "Cannot Find User Data" });
  }
}

/** PUT: http://localhost:8080/api/updateuser 
 * @param: {
  "header" : "<token>"
}
body: {
    firstName: '',
    address : '',
    profile : ''
}
*/
export async function updateUser(req, res) {
  try {
    // const id = req.query.id;
    const { userId } = req.user;

    if (userId) {
      const body = req.body;

      // update the data
      UserModel.updateOne({ _id: userId }, body, function (err, data) {
        if (err) throw err;

        return res.status(201).send({ msg: "Record Updated...!" });
      });
    } else {
      return res.status(401).send({ error: "User Not Found...!" });
    }
  } catch (error) {
    return res.status(401).send({ error });
  }
}

/** GET: http://localhost:8080/api/generateOTP */
export async function generateOTP(req, res) {
  // This creates a otp numeric that is 6 digit long
  req.app.locals.OTP = await otpGenerator.generate(6, {
    lowerCaseAlphabets: false,
    upperCaseAlphabets: false,
    specialChars: false,
  });
  res.status(201).send({ code: req.app.locals.OTP });
}

/** GET: http://localhost:8080/api/verifyOTP */
export async function verifyOTP(req, res) {
  // Extracting the OTP
  const { code } = req.query;
  // converting into number and checking if the otp matches
  if (parseInt(req.app.locals.OTP) === parseInt(code)) {
    req.app.locals.OTP = null; // reset the OTP value
    req.app.locals.resetSession = true; // start session for reset password
    return res.status(201).send({ msg: "Verify Successsfully!" });
  }
  return res.status(400).send({ error: "Invalid OTP" });
}

// successfully redirect user when OTP is valid
/** GET: http://localhost:8080/api/createResetSession */
export async function createResetSession(req, res) {
  if (req.app.locals.resetSession) {
    return res.status(201).send({ flag: req.app.locals.resetSession });
  }
  return res.status(440).send({ error: "Session expired!" });
}

// update the password when we have valid session
/** PUT: http://localhost:8080/api/resetPassword */
export async function resetPassword(req, res) {
  // If there is no active session
  if (!req.app.locals.resetSession)
    return res.status(440).send({ error: "Session expired!" });

  try {
    // getting the data
    const { username, password } = req.body;

    try {
      // checking if user exists
      const user = await UserModel.findOne({ username });
      if (user) {
        // creating a hashed password of the password that was entered
        const hashedPassword = await bcrypt.hash(password, 10);
        // updating the password
        await UserModel.updateOne(
          { username: user.username },
          { password: hashedPassword }
        );

        req.app.locals.resetSession = false;
        return res.status(201).send({ msg: "Record updated!" });
      } else {
        return res.status(404).send({ error: "Username not Found" });
      }
    } catch (error) {
      res.status(500).send({ error });
    }
  } catch (error) {
    res.status(401).send({ error });
  }
}
