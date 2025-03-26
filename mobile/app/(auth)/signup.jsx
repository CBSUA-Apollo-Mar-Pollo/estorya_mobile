import { View, Text, TextInput, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react-native";
import { useRouter } from "expo-router";

const SignUpScreen = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [confirmShowPassword, setConfirmShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  return (
    <View className="bg-white items-center justify-center h-full">
      <Text className="font-bold text-5xl">Sign Up</Text>

      <View className="mt-10 w-full px-4 gap-y-4">
        <TextInput
          className="border border-neutral-400 rounded-md h-14 px-4"
          placeholder="Username"
          keyboardType="default"
          autoCapitalize="none"
        />

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

        <View className="relative">
          <TextInput
            className="border border-neutral-400 text-neutral-800 text-lg rounded-md h-14 px-4"
            placeholder="Confirm password"
            keyboardType="password"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry={!confirmShowPassword}
          />

          <TouchableOpacity
            onPress={() => setConfirmShowPassword(!confirmShowPassword)}
            className="absolute right-2 top-1/2 -translate-y-1/2"
          >
            {confirmShowPassword ? (
              <Eye color="#a3a3a3" size={24} />
            ) : (
              <EyeOff color="#a3a3a3" size={24} />
            )}
          </TouchableOpacity>
        </View>

        <View className="mt-12">
          <Text className="text-center text-sm">
            By continuing,you agree to our User Agreement and acknowledge that
            you understand the privacy policy
          </Text>
          <TouchableOpacity className="mt-6 w-full bg-blue-500 h-14 justify-center items-center rounded-full">
            <Text className="text-white font-semibold text-xl">Submit</Text>
          </TouchableOpacity>
        </View>

        <View className="justify-center items-center mt-2">
          <Text>
            Already have an account?{" "}
            <TouchableOpacity onPress={() => router.push("/signin")}>
              <Text className="text-blue-500">Sign in</Text>
            </TouchableOpacity>
          </Text>
        </View>
      </View>
    </View>
  );
};

export default SignUpScreen;
