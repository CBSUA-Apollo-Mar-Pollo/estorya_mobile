import { View, Text, ActivityIndicator } from "react-native";
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

  console.log(data, "from comments");

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
        <BottomSheetView className="flex-1">
          <Text>{postId}</Text>
        </BottomSheetView>
      )}
    </BottomSheetModal>
  );
};

export default BottomSheetComments;
