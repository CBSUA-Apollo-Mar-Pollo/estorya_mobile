import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  Pressable,
} from "react-native";
import { useCallback, useMemo } from "react";
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetTextInput,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { SafeAreaView } from "react-native-safe-area-context";
import { ChevronLeft, Plus, Triangle } from "lucide-react-native";
import { Icons } from "../utils/Icons";
import { images } from "../../constants/images";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import ImageLayoutAddPost from "./image-layout-addpost";
import {
  uploadMultipleToUploadThing,
  uploadToUploadThing,
} from "../../actions/uploadToUploadthing";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { PORT } from "../../port";
import { useRouter } from "expo-router";

const BottomSheetAddPost = ({
  session,
  bottomSheetAddPostRef,
  handleOpenBottomSheetModalImagePicker,
  selectedUris,
  setSelectedUris,
  isSelectMultiple,
  setIsSelectMultiple,
  refetch,
}) => {
  const [text, setText] = useState("");

  const router = useRouter();
  const snapPoints = useMemo(() => ["100%"], []);
  const renderBackdrop = useCallback(
    (props) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1} // hide when closed
        appearsOnIndex={0} // show when opened
        opacity={1} // darkness level (0 to 1)
        pressBehavior="close"
      />
    ),
    []
  );

  const backgroundColors = [
    { name: "white", hex: "white" },
    { name: "Pale Lemon", hex: "#F7FFD1" },
    { name: "Neon Lime", hex: "#B7FF33" },
    { name: "Olive Green", hex: "#5A7F19" },
    { name: "Mint Cream", hex: "#D6FFCC" },
    { name: "Bright Spring Green", hex: "#44CB46" },
    { name: "Forest Green", hex: "#237B2F" },
    { name: "Pale Aqua", hex: "#DFF9F0" },
    { name: "Aquamarine", hex: "#32CBB0" },
    { name: "Deep Teal", hex: "#008970" },
    { name: "Sky Blue", hex: "#8BE0FF" },
    { name: "Vivid Cyan", hex: "#00AAFF" },
    { name: "Deep Ocean Blue", hex: "#014C75" },
    { name: "Lavender", hex: "#DCCBFF" },
    { name: "Medium Violet", hex: "#7B69FF" },
    { name: "Deep Indigo", hex: "#3F327B" },
    { name: "Pastel Pink", hex: "#FFCCFF" },
    { name: "Hot Pink", hex: "#FF5CD6" },
    { name: "Magenta", hex: "#8C268B" },
    { name: "Deep Magenta", hex: "#821B5F" },
  ];

  const handleOpenImagePicker = () => {
    handleOpenBottomSheetModalImagePicker();
    bottomSheetAddPostRef.current?.dismiss();
  };

  const handleAddMoreImages = () => {
    handleOpenBottomSheetModalImagePicker();
    bottomSheetAddPostRef.current?.dismiss();
    setIsSelectMultiple(true);
  };

  // function for uploading the post
  const {
    mutate: handleUpload,
    isLoading,
    isError,
  } = useMutation({
    mutationFn: async () => {
      let uploadedImages = [];

      if (selectedUris.length >= 1) {
        const result = await uploadMultipleToUploadThing(selectedUris);
        uploadedImages = result;
      }

      const payload = {
        description: text,
        images: uploadedImages,
      };

      const { data } = await axios.post(`${PORT}/api/v1/posts`, payload, {
        headers: {
          Authorization: `Bearer ${session.token}`,
        },
      });
      return data;
    },
    onError: (err) => {
      console.log("❌ Upload failed", err);
    },
    onSuccess: (data) => {
      setText("");
      bottomSheetAddPostRef.current?.dismiss();
      refetch();
      console.log("✅ Uploaded:", data);
    },
  });

  return (
    <BottomSheetModal
      ref={bottomSheetAddPostRef}
      name="bottomSheetAddPost"
      index={0}
      enablePanDownToClose={false}
      enableContentPanningGesture={false}
      enableHandlePanningGesture={false}
      snapPoints={snapPoints}
      backdropComponent={renderBackdrop}
      handleComponent={null}
    >
      <BottomSheetView className="flex-1">
        <SafeAreaView className="flex-1">
          <View className="flex-row items-center justify-between border-b border-neutral-300 px-4 pb-1">
            <View className="flex-row items-center gap-x-2">
              <TouchableOpacity
                onPress={() => bottomSheetAddPostRef.current?.dismiss()}
              >
                <ChevronLeft color="black" size={32} />
              </TouchableOpacity>
              <Text className="text-2xl font-medium">Create post</Text>
            </View>
            <TouchableOpacity
              onPress={() => handleUpload()}
              className="bg-blue-500 p-3 rounded-xl"
            >
              <Text className="text-white font-medium">POST</Text>
            </TouchableOpacity>
          </View>

          <ScrollView className="flex-1">
            <View className="flex-row items-start gap-x-3 mx-3 mt-2">
              <Image
                source={{ uri: session?.user.image }}
                className="w-12 h-12 rounded-full mt-2"
                resizeMode="cover"
              />
              <View className="flex-col">
                <Text className="text-xl font-bold">{session?.user.name}</Text>
                <View className="mt-1 flex-row gap-x-2">
                  <TouchableOpacity
                    style={{ backgroundColor: "#dbeafe" }}
                    className="flex-row items-center gap-x-3 p-2 rounded-lg "
                  >
                    <View className="flex-row items-center gap-x-2">
                      <Icons.friendsIcon
                        fill="#4268ff"
                        width={15}
                        height={15}
                      />
                      <Text
                        style={{ fontWeight: "500" }}
                        className="text-blue-700"
                      >
                        Friends
                      </Text>
                    </View>
                    <Icons.triangleDownIcon
                      fill="#4268ff"
                      width={8}
                      height={8}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{ backgroundColor: "#dbeafe" }}
                    className="flex-row items-center gap-x-3 p-2 rounded-lg "
                  >
                    <View className="flex-row items-center gap-x-2">
                      <Plus color="#4268ff" size={15} />
                      <Text
                        style={{ fontWeight: "500" }}
                        className="text-blue-700"
                      >
                        Album
                      </Text>
                    </View>
                    <Icons.triangleDownIcon
                      fill="#4268ff"
                      width={8}
                      height={8}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </View>

            <View className="mt-6 flex-1 mb-4">
              <View className="mb-4">
                <BottomSheetTextInput
                  onChangeText={setText}
                  className={`px-4 py-2 text-2xl text-black`}
                  placeholder={`${
                    selectedUris.length >= 1
                      ? "Say Something about these photos..."
                      : "What's on your mind?"
                  }`}
                  keyboardType="default"
                  autoCapitalize="none"
                  multiline
                  scrollEnabled={false}
                  textAlignVertical="top"
                />
              </View>

              {selectedUris.length > 0 && (
                <View className=" flex-1 flex-col items-center">
                  <ImageLayoutAddPost
                    selectedUris={selectedUris}
                    setSelectedUris={setSelectedUris}
                  />
                  {selectedUris.length > 1 && (
                    <View className="flex-col items-center">
                      <Pressable className="bg-gray-300 p-4 rounded-full mt-4">
                        <Icons.layoutIcon
                          width={20}
                          height={20}
                          color="black"
                        />
                      </Pressable>
                      <Text className="text-xl font-bold">Choose layout</Text>
                    </View>
                  )}

                  {selectedUris.length === 1 && (
                    <View className="flex-col items-center">
                      <TouchableOpacity
                        onPress={handleAddMoreImages}
                        className="bg-gray-300 p-2 rounded-full mt-4"
                      >
                        <Icons.addMorePhotosIcon
                          width={35}
                          height={35}
                          color="black"
                        />
                      </TouchableOpacity>
                      <Text className="text-lg font-semibold">Add more</Text>
                    </View>
                  )}
                </View>
              )}
            </View>
          </ScrollView>

          {/* background color choices */}
          {selectedUris.length === 0 && (
            <View className="flex-2 flex-row items-center gap-x-2 mx-2">
              <TouchableOpacity
                style={{ borderWidth: 0.2 }}
                className="mb-2 px-1 py-1.5 rounded-lg "
              >
                <ChevronLeft size={30} color="black" />
              </TouchableOpacity>
              <FlatList
                data={backgroundColors}
                keyExtractor={(item) => item.hex}
                horizontal
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => (
                  <View
                    className="w-12 mr-4 rounded-md justify-center items-center  "
                    style={{
                      borderWidth: 0.2,
                      backgroundColor: item.hex,
                      height: 38,
                      marginBottom: 10,
                      shadowColor: "rgba(0, 0, 0, 1)",
                      shadowOffset: { width: 1, height: 1 },
                      shadowOpacity: 0.5,
                      shadowRadius: 6,
                      elevation: 2,
                    }}
                  >
                    <Text></Text>
                  </View>
                )}
              />
            </View>
          )}

          <View
            style={{
              paddingHorizontal: 40,
              paddingVertical: 10,
              borderTopWidth: 0.4,
            }}
            className="flex-2 flex-row justify-between  items-center px-10 border-t"
          >
            <TouchableOpacity onPress={() => handleOpenImagePicker()}>
              <Image
                source={images.addPhotoToPost}
                className="w-8 h-8"
                resizeMode="cover"
              />
            </TouchableOpacity>
            <Image
              source={images.friendTagIcon}
              className="w-9 h-9"
              resizeMode="cover"
            />
            <Image
              source={images.emoteIcon}
              className="w-8 h-8"
              resizeMode="cover"
            />
            <Image
              source={images.ellipsisIconPng}
              className="w-8 h-8"
              resizeMode="cover"
            />
          </View>
        </SafeAreaView>
      </BottomSheetView>
    </BottomSheetModal>
  );
};

export default BottomSheetAddPost;
