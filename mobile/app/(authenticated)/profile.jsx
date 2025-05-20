import { View, Text } from "react-native";
import React from "react";
import useKeychainSession from "../../hooks/useKeychainSession";
import { useQuery } from "@tanstack/react-query";
import { Image } from "react-native";
import axios from "axios";
import { useState } from "react";
import { RefreshControl, ScrollView } from "react-native-gesture-handler";
import { PORT } from "../../port";
import { TouchableOpacity } from "react-native";
import { Ellipsis, Plus, UserPen } from "lucide-react-native";
import { Icons } from "../../components/utils/Icons";

const ProfileScreen = () => {
  const [refreshing, setRefreshing] = useState(false);
  const { session } = useKeychainSession();

  const fetchProfileData = async () => {
    try {
      const response = await axios.post(
        `${PORT}/api/v1/profile/getProfileData`,
        session?.user
      );
      return response.data;
    } catch (error) {
      // Catching and logging error without redundancy
      if (error.response) {
        // alert("Response error:", error.response);
      } else if (error.request) {
        // alert(
        //   "Request error: we couldn't reach the server. Please try again later."
        // );
        console.log(error.request);
      } else {
        // alert("Error message:", error.message);
        console.log(error.message);
      }
      throw new Error("Failed to fetch data");
    }
  };

  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ["profile", session?.user.id],
    queryFn: fetchProfileData,
  });

  const onRefresh = async () => {
    setRefreshing(true);
    refetch();
    setRefreshing(false);
  };

  console.log(data, "from profile screen");
  return (
    <ScrollView
      className="bg-gray-400"
      contentContainerStyle={{ flexGrow: 1 }}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <View className="bg-white pb-4">
        <View className="flex-row items-center justify-between mx-4 mt-2">
          <TouchableOpacity className="flex-row items-center gap-x-2">
            <Text className="font-extrabold text-2xl">{data?.user.name}</Text>
            <Icons.TriangleDown height={12} width={12} color="black" />
          </TouchableOpacity>
          <TouchableOpacity className="bg-gray-200 rounded-full p-2">
            <Icons.UserEdit height={24} width={24} color="black" />
          </TouchableOpacity>
        </View>

        <View className="h-[29vh] relative">
          <View>
            <Image
              source={{ uri: data?.user.backgroundImage }}
              className="w-full h-60 mt-2"
              resizeMode="cover"
            />
            <TouchableOpacity className="absolute right-4 bottom-4 border-2 border-white bg-gray-200 p-2 rounded-full">
              <Icons.CameraIcon height={20} width={20} color="black" />
            </TouchableOpacity>
          </View>

          <View className="absolute bottom-2 left-4 ">
            <Image
              source={{ uri: data?.user.image }}
              className="w-44 h-44 rounded-full mt-0.5 border-4 border-white "
              resizeMode="cover"
            />
            <TouchableOpacity className="absolute right-2 bottom-0 border-2 border-white bg-gray-200 p-2 rounded-full">
              <Icons.CameraIcon height={20} width={20} color="black" />
            </TouchableOpacity>
          </View>
        </View>

        <View className="mx-4">
          <Text className="text-2xl font-extrabold">{data?.user.name}</Text>
          <View className="flex-row mt-2 flex-1 gap-x-4">
            <TouchableOpacity className="flex-row flex-1 items-center gap-x-2 bg-blue-700 px-6 py-3 rounded-lg">
              <Plus color="white" size={20} strokeWidth={3} />
              <Text className="text-white font-medium">Add to story</Text>
            </TouchableOpacity>
            <TouchableOpacity className="flex-row flex-1 items-center gap-x-2 bg-neutral-300 px-6 py-3 rounded-lg">
              <Icons.PencilEditIcon color="black" height={17} width={17} />
              <Text className="text-black font-medium">Edit profile</Text>
            </TouchableOpacity>
            <TouchableOpacity className="flex-row items-center gap-x-2 bg-neutral-300 px-6 py-3 rounded-lg">
              <Ellipsis color="black" size={17} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default ProfileScreen;
