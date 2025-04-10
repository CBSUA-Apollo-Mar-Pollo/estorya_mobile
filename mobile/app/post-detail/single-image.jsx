import { View, Text } from "react-native";
import React from "react";
import { useSingleImage } from "../../hooks/useSingleImage";
import AutoSizedImage from "../../components/auto-size-uri-image";
import { StatusBar } from "expo-status-bar";

const SingleImage = () => {
  const { data } = useSingleImage();

  return (
    <View className="items-center justify-center h-full bg-black">
      <StatusBar backgroundColor="black" style="light" />
      <AutoSizedImage uri={data?.url} />
    </View>
  );
};

export default SingleImage;
