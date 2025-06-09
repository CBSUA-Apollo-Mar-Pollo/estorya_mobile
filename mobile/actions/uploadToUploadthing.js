import { PORT } from "../port";
import getFileName from "./getFileName";
import { getLocalFileUri } from "./getLocalFileUri";
import * as FileSystem from "expo-file-system";

export async function uploadToUploadThing(type, uri) {
  try {
    const formData = new FormData();
    const fileName = getFileName(uri);

    formData.append("file", {
      uri,
      name: fileName,
      type,
    });

    const response = await fetch(`${PORT}/api/upload`, {
      method: "POST",
      body: formData,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    if (!response.ok) {
      const text = await response.text();
      throw new Error(`Backend upload failed: ${text}`);
    }

    const json = await response.json();
    return json; // { fileUrl, fileKey } from UploadThing via backend
  } catch (error) {
    console.error("Upload error:", error);
    throw error;
  }
}
