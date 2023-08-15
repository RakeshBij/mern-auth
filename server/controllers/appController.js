import UserModel from "../modal/User.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

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
    console.log(username);
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
    console.log(username);

    const user = await UserModel.findOne({ username });
    console.log(user);

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
    //  return res.status(200).send({
    //    msg: "Login Successful...!",
    //    username: user.username,
    //    token,
    //  });
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
  res.json("get user route");
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
  res.json("Update user route");
}

/** GET: http://localhost:8080/api/generateOTP */
export async function generateOTP(req, res) {
  res.json("generate otp route");
}

/** GET: http://localhost:8080/api/verifyOTP */
export async function verifyOTP(req, res) {
  res.json("verify otp route");
}

// successfully redirect user when OTP is valid
/** GET: http://localhost:8080/api/createResetSession */
export async function createResetSession(req, res) {
  res.json("create reset session route");
}

// update the password when we have valid session
/** PUT: http://localhost:8080/api/resetPassword */
export async function resetPassword(req, res) {
  res.json("reset password route");
}
