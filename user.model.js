const mongoose = require("mongoose")
const userDataSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true, 
    },
    password: {
        type: String,
        required: true,
    },
})
const User = mongoose.model("userData",userDataSchema);
module.exports = User;