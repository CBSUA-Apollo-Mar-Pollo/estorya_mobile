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
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Link, useRouter } from "expo-router";
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
import { formatTimeToNow } from "../../lib/utils";
import MultipleImageRenderer from "../../components/post/multiple-image-renderer";
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetView,
  useBottomSheetModal,
} from "@gorhom/bottom-sheet";
import { StatusBar } from "expo-status-bar";
import BottomSheetComments from "../../components/post/bottom-sheet-comments";

const HomeScreen = () => {
  const router = useRouter();
  const [refreshing, setRefreshing] = useState(false);
  const [postId, setPostId] = useState(null);

  const bottomSheetRef = useRef(null);

  const handlePresentModalPress = () => bottomSheetRef.current?.present();

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
        console.log(error.request);
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

  const handleOpenModal = (id) => {
    setPostId(id);
    handlePresentModalPress();
  };

  return (
    <View className="bg-neutral-300 h-full">
      {isLoading ? (
        <View className="flex-col items-center justify-center h-full">
          <ActivityIndicator size={60} color="#000ff" className="mb-20" />
        </View>
      ) : (
        <View>
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
                          className="w-12 h-12 rounded-full mt-0.5"
                          resizeMode="cover"
                        />
                        <View>
                          <Text className="text-2xl font-extrabold">
                            {item.author.name}
                          </Text>
                          <View className="flex-row items-center justify-start">
                            <Text className="text-sm">
                              {formatTimeToNow(new Date(item?.createdAt))}
                            </Text>
                            <Dot color="black" size={15} />
                            <Globe color="black" size={12} />
                          </View>
                        </View>
                      </View>

                      <View className="flex-row items-center mt-2 gap-x-6">
                        <TouchableOpacity>
                          <Ellipsis color="#262626" />
                        </TouchableOpacity>
                        <TouchableOpacity>
                          <X color="#262626" />
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
                      <View className="">
                        <MultipleImageRenderer
                          postData={item}
                          postId={item.id}
                        />
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

                  {item.comments.length !== 0 && (
                    <View className="w-full">
                      <Text className="text-right mr-2 font-semibold text-neutral-800">
                        {item.comments.length}{" "}
                        {item.comments.length > 1 ? "comments" : "comment"}
                      </Text>
                    </View>
                  )}

                  {/* footer buttons */}
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

                    <TouchableOpacity
                      onPress={() => handleOpenModal(item.id)}
                      className="flex-row items-center gap-x-2"
                    >
                      <MessageCircle color="#262626" />
                      <Text className="text-lg text-neutral-800 font-medium">
                        Comment
                      </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      onPress={() => router.push("/signin")}
                      className="flex-row items-center gap-x-2"
                    >
                      <Forward color="#262626" />
                      <Text className="text-lg text-neutral-800 font-medium">
                        Share
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              )}
            />
          </ScrollView>

          {/* Bottom Sheet */}

          <BottomSheetComments
            postId={postId}
            bottomSheetRef={bottomSheetRef}
          />
        </View>
      )}
    </View>
  );
};

export default HomeScreen;
