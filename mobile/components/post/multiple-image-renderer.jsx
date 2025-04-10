import {
  View,
  Text,
  FlatList,
  Image,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import React from "react";

import AutoSizedImage from "../auto-size-uri-image";
import { Link, useRouter } from "expo-router";

const MultipleImageRenderer = ({ images, postId }) => {
  const router = useRouter();

  const handleNaviagte = () => {
    router.push(`/post-detail/${postId}`);
  };

  return (
    <View>
      {images.length === 1 && (
        <View>
          <AutoSizedImage uri={images[0]?.url} />
        </View>
      )}

      {images.length === 2 && (
        <View className="flex-row">
          <Image
            source={{ uri: images[0]?.url }}
            style={{
              width: Dimensions.get("window").width / 2,
              height: Dimensions.get("window").width / 2,
              resizeMode: "cover",
              marginRight: 1.5,
            }}
          />
          <Image
            source={{ uri: images[1]?.url }}
            style={{
              width: Dimensions.get("window").width / 2,
              height: Dimensions.get("window").width / 2,
              resizeMode: "cover",
              marginLeft: 1.5,
            }}
          />
        </View>
      )}

      {images.length === 4 && (
        <TouchableOpacity onPress={() => handleNaviagte()}>
          <View className="flex-row">
            <Image
              source={{ uri: images[0]?.url }}
              style={{
                width: "50%", // 50% width to create a 2-column layout
                height: 200, // Adjust height to your preference
                resizeMode: "cover",
                marginRight: 1.5,
              }}
            />
            <Image
              source={{ uri: images[1]?.url }}
              style={{
                width: "50%",
                height: 200,
                resizeMode: "cover",
                marginLeft: 1.5,
              }}
            />
          </View>
          <View className="flex-row">
            <Image
              source={{ uri: images[2]?.url }}
              style={{
                width: "50%",
                height: 200,
                resizeMode: "cover",
                marginRight: 1.5,
                marginTop: 3,
              }}
            />
            <Image
              source={{ uri: images[3]?.url }}
              style={{
                width: "50%",
                height: 200,
                resizeMode: "cover",
                marginLeft: 1.5,
                marginTop: 3,
              }}
            />
          </View>
        </TouchableOpacity>
      )}

      {images.length === 5 && (
        <View>
          <View className="flex-row">
            <Image
              source={{ uri: images[0]?.url }}
              style={{
                width: "50%",
                height: 200,
                resizeMode: "cover",
                marginRight: 2,
              }}
            />
            <Image
              source={{ uri: images[1]?.url }}
              style={{
                width: "50%",
                height: 200,
                resizeMode: "cover",
                marginLeft: 2,
              }}
            />
          </View>
          <View className="flex-row">
            <Image
              source={{ uri: images[2]?.url }}
              style={{
                width: "33.33%",
                height: 130,
                resizeMode: "cover",
                marginRight: 2,
                marginTop: 2,
              }}
            />
            <Image
              source={{ uri: images[3]?.url }}
              style={{
                width: "33.33%",
                height: 130,
                resizeMode: "cover",
                marginTop: 2,
              }}
            />
            <Image
              source={{ uri: images[4]?.url }}
              style={{
                width: "33.33%",
                height: 130,
                resizeMode: "cover",
                marginLeft: 2,
                marginTop: 2,
              }}
            />
          </View>
        </View>
      )}
    </View>
  );
};

export default MultipleImageRenderer;
