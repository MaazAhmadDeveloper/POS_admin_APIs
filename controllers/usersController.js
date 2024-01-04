import Users from "../models/usersModel.js";
import mongoose from "mongoose";

//for add or fetch
export const getUsersController = async (req, res) => {
    try {

        const users = await Users.find().sort({ createdAt: -1 });
        res.status(200).send(users);

    } catch(error) {
        console.log(error);
    }
}

//for add
export const addUsersController = async (req, res) => {

    console.log(req.body);
    try {
        const newUseructs = new Users(req.body);

        await newUseructs.save();
        res.status(200).send("User Created Successfully!");

    } catch(error) {
        console.log(error);
    }

}

//for update
export const updateUserController = async (req, res) => {
    try {

        await Users.findOneAndUpdate({_id: req.body.userId}, req.body, {new: true})
        res.status(201).json("User Updated!");
    } catch(error) {
        res.status(400).send(error);
        console.log(error);
    }
}

//for delete
export const deleteUserController = async (req, res) => {

        try {
            await Users.findOneAndDelete({_id: req.body.userId});
            res.status(200).json("User Deleted!");
        } catch(error) {
            res.status(400).send(error);
            console.log(error);
        }
}

//for check user exist or not
export const checkUserController = async (req, res) => {
    const userEmail = req.body.email;
    const userPassword = req.body.password;
    const UserName = req.body.userName;

        try { 
            const response = await Users.findOne({email: req.body.email});

            const initialDate = new Date(response.createdAt);
            const currentDate = new Date();
            const timeElapsed = currentDate - initialDate;
            // const reassignmentDuration = (response.time * 30 * 24 * 60 * 60 * 1000);
            const reassignmentDuration = (response.time * 60 * 1000);        

            if (response?.email === userEmail && response.password === userPassword && response.userName === UserName) {

                if (response.loginStatus === "logout") {
                    await Users.findOneAndUpdate({ email: userEmail }, { loginStatus: "login" }, { new: true });                
                    res.status(200).json({
                        loginStatus: "login",
                        access: "allow",
                        email:userEmail,
                        name: response.userName,
                        createdAt: response.createdAt,
                        time: response.time
                    });
                }else if(response.loginStatus === "login") {

                    if (timeElapsed >= reassignmentDuration) {
                        await Users.findOneAndUpdate({ email: userEmail }, { loginStatus: "logout" }, { new: true });

                        res.status(200).json({
                            loginStatus: "logout",
                            access: "outdated",
                            email:userEmail,
                            name: response.userName,
                            createdAt: response.createdAt,
                            time: response.time,
                        });

                    }else{

                        res.status(200).json({
                            loginStatus: "login",
                            access: "not allow",
                            email:userEmail,
                            name: response.userName,
                            createdAt: response.createdAt,                            
                            time: response.time,
                        });
                    }
                }
            } else {
              res.status(404).json("User Not Found");
            }
                
        } catch(error) {
            res.status(400).send(error);
            console.log(error);
        }
}

//for logout the user
export const logoutUserController = async (req, res) => {
    const userEmail = req.body.email;

        try { 
            const response = await Users.findOne({email: userEmail});

            if (response?.email === userEmail) {
                await Users.findOneAndUpdate({ email: userEmail }, { loginStatus: "logout" }, { new: true });                
                res.status(200).json("User Logout");

            } else {
                res.status(200).json("User is not valid by admin");
            }
                
        } catch(error) {
            res.status(400).send(error);
            console.log(error);
        }
}