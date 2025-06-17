import {
  View,
  Text,
  ActivityIndicator,
  FlatList,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
  TextInput,
  Platform,
} from "react-native";
import React, { useCallback, useMemo, useState } from "react";
import {
  BottomSheetBackdrop,
  BottomSheetFlatList,
  BottomSheetModal,
  BottomSheetView,
  useBottomSheetModal,
} from "@gorhom/bottom-sheet";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { PORT } from "../../port";
import { ArrowBigDown, ArrowBigUp, ChevronDown } from "lucide-react-native";
import { formatTimeToNow, formatTimeToNowForComments } from "../../lib/utils";
import { SafeAreaView } from "react-native-safe-area-context";

const BottomSheetComments = ({
  postId,
  bottomSheetRef,
  isBottomSheetOpen,
  setIsBottomSheetOpen,
}) => {
  const [height, setHeight] = useState(0);
  const snapPoints = useMemo(() => ["93%"], []);
  const { dismiss } = useBottomSheetModal();
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

  const handleSheetChanges = (index) => {
    if (index === -1) {
      setIsBottomSheetOpen(false); // Bottom sheet is closed
    } else {
      setIsBottomSheetOpen(true); // Bottom sheet is open
    }
  };

  const handleLayout = (event) => {
    const rawHeight = event.nativeEvent.layout.height;
    const roundedHeight = Math.floor(rawHeight); // or Math.floor(), Math.ceil()
    setHeight(roundedHeight);
  };

  const fetchComments = async () => {
    try {
      const response = await axios.post(`${PORT}/api/v1/posts/postComments`, {
        postId: postId,
      });
      return response.data;
    } catch (error) {
      // Catching and logging error without redundancy
      if (error.response) {
        alert("Response error:", error.response);
        console.log(error.response);
      } else if (error.request) {
        alert(
          "Request error: we couldn't reach the server. Please try again later."
        );
        console.log(error.request);
      } else {
        console.log(error.message);
        alert("Error message:", error.message);
      }
      throw new Error("Failed to fetch data");
    }
  };

  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ["comments", postId],
    queryFn: fetchComments,
    enabled: isBottomSheetOpen,
  });

  return (
    <BottomSheetModal
      ref={bottomSheetRef}
      index={0}
      enablePanDownToClose={true}
      snapPoints={snapPoints}
      backdropComponent={renderBackdrop}
      onChange={handleSheetChanges}
      keyboardBehavior="interactive"
      keyboardBlurBehavior="restore"
      handleComponent={null}
    >
      {isLoading && (
        <View className="flex-col items-center justify-center h-full">
          <ActivityIndicator size={60} color="#000ff" className="mb-20" />
        </View>
      )}

      {!isLoading && data?.length !== 0 && (
        <KeyboardAvoidingView
          behavior={Platform.OS === "android" ? "height" : "padding"}
          className="flex-1"
        >
          <View className="flex-1 mt-12">
            <BottomSheetFlatList
              className="mt-2 px-4"
              data={data}
              ItemSeparatorComponent={() => <View style={{ height: 5 }} />}
              scrollEnabled
              keyboardShouldPersistTaps="handled"
              renderItem={({ item }) => (
                <View>
                  <View className="flex-row items-center gap-x-2 px-4 mb-4">
                    <Text className="font-semibold">Most relevant</Text>
                    <ChevronDown size={15} color="black" strokeWidth={3} />
                  </View>
                  <View
                    onLayout={handleLayout}
                    className="flex-row items-start gap-x-2 relative"
                  >
                    <Image
                      style={{ zIndex: 20 }}
                      source={{ uri: item?.author.image }}
                      className="w-12 h-12 rounded-full mt-2 bg-white mb-10"
                      resizeMode="cover"
                    />

                    <View className="relative flex-1 flex-wrap">
                      <View
                        className="mt-2 px-4 pb-4 pt-2 flex-shrink self-start"
                        style={{ backgroundColor: "#e4eaf0", borderRadius: 14 }}
                      >
                        <Text className="font-semibold text-lg">
                          {item?.author.name}
                        </Text>
                        <Text className="text-base">{item.text}</Text>
                      </View>

                      <View className="flex-row items-center gap-x-4 mt-2 relative">
                        <Text className="text-lg">
                          {formatTimeToNowForComments(
                            new Date(item?.createdAt)
                          )}
                        </Text>
                        <View className="flex-row items-center gap-x-2">
                          <TouchableOpacity>
                            <ArrowBigUp size={27} color="#262626" />
                          </TouchableOpacity>
                          <Text className="text-xl text-neutral-800">0</Text>
                          <TouchableOpacity>
                            <ArrowBigDown size={27} color="#262626" />
                          </TouchableOpacity>
                        </View>
                        <TouchableOpacity>
                          <Text className="font-semibold text-neutral-600">
                            Reply
                          </Text>
                        </TouchableOpacity>
                      </View>

                      {/* branch line for replies */}
                      {item.replies.length !== 0 && (
                        <View
                          style={{
                            position: "absolute",
                            left: -30,
                            top: 54,
                            zIndex: 10,
                            height: height - 72,
                            borderLeftWidth: 2.5,
                          }}
                          className="absolute left-5  border-neutral-400"
                        ></View>
                      )}

                      {item.replies.length !== 0 && (
                        <View className="relative">
                          <View
                            style={{
                              position: "absolute",
                              left: -30,
                              top: -7,
                              zIndex: 10,
                              borderLeftWidth: 2.5,
                              borderTopWidth: 0,
                              borderRightWidth: 0,
                              borderBottomWidth: 3,
                              width: 30,
                              borderBottomLeftRadius: 15,
                            }}
                            className="absolute  h-full border  border-neutral-400"
                          ></View>
                          <View
                            style={{ marginLeft: 10 }}
                            className="flex-row items-center  gap-x-2 "
                          >
                            <Image
                              style={{ zIndex: 20, height: 26, width: 26 }}
                              source={{ uri: item?.replies[0]?.author.image }}
                              className=" rounded-full mt-2  bg-white mb-10"
                              resizeMode="cover"
                            />
                            <Text className="font-semibold ">
                              {item?.replies[0]?.author?.name}
                            </Text>
                            <Text>{item?.replies[0]?.text}</Text>
                          </View>
                        </View>
                      )}

                      {item.replies.length !== 0 && (
                        <View className="relative">
                          <View
                            style={{
                              position: "absolute",
                              left: -30,
                              top: -7,
                              zIndex: 10,
                              borderLeftWidth: 2.5,
                              borderTopWidth: 0,
                              borderRightWidth: 0,
                              borderBottomWidth: 3,
                              width: 30,
                              borderBottomLeftRadius: 15,
                            }}
                            className="absolute  h-full border  border-neutral-400"
                          ></View>
                          <View
                            style={{ marginLeft: 10 }}
                            className="flex-row items-center  gap-x-2 mt-2"
                          >
                            <Text className="font-semibold">
                              View {item?.replies.length - 1} more replies...
                            </Text>
                          </View>
                        </View>
                      )}
                    </View>
                  </View>
                </View>
              )}
            />

            <View
              style={{ borderTopWidth: 0.7, borderColor: "#828282" }}
              className="py-3 px-4  bg-white"
            >
              <TextInput
                placeholder="Type a message..."
                className="h-10 px-4 bg-neutral-300 rounded-full"
              />
            </View>
          </View>
        </KeyboardAvoidingView>
      )}

      {!isLoading && data?.length === 0 && (
        <KeyboardAvoidingView
          behavior={Platform.OS === "android" ? "height" : "padding"}
          className="flex-1"
        >
          <BottomSheetView
            className="relative flex-1 flex-col items-center h-full"
            style={{ marginTop: 120 }}
          >
            <Text className="text-2xl font-bold">No Comments yet</Text>
            <Text>Be the first comment.</Text>
            <View
              style={{ borderTopWidth: 0.7, borderColor: "#828282" }}
              className="py-3 px-4  bg-white"
            >
              <TextInput
                placeholder="Type a message..."
                className="h-10 px-4 bg-neutral-300 rounded-full"
              />
            </View>
          </BottomSheetView>
        </KeyboardAvoidingView>
      )}
    </BottomSheetModal>
  );
};

export default BottomSheetComments;
