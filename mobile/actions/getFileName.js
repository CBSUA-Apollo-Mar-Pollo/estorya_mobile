const getFileName = (uri) => {
  // fallback: get last part of the URI + add extension
  const uriParts = uri.split("/");
  const lastPart = uriParts[uriParts.length - 1];
  return lastPart + ".jpg"; // assume jpeg extension if unknown
};

export default getFileName;
// example of use:  const fileName = getFileName(imageObj.filename, imageObj.uri);
