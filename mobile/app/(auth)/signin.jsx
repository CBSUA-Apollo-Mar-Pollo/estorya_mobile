import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import React, { useState } from "react";
import { Eye, EyeOff, Link } from "lucide-react-native";
import { images } from "../../constants/images";
import { useRouter } from "expo-router";

const SignInScreen = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <View className="items-center justify-center bg-white  h-full">
      <Text className="font-bold text-5xl">Sign in</Text>

      <View className="mt-10 w-full px-4 gap-y-4">
        <TextInput
          className="border border-neutral-400 rounded-md h-14 px-4"
          placeholder="Email"
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <View className="relative">
          <TextInput
            className="border border-neutral-400 text-neutral-800 text-lg rounded-md h-14 px-4"
            placeholder="Password"
            keyboardType="password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
          />

          <TouchableOpacity
            onPress={() => setShowPassword(!showPassword)}
            className="absolute right-2 top-1/2 -translate-y-1/2"
          >
            {showPassword ? (
              <Eye color="#a3a3a3" size={24} />
            ) : (
              <EyeOff color="#a3a3a3" size={24} />
            )}
          </TouchableOpacity>
        </View>

        <TouchableOpacity className="w-full bg-blue-500 h-14 justify-center items-center rounded-full">
          <Text className="text-white font-semibold text-xl">
            Sign in with email
          </Text>
        </TouchableOpacity>

        <View className="flex-row items-center my-2 mx-4">
          <View className="flex-1 h-px bg-gray-300" />
          <Text className="mx-5 text-gray-500 mb-1 text-lg">or</Text>
          <View className="flex-1 h-px bg-gray-300" />
        </View>

        <TouchableOpacity className="w-full border border-neutral-200 bg-white h-14 justify-center items-center rounded-full relative flex-row gap-x-4">
          <Image
            source={images.google_logo}
            className="w-6 h-6"
            resizeMode="contain"
          />
          <Text className="text-black text-xl">Sign in with Google</Text>
        </TouchableOpacity>

        <View className="justify-center items-center mt-2">
          <Text>
            Forgot your{" "}
            <TouchableOpacity onPress={() => router.push("/resetpassword")}>
              <Text className="text-blue-500">password?</Text>
            </TouchableOpacity>
          </Text>
        </View>

        <View className="justify-center items-center mt-2">
          <Text>
            Dont have an account yet?{" "}
            <TouchableOpacity onPress={() => router.push("/signup")}>
              <Text className="text-blue-500">Sign Up</Text>
            </TouchableOpacity>
          </Text>
        </View>
      </View>
    </View>
  );
};

export default SignInScreen;
