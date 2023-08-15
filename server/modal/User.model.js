import mongoose from "mongoose";

export const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Please provide a unique username"],
    unique: [true, "Username already exists"],
  },
  password: {
    type: String,
    required: [true, "Please enter password"],
    unique: false,
  },
  email: {
    type: String,
    required: [true, "Please provide email"],
    unique: [true, "Email already exists"],
  },

  firstName: { type: String },
  lastName: { type: String },
  mobile: { type: Number },
  address: { type: String },
  profile: { type: String },
});

// use the existing model if you have other wise create a new one
// Plural name to the collection other wise mongoose will give error

export default mongoose.model.Users || mongoose.model("User", UserSchema);
