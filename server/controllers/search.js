import User from "../models/User.js";
import Post from "../models/Post.js";

// 搜索功能控制器
export const search = async (req, res) => {
  try {
    const { query } = req.query;

    // 如果 query 为空，直接返回空结果
    if (!query) {
      return res.status(400).json({ message: "Query parameter is required" });
    }

    // 搜索用户
    const users = await User.find({
      $or: [
        { firstName: { $regex: query, $options: "i" } }, // 忽略大小写
        { lastName: { $regex: query, $options: "i" } },
        { location: { $regex: query, $options: "i" } },
      ],
    });

    // 搜索帖子
    const posts = await Post.find({
      description: { $regex: query, $options: "i" },
    });

    // 返回结果
    res.status(200).json({ users, posts });
  } catch (err) {
    res.status(500).json({ message: "Error during search", error: err.message });
  }
};
