import {
  View,
  Text,
  ActivityIndicator,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useCallback, useMemo, useState } from "react";
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetView,
  useBottomSheetModal,
} from "@gorhom/bottom-sheet";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { PORT } from "../../port";
import { ArrowBigDown, ArrowBigUp, ChevronDown } from "lucide-react-native";
import { formatTimeToNow, formatTimeToNowForComments } from "../../lib/utils";

const BottomSheetComments = ({ postId, bottomSheetRef }) => {
  const [isOpen, setIsOpen] = useState(false);
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
      setIsOpen(false); // Bottom sheet is closed
    } else {
      setIsOpen(true); // Bottom sheet is open
    }
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
    enabled: isOpen,
  });

  return (
    <BottomSheetModal
      ref={bottomSheetRef}
      index={0}
      enablePanDownToClose={true}
      snapPoints={snapPoints}
      onClose={() => dismiss}
      backdropComponent={renderBackdrop}
      onChange={handleSheetChanges}
    >
      {isLoading ? (
        <View className="flex-col items-center justify-center h-full">
          <ActivityIndicator size={60} color="#000ff" className="mb-20" />
        </View>
      ) : (
        <BottomSheetView className="flex-1 px-4">
          <View className="flex-row items-center gap-x-2">
            <Text className="font-semibold">Most relevant</Text>
            <ChevronDown size={15} color="black" strokeWidth={3} />
          </View>

          <FlatList
            className="mt-4"
            data={data}
            ItemSeparatorComponent={() => <View style={{ height: 5 }} />}
            scrollEnabled={false}
            renderItem={({ item }) => (
              <View className="flex-row items-start gap-x-2 relative">
                <Image
                  style={{ zIndex: 20 }}
                  source={{ uri: item.author.image }}
                  className="w-12 h-12 rounded-full mt-2 bg-white mb-10"
                  resizeMode="cover"
                />

                <View className="relative">
                  <View
                    className="mt-2 px-4 pb-3 pt-2"
                    style={{ backgroundColor: "#e4eaf0", borderRadius: 14 }}
                  >
                    <Text className="font-semibold text-lg">
                      {item.author.name}
                    </Text>
                    <Text>{item.text}</Text>
                  </View>

                  <View className="flex-row items-center gap-x-4 mt-2 relative">
                    <Text className="text-lg">
                      {formatTimeToNowForComments(new Date(item?.createdAt))}
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
                  <View
                    style={{
                      position: "absolute",
                      left: -30,
                      top: 54,
                      zIndex: 10,
                    }}
                    className="absolute left-5 h-full  border border-black"
                  ></View>
                </View>
              </View>
            )}
          />
        </BottomSheetView>
      )}
    </BottomSheetModal>
  );
};

export default BottomSheetComments;
