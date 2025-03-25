import { db } from "../../lib/db.js";

export const getAllPosts = async (req, res) => {
  try {
    const posts = await db.blog.findMany({
      include: {
        author: true,
        comments: true,
        votes: true,
      },

      orderBy: {
        createdAt: "desc",
      },
    });

    res.status(200).json(posts);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
