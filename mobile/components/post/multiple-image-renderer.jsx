import {
  View,
  Text,
  FlatList,
  Image,
  Dimensions,
  TouchableOpacity,
  Pressable,
} from "react-native";
import React from "react";

import AutoSizedImage from "../auto-size-uri-image";
import { Link, useRouter } from "expo-router";
import { useSingleImage } from "../../hooks/useSingleImage";

const MultipleImageRenderer = ({ postData, postId }) => {
  const router = useRouter();
  const { setImageData } = useSingleImage();

  const handleNavigate = () => {
    router.push(`/post-detail/${postId}`);
  };

  const goToSingleImageScreen = (item) => {
    setImageData(item, postData.image[0]);
    router.push("/post-detail/single-image");
  };

  return (
    <View>
      {postData.image.length === 1 && (
        <Pressable onPress={() => goToSingleImageScreen(postData)}>
          <AutoSizedImage uri={postData.image[0]?.url} />
        </Pressable>
      )}

      {postData.image.length === 2 && (
        <View className="flex-row">
          <Image
            source={{ uri: postData.image[0]?.url }}
            style={{
              width: Dimensions.get("window").width / 2,
              height: Dimensions.get("window").width / 2,
              resizeMode: "cover",
              marginRight: 1.5,
            }}
          />
          <Image
            source={{ uri: postData.image[1]?.url }}
            style={{
              width: Dimensions.get("window").width / 2,
              height: Dimensions.get("window").width / 2,
              resizeMode: "cover",
              marginLeft: 1.5,
            }}
          />
        </View>
      )}

      {postData.image.length === 4 && (
        <TouchableOpacity onPress={() => handleNavigate()}>
          <View className="flex-row">
            <Image
              source={{ uri: postData.image[0]?.url }}
              style={{
                width: "50%", // 50% width to create a 2-column layout
                height: 200, // Adjust height to your preference
                resizeMode: "cover",
                marginRight: 1.5,
              }}
            />
            <Image
              source={{ uri: postData.image[1]?.url }}
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
              source={{ uri: postData.image[2]?.url }}
              style={{
                width: "50%",
                height: 200,
                resizeMode: "cover",
                marginRight: 1.5,
                marginTop: 3,
              }}
            />
            <Image
              source={{ uri: postData.image[3]?.url }}
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

      {postData.image.length === 5 && (
        <View>
          <View className="flex-row">
            <Image
              source={{ uri: postData.image[0]?.url }}
              style={{
                width: "50%",
                height: 200,
                resizeMode: "cover",
                marginRight: 2,
              }}
            />
            <Image
              source={{ uri: postData.image[1]?.url }}
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
              source={{ uri: postData.image[2]?.url }}
              style={{
                width: "33.33%",
                height: 130,
                resizeMode: "cover",
                marginRight: 2,
                marginTop: 2,
              }}
            />
            <Image
              source={{ uri: postData.image[3]?.url }}
              style={{
                width: "33.33%",
                height: 130,
                resizeMode: "cover",
                marginTop: 2,
              }}
            />
            <Image
              source={{ uri: postData.image[4]?.url }}
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
