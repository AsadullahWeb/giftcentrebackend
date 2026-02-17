const express = require('express');
const app = express();
const cors = require('cors');
const jwt = require('jsonwebtoken');
const User = require('./datamodule');
const Admin =require('./usermodel')
const verifyToken = require('./verifyToken');
const mongoose = require('mongoose');
require('./dbconn')
app.use(cors({ origin: '*' }));
app.use(express.json());

// MongoDB connection


// Get all clients (admin only)
app.get('/admindata', verifyToken,  async (req, res) => {
  const users = await User.find();
  res.send(users);
});

// Save client data
app.post('/clientdata', async (req, res) => {
  console.log(req.body);
  const obj = {
    name:req.body.name,
    itemname:req.body.itemname,
    quantity:req.body.quantity,
    color:req.body.color,
    adress:req.body.adress,
    mobilenumber:req.body.mobilenumber
  }
  const user = new User(req.body);
  const result = await user.save();
  res.send(result);
});
app.post('/saverdata', async(req,res) =>{
  console.log(req.body);
  const obj = {
    name:req.body.name,
    email:req.body.email,
    password:req.body.password
  }
  const admin = new Admin (req.body);
  const result = await admin.save();
  res.send(result);
})

app.post('/admin/login', async (req, res) => {
  const { email, password } = req.body;
  const admin = await Admin.findOne({ email, password });
  if (!admin) {
    return res.status(401).send({ message: "Invalid credentials" });
  }

  const token = jwt.sign(
    { id: admin._id, role: "admin" },
    "secretkey",
    { expiresIn: "1h" }
  );

  res.send({ message: "Login successful", token });
});


// Delete client (admin only)
app.delete('/clientdeletedata/:id',verifyToken, async (req, res) => {
  try {
    const deleted = await User.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).send({ message: "User not found" });
    res.send({ message: "User deleted successfully" });
  } catch (err) {
    res.status(500).send({ message: "Error deleting user", err });
  }
});

app.listen(3000, () => console.log('Server running on port 3000'));
