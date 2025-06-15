import { db } from "../../lib/db.js";

export const uploadPost = async (req, res) => {
  try {
    const { description = "", images = [], videos = [] } = req.body;
    const user = req.user;

    if (!user || !user.userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const hasDescription = description && description.trim().length > 0;
    const hasImages = images && images.length > 0;
    const hasVideos = videos && videos.length > 0;

    if (!hasDescription && !hasImages && !hasVideos) {
      return new NextResponse(
        "For you to create a post you need to put a description or upload an image or video",
        { status: 400 }
      );
    }

    if (hasDescription && !hasImages && !hasVideos) {
      await db.blog.create({
        data: {
          description,
          authorId: user.userId,
        },
      });

      return res.status(200).json({ message: "OK" });
    }

    let post = null;

    if (hasImages) {
      post = await db.blog.create({
        data: {
          description,
          image: images,
          authorId: user.userId,
        },
      });
    }

    await db.vote.create({
      data: {
        userId: user.userId,
        postId: post.id,
        type: "UP",
      },
    });

    return res.status(200).send("OK");
  } catch (error) {
    console.log("Upload post error:", error);
    return res.status(500).json({ message: "Failed to upload post." });
  }
};
