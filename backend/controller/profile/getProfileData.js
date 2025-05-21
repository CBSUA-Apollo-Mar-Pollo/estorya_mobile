import { db } from "../../lib/db.js";

export const getProfileData = async (req, res) => {
  try {
    const { id, name, email, image } = req.body;

    const user = await db.user.findFirst({
      where: {
        id: id,
      },
      include: {
        blogs: true,
      },
    });

    const initialPosts = await db.blog.findMany({
      // get all posts by user
      where: {
        authorId: user?.id,
      },
      include: {
        comments: true,
        author: true,
        votes: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    // short video posts
    const shortVideos = await db.shortsv.findMany({
      where: {
        authorId: user?.id,
      },
      include: {
        author: true,
        comments: true,
        shortsVotes: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    const mergeData = [...initialPosts, ...shortVideos];

    const sortedData = mergeData.sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );

    const getCoverPhoto = await db.blog.findMany({
      where: {
        AND: [
          { image: { not: null } }, // Ensure `image` is not null
          {
            image: {
              equals: {
                url: user?.backgroundImage, // Correctly reference the JSON key
              },
            },
          },
        ],
      },
    });

    user.coverPhotoId = getCoverPhoto[0]?.id;
    delete user.password;

    const friends = await db.friend.findMany({
      where: {
        OR: [{ userId: id }, { requesterUserId: id }],
      },
      include: {
        user: true,
        requesterUser: true,
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 6,
    });

    const data = {
      sortedData,
      user,
      friends,
    };

    res.status(200).json(data);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
