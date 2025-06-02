import React, { useEffect, useState } from "react";
import {
  View,
  FlatList,
  Image,
  TouchableOpacity,
  Text,
  PermissionsAndroid,
  Platform,
} from "react-native";
import CameraRoll from "@react-native-camera-roll/camera-roll";

export default function CustomImagePicker() {
  const [photos, setPhotos] = useState([]);
  const [selectedUris, setSelectedUris] = useState([]);

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
      console.log(CameraRoll, "camera rol");
      const result = await CameraRoll.getPhotos({
        first: 30,
        assetType: "Photos",
      });
      setPhotos(result.edges);
    } catch (error) {
      console.error("Error loading photos:", error);
    }
  };

  const toggleSelect = (uri) => {
    setSelectedUris((prev) =>
      prev.includes(uri) ? prev.filter((item) => item !== uri) : [...prev, uri]
    );
  };

  console.log(photos);

  const renderItem = ({ item }) => {
    const uri = item.node.image.uri;
    const isSelected = selectedUris.includes(uri);

    return (
      <TouchableOpacity onPress={() => toggleSelect(uri)}>
        <Image
          source={{ uri }}
          style={{
            width: 100,
            height: 100,
            margin: 2,
            opacity: isSelected ? 0.6 : 1,
          }}
        />
        {isSelected && (
          <View
            style={{
              position: "absolute",
              top: 5,
              right: 5,
              backgroundColor: "blue",
              borderRadius: 12,
              padding: 4,
            }}
          >
            <Text style={{ color: "white", fontSize: 12 }}>✔</Text>
          </View>
        )}
      </TouchableOpacity>
    );
  };

  return (
    <View style={{ flex: 1, padding: 5 }}>
      <FlatList
        data={photos}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
        numColumns={3}
      />
      {selectedUris.length > 0 && (
        <View style={{ padding: 10, backgroundColor: "#f0f0f0" }}>
          <Text>Selected {selectedUris.length} image(s)</Text>
        </View>
      )}
    </View>
  );
}
