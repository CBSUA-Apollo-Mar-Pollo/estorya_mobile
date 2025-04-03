import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  Dimensions,
  FlatList,
  RefreshControl,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import {
  ArrowBigDown,
  ArrowBigUp,
  Dot,
  Ellipsis,
  Forward,
  Globe,
  MessageCircle,
  Search,
  X,
} from "lucide-react-native";
import { images } from "../../constants/images";
import AutoSizedAssetImage from "../../components/auto-size-assset-image";
import axios from "axios";
import { PORT } from "../../port";
import AutoSizedImage from "../../components/auto-size-uri-image";
import VideoScreen from "../../components/video-screen";
import { useQuery } from "@tanstack/react-query";
import PostImages from "../../components/post/post-images";

const HomeScreen = () => {
  const router = useRouter();
  const [refreshing, setRefreshing] = useState(false);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${PORT}/api/v1/posts`);
      return response.data;
    } catch (error) {
      // Catching and logging error without redundancy
      if (error.response) {
        alert("Response error:", error.response);
      } else if (error.request) {
        alert(
          "Request error: we couldn't reach the server. Please try again later."
        );
      } else {
        alert("Error message:", error.message);
      }
      throw new Error("Failed to fetch data");
    }
  };

  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ["posts"],
    queryFn: fetchData,
  });

  const onRefresh = async () => {
    setRefreshing(true);
    refetch();
    setRefreshing(false);
  };

  return (
    <View className="bg-neutral-300 h-full">
      <View className="flex-row items-center justify-between pt-2 pb-3 px-4 bg-white  border-b border-neutral-200">
        <Text className="text-4xl font-extrabold">Estorya</Text>
        <View className="flex-row gap-x-4 items-center">
          <TouchableOpacity onPress={() => router.push("/search")}>
            <Search color="black" size={20} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => router.push("/signin")}>
            <Text className="text-xl">Sign in</Text>
          </TouchableOpacity>
        </View>
      </View>

      {isLoading ? (
        <View className="flex-col items-center justify-center h-full">
          <ActivityIndicator size={60} color="#000ff" className="mb-20" />
        </View>
      ) : (
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          <FlatList
            data={data}
            ItemSeparatorComponent={() => <View style={{ height: 5 }} />}
            scrollEnabled={false}
            renderItem={({ item }) => (
              <View className="bg-white space-y-2">
                {/*card header */}
                <View className="px-4">
                  <View className="flex-row items-start justify-between ">
                    <View className="flex-row py-2 gap-x-2">
                      <Image
                        source={{ uri: item.author.image }}
                        className="w-12 h-12 rounded-full"
                        resizeMode="cover"
                      />
                      <View>
                        <Text className="text-2xl font-extrabold">
                          {item.author.name}
                        </Text>
                        <View className="flex-row items-center justify-start">
                          <Text>3d</Text>
                          <Dot color="black" size={15} />
                          <Globe color="black" size={12} />
                        </View>
                      </View>
                    </View>

                    <View className="flex-row items-center mt-2 gap-x-6">
                      <TouchableOpacity>
                        <Ellipsis color="#737373" />
                      </TouchableOpacity>
                      <TouchableOpacity>
                        <X color="#737373" />
                      </TouchableOpacity>
                    </View>
                  </View>

                  {/* post caption */}
                  {item?.description && (
                    <View className="pb-1 px-1">
                      <Text className="text-lg">{item.description}</Text>
                    </View>
                  )}
                </View>

                {/* if is image */}
                {Array.isArray(item?.image) &&
                  item.image.length > 0 &&
                  item.image[0]?.url && (
                    <View className=" ">
                      <PostImages images={item?.image} />
                      <AutoSizedImage uri={item?.image[0]?.url} />
                    </View>
                  )}

                {/* if is video */}
                {Array.isArray(item?.video) &&
                  item.video.length > 0 &&
                  item.video[0]?.url && (
                    <View className=" ">
                      <VideoScreen videoSource={item?.video[0]?.url} />
                    </View>
                  )}

                {/* footer buttons */}
                <View className="flex-row justify-between py-3 px-6">
                  <View className="flex-row items-center gap-x-2">
                    <TouchableOpacity>
                      <ArrowBigUp color="#737373" />
                    </TouchableOpacity>
                    <Text className="text-xl text-neutral-500">0</Text>
                    <TouchableOpacity>
                      <ArrowBigDown color="#737373" />
                    </TouchableOpacity>
                  </View>

                  <TouchableOpacity className="flex-row items-center gap-x-2">
                    <MessageCircle color="#737373" />
                    <Text className="text-lg text-neutral-500 font-medium">
                      Comment
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity className="flex-row items-center gap-x-2">
                    <Forward color="#737373" />
                    <Text className="text-lg text-neutral-500 font-medium">
                      Share
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          />
        </ScrollView>
      )}
    </View>
  );
};

export default HomeScreen;
