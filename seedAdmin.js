// seedAdmin.js
const mongoose = require("mongoose");
const User = require("./usermodel"); // ✅ tumhara user model import karo

mongoose.connect("mongodb://127.0.0.1:27017/asdb")
  .then(async () => {
    console.log("DB connected");

    // check agar admin pehle se hai to dobara na banao
    let admin = await User.findOne({ email: "admin1@gmail.com" });
    if (!admin) {
      admin = new User({
        name: "Admin",
        email: "admin1@gmail.com",
        password: "12345"
      });
      await admin.save();
      console.log("✅ Admin user created");
    } else {
      console.log("⚠️ Admin already exists");
    }

    mongoose.disconnect();
  })
  .catch(err => console.error(err));
