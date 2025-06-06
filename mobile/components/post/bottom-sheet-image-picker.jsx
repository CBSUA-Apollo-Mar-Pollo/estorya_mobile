import {
  View,
  FlatList,
  Text,
  TouchableOpacity,
  Image,
  PermissionsAndroid,
  Platform,
} from "react-native";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { SafeAreaView } from "react-native-safe-area-context";
import { ChevronDown, X } from "lucide-react-native";
import { CameraRoll } from "@react-native-camera-roll/camera-roll";

import { Icons } from "../utils/Icons";
import { images } from "../../constants/images";

const BottomSheetImagePicker = ({
  selectedUris,
  setSelectedUris,
  bottomSheetImagePickerRef,
  handleOpenBottomSheetModalAddPost,
  isSelectMultiple,
  setIsSelectMultiple,
}) => {
  const [photos, setPhotos] = useState([]);

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

  const handleCloseImagePicker = () => {
    bottomSheetImagePickerRef.current?.dismiss();
    handleOpenBottomSheetModalAddPost();
  };

  const requestPermission = async () => {
    if (Platform.OS === "android") {
      const sdk = Platform.Version;

      let permission;

      if (sdk >= 33) {
        // Android 13+ uses READ_MEDIA_IMAGES
        permission = PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES;
      } else {
        // Older versions
        permission = PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE;
      }

      const granted = await PermissionsAndroid.request(permission);

      return granted === PermissionsAndroid.RESULTS.GRANTED;
    }

    return true; // iOS
  };

  useEffect(() => {
    (async () => {
      const granted = await requestPermission();
      if (!granted) {
        console.warn("Permission not granted");
        return;
      }
      loadPhotos();
    })();
  }, []);

  const loadPhotos = async () => {
    try {
      const result = await CameraRoll.getPhotos({
        first: 200,
        assetType: "Photos",
      });
      setPhotos(result.edges);
    } catch (error) {
      console.error("Error loading photos:", error);
    }
  };

  const toggleSelect = (uri) => {
    if (isSelectMultiple === false) {
      // if the select multiple is off when user pick a single picture it will go to add post
      setSelectedUris((prev) =>
        prev.includes(uri)
          ? prev.filter((item) => item !== uri)
          : [...prev, uri]
      );
      bottomSheetImagePickerRef.current?.dismiss();
      handleOpenBottomSheetModalAddPost();
    } else {
      setSelectedUris((prev) =>
        prev.includes(uri)
          ? prev.filter((item) => item !== uri)
          : [...prev, uri]
      );
    }
  };

  //   console.log(photos);

  // console.log(selectedUris, "selected URI");

  const renderItem = ({ item }) => {
    const uri = item.node.image.uri;
    const isSelected = selectedUris.includes(uri);
    const index = selectedUris.indexOf(uri);
    return (
      <TouchableOpacity className="relative" onPress={() => toggleSelect(uri)}>
        {isSelectMultiple && (
          <View
            style={{
              zIndex: 20,
              top: 10,
              right: 10,
              backgroundColor: isSelected
                ? "#1f44ff"
                : "rgba(64, 64, 64 / 0.6)",
              borderColor: isSelected ? "#1f44ff" : "#fff",
            }}
            className="h-7 w-7 rounded-full border-2  absolute   "
          >
            <Text className="text-center text-white">
              {isSelected ? index + 1 : null}
            </Text>
          </View>
        )}
        <Image
          className="z-0"
          source={{ uri }}
          style={{
            width: 133,
            height: 170,
            margin: 2,
            borderWidth: isSelected ? 4 : 0,
            borderColor: isSelected ? "#1f44ff" : "white",
          }}
          resizeMode="cover"
        />
      </TouchableOpacity>
    );
  };

  return (
    <BottomSheetModal
      ref={bottomSheetImagePickerRef}
      name="bottomSheetImagePicker"
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
          {/* header */}
          <View className="flex-row items-center justify-between mx-2">
            <TouchableOpacity
              className="ml-6"
              onPress={() => handleCloseImagePicker()}
            >
              <X color="black" size={28} />
            </TouchableOpacity>
            <Text className="text-xl font-bold">New post</Text>
            <View className="flex-row items-center gap-x-5">
              <TouchableOpacity className="mr-2">
                <Icons.settingsIcon width={24} height={24} color="black" />
              </TouchableOpacity>
              {selectedUris.length > 0 ? (
                <TouchableOpacity
                  onPress={() => handleCloseImagePicker()}
                  className="py-2 px-3 rounded-lg"
                  style={{ backgroundColor: "#1f44ff" }}
                >
                  <Text className="text-white font-medium">NEXT</Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity>
                  <Icons.CameraIcon width={27} height={27} color="black" />
                </TouchableOpacity>
              )}
            </View>
          </View>

          {selectedUris.length > 0 && (
            <FlatList
              data={selectedUris}
              keyExtractor={(item, index) => index.toString()}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{
                paddingHorizontal: 10,
                paddingVertical: 8,
              }}
              renderItem={({ item }) => (
                <View
                  className="relative"
                  style={{
                    marginRight: 10,
                    borderRadius: 13,
                    overflow: "hidden",
                    backgroundColor: "#f0f0f0",
                  }}
                >
                  <TouchableOpacity
                    onPress={() => {
                      setSelectedUris((prev) =>
                        prev.includes(item)
                          ? prev.filter((i) => i !== item)
                          : [...prev, item]
                      );
                    }}
                    className="absolute right-2"
                    style={{
                      zIndex: 20,
                      top: 10,
                      right: 10,
                      backgroundColor: "rgba(0, 0, 0, 0.4)", // subtle dark background
                      borderRadius: 20,
                      padding: 4,
                      shadowColor: "#000",
                      shadowOffset: { width: 0, height: 1 },
                      shadowOpacity: 0.6,
                      shadowRadius: 3,
                      elevation: 5,
                    }}
                  >
                    <X size={22} color="white" />
                  </TouchableOpacity>

                  <Image
                    source={{ uri: item }}
                    style={{
                      width: 200,
                      height: 550,
                      borderRadius: 10,
                      zIndex: 10,
                    }}
                    resizeMethod="scale"
                  />
                </View>
              )}
            />
          )}

          {/* buttons */}
          <View className="flex-row items-center justify-between mx-4 mt-8">
            <TouchableOpacity className="flex-row items-center gap-x-2">
              <Text className="text-lg">Gallery</Text>
              <ChevronDown size={20} color="black" />
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                backgroundColor: isSelectMultiple ? "#E7F3FF" : "#d1d5db",
              }}
              onPress={() => {
                if (selectedUris.length === 0) {
                  setIsSelectMultiple((prev) => !prev);
                } else {
                  return;
                }
              }}
              className={`flex-row items-center gap-x-2  py-2 px-3 rounded-lg mr-2 `}
            >
              <Icons.blackImageIcon
                width={20}
                height={20}
                fill={isSelectMultiple ? "#1877F2" : "black"}
              />
              <Text
                className={`font-medium
                    
                    ${isSelectMultiple ? "text-blue-500 " : "text-black"}`}
              >
                Select multiple
              </Text>
            </TouchableOpacity>
          </View>

          <FlatList
            className="mt-4 h-full"
            data={photos}
            keyExtractor={(item, index) => index.toString()}
            renderItem={renderItem}
            numColumns={3}
            scrollEnabled={true}
          />
        </SafeAreaView>
      </BottomSheetView>
    </BottomSheetModal>
  );
};

export default BottomSheetImagePicker;
