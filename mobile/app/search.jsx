import {
  View,
  Text,
  TextInput,
  Touchable,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { ArrowLeft } from "lucide-react-native";
import { useRouter } from "expo-router";

const SearchScreen = () => {
  const router = useRouter();
  const [searchValue, setSearchValue] = useState("");
  return (
    <View className="bg-white h-full">
      <View className="border-b border-neutral-300 mt-4">
        <View className="flex-row items-center justify-center ml-10 mr-8 gap-x-5 mb-2">
          <TouchableOpacity onPress={() => router.back()}>
            <ArrowLeft color="#737373" />
          </TouchableOpacity>
          <View className="w-full">
            <TextInput
              className="border  border-neutral-400 text-neutral-800 text-lg rounded-md h-12 px-4"
              placeholder="Search"
              keyboardType="default"
              value={searchValue}
              onChangeText={setSearchValue}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

export default SearchScreen;
