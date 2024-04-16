import express from "express";
import {
  updateUser,
  deleteUser,
  getUser,
  getallUsers,
} from "../controller/user.js";
import { verifyAdmin, verifyToken, verifyUser } from "../utills/verify.js";

const router = express.Router();
// //verifyToken
// router.get("/check", verifyToken, (req, res, next) => {
//     res.send("Hello User,logged in")
// });
// //Check User With id
// router.get("/checkuser/:id", verifyUser, (req, res, next) => {
//   res.send("Hello User, logged in. You can delete your account.");
// });
// //check admin
// router.get("/checkadmin/:id", verifyAdmin, (req, res, next) => {
//   res.send("Hello Admin, logged in. You can delete ALl your account.");
// });

//Update
router.put("/:id",verifyUser, updateUser);

//Delete
router.delete("/:id",verifyUser, deleteUser);

//Get
router.get("/:id",verifyUser, getUser);

//GetAll
router.get("/",verifyAdmin, getallUsers);

export default router;
