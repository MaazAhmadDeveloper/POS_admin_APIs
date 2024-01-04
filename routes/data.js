import express from "express";
import { userDataController } from "../controllers/userDataController.js"; 

const userDataRouter = express.Router();

userDataRouter.post("/uploadData", userDataController);

export default userDataRouter;