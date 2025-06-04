import { View, Text, Dimensions, Image } from "react-native";
import React from "react";

const ImageLayoutAddPost = ({ selectedUris, setSelectedUris }) => {
  console.log(selectedUris, "image layout");
  return (
    <View>
      {selectedUris.length === 2 && (
        <View className="flex-row">
          <Image
            source={{ uri: selectedUris[0] }}
            style={{
              width: Dimensions.get("window").width / 2,
              height: Dimensions.get("window").width,
              resizeMode: "cover",
              marginRight: 1.5,
            }}
          />
          <Image
            source={{ uri: selectedUris[1] }}
            style={{
              width: Dimensions.get("window").width / 2,
              height: Dimensions.get("window").width,
              resizeMode: "cover",
              marginLeft: 1.5,
            }}
          />
        </View>
      )}
    </View>
  );
};

export default ImageLayoutAddPost;
