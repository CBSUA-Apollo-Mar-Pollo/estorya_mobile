import { View, Dimensions, Image, Text } from "react-native";
import React, { useEffect, useState } from "react";

const ImageLayoutAddPost = ({ selectedUris, setSelectedUris }) => {
  const [firstImageOrientation, setFirstImageOrientation] = useState(null);

  useEffect(() => {
    if (selectedUris.length >= 1) {
      Image.getSize(
        selectedUris[0],
        (width, height) => {
          if (width > height) {
            setFirstImageOrientation("landscape");
          } else {
            setFirstImageOrientation("portrait");
          }
        },
        (error) => {
          console.error("Failed to get image size", error);
        }
      );
    } else {
      setFirstImageOrientation(null);
    }
  }, [selectedUris]);

  const screenWidth = Dimensions.get("window").width;

  console.log(firstImageOrientation, "oreintation");
  return (
    <View>
      {/* Layout 1: Single image, dynamic orientation */}
      {selectedUris.length === 1 && (
        <Image
          source={{ uri: selectedUris[0] }}
          style={{
            width: screenWidth,
            height:
              firstImageOrientation === "landscape"
                ? screenWidth * 0.75
                : screenWidth * 1.5,
            resizeMode: "cover",
            marginBottom: 2,
          }}
        />
      )}

      {/* Layout 2: Two side-by-side images */}
      {selectedUris.length === 2 && (
        <View style={{ flexDirection: "row" }}>
          {selectedUris.map((uri, index) => (
            <Image
              key={index}
              source={{ uri }}
              style={{
                width: screenWidth / 2 - 1,
                height: screenWidth,
                resizeMode: "cover",
                marginRight: index === 0 ? 1 : 0,
                marginLeft: index === 1 ? 1 : 0,
              }}
            />
          ))}
        </View>
      )}

      {/* Layout 3: One large image top, two smaller below */}
      {selectedUris.length === 3 && (
        <View
          style={{
            flexDirection:
              firstImageOrientation === "landscape" ? "col" : "row",
          }}
        >
          <Image
            source={{ uri: selectedUris[0] }}
            style={{
              width:
                firstImageOrientation === "landscape"
                  ? screenWidth / 1
                  : screenWidth / 1.6,
              height:
                firstImageOrientation === "portrait"
                  ? screenWidth / 1
                  : screenWidth / 1.5,
              resizeMode: "cover",
              marginBottom: 2,
              marginRight: 2,
            }}
          />
          <View
            style={{
              flexDirection:
                firstImageOrientation === "landscape" ? "row" : "col",
            }}
          >
            <Image
              source={{ uri: selectedUris[1] }}
              style={{
                width: screenWidth / 2 - 1,
                height: screenWidth / 2,
                resizeMode: "cover",
                marginRight: 1,
              }}
            />
            <Image
              source={{ uri: selectedUris[2] }}
              style={{
                width: screenWidth / 2 - 1,
                height: screenWidth / 2,
                resizeMode: "cover",
                marginLeft: 1,
                marginTop: 1,
              }}
            />
          </View>
        </View>
      )}

      {/* Layout 4: 4+ images, 2x2 grid */}
      {selectedUris.length >= 4 && (
        <View style={{ flexWrap: "wrap", flexDirection: "row" }}>
          {selectedUris.slice(0, 4).map((uri, index) => (
            <Image
              key={index}
              source={{ uri }}
              style={{
                width: screenWidth / 2 - 1,
                height: screenWidth / 2 - 1,
                resizeMode: "cover",
                margin: 0.5,
              }}
            />
          ))}

          {selectedUris.length > 4 && (
            <View
              style={{
                position: "absolute",
                right: 0,
                bottom: 0,
                backgroundColor: "rgba(0,0,0,0.5)",
                width: screenWidth / 2 - 1,
                height: screenWidth / 2 - 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text style={{ color: "white", fontSize: 24 }}>
                +{selectedUris.length - 4}
              </Text>
            </View>
          )}
        </View>
      )}
    </View>
  );
};

export default ImageLayoutAddPost;
