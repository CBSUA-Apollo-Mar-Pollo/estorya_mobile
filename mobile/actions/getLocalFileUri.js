import * as FileSystem from "expo-file-system";
import getFileName from "./getFileName";

export async function getLocalFileUri(contentUri) {
  try {
    const fileName = getFileName(null, contentUri);
    const localUri = FileSystem.cacheDirectory + fileName;

    await FileSystem.copyAsync({
      from: contentUri,
      to: localUri,
    });

    return localUri;
  } catch (e) {
    console.error("Failed to copy file", e);
    return null;
  }
}
