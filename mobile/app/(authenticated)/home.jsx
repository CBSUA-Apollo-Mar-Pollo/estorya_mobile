import { Link, useRouter } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";
import { Search, User } from "lucide-react-native";

export default function Home() {
  const router = useRouter();
  return (
    <View className="bg-white h-full">
      <View className="flex-row items-center justify-between pt-2 pb-3 px-4 bg-white  border-b border-neutral-100">
        <Text className="text-4xl font-extrabold">Estorya</Text>
        <View className="flex-row gap-x-4 items-center">
          <Search color="black" size={20} />
          <TouchableOpacity onPress={() => router.push("/signin")}>
            <Text className="text-xl">Sign in</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
