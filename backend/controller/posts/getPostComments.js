import { db } from "../../lib/db.js";

export const getPostComments = async (req, res) => {
  const { postId } = req.body;

  console.log(postId);

  try {
    const comments = await db.comment.findMany({
      where: {
        postId: postId,
        replyToId: null,
      },
      include: {
        author: true,
        replies: {
          include: {
            author: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    console.log(comments);

    res.status(200).json(comments);
  } catch (error) {
    res.status(404).json({ message: error.message });
    console.log(error);
  }
};
