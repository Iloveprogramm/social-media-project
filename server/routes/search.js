import express from "express";
import { search } from "../controllers/search.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

// 搜索 API
router.get("/", verifyToken, search);

export default router;
