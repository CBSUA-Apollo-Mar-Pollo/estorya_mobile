import { View, Text, Image, TouchableOpacity, FlatList } from "react-native";
import React from "react";
import { formatTimeToNow } from "../../lib/utils";
import {
  ArrowBigDown,
  ArrowBigUp,
  Dot,
  Forward,
  Globe,
  MessageCircle,
} from "lucide-react-native";
import AutoSizedImage from "../auto-size-uri-image";

const ImageList = ({ postDetails }) => {
  return (
    <View className="bg-white h-full">
      <View className="px-4">
        <View className="flex-row items-start justify-between ">
          <View className="flex-row py-2 gap-x-2">
            <Image
              source={{ uri: postDetails.author.image }}
              className="w-12 h-12 rounded-full mt-0.5"
              resizeMode="cover"
            />
            <View>
              <Text className="text-2xl font-extrabold">
                {postDetails.author.name}
              </Text>
              <View className="flex-row items-center justify-start">
                <Text className="text-sm">
                  {formatTimeToNow(new Date(postDetails?.createdAt))}
                </Text>
                <Dot color="black" size={15} />
                <Globe color="black" size={12} />
              </View>
            </View>
          </View>
        </View>

        {/* post caption */}
        {postDetails?.description && (
          <View className="pb-1 px-1">
            <Text className="text-lg">{postDetails.description}</Text>
          </View>
        )}

        <View className="flex-row justify-between py-3 px-6">
          <View className="flex-row items-center gap-x-2">
            <TouchableOpacity>
              <ArrowBigUp color="#262626" />
            </TouchableOpacity>
            <Text className="text-xl text-neutral-800">0</Text>
            <TouchableOpacity>
              <ArrowBigDown color="#262626" />
            </TouchableOpacity>
          </View>

          <TouchableOpacity className="flex-row items-center gap-x-2">
            <MessageCircle color="#262626" />
            <Text className="text-lg text-neutral-800 font-medium">
              Comment
            </Text>
          </TouchableOpacity>

          <TouchableOpacity className="flex-row items-center gap-x-2">
            <Forward color="#262626" />
            <Text className="text-lg text-neutral-800 font-medium">Share</Text>
          </TouchableOpacity>
        </View>
      </View>

      <FlatList
        data={postDetails.image}
        renderItem={({ item }) => (
          <View className="">
            <AutoSizedImage uri={item?.url} />
            <View className="flex-row justify-between py-3 px-6 border-b border-neutral-300">
              <View className="flex-row items-center gap-x-2">
                <TouchableOpacity>
                  <ArrowBigUp color="#262626" />
                </TouchableOpacity>
                <Text className="text-xl text-neutral-800">0</Text>
                <TouchableOpacity>
                  <ArrowBigDown color="#262626" />
                </TouchableOpacity>
              </View>

              <TouchableOpacity className="flex-row items-center gap-x-2">
                <MessageCircle color="#262626" />
                <Text className="text-lg text-neutral-800 font-medium">
                  Comment
                </Text>
              </TouchableOpacity>

              <TouchableOpacity className="flex-row items-center gap-x-2">
                <Forward color="#262626" />
                <Text className="text-lg text-neutral-800 font-medium">
                  Share
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
};

export default ImageList;
