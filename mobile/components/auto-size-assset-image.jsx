import { useState, useEffect } from "react";
import { Image, Dimensions, View } from "react-native";

const AutoSizedAssetImage = ({ source }) => {
  const [imageSize, setImageSize] = useState({ width: 0, height: 0 });

  const screenWidth = Dimensions.get("window").width;

  useEffect(() => {
    const assetSource = Image.resolveAssetSource(source);
    const { width, height } = assetSource;

    const scaleFactor = width / screenWidth;
    const imageHeight = height / scaleFactor;

    setImageSize({ width: screenWidth, height: imageHeight });
  }, [source]);

  return (
    <Image
      source={source}
      style={{
        width: imageSize.width,
        height: imageSize.height,
        resizeMode: "cover",
      }}
    />
  );
};

export default AutoSizedAssetImage;
