import { View, Text, TouchableOpacity } from "react-native";
import React, { useCallback, useMemo } from "react";
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { SafeAreaView } from "react-native-safe-area-context";
import { ChevronLeft } from "lucide-react-native";

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
        <SafeAreaView>
          <View className="flex-row items-center justify-between border-b border-gray-200 px-4 pb-1">
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
        </SafeAreaView>
      </BottomSheetView>
    </BottomSheetModal>
  );
};

export default BottomSheetAddPost;
