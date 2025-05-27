import { db } from "../../lib/db.js";

export const getAllPosts = async (req, res) => {
  try {
    const posts = await db.blog.findMany({
      include: {
        author: true,
        comments: true,
        votes: true,
        community: {
          include: {
            members: true,
          },
        },
      },

      orderBy: {
        createdAt: "desc",
      },
    });

    // short video posts
    const shortVideos = await db.shortsv.findMany({
      include: {
        author: true,
        comments: true,
        shortsVotes: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    // added a boolean key value
    const updatedShortVideos = shortVideos.map((item) => ({
      ...item,
      isShortsV: true,
    }));

    const mergeData = [...posts, ...updatedShortVideos];

    const sortedData = mergeData.sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );

    res.status(200).json(sortedData);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
