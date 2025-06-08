import { createUploadthing } from "uploadthing/express";

const f = createUploadthing();

export const uploadRouter = {
  imageUploader: f({
    image: {
      maxFileSize: "40MB",
      maxFileCount: 10,
    },
  }).onUploadComplete((data) => {
    console.log("upload completed", data);
  }),
};
