import { View, Text, TouchableOpacity, Image, TextInput } from "react-native";
import { useCallback, useMemo } from "react";
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { SafeAreaView } from "react-native-safe-area-context";
import { ChevronLeft, Plus, Triangle } from "lucide-react-native";
import { Icons } from "../utils/Icons";
import { images } from "../../constants/images";

const BottomSheetAddPost = ({ session, bottomSheetAddPostRef }) => {
  const snapPoints = useMemo(() => ["100%"], []);
  const renderBackdrop = useCallback(
    (props) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1} // hide when closed
        appearsOnIndex={0} // show when opened
        opacity={0.5} // darkness level (0 to 1)
        pressBehavior="close"
      />
    ),
    []
  );

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
              <Text className="text-xl">Create post</Text>
            </View>
            <TouchableOpacity className="bg-blue-500 p-3 rounded-xl">
              <Text className="text-white font-medium">POST</Text>
            </TouchableOpacity>
          </View>

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
                    <Icons.friendsIcon fill="#4268ff" width={15} height={15} />
                    <Text
                      style={{ fontWeight: "500" }}
                      className="text-blue-700"
                    >
                      Friends
                    </Text>
                  </View>
                  <Icons.triangleDownIcon fill="#4268ff" width={8} height={8} />
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
                  <Icons.triangleDownIcon fill="#4268ff" width={8} height={8} />
                </TouchableOpacity>
              </View>
            </View>
          </View>

          <View className="mt-6 flex-1">
            <TextInput
              className="px-4 py-2   text-2xl text-black"
              placeholder="What's on your mind?"
              keyboardType="default"
              autoCapitalize="none"
              multiline
              textAlignVertical="top"
            />
          </View>

          <View
            style={{ paddingHorizontal: 40, paddingVertical: 7 }}
            className="flex-2 flex-row justify-between  items-center px-10"
          >
            <Image
              source={images.addPhotoToPost}
              className="w-8 h-8"
              resizeMode="cover"
            />
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
