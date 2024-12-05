const { Schema, model } = require("mongoose");

const userSchema = Schema({
  name: String,
  email: String,
  password: String,
  role: { type: String, default: "customer" },
});

module.exports = model("User", userSchema);
