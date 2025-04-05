import { db } from "../../lib/db.js";

export const getPostDetails = async (req, res) => {
  const { postId } = req.body;

  try {
    const postDetails = await db.blog.findFirst({
      where: {
        id: postId,
      },
      include: {
        author: true,
        comments: true,
        votes: true,
      },

      orderBy: {
        createdAt: "desc",
      },
    });

    res.status(200).json(postDetails);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
