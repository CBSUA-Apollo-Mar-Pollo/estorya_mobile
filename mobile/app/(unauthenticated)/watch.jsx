import { View, Text, Pressable } from "react-native";
import React, { useMemo, useState } from "react";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const WatchScreen = () => {
  const snapPoints = useMemo(() => ["75%", "100%"], []);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <View className=" bg-neutral-300 flex-1">
      <Text>watch</Text>
      <Pressable onPress={() => setIsOpen((prev) => !prev)}>
        <Text>open</Text>
      </Pressable>

      {isOpen && (
        <BottomSheet
          index={2}
          enablePanDownToClose={true}
          snapPoints={snapPoints}
        >
          <BottomSheetView>
            <Text>Hello</Text>
          </BottomSheetView>
        </BottomSheet>
      )}
    </View>
  );
};

export default WatchScreen;
