import { Stack } from "expo-router";
import "./globals.css";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import SafeScreen from "../components/SafeScreen";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export default function RootLayout() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaProvider>
        <SafeScreen>
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="index" />
            <Stack.Screen name="(authenticated)" />
            <Stack.Screen name="(unauthenticated)" />
            <Stack.Screen name="(auth)" />
          </Stack>
        </SafeScreen>
        <StatusBar style="dark" />
      </SafeAreaProvider>
    </QueryClientProvider>
  );
}
