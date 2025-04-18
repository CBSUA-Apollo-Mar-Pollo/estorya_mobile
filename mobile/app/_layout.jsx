import { Stack, useRouter } from "expo-router";
import "./globals.css";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import SafeScreen from "../components/SafeScreen";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Text, TouchableOpacity, View } from "react-native";
import { Search } from "lucide-react-native";

export default function RootLayout() {
  const queryClient = new QueryClient();
  const router = useRouter();

  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaProvider>
        <SafeScreen>
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="index" />
            <Stack.Screen name="(authenticated)" />
            <Stack.Screen
              name="(unauthenticated)"
              options={{
                headerShown: true,
                header: ({ route }) => (
                  <View className="flex-row items-center justify-between px-4 bg-white">
                    <Text className="text-4xl font-extrabold">Estorya </Text>
                    <View className="flex-row gap-x-4 items-center">
                      <TouchableOpacity onPress={() => router.push("/search")}>
                        <Search color="black" size={20} />
                      </TouchableOpacity>
                      <TouchableOpacity onPress={() => router.push("/signin")}>
                        <Text className="text-xl">Sign in</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                ),
              }}
            />
            <Stack.Screen name="(auth)" />
          </Stack>
        </SafeScreen>
        <StatusBar style="dark" />
      </SafeAreaProvider>
    </QueryClientProvider>
  );
}
