import mongoose from "mongoose";

const userCollection = "users";

const userSchema = new mongoose.Schema({
  first_name: String,
  last_name: String,
  email: {
    type: String,
    unique: true,
  },
  age: Number,
  password: String,
  role: {
    type: String,
    enum: ["user", "admin", "premium"],
    default: "user",
  },
  cart: { type: mongoose.Schema.Types.ObjectId, ref: "Cart" },
  resetPassToken: String,
  documents: [
    {
      name: String,
      reference: String,
    },
  ],
  last_connection: Date,
});

const userModel = mongoose.model(userCollection, userSchema);

export default userModel;
