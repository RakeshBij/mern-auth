import nodemailer from "nodemailer";
import Mailgen from "mailgen";
import dotenv from "dotenv";

dotenv.config(); // Load the environment variables from .env file

// Configuration for nodemailer
// https://ethereal.email/create
let nodeConfig = {
  host: "smtp.ethereal.email", // The SMTP host
  port: 587, // The SMTP port
  secure: false, // Whether to use TLS or not, true for 465, false for other ports
  auth: {
    // The authentication details
    user: process.env.EMAIL, // generated ethereal user
    pass: process.env.PASSWORD, // generated ethereal password
  },
};

// Create a transporter using the configuration
let transporter = nodemailer.createTransport(nodeConfig);

// Initialize Mailgen with a theme and product details
let MailGenerator = new Mailgen({
  // Create a Mailgen object
  theme: "default",
  product: {
    name: "Mailgen",
    link: "https://mailgen.js/",
  },
});

/**

POST: http://localhost:8000/api/registerMail
@param: {
"username" : "example123",
"userEmail" : "admin123@gmail.com",
"text" : "",
"subject" : ""
} */

// Define the registerMail function to send a registration email
export const registerMail = async (req, res) => {
  const { username, userEmail, text, subject } = req.body;

  // body of the email
  var email = {
    body: {
      name: username, // The recipient's name
      intro:
        text ||
        "Welcome to my website! We're very excited to have you on board.", // The email introduction
      outro:
        "Need help, or have questions? Just reply to this email, we'd love to help.", // The email outro
    },
  };

  // Generate the HTML body for the email using Mailgen
  var emailBody = MailGenerator.generate(email);

  let message = {
    from: process.env.EMAIL,
    to: userEmail,
    subject: subject || "Signup Successful",
    html: emailBody, // The email body in HTML format
  };

  // Send the email using the configured transporter
  transporter
    .sendMail(message)
    .then(() => {
      return res
        .status(200)
        .send({ msg: "You should receive an email from us." });
    })
    .catch((error) => res.status(500).send({ error }));
};
