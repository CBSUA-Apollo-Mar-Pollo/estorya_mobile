import { View, Text, Pressable, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { useSingleImage } from "../../hooks/useSingleImage";
import AutoSizedImage from "../../components/auto-size-uri-image";
import { StatusBar } from "expo-status-bar";
import {
  ArrowBigDown,
  ArrowBigUp,
  EllipsisVertical,
  Forward,
  MessageCircle,
  X,
} from "lucide-react-native";
import { useRouter } from "expo-router";
import { formatTimeToNow } from "../../lib/utils";

const SingleImage = () => {
  const router = useRouter();
  const { postData, image } = useSingleImage();
  const [toggleUI, setToggleUI] = useState(true);

  console.log(postData);

  return (
    <Pressable
      onPress={() => setToggleUI((prev) => !prev)}
      className="items-center justify-center h-full bg-black relative"
    >
      {toggleUI && (
        <View className="absolute top-0">
          <View className="flex-row justify-between items-center w-full px-2">
            <TouchableOpacity onPress={() => router.back()}>
              <X color="white" size={35} />
            </TouchableOpacity>
            <TouchableOpacity>
              <EllipsisVertical color="white" size={35} />
            </TouchableOpacity>
          </View>
        </View>
      )}
      <StatusBar backgroundColor="black" style="light" />
      <AutoSizedImage uri={image?.url} />

      {toggleUI && (
        <View className="absolute bottom-0 w-full ">
          <View className="bg-black/60 px-3 pt-2">
            <View>
              <Text className="text-white font-bold">
                {postData.author.name}
              </Text>
              <Text className="text-neutral-300 text-sm font-light">
                {formatTimeToNow(new Date(postData?.createdAt))}
              </Text>
            </View>

            <TouchableOpacity className="my-4  border-2 border-white rounded">
              <Text className="text-white text-center p-1.5 text-sm">
                MESSAGE {postData.author.name.toUpperCase()}
              </Text>
            </TouchableOpacity>

            <View className="flex-row justify-between py-3 px-6">
              <View className="flex-row items-center gap-x-2">
                <TouchableOpacity>
                  <ArrowBigUp color="white" />
                </TouchableOpacity>
                <Text className="text-xl text-neutral-100">0</Text>
                <TouchableOpacity>
                  <ArrowBigDown color="white" />
                </TouchableOpacity>
              </View>

              <TouchableOpacity className="flex-row items-center gap-x-2">
                <MessageCircle color="white" />
                <Text className="text-md text-neutral-100 font-medium">
                  Comment
                </Text>
              </TouchableOpacity>

              <TouchableOpacity className="flex-row items-center gap-x-2">
                <Forward color="white" size={30} />
                <Text className="text-md text-neutral-100 font-medium">
                  Share
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
    </Pressable>
  );
};

export default SingleImage;
