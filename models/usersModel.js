import mongoose from "mongoose";

//for create table into db
const usersSchema = new mongoose.Schema({

    userName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    phoneNumber: { type: Number, required: true },
    shopName: { type: String, required: true },
    address: { type: String, required: true },
    time: { type: String, required: true },
    loginStatus: { type: String, required: true },

}, {
    //for date
    timestamps: true
});

const Users = mongoose.model("Users", usersSchema);
export default Users;