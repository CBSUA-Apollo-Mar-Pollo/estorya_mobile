import { useEffect } from "react";
import { useRouter } from "expo-router";
import { images } from "../../constants/images";
import { Image, Text, TouchableOpacity, View } from "react-native";

const CreateScreen = () => {
  const router = useRouter();
  return (
    <View className="h-full bg-white flex-col items-center justify-center">
      <Image
        source={images.Placeholder}
        className="w-80 h-80"
        resizeMode="cover"
      />

      <View className="mt-10 flex-col items-center justify-center">
        <Text className="text-xl font-medium text-center w-44">
          Sign up to upvote the best content
        </Text>
        <View className="flex-row justify-between mx-10 mt-10 gap-x-3">
          <TouchableOpacity
            onPress={() => router.push("/signin")}
            className="bg-blue-500 h-10 w-36 items-center justify-center rounded-full"
          >
            <Text className="text-white font-semibold">Sign in</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => router.push("/signup")}
            className="bg-blue-500 h-10 w-36 items-center justify-center rounded-full"
          >
            <Text className="text-white font-semibold">Sign up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default CreateScreen;
