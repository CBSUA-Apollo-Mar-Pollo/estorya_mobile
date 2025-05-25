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
        ListHeaderComponent={() => (
          <View className="mb-1">
            <View className="bg-white pb-4">
              <View className="flex-row items-center justify-between mx-4 mt-2">
                <TouchableOpacity className="flex-row items-center gap-x-2">
                  <Text className="font-extrabold text-2xl">
                    {data?.user.name}
                  </Text>
                  <Icons.TriangleDown height={12} width={12} color="black" />
                </TouchableOpacity>
                <TouchableOpacity className="bg-gray-200 rounded-full p-2">
                  <Icons.UserEdit height={24} width={24} color="black" />
                </TouchableOpacity>
              </View>

              <View className="h-[29vh] relative">
                <View>
                  <Image
                    source={{ uri: data?.user.backgroundImage }}
                    className="w-full h-60 mt-2"
                    resizeMode="cover"
                  />
                  <TouchableOpacity className="absolute right-4 bottom-4 border-2 border-white bg-gray-200 p-2 rounded-full">
                    <Icons.CameraIcon height={20} width={20} color="black" />
                  </TouchableOpacity>
                </View>

                <View className="absolute bottom-2 left-4 ">
                  <Image
                    source={{ uri: data?.user.image }}
                    className="w-44 h-44 rounded-full mt-0.5 border-4 border-white "
                    resizeMode="cover"
                  />
                  <TouchableOpacity className="absolute right-2 bottom-0 border-2 border-white bg-gray-200 p-2 rounded-full">
                    <Icons.CameraIcon height={20} width={20} color="black" />
                  </TouchableOpacity>
                </View>
              </View>

              <View className="mx-4">
                <Text className="text-2xl font-extrabold">
                  {data?.user.name}
                </Text>
                <View className="flex-row mt-2 flex-1 gap-x-4">
                  <TouchableOpacity className="flex-row flex-1 items-center gap-x-2 bg-blue-700 px-6 py-3 rounded-lg">
                    <Plus color="white" size={20} strokeWidth={3} />
                    <Text className="text-white font-medium">Add to story</Text>
                  </TouchableOpacity>
                  <TouchableOpacity className="flex-row flex-1 items-center gap-x-2 bg-neutral-300 px-6 py-3 rounded-lg">
                    <Icons.PencilEditIcon
                      color="black"
                      height={17}
                      width={17}
                    />
                    <Text className="text-black font-medium">Edit profile</Text>
                  </TouchableOpacity>
                  <TouchableOpacity className="flex-row items-center gap-x-2 bg-neutral-300 px-6 py-3 rounded-lg">
                    <Ellipsis color="black" size={17} />
                  </TouchableOpacity>
                </View>
              </View>
            </View>

            <View className="bg-white mt-2">
              <View className="flex-row mx-3 my-3">
                <TouchableOpacity className="bg-blue-100 py-2 px-4 rounded-full">
                  <Text className="font-semibold text-blue-800">Posts</Text>
                </TouchableOpacity>
                <TouchableOpacity className="py-2 px-4">
                  <Text className="font-semibold text-neutral-700">Photos</Text>
                </TouchableOpacity>
                <TouchableOpacity className="py-2 px-4">
                  <Text className="font-semibold text-neutral-700">Videos</Text>
                </TouchableOpacity>
              </View>

              {/* line */}
              <View className="w-full h-[1px] bg-neutral-400" />

              <View className="mx-4 mt-3">
                <Text className=" font-bold">Details</Text>
                <Pressable className="flex-row items-center gap-x-2 my-4">
                  <Ellipsis size={27} color="black" />
                  <Text className="">See your About info</Text>
                </Pressable>

                <TouchableOpacity className="bg-blue-100 py-2 rounded-lg">
                  <Text className="text-blue-700 font-semibold text-center">
                    Edit public details
                  </Text>
                </TouchableOpacity>
              </View>

              <View className="mt-4">
                <View className="flex-row items-center justify-between mx-4">
                  <Text className="font-bold">Friends</Text>
                  <TouchableOpacity>
                    <Text className="text-blue-600">Find friends</Text>
                  </TouchableOpacity>
                </View>
                <Text className="font-medium text-neutral-600 mx-4">
                  {data?.friends.length}{" "}
                  {data?.friends.length > 1 ? "friends" : "friend"}
                </Text>

                <View className="my-2 mx-4">
                  <FlatList
                    data={data?.friends}
                    scrollEnabled={false}
                    numColumns={3}
                    ItemSeparatorComponent={() => (
                      <View style={{ height: 7 }} />
                    )}
                    columnWrapperStyle={{
                      gap: 3,
                    }}
                    renderItem={({ item }) => {
                      let friendObj;
                      if (item?.requesterUser.id !== session?.user.id) {
                        friendObj = item?.requesterUser;
                      } else if (item?.user.id !== session?.user.id) {
                        friendObj = item?.user;
                      }

                      if (friendObj) {
                        return (
                          <View style={{ marginHorizontal: 6 }} className="">
                            <Image
                              source={{ uri: friendObj.image }}
                              className="w-32 h-32 rounded-xl"
                              resizeMode="cover"
                            />
                            <Text className="mt-1 ml-1 font-bold">
                              {friendObj.name}
                            </Text>
                          </View>
                        );
                      }
                      return null;
                    }}
                    keyExtractor={(item, index) => index.toString()}
                  />
                </View>

                <TouchableOpacity className="bg-gray-300 rounded-md py-2 mx-4">
                  <Text className="font-bold text-center">See all friends</Text>
                </TouchableOpacity>

                <View className="mt-4">
                  <View className="flex-row items-center justify-between mb-8 mx-4">
                    <Text className="font-bold">Posts</Text>
                    <TouchableOpacity>
                      <Text className="text-blue-700">Filters</Text>
                    </TouchableOpacity>
                  </View>

                  <TouchableOpacity className="flex-row items-center justify-between mx-4 mb-4">
                    <View className="flex-row items-center gap-x-3">
                      <TouchableOpacity>
                        <Image
                          source={{ uri: data?.user.image }}
                          className="w-12 h-12 rounded-full"
                          resizeMode="cover"
                        />
                      </TouchableOpacity>
                      <Text className="">What's on your mind?</Text>
                    </View>
                    <TouchableOpacity>
                      <Image
                        source={images.addPhotoToPost}
                        className="w-7 h-7"
                        resizeMode="cover"
                      />
                    </TouchableOpacity>
                  </TouchableOpacity>

                  <View className="bg-gray-100 border-y border-neutral-300 px-3 mb-4">
                    <TouchableOpacity className="flex-row items-center bg-white self-start px-4 py-2 my-2 rounded-full gap-x-1 border border-neutral-400">
                      <Image
                        source={images.reel}
                        className="w-8 h-8"
                        resizeMode="cover"
                      />
                      <Text className="font-medium">Shortsv</Text>
                    </TouchableOpacity>
                  </View>

                  <TouchableOpacity className="mb-4 bg-gray-300 flex-row items-center justify-center py-2 mx-4 rounded-lg gap-x-2">
                    <Icons.addPostsIcon width={18} height={18} color="black" />
                    <Text className="font-bold">Manage posts</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        )}
        ItemSeparatorComponent={() => <View style={{ height: 5 }} />}
        scrollEnabled={true}
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
