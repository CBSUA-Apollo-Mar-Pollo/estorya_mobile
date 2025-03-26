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

const HomeScreen = () => {
  const router = useRouter();
  const [data, setData] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const getData = async () => {
    await axios
      .get(`${PORT}/api/v1/posts`)
      .then((res) => setData(res.data))
      .catch((err) => {
        // Log the full error message including response, request, and message
        if (err.response) {
          // The request was made, and the server responded with a status code
          // that falls out of the range of 2xx
          console.log("Response error:", err.response.data);
          console.log("Response status:", err.response.status);
          console.log("Response headers:", err.response.headers);
        } else if (err.request) {
          // The request was made but no response was received
          console.log("Request error:", err.request);
        } else {
          // Something happened in setting up the request that triggered an error
          console.log("Error message:", err.message);
        }
        console.log("Full error:", err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    await getData();
    setRefreshing(false);
  };

  return (
    <View className="bg-neutral-300 h-full">
      <View className="flex-row items-center justify-between pt-2 pb-3 px-4 bg-white  border-b border-neutral-200">
        <Text className="text-4xl font-extrabold">Estorya</Text>
        <View className="flex-row gap-x-4 items-center">
          <Search color="black" size={20} />
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
            keyExtractor={(item) => item.id}
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

                {/* image */}
                {Array.isArray(item?.image) &&
                  item.image.length > 0 &&
                  item.image[0]?.url && (
                    <View className=" ">
                      <AutoSizedImage uri={item?.image[0]?.url} />
                    </View>
                  )}

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
