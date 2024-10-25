import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  auth0Id: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  name: {
    type: String,
  },
  addressLine: {
    type: String,
  },
  city: {
    type: String,
  },
  country: {
    type: String,
  },
});

export const User = mongoose.model("User", userSchema);
