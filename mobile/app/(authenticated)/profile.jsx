import { View, Text, Pressable, Dimensions } from "react-native";
import React, { useCallback, useRef, useState } from "react";
import useKeychainSession from "../../hooks/useKeychainSession";
import { useQuery } from "@tanstack/react-query";
import { Image } from "react-native";
import axios from "axios";
import {
  FlatList,
  RefreshControl,
  ScrollView,
} from "react-native-gesture-handler";
import { PORT } from "../../port";
import { TouchableOpacity } from "react-native";
import {
  ArrowBigDown,
  ArrowBigUp,
  Dot,
  Ellipsis,
  Forward,
  Globe,
  MessageCircle,
  Plus,
  UserPen,
  X,
} from "lucide-react-native";
import { Icons } from "../../components/utils/Icons";
import { images } from "../../constants/images";
import MultipleImageRenderer from "../../components/post/multiple-image-renderer";
import VideoScreen from "../../components/video-screen";
import { formatTimeToNow } from "../../lib/utils";
import BottomSheetComments from "../../components/post/bottom-sheet-comments";
import ProfileHeader from "../../components/profile/profile-header";
import { useIsFocused } from "@react-navigation/native";

const screenWidth = Dimensions.get("window").width;

const ProfileScreen = () => {
  const { session } = useKeychainSession();
  const [refreshing, setRefreshing] = useState(false);
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const [postId, setPostId] = useState(null);
  const [playingVideoIndex, setPlayingVideoIndex] = useState(null); // To track which video is playing

  const bottomSheetRef = useRef(null);

  const handlePresentModalPress = useCallback(() => {
    bottomSheetRef.current?.present();
  }, []);

  const fetchProfileData = async () => {
    try {
      const response = await axios.post(
        `${PORT}/api/v1/profile/getProfileData`,
        session?.user
      );
      return response.data;
    } catch (error) {
      // Catching and logging error without redundancy
      if (error.response) {
        // alert("Response error:", error.response);
      } else if (error.request) {
        // alert(
        //   "Request error: we couldn't reach the server. Please try again later."
        // );
        console.log(error.request);
      } else {
        // alert("Error message:", error.message);
        console.log(error.message);
      }
      throw new Error("Failed to fetch data");
    }
  };

  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ["profile", session?.user.id],
    queryFn: fetchProfileData,
  });

  const onRefresh = async () => {
    setRefreshing(true);
    refetch();
    setRefreshing(false);
  };

  const handleOpenModal = (id) => {
    setPostId(id);
    setIsBottomSheetOpen(true);
    handlePresentModalPress();
  };

  // Function to handle viewable items change
  const onViewableItemsChanged = useCallback(({ viewableItems, changed }) => {
    // Check if the current video is in view and play it
    const visibleItem = viewableItems.find((item) => item.isViewable);
    if (visibleItem) {
      // Set the index of the currently visible video to play
      setPlayingVideoIndex(visibleItem.index);
    }
  }, []);

  // FlatList's viewability config
  const viewabilityConfig = {
    itemVisiblePercentThreshold: 50, // Trigger when 50% of the item is visible
  };

  const isFocused = useIsFocused();

  return (
    <View className="mt-1">
      <FlatList
        className="bg-gray-400"
        contentContainerStyle={{ flexGrow: 1 }}
        data={data?.sortedData}
        ListHeaderComponent={<ProfileHeader data={data} session={session} />}
        ItemSeparatorComponent={() => <View style={{ height: 5 }} />}
        scrollEnabled={true}
        renderItem={({ item, index }) => (
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
                  <MultipleImageRenderer postData={item} postId={item.id} />
                </View>
              )}

            {/* if is video */}
            {Array.isArray(item?.video) &&
              item.video.length > 0 &&
              item.video[0]?.url && (
                <View className=" ">
                  <VideoScreen
                    videoSource={item?.video[0]?.url}
                    playingVideoIndex={playingVideoIndex}
                    setPlayingVideoIndex={setPlayingVideoIndex}
                    index={index}
                    screenFocused={isFocused}
                  />
                </View>
              )}

            {item?.videoUrl && (
              <VideoScreen
                videoSource={item?.videoUrl}
                playingVideoIndex={playingVideoIndex}
                setPlayingVideoIndex={setPlayingVideoIndex}
                index={index}
                screenFocused={isFocused}
              />
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
        keyExtractor={(item, index) => item.id.toString()}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />

      <BottomSheetComments
        postId={postId}
        bottomSheetRef={bottomSheetRef}
        isBottomSheetOpen={isBottomSheetOpen}
        setIsBottomSheetOpen={setIsBottomSheetOpen}
      />
    </View>
  );
};

export default ProfileScreen;
