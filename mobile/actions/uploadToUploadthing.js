import axios from "axios";
import { PORT } from "../port";
import getFileName from "./getFileName";
import { getLocalFileUri } from "./getLocalFileUri";
import * as FileSystem from "expo-file-system";

export async function uploadMultipleToUploadThing(files) {
  try {
    const formData = new FormData();

    console.log(files);

    files.forEach(({ imageType, uri }) => {
      const fileName = getFileName(uri);
      formData.append("file", {
        uri,
        name: fileName,
        type: imageType,
      });
    });

    console.log(formData._parts);

    const response = await axios.post(`${PORT}/api/upload`, formData, {
      headers: {
        "Content-Type": "multipart/form-data", // ✅ OK with axios (it attaches boundary automatically)
      },
    });

    return await response.data; // Array of uploaded file info
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Axios Network Error:", error.message);
    } else {
      console.error("Unexpected Error:", error);
    }
    throw error;
  }
}
