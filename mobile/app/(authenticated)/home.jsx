import { View, Text, TouchableOpacity, Image, ScrollView } from "react-native";
import React, { useCallback, useRef, useState } from "react";
import { useRouter } from "expo-router";
import {
  ArrowBigDown,
  ArrowBigUp,
  Dot,
  Ellipsis,
  Forward,
  Globe,
  MessageCircle,
  X,
} from "lucide-react-native";
import axios from "axios";
import { PORT } from "../../port";
import VideoScreen from "../../components/video-screen";
import { useQuery } from "@tanstack/react-query";
import { formatTimeToNow } from "../../lib/utils";
import MultipleImageRenderer from "../../components/post/multiple-image-renderer";
import BottomSheetComments from "../../components/post/bottom-sheet-comments";
import { FlatList, RefreshControl } from "react-native-gesture-handler";
import { useIsFocused } from "@react-navigation/native";
import useKeychainSession from "../../hooks/useKeychainSession";
import { images } from "../../constants/images";
import BottomSheetAddPost from "../../components/post/bottom-sheet-add-post";
import BottomSheetImagePicker from "../../components/post/bottom-sheet-image-picker";

const HomeScreen = () => {
  const router = useRouter();
  const { session } = useKeychainSession();
  const [refreshing, setRefreshing] = useState(false);
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const [postId, setPostId] = useState(null);
  const [playingVideoIndex, setPlayingVideoIndex] = useState(null); // To track which video is playing

  const [selectedUris, setSelectedUris] = useState([]); // array state for selected images that will be uploaded.
  const [isSelectMultiple, setIsSelectMultiple] = useState(false); // boolean state for toggling selecting multiple images in add post.

  const bottomSheetRef = useRef(null);
  const bottomSheetAddPostRef = useRef(null);
  const bottomSheetImagePickerRef = useRef(null);

  const handlePresentModalPress = useCallback(() => {
    bottomSheetRef.current?.present();
  }, []);

  const handleOpenBottomSheetModalAddPost = useCallback(() => {
    bottomSheetAddPostRef.current?.present();
  });

  const handleOpenBottomSheetModalImagePicker = useCallback(() => {
    bottomSheetImagePickerRef.current?.present();
  }, []);

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
    itemVisiblePercentThreshold: 90, // Trigger when 50% of the item is visible
  };

  const isFocused = useIsFocused();

  return (
    <View className="bg-neutral-300">
      {isLoading ? (
        <View className="flex-col items-center h-full gap-y-2">
          {/* <ActivityIndicator size={60} color="#000ff" className="mb-20" /> */}
          <View className="bg-white w-full">
            <View className="flex-row items-center gap-x-2 my-2 mx-2">
              <View className="h-16 w-16 rounded-full bg-gray-300 animate-pulse" />
              <View className="gap-y-2">
                <View className="h-4 w-48 rounded-full bg-gray-300 animate-pulse" />
                <View className="h-3 w-20 rounded-full bg-gray-300 animate-pulse" />
              </View>
            </View>
            <View className="h-96 w-full bg-gray-400 animate-pulse "></View>
            <View className="flex-row items-center my-4 mx-5 gap-x-6">
              <View className="h-8  rounded-full bg-gray-300 animate-pulse flex-1" />
              <View className="h-8  rounded-full bg-gray-300 animate-pulse flex-1" />
              <View className="h-8  rounded-full bg-gray-300 animate-pulse flex-1" />
            </View>
          </View>
          <View className="bg-white w-full">
            <View className="flex-row items-center gap-x-2 my-2 mx-2">
              <View className="h-16 w-16 rounded-full bg-gray-300 animate-pulse" />
              <View className="gap-y-2">
                <View className="h-4 w-56 rounded-full bg-gray-300 animate-pulse" />
                <View className="h-3 w-40 rounded-full bg-gray-300 animate-pulse" />
              </View>
            </View>
            <View className="h-96 w-full bg-gray-400 animate-pulse "></View>
            <View className="flex-row items-center my-4 mx-5 gap-x-6">
              <View className="h-8  rounded-full bg-gray-300 animate-pulse flex-1" />
              <View className="h-8  rounded-full bg-gray-300 animate-pulse flex-1" />
              <View className="h-8  rounded-full bg-gray-300 animate-pulse flex-1" />
            </View>
          </View>
        </View>
      ) : (
        <View>
          <FlatList
            data={data}
            ListHeaderComponent={() => (
              // header of post lists
              <View className="bg-white mb-1 flex-row items-center px-2 py-3">
                <View className="flex-row items-center flex-1">
                  <TouchableOpacity>
                    <Image
                      source={{ uri: session?.user.image }}
                      className="w-12 h-12 rounded-full mt-0.5"
                      resizeMode="cover"
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => handleOpenBottomSheetModalAddPost()}
                    className="border border-gray-400 pl-5 py-1.5 rounded-full flex-1 ml-3 mr-8"
                  >
                    <Text className="text-lg">What's on your mind?</Text>
                  </TouchableOpacity>
                </View>

                <TouchableOpacity className="mr-4">
                  <Image
                    source={images.addPhotoToPost}
                    className="w-7 h-7"
                    resizeMode="cover"
                  />
                </TouchableOpacity>
              </View>
            )}
            renderItem={({ item, index }) => (
              // posts lists
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
                        <Text className="text-lg font-extrabold">
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

                {/* for rendering shortsv(reels version of the app) */}
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
            ItemSeparatorComponent={() => <View style={{ height: 5 }} />}
            scrollEnabled={true}
            onViewableItemsChanged={onViewableItemsChanged}
            viewabilityConfig={viewabilityConfig}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
                progressViewOffset={20}
              />
            }
          />

          {/* Bottom Sheet */}

          {/* for comments */}
          <BottomSheetComments
            postId={postId}
            bottomSheetRef={bottomSheetRef}
            isBottomSheetOpen={isBottomSheetOpen}
            setIsBottomSheetOpen={setIsBottomSheetOpen}
          />

          {/* for adding post */}
          <BottomSheetAddPost
            session={session}
            bottomSheetAddPostRef={bottomSheetAddPostRef}
            handleOpenBottomSheetModalImagePicker={
              handleOpenBottomSheetModalImagePicker
            }
            selectedUris={selectedUris}
            setSelectedUris={setSelectedUris}
            isSelectMultiple={isSelectMultiple}
            setIsSelectMultiple={setIsSelectMultiple}
          />

          <BottomSheetImagePicker
            selectedUris={selectedUris}
            setSelectedUris={setSelectedUris}
            bottomSheetImagePickerRef={bottomSheetImagePickerRef}
            handleOpenBottomSheetModalAddPost={
              handleOpenBottomSheetModalAddPost
            }
            isSelectMultiple={isSelectMultiple}
            setIsSelectMultiple={setIsSelectMultiple}
          />
        </View>
      )}
    </View>
  );
};

export default HomeScreen;
