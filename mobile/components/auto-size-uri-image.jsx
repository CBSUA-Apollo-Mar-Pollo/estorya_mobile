import { useState, useEffect } from "react";
import { Image, Dimensions, ActivityIndicator, View } from "react-native";

const AutoSizedImage = ({ uri }) => {
  const [imageSize, setImageSize] = useState({ width: 0, height: 0 });
  const [loading, setLoading] = useState(true);

  const screenWidth = Dimensions.get("window").width;

  console.log(uri);

  useEffect(() => {
    Image.getSize(
      uri,
      (width, height) => {
        const scaleFactor = width / screenWidth;
        const imageHeight = height / scaleFactor;
        setImageSize({ width: screenWidth, height: imageHeight });
        setLoading(false);
      },
      (error) => {
        console.error("Failed to get image size:", error);
        setLoading(false);
      }
    );
  }, [uri]);

  if (loading) {
    return (
      <View
        style={{ height: 200, justifyContent: "center", alignItems: "center" }}
      >
        <ActivityIndicator size="small" />
      </View>
    );
  }

  return (
    <Image
      source={{ uri }}
      style={{
        width: imageSize.width,
        height: imageSize.height,
        resizeMode: "cover",
      }}
    />
  );
};

export default AutoSizedImage;
