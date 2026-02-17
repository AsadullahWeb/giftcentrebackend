const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true, sparse: true },
  password: String,
  role: { type: String, default: "admin" } // user ya admin
});

const Admin = mongoose.model('admin', adminSchema);
module.exports = Admin;
