import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import { ChevronDown, Search, Settings } from "lucide-react-native";
import { Icons } from "../../components/utils/Icons";
import useKeychainSession from "../../hooks/useKeychainSession";

const MenuScreen = () => {
  const { session } = useKeychainSession();
  console.log(session);
  return (
    <View className="flex-1 bg-gray-200">
      <View className="flex-row items-center justify-between mx-3">
        <Text className="text-3xl font-extrabold">Menu</Text>
        <View className="flex-row items-center gap-x-2 mt-2">
          <TouchableOpacity className="bg-gray-300 p-3 rounded-full">
            <Icons.settingsIcon width={26} height={26} />
          </TouchableOpacity>
          <TouchableOpacity className="bg-gray-300 p-3 rounded-full">
            <Search color="black" size={26} />
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity
        style={{
          shadowColor: "rgba(0, 0, 0, 1)",
          shadowOffset: { width: 0, height: 0 },
          shadowOpacity: 0.5,
          shadowRadius: 5,
          elevation: 5, // for Android
        }}
        className="flex-row items-center justify-between bg-white mx-3 px-4 py-3 mt-8 rounded-xl drop-shadow-[0px_0px_5px_rgba(0,0,0,0.50)]"
      >
        <View className="flex-row items-center gap-x-3">
          <Image
            source={{ uri: session?.user.image }}
            className="w-12 h-12 rounded-full mt-0.5"
            resizeMode="cover"
          />
          <Text className="font-bold text-xl">{session?.user.name}</Text>
        </View>
        <TouchableOpacity className="bg-gray-300  p-2 rounded-full">
          <ChevronDown color="black" className="" size={24} />
        </TouchableOpacity>
      </TouchableOpacity>

      <View className="flex-row flex-wrap justify-between px-4">
        <TouchableOpacity className="w-[48%] h-auto bg-white rounded-lg mb-4"></TouchableOpacity>
        <TouchableOpacity className="w-[48%] h-auto bg-white rounded-lg mb-4"></TouchableOpacity>
      </View>
    </View>
  );
};

export default MenuScreen;
