import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Modal,
  Button,
  StatusBar,
} from "react-native";
import React, { useCallback, useState } from "react";
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { useMemo } from "react";
import { Icons } from "../utils/Icons";
import { images } from "../../constants/images";

const BottomSheetPostSettings = ({
  bottomSheetPostSettingsRef,
  handleOpenBottomSheetPostSettings,
}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const snapPoints = useMemo(() => ["70%"], []);
  const renderBackdrop = useCallback(
    (props) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1} // hide when closed
        appearsOnIndex={0} // show when opened
        opacity={0.4} // darkness level (0 to 1)
        pressBehavior="close"
      />
    ),
    []
  );

  const moveToTrash = () => {
    setIsModalVisible(true);
    bottomSheetPostSettingsRef.current?.dismiss();
  };
  return (
    <View>
      <BottomSheetModal
        ref={bottomSheetPostSettingsRef}
        name="bottomSheetPostSettings"
        index={0}
        enablePanDownToClose={true}
        snapPoints={snapPoints}
        backdropComponent={renderBackdrop}
        backgroundStyle={{
          backgroundColor: "#e5e7eb",
          borderTopLeftRadius: 24,
          borderTopRightRadius: 24,
        }}
      >
        <BottomSheetView className="">
          <View
            style={{
              rowGap: 25,
              shadowColor: "rgba(0, 0, 0, 1)",
              shadowOffset: { width: 0, height: 0 },
              shadowOpacity: 0.5,
              shadowRadius: 5,
              elevation: 0.5,
            }}
            className="bg-white mx-4 mb-4 rounded-2xl gap-y-7 px-5 py-4"
          >
            <TouchableOpacity className="flex-row items-center gap-x-4">
              <Icons.muteNotificationIcon height={34} width={34} fill="black" />
              <Text className="font-semibold text-lg">
                Turn off notifcations for this post
              </Text>
            </TouchableOpacity>
            <TouchableOpacity className="flex-row items-center gap-x-6">
              <Image
                source={images.bookmarkBlack}
                className="w-8 h-8"
                resizeMode="cover"
              />
              <View>
                <Text className="font-semibold text-lg">Save post</Text>
                <Text>Add this to your saved items</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity className="flex-row items-center gap-x-6">
              <Image
                source={images.box}
                className="w-8 h-8"
                resizeMode="cover"
              />
              <Text className="font-semibold text-lg">Moved to archive</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => moveToTrash()}
              className="flex-row items-center gap-x-6"
            >
              <Image
                source={images.trashbin}
                className="w-8 h-8"
                resizeMode="cover"
              />
              <View>
                <Text className="font-semibold text-lg">Moved to trash</Text>
                <Text>items in your trash are deleted after 30 days</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity className="flex-row items-center gap-x-6">
              <Image
                source={images.pencil}
                className="w-8 h-8"
                resizeMode="cover"
              />
              <Text className="font-semibold text-lg">Edit post</Text>
            </TouchableOpacity>

            <TouchableOpacity className="flex-row items-center gap-x-6">
              <Image
                source={images.lock}
                className="w-8 h-8"
                resizeMode="cover"
              />
              <Text className="font-semibold text-lg">Edit privacy</Text>
            </TouchableOpacity>

            <TouchableOpacity className="flex-row items-center gap-x-4">
              <Image
                source={images.copy}
                className="w-10 h-10"
                resizeMode="cover"
              />
              <Text className="font-semibold text-lg">Copy link</Text>
            </TouchableOpacity>
          </View>

          <View
            style={{
              rowGap: 25,
              shadowColor: "rgba(0, 0, 0, 1)",
              shadowOffset: { width: 0, height: 0 },
              shadowOpacity: 0.5,
              shadowRadius: 5,
              elevation: 0.5,
            }}
            className="bg-white mx-4 mb-4 rounded-2xl gap-y-7 px-5 py-4"
          >
            <TouchableOpacity className="flex-row items-center gap-x-6">
              <Image
                source={images.settings}
                className="w-8 h-8"
                resizeMode="cover"
              />
              <Text className="font-semibold text-lg">Manage your feed</Text>
            </TouchableOpacity>
          </View>
        </BottomSheetView>
      </BottomSheetModal>

      <Modal
        transparent
        visible={isModalVisible}
        animationType="fade"
        onRequestClose={() => setIsModalVisible(false)}
      >
        <>
          <StatusBar
            barStyle="light-content"
            backgroundColor="rgba(0, 0, 0, 0.5)"
            translucent
          />
          <View
            style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
            className="flex-1 items-center justify-center bg-black/50 "
          >
            <View
              style={{ padding: 20, marginHorizontal: 30 }}
              className="bg-white rounded-md  "
            >
              <Text className="text-lg font-medium">Move to your trash?</Text>
              <Text style={{ fontSize: 15 }} className="mt-6  text-neutral-600">
                Items in your trash will be automically deleted after 30
                days.You can delete them earlier from your Trash by going to
                Activity Log in Settings.
              </Text>

              <View
                style={{ justifyContent: "flex-end" }}
                className="mt-6 flex-row flex-2 justify-end gap-x-4 "
              >
                <TouchableOpacity
                  onPress={() => {
                    setIsModalVisible(false);
                  }}
                >
                  <Text className="text-neutral-500 font-semibold">CANCEL</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => {
                    setIsModalVisible(false);
                  }}
                >
                  <Text className="text-blue-700 font-semibold">MOVE</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </>
      </Modal>
    </View>
  );
};

export default BottomSheetPostSettings;
