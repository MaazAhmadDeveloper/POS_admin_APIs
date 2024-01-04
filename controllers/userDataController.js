import express from "express";
import mongoose from "mongoose";
import Users from "../models/usersModel.js"


export const userDataController = async (req, res)=>{
    const UserInfo = req.body;

    const response = await Users.findOne({email: UserInfo.email});

    const initialDate = new Date(response.createdAt);
    const currentDate = new Date();
    const timeElapsed = currentDate - initialDate;
    // const reassignmentDuration = (response.time * 30 * 24 * 60 * 60 * 1000);
    const reassignmentDuration = (response.time * 60 * 1000);  

    if ( response.email === UserInfo.email && UserInfo.name ===response.userName) {

        if (timeElapsed <= reassignmentDuration) {
            console.log("first hitted");
            res.status(200).send("User allow for backup");
            
        } else if (timeElapsed >= reassignmentDuration){
            console.log("second hitted");
            res.status(200).send("out dated");
        }
    }else{
        console.log("ERROR");
        res.status(400).send("User NOT allow for backup");
    }
}