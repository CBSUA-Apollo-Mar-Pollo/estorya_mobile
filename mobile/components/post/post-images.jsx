import { View, Text, FlatList } from "react-native";
import React from "react";

import AutoSizedImage from "../auto-size-uri-image";

const PostImages = ({ images }) => {
  return (
    <View>
      {images.length === 1 && (
        <View>
          <AutoSizedImage uri={images[0]?.url} />
        </View>
      )}

      {/* {images.length === 2 && (
        <View>
          <FlatList
            data={images}
            renderItem={(item) => <AutoSizedImage uri={item?.url} />}
            keyExtractor={(item, index) => index.toString()}
            numColumns={2}
            scrollEnabled={false}
          />
        </View>
      )} */}

      {images.length === 4 && (
        <View>
          <View className="grid grid-cols-2">
            <AutoSizedImage uri={images[0]?.url} />
            <AutoSizedImage uri={images[1]?.url} />
          </View>
          {/* <FlatList
            data={images}
            renderItem={({ item }) => (
              <View className="grid grid-cols-2">
                <AutoSizedImage uri={item.url} />
              </View>
            )}
            keyExtractor={(item, index) => index.toString()}
            scrollEnabled={false}
          /> */}
        </View>
      )}

      {/* {images.length === 5 && (
        <View>
          <View className="flex-row">
            <AutoSizedImage uri={images[0]?.url} />
            <AutoSizedImage uri={images[1]?.url} />
          </View>

          <FlatList
            data={images}
            renderItem={(item, index) => {
              if (index === 0) {
                return null;
              }

              if (index === 1) {
                return null;
              }
              return <AutoSizedImage uri={item?.url} />;
            }}
            keyExtractor={(item, index) => index.toString()}
            numColumns={4}
            scrollEnabled={false}
          />
        </View>
      )} */}
    </View>
  );
};

export default PostImages;
