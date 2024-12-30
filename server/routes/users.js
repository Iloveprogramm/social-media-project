import express from "express";
import {
  getUser,
  getUserFriends,
  addRemoveFriend,
  updateUser, // 新增的控制器方法
} from "../controllers/users.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/* READ */
router.get("/:id", verifyToken, getUser);
router.get("/:id/friends", verifyToken, getUserFriends);

/* UPDATE */
router.patch("/:id/:friendId", verifyToken, addRemoveFriend);
router.put("/:id", verifyToken, updateUser); // 新增路由

export default router;
