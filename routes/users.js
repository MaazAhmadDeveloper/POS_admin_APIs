import express from "express";
import { getUsersController, addUsersController, deleteUserController, updateUserController, checkUserController, logoutUserController} from "../controllers/usersController.js";

const usersRouter = express.Router();

usersRouter.get("/getusers", getUsersController);

usersRouter.post("/addusers", addUsersController);

usersRouter.put("/updateusers", updateUserController);

usersRouter.post("/deleteusers", deleteUserController);

usersRouter.post("/checkusers", checkUserController);

usersRouter.post("/userlogout", logoutUserController);

export default usersRouter;