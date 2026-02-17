const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    itemname: { type: String, required: true },
    quantity: { type: Number, required: true },
    color: { type: String, required: true },
    adress: { type: String, required: true },
    mobilenumber: { type: String, required: true } // store as string
});

const User = mongoose.model('user', userSchema);
module.exports = User;
