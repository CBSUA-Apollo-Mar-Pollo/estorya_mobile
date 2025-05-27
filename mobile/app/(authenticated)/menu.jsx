import { View, Text, TouchableOpacity, Image, Pressable } from "react-native";
import React from "react";
import { ChevronDown, Plus, Search, Settings } from "lucide-react-native";
import { Icons } from "../../components/utils/Icons";
import useKeychainSession from "../../hooks/useKeychainSession";
import { images } from "../../constants/images";
import { ScrollView } from "react-native-gesture-handler";

const MenuScreen = () => {
  const { session } = useKeychainSession();
  console.log(session);
  return (
    <ScrollView className="flex-1 bg-gray-200">
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

      <View
        style={{
          shadowColor: "rgba(0, 0, 0, 1)",
          shadowOffset: { width: 0, height: 0 },
          shadowOpacity: 0.5,
          shadowRadius: 5,
          elevation: 5, // for Android
        }}
        className=" bg-white mx-3  mt-8 rounded-xl"
      >
        <TouchableOpacity className="flex-row items-center justify-between px-4 py-3  border-b border-neutral-300">
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
        <Pressable className="flex-row items-center gap-x-4 px-5 py-4">
          <View className="bg-neutral-800 rounded-full p-1">
            <Plus color="white" strokeWidth={3} size={25} />
          </View>
          <View className="flex-col">
            <Text className="text-lg font-bold text-neutral-700">
              Create new profile or Page
            </Text>
            <Text className="text-sm text-neutral-600">
              Switch between profiles with one login.
            </Text>
          </View>
        </Pressable>
      </View>

      <View className="flex-row flex-wrap justify-between px-4 mt-8">
        <TouchableOpacity
          style={{
            shadowColor: "rgba(0, 0, 0, 1)",
            shadowOffset: { width: 0, height: 0 },
            shadowOpacity: 0.5,
            shadowRadius: 5,
            elevation: 5, // for Android
          }}
          className="w-[48%] h-auto bg-white rounded-2xl mb-4 p-4 gap-y-2"
        >
          <Image
            source={images.memories}
            className="w-8 h-8"
            resizeMode="cover"
          />
          <Text className="font-medium">Memories</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            shadowColor: "rgba(0, 0, 0, 1)",
            shadowOffset: { width: 0, height: 0 },
            shadowOpacity: 0.5,
            shadowRadius: 5,
            elevation: 5, // for Android
          }}
          className="w-[48%] h-auto bg-white rounded-2xl mb-4 p-4  gap-y-2"
        >
          <Image source={images.saved} className="w-7 h-7" resizeMode="cover" />
          <Text className="font-medium">Saved</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            shadowColor: "rgba(0, 0, 0, 1)",
            shadowOffset: { width: 0, height: 0 },
            shadowOpacity: 0.5,
            shadowRadius: 5,
            elevation: 5, // for Android
          }}
          className="w-[48%] h-auto bg-white rounded-2xl mb-4 p-4  gap-y-2"
        >
          <Image
            source={images.community}
            className="w-9 h-9"
            resizeMode="cover"
          />
          <Text className="font-medium">Community</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            shadowColor: "rgba(0, 0, 0, 1)",
            shadowOffset: { width: 0, height: 0 },
            shadowOpacity: 0.5,
            shadowRadius: 5,
            elevation: 5, // for Android
          }}
          className="w-[48%] h-auto bg-white rounded-2xl mb-4 p-4  gap-y-2"
        >
          <Image source={images.video} className="w-8 h-8" resizeMode="cover" />
          <Text className="font-medium">Video</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            shadowColor: "rgba(0, 0, 0, 1)",
            shadowOffset: { width: 0, height: 0 },
            shadowOpacity: 0.5,
            shadowRadius: 5,
            elevation: 5, // for Android
          }}
          className="w-[48%] h-auto bg-white rounded-2xl mb-4 p-4  gap-y-2"
        >
          <Image
            source={images.searchFriends}
            className="w-8 h-8"
            resizeMode="cover"
          />
          <Text className="font-medium">Search friends</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            shadowColor: "rgba(0, 0, 0, 1)",
            shadowOffset: { width: 0, height: 0 },
            shadowOpacity: 0.5,
            shadowRadius: 5,
            elevation: 5, // for Android
          }}
          className="w-[48%] h-auto bg-white rounded-2xl mb-4 p-4 gap-y-1"
        >
          <Image
            source={images.postFeeds}
            className="w-10 h-10"
            resizeMode="cover"
          />
          <Text className="font-medium">Posts feeds</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            shadowColor: "rgba(0, 0, 0, 1)",
            shadowOffset: { width: 0, height: 0 },
            shadowOpacity: 0.5,
            shadowRadius: 5,
            elevation: 5, // for Android
          }}
          className="w-[48%] h-auto bg-white rounded-2xl mb-4 p-4 gap-y-2"
        >
          <Image
            source={images.birthdays}
            className="w-10 h-10"
            resizeMode="cover"
          />
          <Text className="font-medium">Birthdays</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            shadowColor: "rgba(0, 0, 0, 1)",
            shadowOffset: { width: 0, height: 0 },
            shadowOpacity: 0.5,
            shadowRadius: 5,
            elevation: 5, // for Android
          }}
          className="w-[48%] h-auto bg-white rounded-2xl mb-4 p-4 gap-y-2"
        >
          <Image
            source={images.events}
            className="w-9 h-9"
            resizeMode="cover"
          />
          <Text className="font-medium">Events</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            shadowColor: "rgba(0, 0, 0, 1)",
            shadowOffset: { width: 0, height: 0 },
            shadowOpacity: 0.5,
            shadowRadius: 5,
            elevation: 5, // for Android
          }}
          className="w-[48%] h-auto bg-white rounded-2xl mb-4 p-4 gap-y-1"
        >
          <Image source={images.pages} className="w-9 h-9" resizeMode="cover" />
          <Text className="font-medium">Pages</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            shadowColor: "rgba(0, 0, 0, 1)",
            shadowOffset: { width: 0, height: 0 },
            shadowOpacity: 0.5,
            shadowRadius: 5,
            elevation: 5, // for Android
          }}
          className="w-[48%] h-auto bg-white rounded-2xl mb-4 p-4 gap-y-1"
        >
          <Image
            source={images.messager}
            className="w-9 h-9"
            resizeMode="cover"
          />
          <Text className="font-medium">chatbox</Text>
        </TouchableOpacity>
      </View>

      <View className="mt-4">
        <TouchableOpacity className="border-y border-neutral-400 flex-row items-center justify-between px-4 py-2">
          <View className="flex-row items-center gap-x-4">
            <Image
              source={images.helpSupport}
              className="w-9 h-9"
              resizeMode="cover"
            />
            <Text className="font-bold">Help & Support</Text>
          </View>
          <ChevronDown color="gray" size={20} strokeWidth={3} />
        </TouchableOpacity>
        <TouchableOpacity className="border-b border-neutral-400 flex-row items-center justify-between px-4 py-2">
          <View className="flex-row items-center gap-x-4">
            <Image
              source={images.gradientSettings}
              className="w-9 h-9"
              resizeMode="cover"
            />
            <Text className="font-bold">Settings & privacy</Text>
          </View>
          <ChevronDown color="gray" size={20} />
        </TouchableOpacity>
      </View>

      <TouchableOpacity className="bg-gray-400 rounded-lg my-8 mx-4 py-3">
        <Text className="text-center font-bold">Log out</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default MenuScreen;
