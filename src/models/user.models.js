import mongoose from "mongoose";

const { Schema, model } = mongoose;
const userColletion = "User";

const userSchema = new Schema({
  first_name: String,
  last_name: String,
  email: String,
  age: Number,
  password: String,
  cart: { type: Schema.Types.ObjectId, ref: "Cart" },
  role: { type: String, default: "user" },
});

const user = model(userColletion, userSchema);

export default user;
